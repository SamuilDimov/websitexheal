import { expect, test, type Locator, type Page } from "@playwright/test";

const slug = "how-xheal-connected-my-headaches-to-my-eyes";
const sliderSelector = "[data-chat-slider]";
const slideSelector = "[data-chat-slide]";

async function openSlider(page: Page, path = `/blog/${slug}`) {
  await page.goto(path);
  const slider = page.locator(sliderSelector);
  await expect(slider).toBeVisible();
  await slider.scrollIntoViewIfNeeded();
  return slider;
}

async function swipeLeft(viewport: Locator) {
  await viewport.evaluate((element) => {
    const start = new Event("touchstart", { bubbles: true, cancelable: true });
    const end = new Event("touchend", { bubbles: true, cancelable: true });

    Object.defineProperty(start, "touches", {
      value: [{ clientX: 300, clientY: 400 }],
    });
    Object.defineProperty(end, "changedTouches", {
      value: [{ clientX: 120, clientY: 404 }],
    });

    element.dispatchEvent(start);
    element.dispatchEvent(end);
  });
}

test("keeps the chat sequence accessible through every manual control", async ({
  page,
}) => {
  const slider = await openSlider(page);
  const slides = slider.locator(slideSelector);
  const previous = slider.getByRole("button", { name: "Previous screenshot" });
  const next = slider.getByRole("button", { name: "Next screenshot" });

  await expect(slides).toHaveCount(3);
  await expect(slides.nth(0).locator("img")).toHaveAttribute(
    "alt",
    /connecting recurring headaches and red eyes/i,
  );
  await expect(slides.nth(1).locator("img")).toHaveAttribute(
    "alt",
    /recommending an eye doctor/i,
  );
  await expect(slides.nth(2).locator("img")).toHaveAttribute(
    "alt",
    /vision component while sleep, stress, and screen habits still matter/i,
  );
  await expect(slider).toHaveAttribute("data-active-index", "0");
  await expect(previous).toBeDisabled();

  await next.click();
  await expect(slider).toHaveAttribute("data-active-index", "1");

  await slider.getByRole("button", { name: "Screenshot 3 of 3" }).click();
  await expect(slider).toHaveAttribute("data-active-index", "2");
  await expect(next).toBeDisabled();

  await slider.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(slider).toHaveAttribute("data-active-index", "1");
  await expect(slides.nth(1)).toHaveAttribute("aria-hidden", "false");
});

test("localizes the slider and keeps swipe interaction within the mobile viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const slider = await openSlider(page, `/bg/blog/${slug}`);

  await expect(slider).toHaveAttribute(
    "aria-label",
    "Снимки от оригиналния разговор с xHeal",
  );
  await expect(
    slider.getByRole("button", { name: "Предишна снимка" }),
  ).toBeDisabled();
  await expect(slider.getByText("Оригинален разговор с xHeal")).toBeVisible();

  const sliderBox = await slider.boundingBox();
  expect(sliderBox).not.toBeNull();
  expect(sliderBox!.x).toBeGreaterThanOrEqual(0);
  expect(sliderBox!.x + sliderBox!.width).toBeLessThanOrEqual(390);

  await swipeLeft(slider.locator(".chat-slider-viewport"));
  await expect(slider).toHaveAttribute("data-active-index", "1");
});

test("removes carousel motion when reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const slider = await openSlider(page);

  await expect(slider.locator(".chat-slider-track")).toHaveCSS(
    "transition-duration",
    "0s",
  );
  await expect(slider.locator(".chat-slider-progress span")).toHaveCSS(
    "transition-duration",
    "0s",
  );
});
