import { expect, type Page, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
export type DrawerDirection = "up" | "down" | "start" | "end";
export type DrawerDir = "ltr" | "rtl";
export function drawerPhysical(direction: DrawerDirection, dir: DrawerDir) {
  return direction === "start"
    ? dir === "rtl"
      ? "right"
      : "left"
    : direction === "end"
      ? dir === "rtl"
        ? "left"
        : "right"
      : direction;
}
export async function dragDrawer(
  page: Page,
  handle: Locator,
  physical: string,
  distance: number,
  touch = false,
  cancel = false,
) {
  const box = await handle.boundingBox();
  expect(box).not.toBeNull();
  const start = { x: box!.x + box!.width / 2, y: box!.y + box!.height / 2 };
  const delta = {
    x: physical === "right" ? distance : physical === "left" ? -distance : 0,
    y: physical === "down" ? distance : physical === "up" ? -distance : 0,
  };
  const viewport = page.viewportSize()!;
  const finish = {
    x: Math.max(1, Math.min(viewport.width - 1, start.x + delta.x)),
    y: Math.max(1, Math.min(viewport.height - 1, start.y + delta.y)),
  };
  delta.x = finish.x - start.x;
  delta.y = finish.y - start.y;
  const session = touch ? await page.context().newCDPSession(page) : undefined;
  if (session) {
    await session.send("Emulation.setTouchEmulationEnabled", { enabled: true });
    await session.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ ...start, id: 1 }],
    });
  } else {
    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
  }
  // Slow movement and a stationary release test positional snapping rather than a fling.
  for (let step = 1; step <= 12; step++) {
    const point = {
      x: start.x + (delta.x * step) / 12,
      y: start.y + (delta.y * step) / 12,
    };
    if (session)
      await session.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ ...point, id: 1 }],
      });
    else await page.mouse.move(point.x, point.y);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(180);
  if (session) {
    await session.send("Input.dispatchTouchEvent", {
      type: cancel ? "touchCancel" : "touchEnd",
      touchPoints: [],
    });
    await session.detach();
  } else await page.mouse.up();
}
export async function expectDrawerExtent(
  page: Page,
  dialog: Locator,
  direction: DrawerDirection,
  pixels: number,
) {
  const vertical = direction === "up" || direction === "down";
  await expect
    .poll(
      async () => {
        const box = await dialog.boundingBox();
        if (!box) return Infinity;
        const viewport = page.viewportSize()!;
        const extent = vertical
          ? Math.min(box.y + box.height, viewport.height) - Math.max(box.y, 0)
          : Math.min(box.x + box.width, viewport.width) - Math.max(box.x, 0);
        return Math.abs(extent - pixels);
      },
      { message: "Drawer visible extent matches the selected snap point" },
    )
    .toBeLessThanOrEqual(1);
}
export async function openDirection(
  page: Page,
  direction: DrawerDirection,
  dir: DrawerDir,
) {
  const trigger = page.getByRole("button", {
    name: `Open ${direction} ${dir}`,
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", {
    name: `${direction} ${dir} drawer`,
    exact: true,
  });
  await expect(dialog).toBeVisible();
  const physical = drawerPhysical(direction, dir);
  await expect(dialog).toHaveAttribute("dir", dir);
  expect(
    await dialog.evaluate((node) => getComputedStyle(node).direction),
  ).toBe(dir);
  await expect(dialog).toHaveAttribute("data-swipe-direction", physical);
  await expect
    .poll(
      async () => {
        const box = await dialog.boundingBox();
        if (!box) return Infinity;
        const viewport = page.viewportSize()!;
        return Math.abs(
          physical === "up"
            ? box.y
            : physical === "down"
              ? box.y + box.height - viewport.height
              : physical === "left"
                ? box.x
                : box.x + box.width - viewport.width,
        );
      },
      { message: "Expanded drawer must meet its physical edge" },
    )
    .toBeLessThanOrEqual(1);
  return { dialog, trigger, physical };
}
export async function checkDrawerDirection(
  page: Page,
  direction: DrawerDirection,
  dir: DrawerDir,
  screenshot: string,
  touch = false,
) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const vertical = direction === "up" || direction === "down";
  const large = vertical ? "480px" : "320px",
    small = vertical ? "240px" : "256px";
  const { dialog, trigger, physical } = await openDirection(
    page,
    direction,
    dir,
  );
  const point = dialog.getByLabel("Drawer snap point", { exact: true });
  await expect(point).toHaveText(large);
  await expectDrawerExtent(page, dialog, direction, parseInt(large));
  const text = dialog.getByRole("textbox", {
    name: "Project name",
    exact: true,
  });
  const close = dialog.getByRole("button", {
    name: "Close drawer",
    exact: true,
  });
  await close.focus();
  await page.keyboard.press("Tab");
  await expect(text).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(close).toBeFocused();
  await text.focus();
  await text.fill("A project with a longer name");
  await text.press("Tab");
  expect(
    await page.evaluate(
      () =>
        !!document.activeElement?.closest(
          '[data-scope="drawer"][data-part="content"]',
        ),
    ),
  ).toBe(true);
  await page.keyboard.press("Enter");
  await expect(point).toHaveText(small);
  await expectDrawerExtent(page, dialog, direction, parseInt(small));
  await page.keyboard.press("Enter");
  await expect(point).toHaveText(large);
  await expectDrawerExtent(page, dialog, direction, parseInt(large));
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: screenshot + "-expanded.png", fullPage: true });
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  const selectionBeforeDrag = await page.evaluate(
    () => getSelection()?.toString() ?? "",
  );
  await dragDrawer(
    page,
    dialog.getByLabel("Drag drawer", { exact: true }),
    physical,
    vertical ? 240 : 64,
  );
  expect(await page.evaluate(() => getSelection()?.toString() ?? "")).toBe(
    selectionBeforeDrag,
  );
  await expect(point).toHaveText(small);
  await expectDrawerExtent(page, dialog, direction, parseInt(small));
  await expect
    .poll(
      async () => {
        const box = await dialog
          .getByLabel("Drag drawer", { exact: true })
          .boundingBox();
        if (!box) return false;
        return (
          box.x + box.width / 2 > 0 &&
          box.x + box.width / 2 < page.viewportSize()!.width &&
          box.y + box.height / 2 > 0 &&
          box.y + box.height / 2 < page.viewportSize()!.height
        );
      },
      { message: "Compact drawer retains a reachable handle" },
    )
    .toBe(true);
  const viewport = dialog.locator("[data-drawer-viewport]");
  await expect
    .poll(
      async () =>
        viewport.evaluate((node) => {
          const box = node.getBoundingClientRect();
          return (
            box.left >= 0 &&
            box.right <= innerWidth &&
            box.top >= 0 &&
            box.bottom <= innerHeight
          );
        }),
      { message: "Compact scroll viewport remains inside the visible screen" },
    )
    .toBe(true);
  await text.focus();
  await expect(text).toBeInViewport();
  await text.press("Tab");
  await expect(
    dialog.getByRole("button", { name: "Toggle snap point", exact: true }),
  ).toBeFocused();
  await expect(
    dialog.getByRole("button", { name: "Toggle snap point", exact: true }),
  ).toBeInViewport();
  await page.screenshot({ path: screenshot + "-compact.png", fullPage: true });
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(dialog).toBeVisible();
  // Uncontrolled closing restores the initial snap choice.
  await expect(point).toHaveText(large);
  await expectDrawerExtent(page, dialog, direction, parseInt(large));
  if (touch) {
    await dragDrawer(
      page,
      dialog.getByLabel("Drag drawer", { exact: true }),
      physical,
      20,
      true,
      true,
    );
    await expect(point).toHaveText(large);
    await expectDrawerExtent(page, dialog, direction, parseInt(large));
    await expect(dialog).not.toHaveAttribute("data-dragging", "");
    await dragDrawer(
      page,
      dialog.getByLabel("Drag drawer", { exact: true }),
      physical,
      vertical ? 240 : 64,
      true,
    );
    await expect(point).toHaveText(small);
    await expectDrawerExtent(page, dialog, direction, parseInt(small));
    await expect(text).toBeFocused();
    await expect
      .poll(
        () =>
          viewport.evaluate((node) => {
            const focused = node.ownerDocument.activeElement;
            if (!focused || !node.contains(focused)) return false;
            const box = node.getBoundingClientRect(),
              field = focused.getBoundingClientRect();
            return (
              field.top >= Math.max(box.top, 0) - 1 &&
              field.bottom <= Math.min(box.bottom, innerHeight) + 1 &&
              field.left >= Math.max(box.left, 0) - 1 &&
              field.right <= Math.min(box.right, innerWidth) + 1
            );
          }),
        { message: "触摸吸附后原有焦点控件完整留在可见滚动区域" },
      )
      .toBe(true);
    await page.screenshot({ path: screenshot + "-touch.png", fullPage: true });
  }
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await dragDrawer(
    page,
    dialog.getByLabel("Drag drawer", { exact: true }),
    physical,
    vertical ? 430 : 280,
    touch,
  );
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
}
