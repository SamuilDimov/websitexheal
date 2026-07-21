import { expect, test } from "@playwright/test";

test("serves localized pages and Next navigation payloads", async ({ request }) => {
  for (const path of [
    "/",
    "/about",
    "/about.txt",
    "/bg",
    "/bg/about",
    "/bg/about.txt",
    "/smart-devices",
    "/smart-devices.txt",
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }
});

test("returns real 404 responses for unknown routes", async ({ request }) => {
  const response = await request.get("/definitely-not-a-page");
  expect(response.status()).toBe(404);
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
