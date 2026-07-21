import { expect, test, type Page } from "@playwright/test";

const showcase = ".feature-showcase";
const track = "[data-feature-track]";
const slides = "[data-feature-slide]";

async function openCinematicShowcase(page: Page, path = "/") {
  await page.goto(path);
  await page.addStyleTag({
    content: "html { scroll-behavior: auto !important; }",
  });
  await expect(page.locator(showcase)).toHaveAttribute("data-cinematic", "true");
}

async function afterAnimationFrame(page: Page) {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
}

async function scrollToProgress(page: Page, progress: number) {
  const target = await page.locator(showcase).evaluate((section, value) => {
    const featureSection = section as HTMLElement;
    const sticky = featureSection.querySelector<HTMLElement>(
      ".feature-showcase-sticky",
    );
    if (!sticky) throw new Error("Feature showcase sticky container not found");

    const stickyTop = Number.parseFloat(getComputedStyle(sticky).top) || 0;
    const sectionTop = window.scrollY + featureSection.getBoundingClientRect().top;
    const scrollDistance = Math.max(
      1,
      featureSection.offsetHeight - sticky.offsetHeight,
    );
    return sectionTop - stickyTop + value * scrollDistance;
  }, progress);

  const roundedTarget = Math.round(target);
  await page.evaluate((top) => window.scrollTo({ top, behavior: "auto" }), roundedTarget);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(roundedTarget);
  await afterAnimationFrame(page);
}

async function scrollToFeature(page: Page, index: number) {
  const count = await page.locator(slides).count();
  await scrollToProgress(page, index / Math.max(1, count - 1));
  await expect(page.locator(slides).nth(index)).toHaveAttribute(
    "aria-current",
    "true",
  );
}

async function driftState(page: Page) {
  return page.locator(showcase).evaluate((section) => {
    const showcaseTrack = section.querySelector<HTMLElement>(
      "[data-feature-track]",
    );
    if (!showcaseTrack) throw new Error("Feature showcase track not found");

    const transform = getComputedStyle(showcaseTrack).transform;
    return {
      position: transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m41,
      inlineTransform: showcaseTrack.style.transform,
      scrollY: window.scrollY,
      sectionTop: section.getBoundingClientRect().top,
    };
  });
}

async function alignmentError(page: Page, index: number) {
  return page.locator(showcase).evaluate((section, slideIndex) => {
    const showcaseTrack = section.querySelector<HTMLElement>("[data-feature-track]");
    const showcaseSlides = section.querySelectorAll<HTMLElement>(
      "[data-feature-slide]",
    );
    if (!showcaseTrack || !showcaseSlides[slideIndex]) {
      throw new Error("Feature showcase track is incomplete");
    }

    const transform = getComputedStyle(showcaseTrack).transform;
    const translateX =
      transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m41;
    return Math.abs(showcaseSlides[slideIndex].offsetLeft + translateX);
  }, index);
}

async function alignmentDiagnostics(page: Page, index: number) {
  return page.locator(showcase).evaluate((section, slideIndex) => {
    const featureSection = section as HTMLElement;
    const sticky = featureSection.querySelector<HTMLElement>(
      ".feature-showcase-sticky",
    );
    const showcaseTrack = featureSection.querySelector<HTMLElement>(
      "[data-feature-track]",
    );
    const slide = featureSection.querySelectorAll<HTMLElement>(
      "[data-feature-slide]",
    )[slideIndex];
    if (!sticky || !showcaseTrack || !slide) return null;

    const trackStyle = getComputedStyle(showcaseTrack);
    const transform = trackStyle.transform;
    const translateX =
      transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m41;
    return {
      slideOffset: slide.offsetLeft,
      translateX,
      inlineTransform: showcaseTrack.style.transform,
      transition: trackStyle.transition,
      sectionTop: featureSection.getBoundingClientRect().top,
      sectionHeight: featureSection.offsetHeight,
      stickyHeight: sticky.offsetHeight,
      scrollY: window.scrollY,
    };
  }, index);
}

test("keeps every card aligned without delayed track drift", async ({ page }) => {
  await openCinematicShowcase(page);

  for (let index = 0; index < 9; index += 1) {
    await scrollToFeature(page, index);
    expect(
      await alignmentError(page, index),
      `card ${index + 1} should align with the viewport: ${JSON.stringify(await alignmentDiagnostics(page, index))}`,
    ).toBeLessThanOrEqual(1);
  }

  await scrollToFeature(page, 0);
  await scrollToProgress(page, 0.62 / 8);
  const stateWhenScrollingStops = await driftState(page);
  await page.waitForTimeout(350);
  const stateAfterTransitionWindow = await driftState(page);

  expect(
    Math.abs(
      stateAfterTransitionWindow.position - stateWhenScrollingStops.position,
    ),
    `track should not drift: ${JSON.stringify({ before: stateWhenScrollingStops, after: stateAfterTransitionWindow })}`,
  ).toBeLessThanOrEqual(2);
});

test("keeps controls and resize calculations on the same card positions", async ({
  page,
}) => {
  await openCinematicShowcase(page);
  await scrollToFeature(page, 0);
  const controls = page.locator(".feature-showcase-controls");

  await controls.getByRole("button", { name: /Next|Следваща/i }).click();
  await expect(page.locator(slides).nth(1)).toHaveAttribute("aria-current", "true");
  await expect.poll(() => alignmentError(page, 1)).toBeLessThanOrEqual(1);
  await page.waitForTimeout(500);

  await page.setViewportSize({ width: 1024, height: 900 });
  await scrollToFeature(page, 4);
  expect(await alignmentError(page, 4)).toBeLessThanOrEqual(1);

  await page.setViewportSize({ width: 1440, height: 900 });
  await scrollToFeature(page, 8);
  await page.waitForTimeout(500);
  expect(
    await alignmentError(page, 8),
    `final card should realign after resize: ${JSON.stringify(await alignmentDiagnostics(page, 8))}`,
  ).toBeLessThanOrEqual(1);
  await expect(
    controls.getByRole("button", { name: /Next|Следваща/i }),
  ).toBeDisabled();
});

test("aligns the final card with Bulgarian content", async ({ page }) => {
  await openCinematicShowcase(page, "/bg");
  await scrollToFeature(page, 8);
  expect(await alignmentError(page, 8)).toBeLessThanOrEqual(1);
});

test.describe("progressive enhancement fallbacks", () => {
  test("uses the static grid for reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await expect(page.locator(showcase)).not.toHaveAttribute(
      "data-cinematic",
      "true",
    );
    await expect(page.locator(".feature-showcase-controls")).toHaveCount(0);
    await expect(page.locator(track)).toHaveCSS("display", "grid");
    await expect(page.locator(track)).toHaveCSS("transform", "none");
  });

  test("uses the static grid below the desktop breakpoint", async ({ page }) => {
    await page.setViewportSize({ width: 767, height: 900 });
    await page.goto("/");

    await expect(page.locator(showcase)).not.toHaveAttribute(
      "data-cinematic",
      "true",
    );
    await expect(page.locator(track)).toHaveCSS("display", "grid");
    await expect(page.locator(slides)).toHaveCount(9);
  });
});
