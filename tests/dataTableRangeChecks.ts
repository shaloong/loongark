import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
export async function checkDataTableRange(page: Page) {
  const grid = page.getByRole("grid", { name: "Editable project range" });
  const cell = (row: number, column: string) =>
    grid.locator(
      `td[data-cell-row="project-${row}"][data-cell-column="${column}"]`,
    );
  const selected = () => grid.locator('td[data-cell-selected="true"]');
  const result = page.getByLabel("Batch result"),
    status = page.locator('[data-part="range-status"]');
  const paste = async (text: string) => {
    await cell(1, "name").evaluate((node, text) => {
      const data = new DataTransfer();
      data.setData("text/plain", text);
      node.dispatchEvent(
        new ClipboardEvent("paste", {
          bubbles: true,
          cancelable: true,
          clipboardData: data,
        }),
      );
    }, text);
  };
  await expect(grid).toBeVisible();
  await expect(grid.locator('td[tabindex="0"]')).toHaveCount(1);
  const textWidth = await cell(1, "name")
    .locator('[data-part="cell-range-text"]')
    .evaluate((node) => node.getBoundingClientRect().width);
  expect(textWidth).toBeGreaterThanOrEqual(80);
  expect((await cell(1, "name").boundingBox())!.height).toBeLessThanOrEqual(96);
  await cell(1, "name").locator('[data-part="cell-range-text"]').click();
  await expect(cell(1, "name")).toBeFocused();
  await page.keyboard.press("Shift+ArrowRight");
  await page.keyboard.press("Shift+ArrowDown");
  await expect(selected()).toHaveCount(4);
  await expect(status).toContainText("4");
  // 同一真实复制事件验证默认值而非展示格式；不会访问系统剪贴板。
  const copied = await cell(2, "amount").evaluate((node) => {
    const data = new DataTransfer();
    node.dispatchEvent(
      new ClipboardEvent("copy", {
        bubbles: true,
        cancelable: true,
        clipboardData: data,
      }),
    );
    return data.getData("text/plain");
  });
  expect(copied).toBe("Alpha release\t100\nBeta launch\t150");
  await paste("Alpha pasted\t210\nBeta pasted\t320");
  await expect(result).toContainText("apply: 4 cells");
  await expect(cell(1, "amount")).toContainText("210");
  await expect(cell(2, "name")).toContainText("Beta pasted");
  await expect(cell(2, "amount")).toBeFocused();
  await page.keyboard.press("Control+z");
  await expect(result).toContainText("undo: 4 cells");
  await expect(cell(1, "name")).toContainText("Alpha release");
  await page.keyboard.press("Control+Shift+z");
  await expect(result).toContainText("redo: 4 cells");
  await expect(cell(1, "name")).toContainText("Alpha pasted");
  const before = await result.textContent();
  await paste("Will not apply\t400\nAlso invalid\t-1");
  await expect(page.getByRole("alert")).toContainText(
    "Budget cannot be negative",
  );
  await expect(result).toHaveText(before!);
  await expect(cell(1, "name")).toContainText("Alpha pasted");
  await paste("wrong\tsize\tblock");
  await expect(status).toContainText("fit");
  await expect(result).toHaveText(before!);
  await cell(1, "id").click({ position: { x: 18, y: 18 } });
  await paste("new-id");
  await expect(page.getByRole("alert")).toContainText("read-only");
  await expect(cell(1, "id")).toHaveText("project-1");
  await cell(1, "name").locator('[data-part="cell-range-text"]').click();
  await page.keyboard.press("Enter");
  const input = page.locator('[data-part="cell-input"]');
  await expect(input).toBeFocused();
  await input.fill("Saved single");
  await input.press("Enter");
  await expect(cell(1, "name")).toContainText("Saved single");
  await expect(cell(1, "name")).toBeFocused();
  await page.getByText("More test controls", { exact: true }).click();
  await page
    .getByRole("button", { name: "Reject next batch", exact: true })
    .click();
  await cell(1, "name").locator('[data-part="cell-range-text"]').click();
  await expect(cell(1, "name")).toBeFocused();
  await paste("Rejected name");
  await expect(page.getByRole("alert")).toContainText("batch was rejected");
  await expect(cell(1, "name")).toContainText("Saved single");
  await paste("Canceled name");
  await expect(page.locator('[data-part="range-cancel"]')).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(result).toContainText("1 canceled");
  await expect(cell(1, "name")).toContainText("Saved single");
  await paste("Button canceled");
  await page.locator('[data-part="range-cancel"]').click();
  await expect(result).toContainText("2 canceled");
  await expect(cell(1, "name")).toBeFocused();
  await paste("Outside focus");
  const outside = page.getByRole("button", { name: "Use RTL", exact: true });
  await outside.focus();
  await expect(result).toContainText("apply: 1 cells");
  await expect(outside).toBeFocused();
  await outside.click();
  await cell(1, "name").locator('[data-part="cell-range-text"]').click();
  await page.keyboard.press("ArrowLeft");
  await expect(cell(1, "amount")).toBeFocused();
  await page
    .getByRole("button", { name: "Use controlled selection", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Clear selection", exact: true })
    .click();
  await expect(selected()).toHaveCount(0);
  await cell(2, "name").locator('[data-part="cell-range-text"]').click();
  await expect(selected()).toHaveCount(1);
  await page
    .getByRole("button", { name: "Reject selection", exact: true })
    .click();
  await cell(3, "name").locator('[data-part="cell-range-text"]').click();
  await expect(cell(2, "name")).toHaveAttribute("aria-selected", "true");
  await expect(cell(3, "name")).toHaveAttribute("aria-selected", "false");
  await page
    .getByRole("button", { name: "Accept selection", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Use internal selection", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Enable virtualization", exact: true })
    .click();
  await cell(1, "name").locator('[data-part="cell-range-text"]').click();
  await page.keyboard.press("Control+End");
  await expect(cell(50, "id")).toBeFocused();
  await page.keyboard.press("Control+Home");
  await expect(cell(1, "name")).toBeFocused();
  await paste("Never saved");
  await expect(page.locator('[data-part="range-cancel"]')).toBeVisible();
  // 卸载时机与网络延迟解耦；真正的鼠标取消由上面的可见按钮回归覆盖。
  await page
    .getByRole("button", { name: "Hide table", exact: true })
    .evaluate((node: HTMLButtonElement) => node.click());
  await expect(grid).toHaveCount(0);
  await expect(result).toContainText("3 canceled");
  await page.getByRole("button", { name: "Show table", exact: true }).click();
  await expect(cell(1, "name")).toContainText("Outside focus");
  await page
    .getByRole("button", { name: "Disable virtualization", exact: true })
    .click();
  await page.getByRole("button", { name: "Reset data", exact: true }).click();
  await page.getByRole("button", { name: "Use LTR", exact: true }).click();
  await page.getByText("More test controls", { exact: true }).click();
  // Chromium 的真实系统剪贴板；其他引擎保留上面的合成格式/拒绝回归。
  if (page.context().browser()?.browserType().name() === "chromium") {
    await page
      .context()
      .grantPermissions(["clipboard-read", "clipboard-write"]);
    await cell(1, "name").locator('[data-part="cell-range-text"]').click();
    await page.keyboard.press("Shift+ArrowRight");
    await page.keyboard.press("Shift+ArrowDown");
    await page.keyboard.press("Control+c");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      "Alpha release\t100\nBeta launch\t150",
    );
    await cell(3, "name").locator('[data-part="cell-range-text"]').click();
    await page.keyboard.press("Control+v");
    await expect(cell(3, "name")).toContainText("Alpha release");
    await expect(cell(4, "amount")).toContainText("150");
    await page.keyboard.press("Control+z");
    await expect(cell(3, "name")).toContainText("Gamma workspace");
    await expect(cell(4, "amount")).toContainText("250");
  }
  // 鼠标真实拖动的反向矩形，避开交互图标和视口边缘。
  await cell(2, "name").scrollIntoViewIfNeeded();
  const from = await cell(2, "name").boundingBox(),
    to = await cell(1, "name").boundingBox();
  expect(from).toBeTruthy();
  expect(to).toBeTruthy();
  await page.mouse.move(from!.x + 20, from!.y + 20);
  await page.mouse.down();
  await page.mouse.move(to!.x + 20, to!.y + 20, { steps: 5 });
  await page.mouse.up();
  await expect(selected()).toHaveCount(2);
  await expect(cell(1, "name")).toBeFocused();
  const accessibility = await new AxeBuilder({ page })
    .include('[data-scope="data-table"]')
    .analyze();
  expect(accessibility.violations).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
}
