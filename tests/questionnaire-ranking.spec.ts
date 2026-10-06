import { expect, test } from "@playwright/test";
import { checkQuestionnaireRanking } from "./questionnaireRankingChecks";
for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`ranking drag ${framework} ${mode} ${width}`, async ({ page }) => {
        test.skip(!process.env.STATIC_DIR, "四端消费新构建后运行");
        const errors: string[] = [];
        page.on("pageerror", (e) => errors.push(e.message));
        await page.setViewportSize({ width, height: 1200 });
        await page.goto(
          `/examples-${framework}/?example=QuestionnaireRankingExample&mode=${mode}`,
        );
        await expect(
          page.getByRole("form", { name: "Ranking review" }),
        ).toBeVisible();
        await page.screenshot({
          path: `.artifacts/gap-completion/ranking-default-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
        await checkQuestionnaireRanking(page);
        expect(errors).toEqual([]);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        await page.screenshot({
          path: `.artifacts/gap-completion/ranking-tested-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
      });
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`ranking drag Story ${mode} ${width}`, async ({ page }) => {
      test.skip(!!process.env.STATIC_DIR, "Story专项");
      await page.setViewportSize({ width, height: 1200 });
      await page.goto(
        `/iframe.html?id=components-questionnaire--ranking-interaction&globals=mode:${mode}`,
      );
      await checkQuestionnaireRanking(page);
    });

for (const framework of ["react", "vue", "solid", "svelte"])
  test(`ranking native simulated touch ${framework}`, async ({
    browser,
    browserName,
  }) => {
    test.skip(
      !process.env.STATIC_DIR || browserName !== "chromium",
      "仅 Chromium 原生模拟触摸，不计真实手机",
    );
    const context = await browser.newContext({
      viewport: { width: 375, height: 650 },
      hasTouch: true,
    });
    try {
      const page = await context.newPage();
      await page.goto(
        new URL(
          `/examples-${framework}/?example=QuestionnaireRankingExample&mode=light`,
          process.env.STORYBOOK_URL,
        ).toString(),
      );
      const form = page.getByRole("form", { name: "Ranking review" });
      const handle = form.locator(
        '[data-question-control="rank-drag"][data-key="access"]',
      );
      await handle.scrollIntoViewIfNeeded();
      const box = (await handle.boundingBox())!,
        x = box.x + box.width / 2,
        y = box.y + box.height / 2;
      const input = await context.newCDPSession(page);
      await input.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [{ x, y }],
      });
      await expect(handle).toHaveAttribute("aria-pressed", "true");
      const before = await page.evaluate(() => scrollY);
      await input.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x, y: 635 }],
      });
      await expect
        .poll(() => page.evaluate(() => scrollY))
        .toBeGreaterThan(before);
      await expect
        .poll(() =>
          form
            .locator('[data-part="rank-row"]')
            .evaluateAll((nodes) =>
              nodes.map((node) => node.getAttribute("data-key")),
            ),
        )
        .toEqual(["layout", "speed", "access"]);
      await expect(page.getByLabel("Ranking updates")).toHaveText(
        "0 callbacks",
      );
      await input.send("Input.dispatchTouchEvent", {
        type: "touchCancel",
        touchPoints: [],
      });
      await expect
        .poll(() =>
          form
            .locator('[data-part="rank-row"]')
            .evaluateAll((nodes) =>
              nodes.map((node) => node.getAttribute("data-key")),
            ),
        )
        .toEqual(["access", "layout", "speed"]);
      await expect(page.getByLabel("Ranking updates")).toHaveText(
        "0 callbacks",
      );
      await handle.scrollIntoViewIfNeeded();
      const next = (await handle.boundingBox())!;
      await input.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [
          { x: next.x + next.width / 2, y: next.y + next.height / 2 },
        ],
      });
      await input.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: next.x + next.width / 2, y: 635 }],
      });
      await expect
        .poll(() =>
          form
            .locator('[data-part="rank-row"]')
            .evaluateAll((nodes) =>
              nodes.map((node) => node.getAttribute("data-key")),
            ),
        )
        .toEqual(["layout", "speed", "access"]);
      await input.send("Input.dispatchTouchEvent", {
        type: "touchEnd",
        touchPoints: [],
      });
      await expect(page.getByLabel("Ranking updates")).toHaveText(
        "1 callbacks",
      );
      await expect(handle).toHaveAttribute("aria-pressed", "false");
      await page.screenshot({
        path: `.artifacts/gap-completion/ranking-touch-${framework}.png`,
        fullPage: true,
      });
    } finally {
      await context.close();
    }
  });
