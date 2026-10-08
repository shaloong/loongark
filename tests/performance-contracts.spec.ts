import { expect, test } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

declare global {
  interface Window {
    loongarkObserverHealth: () => { detached: number; targets: number };
    loadEditor?: () => Promise<object>;
  }
}
for (const framework of ["react", "vue", "solid", "svelte"]) {
  test(`生产编辑器延迟加载 ${framework}`, async ({ page }) => {
    test.skip(!process.env.STATIC_DIR);
    const requests: string[] = [];
    page.on("request", (request) => {
      if (request.url().endsWith(".js")) requests.push(request.url());
    });
    await page.goto(`/performance/${framework}-deferred-editor/`);
    const before = requests.length;
    await page.evaluate(async () => {
      if (!window.loadEditor) throw Error("Missing deferred entry");
      await window.loadEditor();
    });
    expect(requests.length).toBeGreaterThan(before);
    const after = requests.length;
    await page.evaluate(async () => {
      await window.loadEditor?.();
    });
    expect(requests.length).toBe(after);
  });
  test(`大数据滚动与重复挂载 ${framework}`, async ({ page }, info) => {
    test.skip(!process.env.STATIC_DIR);
    test.setTimeout(180000);
    await page.addInitScript(() => {
      const Native = window.ResizeObserver;
      const observed = new Map<ResizeObserver, Set<Element>>();
      const owned = new WeakSet<Element>();
      const widget =
        '[data-scope="editor"],[data-scope="virtual-grid"],[data-scope="virtual-masonry"],[data-scope="data-table"],[data-scope="message-scroller"]';
      window.ResizeObserver = class extends Native {
        constructor(callback: ResizeObserverCallback) {
          super((entries, observer) => {
            for (const { target } of entries)
              if (target.closest(widget)) owned.add(target);
            callback(entries, observer);
          });
        }
        observe(target: Element, options?: ResizeObserverOptions) {
          if (target.closest(widget)) owned.add(target);
          if (!observed.has(this)) observed.set(this, new Set());
          observed.get(this)?.add(target);
          super.observe(target, options);
        }
        unobserve(target: Element) {
          observed.get(this)?.delete(target);
          if (!observed.get(this)?.size) observed.delete(this);
          super.unobserve(target);
        }
        disconnect() {
          observed.delete(this);
          super.disconnect();
        }
      };
      window.loongarkObserverHealth = () => {
        const targets = [...observed.values()]
          .flatMap((set) => [...set])
          .filter((target) => owned.has(target) || target.closest(widget));
        return {
          targets: targets.length,
          detached: targets.filter((target) => !target.isConnected).length,
        };
      };
    });
    const measurements = [];
    for (const [example, selector, hide, show] of [
      [
        "VirtualGridExample",
        '[data-scope="virtual-grid"]',
        "Hide layout",
        "Show layout",
      ],
      [
        "VirtualMasonryExample",
        '[data-scope="virtual-masonry"]',
        "Hide layout",
        "Show layout",
      ],
      [
        "VirtualizationExample",
        '[data-scope="data-table"] [data-scope="table"][data-part="root"]',
        "Hide windows",
        "Show windows",
      ],
    ]) {
      await page.goto(`/examples-${framework}/?example=${example}`);
      const root = page.locator(selector);
      await expect(root).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      const result = await root.evaluate(async (node) => {
        const frames: number[] = [];
        let previous = performance.now(),
          maxNodes = 0;
        for (let index = 0; index < 120; index++) {
          await new Promise<void>((done) =>
            requestAnimationFrame(() => done()),
          );
          const current = performance.now();
          frames.push(current - previous);
          previous = current;
          const position = index < 60 ? index / 60 : (120 - index) / 60;
          node.scrollTop = (node.scrollHeight - node.clientHeight) * position;
          node.scrollLeft = (node.scrollWidth - node.clientWidth) * position;
          maxNodes = Math.max(maxNodes, node.querySelectorAll("*").length);
        }
        frames.sort((a, b) => a - b);
        return {
          frames: frames.length,
          medianFrameMs: frames[60],
          p95FrameMs: frames[114],
          maxNodes,
          scrollHeight: node.scrollHeight,
          scrollWidth: node.scrollWidth,
        };
      });
      expect(result.maxNodes).toBeLessThan(2000);
      expect(result.scrollHeight).toBeGreaterThan(10000);
      const details = page
        .locator("details")
        .filter({ has: page.getByText("More controls", { exact: true }) });
      if (await details.count()) await details.locator("summary").click();
      const start = performance.now();
      for (let index = 0; index < 20; index++) {
        await page.getByRole("button", { name: hide, exact: true }).click();
        await expect(root).toHaveCount(0);
        await expect
          .poll(() =>
            page.evaluate(() => window.loongarkObserverHealth().detached),
          )
          .toBe(0);
        await page.getByRole("button", { name: show, exact: true }).click();
        await expect(root).toBeVisible();
      }
      measurements.push({
        example,
        ...result,
        mountCycles: 20,
        mountCyclesMs: performance.now() - start,
        health: await page.evaluate(() => window.loongarkObserverHealth()),
      });
    }
    for (const example of ["CodeEditorExample", "RichTextEditorExample"]) {
      await page.goto(`/examples-${framework}/?example=${example}`);
      const root = page.locator('[data-scope="editor"]');
      await expect(root).toHaveAttribute("data-mounted", "true");
      await page
        .locator("details")
        .filter({ has: page.getByText("More controls", { exact: true }) })
        .locator("summary")
        .click();
      const start = performance.now();
      for (let index = 0; index < 20; index++) {
        await page
          .getByRole("button", { name: "Hide editor", exact: true })
          .click();
        await expect(root).toHaveCount(0);
        await expect
          .poll(() =>
            page.evaluate(() => window.loongarkObserverHealth().detached),
          )
          .toBe(0);
        await page
          .getByRole("button", { name: "Show editor", exact: true })
          .click();
        await expect(root).toHaveAttribute("data-mounted", "true");
      }
      await expect(page.getByLabel("Editor lifecycle")).toContainText(
        "21 mounted",
      );
      await expect(page.getByLabel("Editor lifecycle")).toContainText(
        "20 destroyed",
      );
      measurements.push({
        example,
        mountCycles: 20,
        mountCyclesMs: performance.now() - start,
        lifecycle: await page.getByLabel("Editor lifecycle").innerText(),
        health: await page.evaluate(() => window.loongarkObserverHealth()),
      });
    }
    await mkdir(".artifacts/performance/browser", { recursive: true });
    await writeFile(
      `.artifacts/performance/browser/${info.project.name}-${framework}.json`,
      JSON.stringify(
        {
          project: info.project.name,
          framework,
          scope:
            "真实滚动；RAF 间隔包含探针开销；20次卸载再挂载；Observer检查不等于完整堆泄漏检测。",
          measurements,
        },
        null,
        2,
      ),
    );
  });
}
