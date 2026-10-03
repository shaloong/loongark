import { auditDirectory } from "./auditDirectory";
import { test, expect } from "@playwright/test";
test("核心控件的最终样式与选中状态", async ({ page }) => {
  await page.goto(
    "/iframe.html?id=components-button--playground&viewMode=story",
  );
  const button = page.locator("[data-scope=button][data-part=root]");
  await expect(button).toBeVisible();
  await expect
    .poll(() => button.evaluate((el) => getComputedStyle(el).backgroundColor))
    .toBe("rgb(18, 18, 18)");
  await page.goto(
    "/iframe.html?id=components-radiogroup--playground&viewMode=story",
  );
  const controls = page.locator(
    "[data-scope=radio-group][data-part=item-control]",
  );
  await expect(controls).toHaveCount(3);
  await expect(controls.first()).toHaveAttribute("data-state", "checked");
  await expect
    .poll(() =>
      controls.first().evaluate((el) => getComputedStyle(el).borderRadius),
    )
    .toBe("50%");
  const style = await controls.first().evaluate((el) => ({
    radius: getComputedStyle(el).borderRadius,
    width: getComputedStyle(el).width,
    dot: getComputedStyle(el, "::after").transform,
  }));
  expect(style.radius).toBe("50%");
  expect(style.width).toBe("16px");
  expect(style.dot).not.toBe("none");
  await page.goto("/iframe.html?id=components-steps--basic&viewMode=story");
  const step = page.locator("[data-scope=steps][data-part=trigger]").first();
  await expect(step).toBeVisible();
  await expect
    .poll(() => step.evaluate((el) => getComputedStyle(el).borderTopWidth))
    .toBe("0px");
});

test("颜色选择器展示色块和单行值并可展开", async ({ page }) => {
  await page.goto(
    "/iframe.html?id=components-colorpicker--basic&viewMode=story",
  );
  const trigger = page.locator("[data-scope=color-picker][data-part=trigger]");
  const swatch = page.locator(
    "[data-scope=color-picker][data-part=value-swatch]",
  );
  await expect(trigger).toBeVisible();
  await expect
    .poll(() => swatch.evaluate((el) => getComputedStyle(el).width))
    .toBe("16px");
  await expect
    .poll(() => trigger.evaluate((el) => getComputedStyle(el).whiteSpace))
    .toBe("nowrap");
  await trigger.click();
  await expect(
    page.locator("[data-scope=color-picker][data-part=content]"),
  ).toBeVisible();
  await expect(
    page.locator("[data-scope=color-picker][data-part=area]"),
  ).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator("[data-scope=color-picker][data-part=area-background]")
        .evaluate((el) => el.getBoundingClientRect().height),
    )
    .toBeGreaterThan(100);
  await page.screenshot({
    path: auditDirectory("2026-10-02") + "/color-picker-open.png",
    animations: "disabled",
  });
});

test("侧栏的展开内容按自然高度显示", async ({ page }) => {
  await page.goto("/iframe.html?id=components-sidebar--basic&viewMode=story");
  const content = page.locator("[data-scope=collapsible][data-part=content]");
  await expect(
    page.getByRole("button", { name: "Toggle sidebar", exact: true }),
  ).toHaveAttribute("aria-expanded", "true");
  await expect
    .poll(() =>
      content.evaluate((el) => {
        const child = el.firstElementChild!;
        return (
          el.getBoundingClientRect().bottom -
          child.getBoundingClientRect().bottom
        );
      }),
    )
    .toBeGreaterThanOrEqual(0);
  await page
    .getByRole("button", { name: "Toggle sidebar", exact: true })
    .click();
  await expect(content).toBeHidden();
});

test("菜单栏支持横向循环焦点及键盘展开", async ({ page }) => {
  await page.goto("/iframe.html?id=components-menubar--basic&viewMode=story");
  const bar = page.getByRole("menubar");
  const file = bar.getByRole("menuitem", { name: "File", exact: true });
  const edit = bar.getByRole("menuitem", { name: "Edit", exact: true });
  await file.focus();
  await page.keyboard.press("ArrowRight");
  await expect(edit).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(file).toBeFocused();
  await page.keyboard.press("End");
  await expect(edit).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByRole("menuitem", { name: "Undo", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(edit).toBeFocused();
});
