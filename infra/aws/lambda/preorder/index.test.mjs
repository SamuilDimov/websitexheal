import assert from "node:assert/strict";
import test from "node:test";
import { handlePreorder } from "./index.mjs";

const ENV = {
  ORIGIN_TOKEN: "expected-origin-token",
  RESEND_API_KEY: "test-resend-key",
};

function event(body, overrides = {}) {
  return {
    body: JSON.stringify(body),
    headers: { "x-xheal-origin-token": ENV.ORIGIN_TOKEN },
    isBase64Encoded: false,
    ...overrides,
  };
}

test("rejects incomplete Lambda configuration", async () => {
  const result = await handlePreorder(event({}), { env: {} });
  assert.equal(result.statusCode, 503);
});

test("hides the endpoint when the CloudFront origin token is invalid", async () => {
  const result = await handlePreorder(
    event(
      { firstName: "Ada", email: "ada@example.com" },
      { headers: { "x-xheal-origin-token": "wrong" } },
    ),
    { env: ENV },
  );
  assert.equal(result.statusCode, 404);
});

test("rejects invalid and oversized requests", async () => {
  const malformed = await handlePreorder(
    event({}, { body: "{" }),
    { env: ENV },
  );
  const invalidEmail = await handlePreorder(
    event({ firstName: "Ada", email: "invalid" }),
    { env: ENV },
  );
  const oversized = await handlePreorder(
    event({}, { body: JSON.stringify({ firstName: "x".repeat(5000) }) }),
    { env: ENV },
  );
  const nullBody = await handlePreorder(event({}, { body: "null" }), {
    env: ENV,
  });
  const numericName = await handlePreorder(
    event({ firstName: 123, email: "ada@example.com" }),
    { env: ENV },
  );

  assert.equal(malformed.statusCode, 400);
  assert.equal(invalidEmail.statusCode, 400);
  assert.equal(oversized.statusCode, 400);
  assert.equal(nullBody.statusCode, 400);
  assert.equal(numericName.statusCode, 400);
});

test("accepts API Gateway base64 bodies", async () => {
  let called = false;
  const body = Buffer.from(
    JSON.stringify({ firstName: "Ada", email: "ada@example.com" }),
  ).toString("base64");
  const result = await handlePreorder(
    event({}, { body, isBase64Encoded: true }),
    {
      env: ENV,
      fetchImpl: async () => {
        called = true;
        return { ok: true, status: 200 };
      },
    },
  );

  assert.equal(result.statusCode, 200);
  assert.equal(called, true);
});

test("sends both escaped emails in one idempotent Resend request", async () => {
  const requests = [];
  const fetchImpl = async (...args) => {
    requests.push(args);
    return { ok: true, status: 200 };
  };
  const payload = {
    firstName: '<Ada & "Grace">',
    email: "ada@example.com",
  };

  const first = await handlePreorder(event(payload), {
    env: ENV,
    fetchImpl,
    year: 2026,
  });
  const second = await handlePreorder(event(payload), {
    env: ENV,
    fetchImpl,
    year: 2026,
  });
  const [url, options] = requests[0];
  const messages = JSON.parse(options.body);

  assert.equal(first.statusCode, 200);
  assert.equal(second.statusCode, 200);
  assert.equal(url, "https://api.resend.com/emails/batch");
  assert.equal(requests.length, 2);
  assert.equal(messages.length, 2);
  assert.equal(messages[0].to, "hello@xheal.ai");
  assert.equal(messages[1].to, payload.email);
  assert.match(messages[0].html, /&lt;Ada &amp; &quot;Grace&quot;&gt;/);
  assert.doesNotMatch(messages[0].html, /<Ada/);
  assert.equal(
    requests[0][1].headers["idempotency-key"],
    requests[1][1].headers["idempotency-key"],
  );
  assert.equal(options.headers.authorization, `Bearer ${ENV.RESEND_API_KEY}`);
});

test("deduplicates retries even when the submitted name changes", async () => {
  const requests = [];
  const fetchImpl = async (...args) => {
    requests.push(args);
    return { ok: true, status: 200 };
  };

  await handlePreorder(
    event({ firstName: "Ada", email: "ada@example.com" }),
    { env: ENV, fetchImpl },
  );
  await handlePreorder(
    event({ firstName: "Grace", email: "ada@example.com" }),
    { env: ENV, fetchImpl },
  );

  assert.equal(
    requests[0][1].headers["idempotency-key"],
    requests[1][1].headers["idempotency-key"],
  );
});

test("returns an error when Resend rejects the batch", async () => {
  const result = await handlePreorder(
    event({ firstName: "Ada", email: "ada@example.com" }),
    {
      env: ENV,
      fetchImpl: async () => ({ ok: false, status: 422 }),
    },
  );

  assert.equal(result.statusCode, 500);
});
