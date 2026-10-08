import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
export async function checkTableColumnWindow(page: Page, screenshot?: string) {
  const grid = page.getByRole("grid", { name: "Windowed projects" });
  const region = page.getByRole("region", { name: "Windowed projects" });
  const cell = (row: number, column: number) =>
    grid.locator(
      `td[data-cell-row="row-${row}"][data-cell-column="c${column}"]`,
    );
  const header = (column: number) =>
    grid.locator(`thead th[data-column-key="c${column}"]`);
  const button = (name: string) =>
    page.getByRole("button", { name, exact: true });
  const capture = async (name: string) => {
    if (!screenshot) return;
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: `${screenshot}-${name}.png`,
      fullPage: true,
      animations: "disabled",
    });
  };
  await expect(grid).toBeVisible();
  await expect(grid).toHaveAttribute("aria-colcount", "81");
  await expect(grid).toHaveAttribute("aria-rowcount", "121");
  await expect(header(40)).toHaveCount(0);
  await expect(header(0)).toHaveCount(1);
  await expect(header(79)).toHaveCount(1);
  expect(
    await grid.locator("thead th[data-column-key]").count(),
  ).toBeLessThanOrEqual(16);
  expect(await grid.locator("tbody tr[data-row-id]").count()).toBeLessThan(18);
  expect(await grid.locator("tbody td[data-cell-column]").count()).toBeLessThan(
    300,
  );
  await capture("default");
  await button("Go to column 41").click();
  await expect(header(40)).toHaveCount(1);
  await expect(header(40)).toHaveAttribute("aria-colindex", "42");
  await cell(0, 40).focus();
  for (let index = 0; index < 15; index++)
    await page.keyboard.press("ArrowRight");
  await expect(cell(0, 55)).toBeFocused();
  await expect(header(55)).toHaveCount(1);
  await expect(cell(0, 55)).toHaveAttribute("aria-colindex", "57");
  await cell(0, 55).evaluate((node) => {
    const event = new ClipboardEvent("paste", {
      bubbles: true,
      cancelable: true,
      clipboardData: new DataTransfer(),
    });
    if (!event.clipboardData) throw Error("Clipboard event requires data");
    event.clipboardData.setData("text/plain", "A\tB\tC\nD\tE\tF");
    node.dispatchEvent(event);
  });
  await expect(page.locator("output")).toContainText("apply: 6 changes");
  await expect(cell(0, 55)).toBeFocused();
  await expect(cell(1, 57)).toContainText("F");
  await page.keyboard.press("Control+z");
  await expect(page.locator("output")).toContainText("undo: 6 changes");
  await expect(cell(1, 57)).toContainText("R2 · C58");
  await page.keyboard.press("Control+Shift+z");
  await expect(page.locator("output")).toContainText("redo: 6 changes");
  await expect(cell(1, 57)).toContainText("F");
  await capture("range");
  await cell(0, 55).focus();
  await page.keyboard.press("Enter");
  const input = grid.locator('[data-part="cell-input"]');
  await expect(input).toBeFocused();
  await input.fill("Across windows");
  await region.evaluate((node: HTMLElement) => {
    node.scrollLeft = 0;
  });
  await expect(input).toBeFocused();
  await expect(input).toHaveValue("Across windows");
  await input.press("Enter");
  await expect(page.locator("output")).toContainText("Saved c55 for row-0");
  await expect(cell(0, 55)).toContainText("Across windows");
  await expect(cell(0, 55)).toBeFocused();
  await page.locator("summary").filter({ hasText: "More controls" }).click();
  await button("Reject updates").focus();
  await page.keyboard.press("Enter");
  await expect(cell(0, 55)).toHaveCount(1);
  await expect(button("Accept updates")).toBeFocused();
  await cell(0, 55).focus();
  await page.keyboard.press("Enter");
  await expect(input).toBeFocused();
  await input.fill("Rejected edit");
  await input.press("Enter");
  await expect(page.getByRole("alert")).toContainText(
    "Could not save. Try again.",
  );
  await expect(input).toHaveValue("Rejected edit");
  await button("Accept updates").click();
  await input.fill("Accepted retry");
  await input.press("Enter");
  await expect(cell(0, 55)).toContainText("Accepted retry");
  await expect(cell(0, 55)).toBeFocused();
  await button("Use RTL").click();
  await button("Go to first column").click();
  await cell(0, 0).focus();
  await page.keyboard.press("ArrowLeft");
  await expect(cell(0, 1)).toBeFocused();
  await button("Go to column 41").click();
  await expect(header(40)).toHaveCount(1);
  await expect
    .poll(() => region.evaluate((node) => node.scrollLeft))
    .toBeLessThan(0);
  await capture("rtl");
  await button("Hold new requests").click();
  await cell(0, 40).focus();
  await page.keyboard.press("Enter");
  await expect(input).toBeFocused();
  await input.fill("Canceled edit");
  await input.press("Enter");
  await expect(input).toBeDisabled();
  await button("Hide table").click();
  await expect(grid).toHaveCount(0);
  await button("Show table").click();
  await expect(grid).toBeVisible();
  await expect(header(40)).toHaveCount(1);
  await button("Release held requests").click();
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  await expect(cell(0, 40)).toContainText("R1 · C41");
  await expect(input).toHaveCount(0);
  await button("Render all columns").click();
  await expect(grid.locator("thead th[data-column-key]")).toHaveCount(80);
  await button("Use column windows").click();
  await expect
    .poll(() => grid.locator("thead th[data-column-key]").count())
    .toBeLessThanOrEqual(16);
  await button("Remove column 41").click();
  await expect(grid).toHaveAttribute("aria-colcount", "80");
  await expect(header(40)).toHaveCount(0);
  const resize = grid.locator(
    '[data-part="column-resize"][data-column-key="c41"]',
  );
  await resize.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(resize).toHaveAttribute("aria-valuenow", "170");
  await expect(resize).toBeFocused();
  await expect(page.locator("output")).toContainText("c41=170");
  const move = grid.locator('[data-part="column-move"][data-column-key="c41"]');
  await move.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(header(41)).toHaveAttribute("aria-colindex", "43");
  await expect(move).toBeFocused();
  await expect(page.locator("output")).toContainText("c39,c42,c41,c43");
  await header(41)
    .getByRole("button", { name: "Column 42", exact: true })
    .click();
  await expect(header(41)).toHaveAttribute("aria-sort", "ascending");
  if (page.viewportSize()!.width >= 768) {
    await move.scrollIntoViewIfNeeded();
    await move.evaluate((node: HTMLElement) =>
      node.addEventListener(
        "pointerdown",
        (event) => {
          node.dataset.dragPointer = String((event as PointerEvent).pointerId);
        },
        { once: true },
      ),
    );
    const source = (await move.boundingBox())!;
    const before = await page.locator("output").textContent();
    await page.mouse.move(
      source.x + source.width / 2,
      source.y + source.height / 2,
    );
    await page.mouse.down();
    await region.evaluate((node: HTMLElement) => {
      node.scrollLeft -= 320;
    });
    await expect(header(46)).toHaveCount(1);
    await expect
      .poll(() =>
        move.evaluate((node: HTMLElement) =>
          node.hasPointerCapture(Number(node.dataset.dragPointer)),
        ),
      )
      .toBe(true);
    const target = (await header(46).boundingBox())!;
    const bounds = (await region.boundingBox())!;
    const left = Math.max(target.x, bounds.x),
      right = Math.min(target.x + target.width, bounds.x + bounds.width);
    expect(right).toBeGreaterThan(left);
    await page.mouse.move((left + right) / 2, source.y + source.height / 2, {
      steps: 5,
    });
    await expect(header(46)).toHaveAttribute("data-column-drop", "true");
    expect(await page.locator("output").textContent()).toBe(before);
    await page.mouse.up();
    await expect(header(41)).toHaveAttribute("aria-colindex", "47");
    await expect(move).toBeFocused();
  }

  await expect(grid).toHaveAttribute("aria-colcount", "80");

  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  const axe = await new AxeBuilder({ page })
    .include('[data-scope="data-table"]')
    .analyze();
  expect(axe.violations).toEqual([]);
}
