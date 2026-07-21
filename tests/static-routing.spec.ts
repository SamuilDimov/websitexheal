import { expect, test } from "@playwright/test";

test("serves localized pages and Next navigation payloads", async ({ request }) => {
  for (const path of [
    "/",
    "/about",
    "/about.txt",
    "/bg",
    "/bg/about",
    "/bg/about.txt",
    "/google9d80d9bffb68e2b1.html",
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }
});

test("returns real 404 responses for unknown routes", async ({ request }) => {
  for (const path of ["/definitely-not-a-page", "/smart-devices"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
  }
});

test("serves the exact Google Search Console verification token", async ({
  request,
}) => {
  const response = await request.get("/google9d80d9bffb68e2b1.html");
  expect(response.status()).toBe(200);
  expect((await response.text()).trim()).toBe(
    "google-site-verification: google9d80d9bffb68e2b1.html",
  );
});

test("canonicalizes English and historical URLs", async ({ request }) => {
  const english = await request.get("/en/about?source=test", {
    maxRedirects: 0,
  });
  expect(english.status()).toBe(308);
  expect(english.headers().location).toBe("/about?source=test");

  const historical = await request.get(
    "/blog/how-xheal-guided-me-to-the-right-lab-tests?source=test",
    { maxRedirects: 0 },
  );
  expect(historical.status()).toBe(308);
  expect(historical.headers().location).toBe(
    "/blog/how-to-know-which-lab-tests-to-order?source=test",
  );
});
