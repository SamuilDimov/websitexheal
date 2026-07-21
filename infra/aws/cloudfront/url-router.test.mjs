import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const source = await readFile(new URL("./url-router.js", import.meta.url), "utf8");
const context = vm.createContext({});
const handler = vm.runInContext(`${source}\nhandler;`, context);

function request(uri, { host = "xheal.ai", querystring = {} } = {}) {
  return {
    uri,
    headers: { host: { value: host } },
    querystring,
  };
}

function route(uri, options) {
  const viewerRequest = request(uri, options);
  return {
    input: viewerRequest,
    output: handler({ request: viewerRequest }),
  };
}

test("maps public pages to exported locale objects", () => {
  assert.equal(route("/").output.uri, "/en.html");
  assert.equal(route("/about").output.uri, "/en/about.html");
  assert.equal(route("/bg").output.uri, "/bg.html");
  assert.equal(route("/bg/about").output.uri, "/bg/about.html");
  assert.equal(route("/smart-devices").output.uri, "/en/smart-devices.html");
});

test("maps Next client-navigation payloads", () => {
  assert.equal(route("/index.txt").output.uri, "/en.txt");
  assert.equal(route("/about.txt").output.uri, "/en/about.txt");
  assert.equal(route("/bg/about.txt").output.uri, "/bg/about.txt");
});

test("leaves public files and Next assets unchanged", () => {
  for (const uri of [
    "/robots.txt",
    "/llms.txt",
    "/sitemap.xml",
    "/google9d80d9bffb68e2b1.html",
    "/images/logo.svg",
    "/_next/static/app.js",
    "/.well-known/security.txt",
  ]) {
    assert.equal(route(uri).output.uri, uri);
  }
});

test("leaves paths owned by non-S3 origins unchanged", () => {
  assert.equal(route("/api/preorder").output.uri, "/api/preorder");
});

test("preserves query objects during internal rewrites", () => {
  const querystring = { utm_source: { value: "deploy" } };
  const result = route("/about", { querystring });

  assert.equal(result.output.uri, "/en/about.html");
  assert.equal(result.output.querystring, querystring);
});

test("canonicalizes locale, trailing slash, and physical export URLs", () => {
  assert.equal(route("/en").output.headers.location.value, "/");
  assert.equal(route("/en/about").output.headers.location.value, "/about");
  assert.equal(route("/about/").output.headers.location.value, "/about");
  assert.equal(route("/en/about.html").output.headers.location.value, "/about");
});

test("preserves duplicate query values on redirects", () => {
  const result = route("/en/about", {
    querystring: {
      campaign: {
        value: "one",
        multiValue: [{ value: "one" }, { value: "two" }],
      },
      empty: { value: "" },
    },
  });

  assert.equal(
    result.output.headers.location.value,
    "/about?campaign=one&campaign=two&empty=",
  );
});

test("redirects the historical blog route", () => {
  const result = route("/blog/how-xheal-guided-me-to-the-right-lab-tests", {
    querystring: { source: { value: "email" } },
  });

  assert.equal(result.output.statusCode, 308);
  assert.equal(
    result.output.headers.location.value,
    "/blog/how-to-know-which-lab-tests-to-order?source=email",
  );
});

test("redirects www to the canonical apex domain", () => {
  const result = route("/about", {
    host: "www.xheal.ai",
    querystring: { source: { value: "email" } },
  });

  assert.equal(result.output.statusCode, 308);
  assert.equal(
    result.output.headers.location.value,
    "https://xheal.ai/about?source=email",
  );
});
