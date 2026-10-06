import { auditDirectory } from "./auditDirectory";
import { test, expect } from "@playwright/test";
import { captureWidthFailure } from "./width-diagnostics";
import AxeBuilder from "@axe-core/playwright";
for (const framework of ["react", "vue", "solid", "svelte"])
  test(`${framework} 发布消费、绑定、主题和浮层`, async ({ page }) => {
    test.skip(!process.env.STATIC_DIR, "通过四端消费服务器运行");
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`/${framework}/`);
    const input = page.getByTestId("email"),
      submit = page.getByTestId("submit");
    await expect(submit).toBeDisabled();
    await expect(page.getByTestId("busy-cancel")).toHaveAttribute(
      "aria-busy",
      "true",
    );
    await expect(page.getByTestId("busy-cancel")).toBeEnabled();
    await expect(page.getByTestId("busy-false")).toHaveAttribute(
      "aria-busy",
      "false",
    );
    await expect(page.getByTestId("busy-false")).toBeEnabled();
    await expect(page.getByTestId("busy-loading")).toHaveAttribute(
      "aria-busy",
      "true",
    );
    await expect(page.getByTestId("busy-loading")).toBeDisabled();
    await expect(submit).not.toHaveAttribute("aria-busy");
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByLabel("Email", { exact: true })).toHaveCount(1);
    await input.fill("user@loongark.dev");
    await expect(submit).toBeEnabled();
    if (framework === "svelte") {
      await page
        .getByRole("textbox", { name: "Fresh note", exact: true })
        .fill("Binding from undefined");
      await expect(page.getByLabel("Bound fresh note")).toHaveText(
        "Binding from undefined",
      );
    }
    const before = await submit.evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    await page.getByTestId("mode").click();
    await expect
      .poll(() => submit.evaluate((el) => getComputedStyle(el).backgroundColor))
      .not.toBe(before);
    await page
      .getByRole("button", { name: "Open dialog", exact: true })
      .click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const color = await dialog.evaluate((el) => getComputedStyle(el).color);
    expect(color).not.toBe("rgb(18, 18, 18)");
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(
      page.getByRole("button", { name: "Open dialog", exact: true }),
    ).toBeFocused();
    await page.getByText("Notifications", { exact: true }).click();
    await expect(page.locator("input[name=notifications]")).toBeChecked();
    await page.getByTestId("select").focus();
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("listbox")).toBeVisible();
    await expect(page.getByRole("listbox")).toBeFocused();
    await page.keyboard.press("Home");
    await expect(
      page.getByRole("option", { name: "Free", exact: true }),
    ).toHaveAttribute("data-highlighted", "");
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("select")).toContainText("Free");
    const table = page.locator("[data-scope=data-table]");
    await table.getByRole("button", { name: "Revenue", exact: true }).click();
    await expect(table.locator("tbody tr").first()).toContainText("Beta");
    await table.getByRole("checkbox", { name: "Select b" }).check();
    await expect(table.locator("footer")).toContainText("1 selected");
    await table.getByRole("button", { name: "Next", exact: true }).click();
    await expect(table.locator("tbody")).toContainText("Gamma");
    await table.getByRole("textbox", { name: "Filter rows" }).fill("Alpha");
    await expect(table.locator("tbody tr")).toHaveCount(1);
    await expect(
      page.getByRole("img", { name: "Revenue", exact: true }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Open sheet", exact: true }).click();
    await expect(
      page.getByRole("dialog", { name: "Edit profile" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Save changes" }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("dialog", { name: "Edit profile" }),
    ).not.toBeVisible();
    await page.emulateMedia({ reducedMotion: "reduce" });
    const runtime = await page.evaluate(() => window.checkThemeLifecycle());
    await page.emulateMedia({ reducedMotion: "no-preference" });
    expect(runtime.colors[0]).not.toBe(runtime.colors[1]);
    expect(runtime.colors[1]).toBe(runtime.colors[2]);
    expect(runtime.layers).toEqual(["1201", "2202"]);
    expect(runtime.overridden).toBe("rgb(0, 136, 68)");
    expect(runtime.survivor).toBe(runtime.overridden);
    expect(runtime.clean).toBe(true);
    expect(runtime.constructorClean).toBe(true);
    expect(parseFloat(runtime.motion.auto)).toBe(0.00001);
    expect(parseFloat(runtime.motion.force)).toBe(0.8);
    expect(
      (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
        .violations,
    ).toEqual([]);
    await page.setViewportSize({ width: 375, height: 812 });
    await expect
      .poll(() =>
        page.locator("[data-scope=chart]").evaluate((element) => {
          const svg = element.querySelector("svg")!;
          return Math.abs(
            svg.viewBox.baseVal.width - element.getBoundingClientRect().width,
          );
        }),
      )
      .toBeLessThanOrEqual(1);
    const measuredWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    if (measuredWidth > 375)
      await captureWidthFailure(page, test.info(), measuredWidth);
    expect(measuredWidth).toBeLessThanOrEqual(375);
    expect(errors).toEqual([]);
    await page.screenshot({
      path: `${auditDirectory("2026-10-02")}/after-${framework}-dark.png`,
      fullPage: true,
      animations: "disabled",
    });
  });
