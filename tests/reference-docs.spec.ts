import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";

for (const mode of ["light", "dark", "high-contrast"])
  for (const width of [1280, 375])
    test(`Docs 四端代码 API 与窄屏 ${mode} ${width}`, async ({
      page,
    }, info) => {
      test.skip(!!process.env.STATIC_DIR);
      await page.setViewportSize({ width, height: 1100 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(
        `/iframe.html?id=components-button--docs&viewMode=docs&globals=mode:${mode}`,
      );
      const reference = page.locator('[data-reference-family="Button"]');
      await expect(
        reference.getByRole("tab", { name: "React", exact: true }),
      ).toHaveAttribute("aria-selected", "true");
      const react = reference.getByRole("tab", { name: "React", exact: true });
      await react.focus();
      await page.keyboard.press("ArrowRight");
      const vue = reference.getByRole("tab", { name: "Vue", exact: true });
      await expect(vue).toBeFocused();
      await expect(vue).toHaveAttribute("aria-selected", "true");
      await expect(reference.getByRole("tabpanel")).toContainText(
        "@loongark/vue",
      );
      await page.keyboard.press("End");
      await expect(
        reference.getByRole("tab", { name: "Svelte", exact: true }),
      ).toBeFocused();
      await expect(reference.getByRole("tabpanel")).toContainText(
        "@loongark/svelte",
      );
      await reference
        .getByLabel("组件部件", { exact: true })
        .selectOption("LoongArkButton");
      const table = reference.getByRole("region", { name: "API 属性表" });
      await expect(
        table
          .getByRole("row")
          .filter({
            has: page.getByRole("rowheader", { name: "type", exact: true }),
          }),
      ).toContainText('"button"');
      await expect(
        reference
          .getByRole("navigation", { name: "状态与组合场景" })
          .getByRole("link")
          .first(),
      ).toHaveAttribute("href", /\/story\/components-button--/);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth - innerWidth,
        ),
      ).toBeLessThanOrEqual(1);
      await mkdir(".artifacts/reference-docs", { recursive: true });
      await page.screenshot({
        path: `.artifacts/reference-docs/${info.project.name}-button-${mode}-${width}.png`,
      });
      await page.goto(
        `/iframe.html?id=components-datatable--docs&viewMode=docs&globals=mode:${mode}`,
      );
      const data = page.locator('[data-reference-family="DataTable"]');
      await expect(data.getByLabel("四端组合用法")).toBeVisible();
      await data
        .getByLabel("四端组合用法")
        .selectOption("datatablecomplexeditorsexample");
      await data.getByRole("tab", { name: "Solid", exact: true }).click();
      await expect(data.getByRole("tabpanel")).toContainText(
        "DataTableComplexEditorsExample",
      );
      await data
        .getByRole("tabpanel")
        .locator("details")
        .first()
        .locator("summary")
        .click();
      await expect(data.getByRole("tabpanel")).toContainText("@loongark/solid");
      await expect(
        data.getByRole("tabpanel").locator("details").first(),
      ).toBeVisible();
      await data.getByLabel("四端组合用法").scrollIntoViewIfNeeded();
      await page.screenshot({
        path: `.artifacts/reference-docs/${info.project.name}-table-${mode}-${width}.png`,
      });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth - innerWidth,
        ),
      ).toBeLessThanOrEqual(1);
      expect(errors).toEqual([]);
    });

test("能力概览在 Storybook 内直接可读", async ({ page }) => {
  test.skip(!!process.env.STATIC_DIR);
  await page.goto(
    "/iframe.html?id=getting-started-capabilities--docs&viewMode=docs",
  );
  await expect(
    page.getByRole("heading", { name: "当前能力与限制", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("用户已决定跳过真实屏幕阅读器", { exact: false }),
  ).toBeVisible();
});
