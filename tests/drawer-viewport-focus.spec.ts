import { expect, test } from "@playwright/test";
import { openDirection } from "./drawerDirectionChecks";

declare global {
  interface Window {
    drawerViewportObserverTargets(): number;
  }
}

for (const framework of ["react", "vue", "solid", "svelte"])
  test(`Drawer吸附焦点与重复挂载清理 ${framework}`, async ({ page }) => {
    test.skip(!process.env.STATIC_DIR, "四端发布消费专项");
    await page.setViewportSize({ width: 375, height: 812 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript(() => {
      const targets: Set<Element>[] = [];
      const NativeObserver = ResizeObserver;
      window.ResizeObserver = class extends NativeObserver {
        private observed = new Set<Element>();
        constructor(callback: ResizeObserverCallback) {
          super(callback);
          targets.push(this.observed);
        }
        observe(target: Element, options?: ResizeObserverOptions) {
          this.observed.add(target);
          super.observe(target, options);
        }
        unobserve(target: Element) {
          this.observed.delete(target);
          super.unobserve(target);
        }
        disconnect() {
          this.observed.clear();
          super.disconnect();
        }
      };
      window.drawerViewportObserverTargets = () =>
        targets.reduce(
          (count, set) =>
            count +
            [...set].filter((node) => node.hasAttribute("data-drawer-viewport"))
              .length,
          0,
        );
    });
    await page.goto(`/examples-${framework}/?example=DrawerDirectionsExample`);
    for (const direction of ["up", "down", "up"] as const) {
      const { dialog, trigger } = await openDirection(page, direction, "rtl");
      const field = dialog.getByRole("textbox", {
        name: "Project name",
        exact: true,
      });
      const toggle = dialog.getByRole("button", {
        name: "Toggle snap point",
        exact: true,
      });
      await expect(field).toBeFocused();
      await expect
        .poll(() => page.evaluate(() => window.drawerViewportObserverTargets()))
        .toBe(1);
      await toggle.click();
      await expect(dialog.getByLabel("Drawer snap point")).toHaveText("240px");
      await expect(toggle).toBeFocused();
      await expect
        .poll(() =>
          toggle.evaluate((node) => {
            const viewport = node.closest("[data-drawer-viewport]")!;
            const v = viewport.getBoundingClientRect(),
              b = node.getBoundingClientRect();
            return (
              b.top >= Math.max(v.top, 0) - 1 &&
              b.bottom <= Math.min(v.bottom, innerHeight) + 1
            );
          }),
        )
        .toBe(true);
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();
      await expect
        .poll(() => page.evaluate(() => window.drawerViewportObserverTargets()))
        .toBe(0);
    }
  });
