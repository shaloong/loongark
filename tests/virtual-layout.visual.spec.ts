import { test, expect } from "@playwright/test";
for (const kind of ["grid", "masonry"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      for (const rtl of [false, true])
        test(`virtual layout ${kind} ${mode} ${width} ${rtl ? "rtl" : "default"}`, async ({
          page,
        }) => {
          await page.setViewportSize({ width, height: 1100 });
          await page.goto(
            `/iframe.html?id=components-virtual${kind}--basic&globals=mode:${mode}`,
          );
          await expect(
            page.locator(`[data-scope="virtual-${kind}"]`),
          ).toBeVisible();
          if (rtl) {
            await page
              .locator("summary")
              .filter({ hasText: "More controls" })
              .click();
            await page
              .getByRole("button", { name: "Use RTL", exact: true })
              .click();
          }
          await page.evaluate(async () => {
            await document.fonts.ready;
            await new Promise<void>((resolve) =>
              requestAnimationFrame(() =>
                requestAnimationFrame(() => resolve()),
              ),
            );
          });
          const root = page.locator(`[data-scope="virtual-${kind}"]`);
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
                  const width =
                    (node.clientWidth - 16 * (columns - 1)) / columns;
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
                            Math.min(a.right, b.right) -
                              Math.max(a.left, b.left) <=
                              1 ||
                            Math.min(a.bottom, b.bottom) -
                              Math.max(a.top, b.top) <=
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
                requestAnimationFrame(() =>
                  requestAnimationFrame(() => resolve()),
                ),
              ),
          );
          const name = `virtual-layout-${kind}-${mode}-${width}-${rtl ? "rtl" : "default"}.png`;
          await page.locator("body").screenshot({
            path: `.artifacts/gap-completion/${name}`,
            animations: "disabled",
          });
          await expect(page.locator("body")).toHaveScreenshot(name, {
            animations: "disabled",
          });
        });
