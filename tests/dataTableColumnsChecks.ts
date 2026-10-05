import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

export async function checkDataTableColumns(page: Page) {
  const root = page.locator('[data-scope="data-table"][data-part="root"]');
  const order = () =>
    root
      .locator("thead th[data-column-key]")
      .evaluateAll((nodes) =>
        nodes.map((node) => (node as HTMLElement).dataset.columnKey),
      );
  const move = (key: string) =>
    root.locator(`[data-part="column-move"][data-column-key="${key}"]`);
  const resize = (key: string) =>
    root.locator(`[data-part="column-resize"][data-column-key="${key}"]`);
  const button = (name: string) =>
    page.getByRole("button", { name, exact: true });
  const count = () =>
    page
      .getByLabel("Column updates")
      .innerText()
      .then((text) => Number(/(\d+) callbacks/.exec(text)![1]));
  const reset = async () => {
    await button("Reset columns").click();
    await expect.poll(order).toEqual(["name", "owner", "status", "revenue"]);
  };
  const dragBeyondViewport = async (rtl: boolean) => {
    await move("name").scrollIntoViewIfNeeded();
    const source = (await move("name").boundingBox())!,
      region = root.locator('[data-scope="table"][data-part="root"]');
    const bounds = (await region.boundingBox())!,
      before = await count();
    await page.mouse.move(
      source.x + source.width / 2,
      source.y + source.height / 2,
    );
    await page.mouse.down();
    await page.mouse.move(
      rtl ? bounds.x + 3 : bounds.x + bounds.width - 3,
      source.y + source.height / 2,
      { steps: 6 },
    );
    await expect(root.locator('th[data-column-drop="true"]')).toHaveAttribute(
      "data-column-key",
      "revenue",
    );
    expect(await count()).toBe(before);
    await page.mouse.up();
    await expect.poll(order).toEqual(["owner", "status", "revenue", "name"]);
    await expect.poll(count).toBe(before + 1);
    await expect(move("name")).toBeFocused();
  };
  await expect.poll(order).toEqual(["name", "owner", "status", "revenue"]);
  await move("name").press("Space");
  await expect(move("name")).toHaveAttribute("aria-pressed", "true");
  await move("name").press("ArrowRight");
  await expect.poll(order).toEqual(["owner", "name", "status", "revenue"]);
  await expect(move("name")).toBeFocused();
  await move("name").press("Escape");
  await expect.poll(order).toEqual(["name", "owner", "status", "revenue"]);
  await expect(move("name")).toHaveAttribute("aria-pressed", "false");
  await move("name").press("Enter");
  await move("name").press("End");
  await move("name").press("Enter");
  await expect.poll(order).toEqual(["owner", "status", "revenue", "name"]);
  await expect(move("name")).toHaveAttribute("aria-pressed", "false");
  await reset();
  await resize("name").press("ArrowRight");
  await expect(resize("name")).toHaveAttribute("aria-valuenow", "250");
  await expect(resize("name")).toBeFocused();
  await resize("name").press("Shift+ArrowRight");
  await expect(resize("name")).toHaveAttribute("aria-valuenow", "300");
  await resize("name").press("Home");
  await expect(resize("name")).toHaveAttribute("aria-valuenow", "120");
  await resize("name").press("End");
  await expect(resize("name")).toHaveAttribute("aria-valuenow", "480");
  await resize("name").dblclick();
  await expect(resize("name")).toHaveAttribute("aria-valuenow", "160");
  await reset();
  // Real browser pointer input: preview does not notify; release commits once.
  await resize("name").scrollIntoViewIfNeeded();
  let box = (await resize("name").boundingBox())!;
  const before = await count();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 40, box.y + box.height / 2, {
    steps: 5,
  });
  await expect(resize("name")).toHaveAttribute("aria-valuenow", "280");
  expect(await count()).toBe(before);
  await page.mouse.up();
  await expect.poll(count).toBe(before + 1);
  await expect(resize("name")).toHaveAttribute("aria-valuenow", "280");
  box = (await resize("name").boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 30, box.y + box.height / 2);
  await page.keyboard.press("Escape");
  await page.mouse.up();
  await expect(resize("name")).toHaveAttribute("aria-valuenow", "280");
  expect(await count()).toBe(before + 1);
  await reset();
  // Both handles must fit in the real narrow viewport before a drag.
  await move("name").scrollIntoViewIfNeeded();
  const source = (await move("name").boundingBox())!;
  const target = (await root
    .locator('th[data-column-key="owner"]')
    .boundingBox())!;
  await page.mouse.move(
    source.x + source.width / 2,
    source.y + source.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    Math.min(target.x + target.width / 2, page.viewportSize()!.width - 12),
    source.y + source.height / 2,
    { steps: 8 },
  );
  expect(await count()).toBe(0);
  await page.mouse.up();
  await expect.poll(order).toEqual(["owner", "name", "status", "revenue"]);
  await expect.poll(count).toBe(1);
  if (page.viewportSize()!.width < 768) {
    await reset();
    await dragBeyondViewport(false);
    await reset();
    await move("name").press("ArrowRight");
    await expect.poll(order).toEqual(["owner", "name", "status", "revenue"]);
  }
  await button("Reject column updates").click();
  await move("name").press("ArrowRight");
  await expect.poll(order).toEqual(["owner", "name", "status", "revenue"]);
  await resize("name").press("ArrowRight");
  await expect(resize("name")).toHaveAttribute("aria-valuenow", "240");
  await button("Accept column updates").click();
  await reset();
  await button("Freeze outer columns").click();
  await move("name").press("End");
  await expect.poll(order).toEqual(["name", "owner", "status", "revenue"]);
  await move("owner").press("End");
  await expect.poll(order).toEqual(["name", "status", "owner", "revenue"]);
  await reset();
  await button("Use RTL").click();
  await move("name").press("ArrowLeft");
  await expect.poll(order).toEqual(["owner", "name", "status", "revenue"]);
  await resize("name").press("ArrowLeft");
  await expect(resize("name")).toHaveAttribute("aria-valuenow", "250");
  if (page.viewportSize()!.width < 768) await dragBeyondViewport(true);
  await button("Start loading").click();
  await expect(move("name")).toBeDisabled();
  await expect(resize("name")).toHaveAttribute("aria-disabled", "true");
  await expect(resize("name")).toHaveAttribute("tabindex", "-1");
  await button("Finish loading").click();
  await reset();
  await button("Hide revenue").click();
  await expect.poll(order).toEqual(["name", "owner", "status"]);
  await button("Show revenue").click();
  await reset();
  await button("Use uncontrolled columns").click();
  await move("name").press("End");
  await button("Add notes column").click();
  await expect
    .poll(order)
    .toEqual(["owner", "status", "revenue", "name", "notes"]);
  await resize("notes").press("ArrowRight");
  await expect(resize("notes")).toHaveAttribute("aria-valuenow", "170");
  await button("Remove notes column").click();
  await button("Add notes column").click();
  await expect(resize("notes")).toHaveAttribute("aria-valuenow", "160");
  await button("Hide table").click();
  await expect(root).toHaveCount(0);
  await button("Show table").click();
  await expect
    .poll(order)
    .toEqual(["name", "owner", "status", "revenue", "notes"]);
  await reset();
  await resize("name").press("ArrowRight");
  await move("owner").press("ArrowRight");
  await expect(move("owner")).toBeFocused();
  await expect
    .poll(() =>
      move("owner").evaluate((node) => {
        const region = node.closest('[data-scope="table"][data-part="root"]')!,
          bounds = region.getBoundingClientRect(),
          rect = node.getBoundingClientRect();
        return rect.left >= bounds.left - 1 && rect.right <= bounds.right + 1;
      }),
    )
    .toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    ),
  ).toBe(false);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
}
