import { expect, test, type Page } from "@playwright/test";

const entries = ".blog-card-clinical-entry";
const cards = ".blog-card-clinical";

async function centerEntry(page: Page, index: number) {
  await page.locator(entries).nth(index).evaluate((entry) => {
    const rect = entry.getBoundingClientRect();
    window.scrollTo({
      top: window.scrollY + rect.top - (window.innerHeight - rect.height) / 2,
      behavior: "auto",
    });
  });
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
}

test("adds the clinical treatment to localized blog listings", async ({ page }) => {
  for (const path of ["/blog", "/bg/blog"]) {
    await page.goto(path);
    expect(await page.locator(entries).count()).toBeGreaterThan(0);
    await expect(page.locator(`${entries} > ${cards}`)).toHaveCount(
      await page.locator(entries).count(),
    );
  }
});

test("links the blog card treatment to viewport progress", async ({ page }) => {
  await page.goto("/blog");
  await page.addStyleTag({
    content: "html { scroll-behavior: auto !important; }",
  });

  const supportsViewTimeline = await page.evaluate(() =>
    CSS.supports("animation-timeline", "view()"),
  );
  await centerEntry(page, 1);

  const state = await page.locator(entries).nth(1).evaluate((entry) => {
    const card = entry.querySelector<HTMLElement>(".blog-card-clinical");
    const scan = entry.querySelector<HTMLElement>(".blog-card-clinical-scan");
    const node = entry.querySelector<HTMLElement>(".blog-card-clinical-node");
    if (!card || !scan || !node) {
      throw new Error("Clinical blog card layers are incomplete");
    }

    const entryStyle = getComputedStyle(entry);
    return {
      entryAnimation: entryStyle.animationName,
      entryTimeline: entryStyle.getPropertyValue("animation-timeline"),
      cardAnimation: getComputedStyle(card).animationName,
      scanAnimation: getComputedStyle(scan, "::after").animationName,
      nodeAnimation: getComputedStyle(node).animationName,
      opacity: Number.parseFloat(entryStyle.opacity),
    };
  });

  if (!supportsViewTimeline) {
    expect(state.entryAnimation).toBe("none");
    expect(state.opacity).toBe(1);
    return;
  }

  expect(state.entryAnimation).toContain("clinicalCardPass");
  expect(state.entryTimeline).not.toBe("auto");
  expect(state.cardAnimation).toContain("clinicalCardSurfacePass");
  expect(state.scanAnimation).toContain("clinicalScanPass");
  expect(state.nodeAnimation).toContain("clinicalNodePulse");
  expect(state.opacity).toBeGreaterThan(0.95);
});

test("activates one specific blog card on hover", async ({ page }) => {
  await page.goto("/blog");
  const card = page.locator(cards).nth(1);
  await card.hover();

  const state = await card.evaluate((element) => {
    const scan = element.querySelector<HTMLElement>(".blog-card-clinical-scan");
    const node = element.querySelector<HTMLElement>(".blog-card-clinical-node");
    if (!scan || !node) throw new Error("Clinical blog card layers are incomplete");

    return {
      cardAnimation: getComputedStyle(element).animationName,
      scanAnimation: getComputedStyle(scan, "::after").animationName,
      nodeAnimation: getComputedStyle(node).animationName,
      boxShadow: getComputedStyle(element).boxShadow,
    };
  });

  expect(state.cardAnimation).toBe("none");
  expect(state.scanAnimation).toContain("blogCardHoverScan");
  expect(state.nodeAnimation).toContain("clinicalNodePulse");
  expect(state.boxShadow).not.toBe("none");
});

test("keeps blog cards static when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/blog");
  const card = page.locator(cards).nth(1);
  await card.hover();

  const state = await page.locator(entries).nth(1).evaluate((entry) => {
    const card = entry.querySelector<HTMLElement>(".blog-card-clinical");
    const scan = entry.querySelector<HTMLElement>(".blog-card-clinical-scan");
    const node = entry.querySelector<HTMLElement>(".blog-card-clinical-node");
    if (!card || !scan || !node) {
      throw new Error("Clinical blog card layers are incomplete");
    }

    const entryStyle = getComputedStyle(entry);
    const cardStyle = getComputedStyle(card);
    return {
      entryAnimation: entryStyle.animationName,
      cardAnimation: cardStyle.animationName,
      scanAnimation: getComputedStyle(scan, "::after").animationName,
      nodeAnimation: getComputedStyle(node).animationName,
      entryOpacity: entryStyle.opacity,
      entryTransform: entryStyle.transform,
      cardTransform: cardStyle.transform,
    };
  });

  expect(state).toEqual({
    entryAnimation: "none",
    cardAnimation: "none",
    scanAnimation: "none",
    nodeAnimation: "none",
    entryOpacity: "1",
    entryTransform: "none",
    cardTransform: "none",
  });
});
