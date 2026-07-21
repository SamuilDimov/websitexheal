import { createHash, timingSafeEqual } from "node:crypto";
import { internalHtml, userHtml } from "./emails.mjs";

const JSON_HEADERS = {
  "cache-control": "no-store",
  "content-type": "application/json; charset=utf-8",
};
const MAX_BODY_BYTES = 4096;
const RESEND_TIMEOUT_MS = 8000;

function response(statusCode, body) {
  return {
    statusCode,
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  };
}

function hasValidOriginToken(event, expectedToken) {
  const actualToken = event.headers?.["x-xheal-origin-token"] ?? "";
  const actual = Buffer.from(actualToken);
  const expected = Buffer.from(expectedToken);

  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function parseBody(event) {
  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body ?? "", "base64").toString("utf8")
    : event.body ?? "";

  if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
    throw new Error("Request body is too large");
  }

  return JSON.parse(rawBody);
}

function hasValidDetails(firstName, email) {
  return (
    typeof firstName === "string" &&
    firstName.length >= 1 &&
    firstName.length <= 100 &&
    !/[\u0000-\u001f\u007f]/.test(firstName) &&
    typeof email === "string" &&
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

async function sendReservation({ firstName, email, apiKey, fetchImpl, year }) {
  const idempotencyKey = createHash("sha256")
    .update(["band-preorder-v1", email.toLowerCase()].join("\0"))
    .digest("hex");
  const resendResponse = await fetchImpl("https://api.resend.com/emails/batch", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
      "idempotency-key": `band-preorder/${idempotencyKey}`,
    },
    body: JSON.stringify([
      {
        from: "xHeal Band <hello@xheal.ai>",
        to: "hello@xheal.ai",
        subject: `New Band Pre-Order: ${firstName} (${email})`,
        html: internalHtml(firstName, email),
      },
      {
        from: "xHeal Band <hello@xheal.ai>",
        reply_to: "hello@xheal.ai",
        to: email,
        subject: `Your xHeal Band spot is reserved, ${firstName}`,
        html: userHtml(firstName, year),
      },
    ]),
    signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
  });

  if (!resendResponse.ok) {
    throw new Error(`Resend returned HTTP ${resendResponse.status}`);
  }
}

export async function handlePreorder(
  event,
  {
    env = process.env,
    fetchImpl = fetch,
    year = new Date().getUTCFullYear(),
  } = {},
) {
  if (!env.RESEND_API_KEY || !env.ORIGIN_TOKEN) {
    console.error("Preorder Lambda environment is incomplete");
    return response(503, { error: "Email service is unavailable" });
  }

  if (!hasValidOriginToken(event, env.ORIGIN_TOKEN)) {
    return response(404, { error: "Not found" });
  }

  let requestBody;

  try {
    requestBody = parseBody(event);
  } catch {
    return response(400, { error: "firstName and email are required" });
  }

  const firstName =
    typeof requestBody?.firstName === "string"
      ? requestBody.firstName.trim()
      : undefined;
  const email =
    typeof requestBody?.email === "string" ? requestBody.email.trim() : undefined;

  if (!hasValidDetails(firstName, email)) {
    return response(400, { error: "firstName and email are required" });
  }

  try {
    await sendReservation({
      firstName,
      email,
      apiKey: env.RESEND_API_KEY,
      fetchImpl,
      year,
    });
    return response(200, { success: true });
  } catch (error) {
    console.error("Preorder API error", {
      name: error?.name,
      message: error?.message,
    });
    return response(500, { error: "Failed to process reservation" });
  }
}

export async function handler(event) {
  return handlePreorder(event);
}
