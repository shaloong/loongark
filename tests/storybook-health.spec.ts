import { test, expect } from "@playwright/test";

for (let batch = 0; batch < 4; batch += 1) {
  test(`全部组件故事无运行错误、按钮嵌套和横向异常 ${batch + 1}/4`, async ({
    page,
    request,
  }) => {
    test.setTimeout(240_000);
    const index = (await (await request.get("/index.json")).json()) as {
      entries: Record<string, { id: string; type: string; title: string }>;
    };
    const stories = Object.values(index.entries).filter(
      (entry) => entry.type === "story",
    );
    expect(stories.length, "完整故事清单不能因清理丢失").toBeGreaterThanOrEqual(
      202,
    );
    expect(
      new Set(
        stories
          .filter((entry) => entry.title.startsWith("Components/"))
          .map((entry) => entry.title),
      ).size,
      "完整组件展示覆盖",
    ).toBeGreaterThanOrEqual(78);
    for (const story of stories.filter((_, index) => index % 4 === batch)) {
      await test.step(story.id, async () => {
        await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
        await page
          .locator("[data-scope], #error-message:not(:empty)")
          .first()
          .waitFor({ state: "attached" });
        const error = await page.locator("#error-message").textContent();
        expect.soft(error?.trim(), story.id).toBe("");
        if (error?.trim()) return;
        await page
          .locator("#loongark-primitive-button")
          .waitFor({ state: "attached" });
        expect
          .soft(
            await page.locator("button button").count(),
            `${story.id} 嵌套按钮`,
          )
          .toBe(0);
        const width = await page.evaluate(() => ({
          page: document.documentElement.scrollWidth,
          viewport: innerWidth,
        }));
        expect
          .soft(width.page, `${story.id} 横向溢出`)
          .toBeLessThanOrEqual(width.viewport + 1);
      });
    }
  });
}

test("无效输入有标签和错误语义", async ({ page }) => {
  await page.goto("/iframe.html?id=components-input--invalid&viewMode=story");
  const input = page
    .locator('[data-scope="input"][data-part="control"]')
    .first();
  await expect(input).toBeVisible({ timeout: 15_000 });
  await expect(input).toHaveAttribute("aria-invalid", "true");
  const id = await input.getAttribute("id");
  await expect(page.locator(`label[for='${id}']`)).toBeVisible();
});
