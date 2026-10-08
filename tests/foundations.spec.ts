import { auditDirectory } from "./auditDirectory";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
for (const mode of ["light", "dark"] as const)
  test(`新增基础组件 ${mode} 交互、语义与响应式`, async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 900 });
    await page.goto(
      "/iframe.html?id=examples-foundations--overview&viewMode=story&globals=mode:" +
        mode,
    );
    const textarea = page.getByRole("textbox", { name: "Notes", exact: true });
    await expect(textarea).toBeVisible();
    await expect
      .poll(() => textarea.evaluate((el) => getComputedStyle(el).paddingLeft))
      .toBe("12px");
    await expect
      .poll(() => textarea.evaluate((el) => el.getBoundingClientRect().height))
      .toBeGreaterThanOrEqual(108);
    const grid = page.locator("[data-scope=grid]");
    await expect
      .poll(() =>
        grid.evaluate(
          (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
        ),
      )
      .toBe(2);
    const root = auditDirectory("2026-10-03/component-expansion");
    await mkdir(root, { recursive: true });
    await page.screenshot({
      path: root + "/foundations-" + mode + ".png",
      fullPage: true,
      animations: "disabled",
    });
    await page.setViewportSize({ width: 375, height: 812 });
    await expect
      .poll(() =>
        grid.evaluate(
          (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
        ),
      )
      .toBe(1);
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
      .toBeLessThanOrEqual(376);
    await page.screenshot({
      path: root + "/foundations-" + mode + "-mobile.png",
      fullPage: true,
      animations: "disabled",
    });
    await textarea.fill("hello\nworld");
    await expect(page.getByTestId("notes-count")).toHaveText("11 characters");
    expect(
      await page
        .locator("form")
        .evaluate((el) => new FormData(el as HTMLFormElement).get("notes")),
    ).toBe("hello\nworld");
    await page
      .getByRole("button", { name: "Remove Design", exact: true })
      .press("Enter");
    await expect(
      page.getByRole("button", { name: "Restore Design", exact: true }),
    ).toBeVisible();
    await expect(page.getByTestId("submitted")).toHaveText("0");
    await page.getByRole("button", { name: "Members", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "Members", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await page
      .getByRole("link", { name: "Settings", exact: true })
      .press("Enter");
    await expect(
      page.getByRole("link", { name: "Settings", exact: true }),
    ).toHaveAttribute("aria-current", "page");
    await expect(
      page.getByRole("link", { name: "Home", exact: true }),
    ).not.toHaveAttribute("aria-current", "page");
    expect(
      (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
        .violations,
    ).toEqual([]);
    await page.goto(
      "/iframe.html?id=components-textarea--states&viewMode=story&globals=mode:" +
        mode,
    );
    await expect(
      page.getByRole("textbox", { name: "只读备注" }),
    ).toHaveAttribute("readonly", "");
    await expect(
      page.getByRole("textbox", { name: "禁用备注" }),
    ).toBeDisabled();
    await expect(
      page.getByRole("textbox", { name: "必填备注" }),
    ).toHaveAttribute("aria-invalid", "true");
  });
