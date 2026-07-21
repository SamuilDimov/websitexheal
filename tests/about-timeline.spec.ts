import { expect, test, type Page } from "@playwright/test";

const wrapper = ".dna-timeline";
const rungs = ".dna-rung";
const panels = ".dna-panel-item";
const EVENT_COUNT = 22;

async function scrollToEvent(page: Page, index: number) {
  await page.locator(wrapper).evaluate((element, targetIndex) => {
    const rect = element.getBoundingClientRect();
    const scrollable = element.clientHeight - window.innerHeight;
    const count = element.querySelectorAll(".dna-rung").length;
    window.scrollTo({
      top:
        window.scrollY + rect.top + ((targetIndex + 0.5) / count) * scrollable,
      behavior: "auto",
    });
  }, index);
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
}

test("renders every localized milestone as a DNA base pair", async ({
  page,
}) => {
  for (const path of ["/about", "/bg/about"]) {
    await page.goto(path);
    await expect(page.locator(wrapper)).toHaveCount(1);
    await expect(page.locator(rungs)).toHaveCount(EVENT_COUNT);
    await expect(page.locator(`${panels} article`)).toHaveCount(EVENT_COUNT);
  }
});

test("opens the first milestone by default", async ({ page }) => {
  await page.goto("/about");

  await expect(page.locator(wrapper)).toHaveAttribute("data-active-index", "0");
  await expect(page.locator(panels).first()).toHaveAttribute(
    "data-active",
    "true",
  );
  await expect(page.locator(`${panels} article`).first()).toBeVisible();
  await expect(page.locator(`${rungs}[data-active="true"]`)).toHaveCount(1);
});

test("shows exactly one milestone at a time while scrolling", async ({
  page,
}) => {
  await page.goto("/about");
  await page.addStyleTag({
    content: "html { scroll-behavior: auto !important; }",
  });

  await scrollToEvent(page, 10);

  await expect(page.locator(wrapper)).toHaveAttribute(
    "data-active-index",
    "10",
  );
  await expect(page.locator(`${panels}[data-active="true"]`)).toHaveCount(1);
  await expect(page.locator(panels).nth(10)).toHaveAttribute(
    "data-active",
    "true",
  );
  await expect(page.locator(panels).first()).toHaveAttribute(
    "data-active",
    "false",
  );
});

test("rotates the helix with the orbit animation", async ({ page }) => {
  await page.goto("/about");

  const state = await page.locator(rungs).nth(3).evaluate((rung) => {
    const nodeA = rung.querySelector<HTMLElement>(".dna-node-a");
    const nodeB = rung.querySelector<HTMLElement>(".dna-node-b");
    const bar = rung.querySelector<HTMLElement>(".dna-bar");
    if (!nodeA || !nodeB || !bar) throw new Error("Helix rung is incomplete");

    const nodeStyle = getComputedStyle(nodeA);
    return {
      nodeAnimation: nodeStyle.animationName,
      nodePlayState: nodeStyle.animationPlayState,
      nodeDelay: nodeStyle.animationDelay,
      strandBDelay: getComputedStyle(nodeB).animationDelay,
      barAnimation: getComputedStyle(bar).animationName,
    };
  });

  expect(state.nodeAnimation).toContain("dnaNodeOrbit");
  expect(state.nodePlayState).toBe("running");
  expect(state.barAnimation).toContain("dnaBarTwist");
  // Opposite strands stay half a cycle apart so base pairs read as one twist.
  expect(state.nodeDelay).not.toBe(state.strandBDelay);
});

test("freezes the helix shape when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about");

  const state = await page.locator(rungs).nth(3).evaluate((rung) => {
    const node = rung.querySelector<HTMLElement>(".dna-node-a");
    const bar = rung.querySelector<HTMLElement>(".dna-bar");
    if (!node || !bar) throw new Error("Helix rung is incomplete");

    return {
      nodePlayState: getComputedStyle(node).animationPlayState,
      barPlayState: getComputedStyle(bar).animationPlayState,
    };
  });

  expect(state).toEqual({
    nodePlayState: "paused",
    barPlayState: "paused",
  });
});

test("jumps to a milestone when its base pair is clicked", async ({
  page,
}) => {
  await page.goto("/about");
  await page.addStyleTag({
    content: "html { scroll-behavior: auto !important; }",
  });

  await page.locator(rungs).nth(6).click();
  await expect(page.locator(wrapper)).toHaveAttribute(
    "data-active-index",
    "6",
    { timeout: 10_000 },
  );
  await expect(page.locator(panels).nth(6)).toHaveAttribute(
    "data-active",
    "true",
  );
});

test("keeps the helix compact without mobile overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/about");

  await expect(page.locator(rungs)).toHaveCount(EVENT_COUNT);
  await expect(page.locator(`${panels} article`).first()).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
