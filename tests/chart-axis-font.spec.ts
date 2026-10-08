import { expect, test } from "@playwright/test";
declare global {
  interface Window {
    p1ChartObservers?: () => number;
  }
}

for (const framework of ["react", "vue", "solid", "svelte", "Story"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`图表实际字体与观察器清理 ${framework} ${mode} ${width}`, async ({
        page,
      }, info) => {
        test.skip(
          framework === "Story"
            ? !!process.env.STATIC_DIR
            : !process.env.STATIC_DIR,
          "对应四端/Story构建",
        );
        await page.setViewportSize({ width, height: 1000 });
        await page.addInitScript(() => {
          const Native = window.ResizeObserver;
          const targets = new Map<ResizeObserver, Set<Element>>();
          window.ResizeObserver = class extends Native {
            observe(target: Element, options?: ResizeObserverOptions) {
              super.observe(target, options);
              if (!targets.has(this)) targets.set(this, new Set());
              targets.get(this)!.add(target);
            }
            unobserve(target: Element) {
              super.unobserve(target);
              targets.get(this)?.delete(target);
            }
            disconnect() {
              super.disconnect();
              targets.delete(this);
            }
          };
          Object.defineProperty(window, "p1ChartObservers", {
            value: () =>
              Array.from(targets.values()).filter((set) =>
                Array.from(set).some(
                  (node) =>
                    node.matches('[data-scope="chart"]') ||
                    node.closest('[data-scope="chart"]'),
                ),
              ).length,
          });
        });
        await page.goto(
          framework === "Story"
            ? `/iframe.html?id=components-chart--zoom-and-brush&globals=mode:${mode}`
            : `/examples-${framework}/?example=ChartInteractionExample&mode=${mode}`,
        );
        const root = page.locator('[data-scope="chart"]').first();
        await expect(root).toBeVisible();
        const labels = root.locator('svg > text[data-part="category-label"]');
        const titles = await root.locator('[data-part="inspect-category"] option').allTextContents();
        expect(titles.length).toBeGreaterThan(1);
        const bounded = () =>
          labels.evaluateAll((nodes) => {
            const bounds = nodes
              .map((node) => node.getBoundingClientRect())
              .filter((box) => box.width > 0);
            const svg = (
              nodes[0] as SVGTextElement
            ).ownerSVGElement!.getBoundingClientRect();
            return bounds.every(
              (box, index) =>
                box.left >= svg.left - 1 &&
                box.right <= svg.right + 1 &&
                (!index || box.left >= bounds[index - 1].right + 1),
            );
          });
        // 先等待字体与挂载测量，避免把 SSR 的估算文字当作恢复后的参照。
        await page.evaluate(async () => {
          await document.fonts.ready;
          await new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          );
        });
        await expect.poll(bounded).toBe(true);
        const initial = await labels.evaluateAll((nodes) =>
          nodes.map((node) => node.firstChild?.textContent),
        );
        const style = await page.addStyleTag({
          content: '[data-scope="chart"] { --lk-typography-fontsize-xs:24px; }',
        });
        await expect.poll(bounded).toBe(true);
        expect(await labels.count()).toBeGreaterThan(1);
        for (const title of await labels.locator("title").allTextContents()) expect(titles).toContain(title);
        await page.screenshot({
          path: `.artifacts/p1-boundaries/axis/${info.project.name}-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
        await style.evaluate(
          (node) =>
            (node.textContent +=
              '[data-scope="chart"] > svg { font-family:monospace; }'),
        );
        await expect.poll(bounded).toBe(true);
        for (const title of await labels.locator("title").allTextContents()) expect(titles).toContain(title);
        await style.evaluate((node) => node.remove());
        await expect
          .poll(() =>
            labels.evaluateAll((nodes) =>
              nodes.map((node) => node.firstChild?.textContent),
            ),
          )
          .toEqual(initial);
        const observerCount = () =>
          page.evaluate(() => window.p1ChartObservers?.() ?? 0);
        const count = await observerCount();
        expect(count).toBeGreaterThan(0);
        for (let i = 0; i < 3; i++) {
          await page
            .getByRole("button", { name: "Hide chart", exact: true })
            .click();
          await expect(root).toHaveCount(0);
          await expect.poll(observerCount).toBe(0);
          await page
            .getByRole("button", { name: "Show chart", exact: true })
            .click();
          await expect(root).toBeVisible();
          await expect.poll(observerCount).toBe(count);
          await expect.poll(bounded).toBe(true);
        }
      });
