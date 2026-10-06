import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
export async function checkVirtualLayout(
  page: Page,
  kind: "grid" | "masonry",
  screenshot: string,
) {
  const root = page.getByRole(kind === "grid" ? "grid" : "list", {
    name: kind === "grid" ? "Windowed cells" : "Windowed collection",
  });
  const button = (name: string) =>
    page.getByRole("button", { name, exact: true });
  const capture = async (name: string) => {
    await page.evaluate(() => document.fonts.ready);
    if (kind === "masonry") {
      await expect
        .poll(() =>
          root.evaluate((node) => {
            const bounds = node.getBoundingClientRect();
            const items = Array.from(
              node.querySelectorAll<HTMLElement>(
                ':scope > [data-part="canvas"] > [data-part="item"]',
              ),
            ).map((item) => item.getBoundingClientRect());
            const columns = Math.max(
              1,
              Math.floor((node.clientWidth + 16) / 236),
            );
            const width = (node.clientWidth - 16 * (columns - 1)) / columns;
            return (
              items.length > 0 &&
              items.every(
                (item) =>
                  Math.abs(item.width - width) < 1 &&
                  item.left >= bounds.left - 1 &&
                  item.right <= bounds.right + 1,
              ) &&
              items.every((a, index) =>
                items
                  .slice(index + 1)
                  .every(
                    (b) =>
                      Math.min(a.right, b.right) - Math.max(a.left, b.left) <=
                        1 ||
                      Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) <=
                        1,
                  ),
              )
            );
          }),
        )
        .toBe(true);
    }
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
    await page.screenshot({
      path: `${screenshot}-${name}.png`,
      fullPage: true,
      animations: "disabled",
    });
  };
  await expect(root).toBeVisible();
  if (kind === "grid") {
    const cell = (row: string, column: number) =>
      root.locator(
        `[data-part="cell"][data-row-key="${row}"][data-column-key="column-${column}"]`,
      );
    await expect(root).toHaveAttribute("aria-rowcount", "10000");
    await expect(root).toHaveAttribute("aria-colcount", "80");
    expect(await root.getByRole("gridcell").count()).toBeLessThan(180);
    await expect(cell("row-0", 0)).toHaveAttribute("aria-colindex", "1");
    await capture("default");
    await page.locator("summary").filter({ hasText: "More controls" }).click();
    await cell("row-0", 0).focus();
    await page.keyboard.press("ArrowRight");
    await expect(cell("row-0", 1)).toBeFocused();
    const input = page.getByRole("textbox", {
      name: "Note for row-0",
      exact: true,
    });
    await input.focus();
    await input.fill("Draft stays");
    await input.press("Home");
    await input.press("ArrowRight");
    await expect(input).toBeFocused();
    expect(
      await input.evaluate((node: HTMLInputElement) => node.selectionStart),
    ).toBe(1);
    await button("Go to item 5001").click();
    await expect(cell("row-5000", 0)).toHaveCount(1);
    await cell("row-5000", 0).focus();
    await page.keyboard.press("Control+End");
    await expect(cell("row-9999", 79)).toBeFocused();
    await expect(cell("row-9999", 79)).toHaveAttribute("aria-colindex", "80");
    await expect(cell("row-9999", 79).locator("..")).toHaveAttribute(
      "aria-rowindex",
      "10000",
    );
    expect(await root.getByRole("gridcell").count()).toBeLessThan(180);
    await expect
      .poll(() => root.evaluate((node) => node.scrollLeft))
      .toBeGreaterThan(1000);
    await expect
      .poll(() => root.evaluate((node) => node.scrollTop))
      .toBeGreaterThan(500000);
    await capture("remote");
    await button("Use RTL").click();
    await expect
      .poll(() => root.evaluate((node) => node.scrollLeft))
      .toBeLessThan(-1000);
    await expect
      .poll(async () => {
        const target = await cell("row-9999", 79).boundingBox();
        const viewport = await root.boundingBox();
        return (
          !!target &&
          !!viewport &&
          target.x >= viewport.x &&
          target.x + target.width <= viewport.x + viewport.width
        );
      })
      .toBe(true);
    await button("Use LTR").click();
    await expect
      .poll(() => root.evaluate((node) => node.scrollLeft))
      .toBeGreaterThan(1000);
    await button("Remove last item").focus();
    await button("Remove last item").press("Enter");
    await expect(root).toHaveAttribute("aria-rowcount", "9999");
    await expect(button("Remove last item")).toBeFocused();
    const cursor = root.locator('[data-part="cell"][tabindex="0"]');
    await expect(cursor).toHaveCount(1);
    await cursor.focus();
    const rowBefore = await cursor.getAttribute("data-row-key");
    await page.keyboard.press("ArrowUp");
    await expect
      .poll(() =>
        root.locator('[data-part="cell"]:focus').getAttribute("data-row-key"),
      )
      .toBe("row-" + (Number(rowBefore!.slice(4)) - 1));
    await page.keyboard.press("Control+Home");
    await expect(cell("row-0", 0)).toBeFocused();
    await expect(input).toHaveValue("Draft stays");
    await page.keyboard.press("Meta+End");
    await expect(cell("row-9998", 79)).toBeFocused();
    await page.keyboard.press("Meta+Home");
    await expect(cell("row-0", 0)).toBeFocused();
    await button("Use RTL").click();
    await cell("row-0", 0).focus();
    await page.keyboard.press("ArrowLeft");
    await expect(cell("row-0", 1)).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(cell("row-1", 1)).toBeFocused();
    await page.keyboard.press("PageDown");
    await expect
      .poll(() =>
        root.locator('[data-part="cell"]:focus').getAttribute("data-row-key"),
      )
      .not.toBe("row-1");
    await page.keyboard.press("Control+Home");
    await capture("rtl");
    await button("Use narrow width").click();
    await expect
      .poll(() => root.evaluate((node) => node.clientWidth))
      .toBeLessThanOrEqual(320);
    await button("Prepend item").click();
    await expect(root).toHaveAttribute("aria-rowcount", "10000");
    await expect(cell("row-0", 0).locator("..")).toHaveAttribute(
      "aria-rowindex",
      "2",
    );
    await button("Remove first item").click();
    await expect(root).toHaveAttribute("aria-rowcount", "9999");
  } else {
    const item = (key: string) =>
      root.locator(`[data-part="item"][data-virtual-key="${key}"]`);
    await expect(item("item-0")).toHaveAttribute("aria-setsize", "10000");
    expect(await root.getByRole("listitem").count()).toBeLessThan(40);
    await capture("default");
    const expand = button("Expand item-0");
    const before = (await item("item-0").boundingBox())!.height;
    await expand.focus();
    await expand.press("Space");
    await expect(button("Collapse item-0")).toBeFocused();
    await expect
      .poll(async () => (await item("item-0").boundingBox())!.height)
      .toBeGreaterThan(before + 40);
    await root.evaluate((node) => {
      node.scrollTop = 5000;
    });
    await expect
      .poll(() => root.evaluate((node) => node.scrollTop))
      .toBeGreaterThan(4000);
    await expect(item("item-0")).toHaveCount(1);
    await expect(button("Collapse item-0")).toBeFocused();
    await button("Go to item 5001").click();
    await expect(item("item-5000")).toBeInViewport();
    expect(await root.getByRole("listitem").count()).toBeLessThan(40);
    await capture("remote");
    await page.locator("summary").filter({ hasText: "More controls" }).click();
    await button("Use narrow width").click();
    await expect
      .poll(() => root.evaluate((node) => node.clientWidth))
      .toBeLessThanOrEqual(320);
    await expect
      .poll(() =>
        root.evaluate((node) => {
          const items = Array.from(
            node.querySelectorAll<HTMLElement>('[data-part="item"]'),
          );
          return items.every(
            (item) =>
              Math.abs(parseFloat(item.style.width) - node.clientWidth) < 1,
          );
        }),
      )
      .toBe(true);
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
    const anchor = await root.evaluate((node) => {
      const top = node.getBoundingClientRect().top;
      return Array.from(
        node.querySelectorAll<HTMLElement>('[data-part="item"]'),
      )
        .filter((item) => item.getBoundingClientRect().bottom > top + 1)
        .sort(
          (a, b) =>
            a.getBoundingClientRect().top - b.getBoundingClientRect().top,
        )[0]?.dataset.virtualKey;
    });
    expect(anchor).toBeTruthy();
    const position = await item(anchor!).getAttribute("aria-posinset");
    await button("Prepend item").click();
    await expect(item(anchor!)).toHaveCount(1);
    await expect(item(anchor!)).toHaveAttribute(
      "aria-posinset",
      String(Number(position) + 1),
    );
    await button("Remove first item").click();
    await expect(item(anchor!)).toHaveAttribute("aria-posinset", position!);
    await button("Go to first item").click();
    await expect(item("item-0")).toHaveCount(1);
    await button("Use RTL").click();
    await capture("rtl");
    const order = await root
      .getByRole("listitem")
      .evaluateAll((nodes) =>
        nodes.map((node) => Number(node.getAttribute("aria-posinset"))),
      );
    expect(order).toEqual([...order].sort((a, b) => a - b));
  }
  await button("Clear data").click();
  await expect(root).toBeVisible();
  await expect(
    root.getByRole(kind === "grid" ? "row" : "listitem"),
  ).toHaveCount(0);
  if (kind === "grid") await expect(root).toHaveAttribute("aria-rowcount", "0");
  await button("Restore data").click();
  await expect
    .poll(() => root.getByRole(kind === "grid" ? "row" : "listitem").count())
    .toBeGreaterThan(0);
  await button("Hide layout").click();
  await expect(root).toHaveCount(0);
  await button("Show layout").click();
  await expect(root).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  expect(
    (
      await new AxeBuilder({ page })
        .include(`[data-scope="virtual-${kind}"]`)
        .analyze()
    ).violations,
  ).toEqual([]);
}
