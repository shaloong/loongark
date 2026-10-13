import { auditRoot as resolveAuditRoot } from "./auditDirectory";
import { test, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

test("表单密度和浮动标签保持一致", async ({ page }) => {
  for (const [size, height] of [
    ["small", 32],
    ["medium", 36],
    ["large", 40],
  ] as const) {
    for (const [family, part] of [
      ["select", "trigger"],
      ["combobox", "control"],
    ] as const) {
      await page.goto(
        `/iframe.html?id=components-${family}--${size}&viewMode=story`,
      );
      const control = page.locator(`[data-scope=${family}][data-part=${part}]`);
      await expect(control).toBeVisible();
      await expect
        .poll(() => control.evaluate((el) => el.getBoundingClientRect().height))
        .toBe(height);
      await expect
        .poll(() => control.evaluate((el) => getComputedStyle(el).paddingLeft))
        .toBe("12px");
      await page.locator(`[data-scope=${family}][data-part=trigger]`).click();
      const option = page
        .locator(`[data-scope=${family}][data-part=item]`)
        .first();
      await expect(option).toBeVisible();
      await expect
        .poll(() => option.evaluate((el) => getComputedStyle(el).padding))
        .toBe("6px 8px");
      await expect
        .poll(() => option.evaluate((el) => getComputedStyle(el).fontSize))
        .toBe("14px");
      const content = page.locator(`[data-scope=${family}][data-part=content]`);
      await expect
        .poll(() =>
          content.evaluate((el) =>
            Math.abs(
              el.getBoundingClientRect().width -
                parseFloat(
                  getComputedStyle(el).getPropertyValue("--reference-width"),
                ),
            ),
          ),
        )
        .toBeLessThanOrEqual(1);
    }
  }
  for (const [family, part] of [
    ["numberinput", "control"],
    ["passwordinput", "control"],
    ["field", "input"],
  ] as const) {
    await page.goto(
      `/iframe.html?id=components-${family}--basic&viewMode=story`,
    );
    const scope = family.replace("input", "-input");
    const control = page
      .locator(`[data-scope=${scope}][data-part=${part}]`)
      .first();
    await expect(control).toBeVisible();
    await expect
      .poll(() => control.evaluate((el) => el.getBoundingClientRect().height))
      .toBe(36);
  }
  await page.goto(
    "/iframe.html?id=components-input--floating-label&viewMode=story",
  );
  const input = page.locator("[data-scope=input][data-part=control]");
  const label = page.locator("[data-scope=input][data-part=label]");
  await expect(input).toBeVisible();
  const resting = await label.evaluate((el) => getComputedStyle(el).transform);
  await input.fill("hello@example.com");
  await input.blur();
  await expect
    .poll(() => label.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe(resting);
  await input.fill("");
  await input.blur();
  await expect
    .poll(() => label.evaluate((el) => getComputedStyle(el).transform))
    .toBe(resting);
});

test("输入前后缀位于同一控件内且清空可操作", async ({ page }) => {
  for (const variant of [
    "with-prefix",
    "with-suffix",
    "with-prefix-and-suffix",
  ]) {
    await page.goto(
      "/iframe.html?id=components-input--" + variant + "&viewMode=story",
    );
    const group = page.locator("[data-scope=input][data-part=group]");
    await expect(group).toBeVisible();
    await expect
      .poll(() => group.evaluate((el) => el.getBoundingClientRect().height))
      .toBe(36);
    const input = group.locator("input");
    await input.fill("123");
    const aligned = await group.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return [...el.children].every((child) => {
        const r = child.getBoundingClientRect();
        return (
          r.left >= rect.left &&
          r.right <= rect.right &&
          r.top >= rect.top &&
          r.bottom <= rect.bottom
        );
      });
    });
    expect(aligned).toBe(true);
    if (variant === "with-suffix") {
      await page.getByRole("button", { name: "清空输入" }).click();
      await expect(input).toHaveValue("");
    }
  }
});

test("滑块多尺寸和垂直刻度具有完整布局", async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 650 });
  await page.goto("/iframe.html?id=components-slider--sizes&viewMode=story");
  const roots = page.locator("[data-scope=slider][data-part=root]");
  await expect(roots).toHaveCount(3);
  for (const root of await roots.all()) {
    await expect
      .poll(() => root.evaluate((el) => el.getBoundingClientRect().width))
      .toBeGreaterThan(300);
    await expect
      .poll(() =>
        root
          .locator("[data-part=marker-group]")
          .evaluate((el) => el.getBoundingClientRect().height),
      )
      .toBeGreaterThan(20);
  }
  await page.goto("/iframe.html?id=components-slider--vertical&viewMode=story");
  const group = page.locator("[data-scope=slider][data-part=marker-group]");
  await expect
    .poll(() => group.evaluate((el) => el.getBoundingClientRect().height))
    .toBe(160);
  const positions = await group
    .locator("[data-part=marker]")
    .evaluateAll((elements) =>
      elements.map((el) => el.getBoundingClientRect().top),
    );
  expect(Math.max(...positions) - Math.min(...positions)).toBeGreaterThan(100);
  const slider = page.getByRole("slider");
  await slider.focus();
  await slider.press("ArrowUp");
  await expect(slider).toHaveAttribute("aria-valuenow", "33");
});

for (const mode of ["light", "dark"] as const) {
  for (const preference of ["normal", "reduce", "force"] as const) {
    test(`${mode} 弹层开关和 ${preference} 动效策略`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.emulateMedia({
        reducedMotion: preference === "normal" ? "no-preference" : "reduce",
      });
      const root = `${resolveAuditRoot()}/expanded/${mode}`;
      await mkdir(root, { recursive: true });
      for (const family of [
        "popover",
        "dialog",
        "sheet",
        "drawer",
        "alertdialog",
      ] as const) {
        const story = family === "dialog" ? "playground" : "basic";
        await page.goto(
          `/iframe.html?id=components-${family}--${story}&viewMode=story&globals=mode:${mode};motion:${preference === "force" ? "force" : "auto"}`,
        );
        await page
          .locator("#loongark-primitive-neutral-system")
          .waitFor({ state: "attached" });
        const trigger = page.locator(".loongark-story-surface button").first();
        await trigger.click();
        const scope = family === "alertdialog" ? "dialog" : family;
        const content = page.locator(
          `[data-scope=${scope}][data-part=content]`,
        );
        await expect(content).toBeVisible();
        if (scope === "sheet") {
          const compact = await content.evaluate((el) => {
            const heading = el.querySelector("[data-part=title]")!;
            const description = el.querySelector("[data-part=description]")!;
            return (
              description.getBoundingClientRect().top -
              heading.getBoundingClientRect().bottom
            );
          });
          expect(compact).toBeLessThanOrEqual(24);
        }

        const duration = await content.evaluate(
          (el, usesTransition) =>
            parseFloat(
              usesTransition
                ? getComputedStyle(el).transitionDuration
                : getComputedStyle(el).animationDuration,
            ),
          family === "drawer",
        );
        expect(duration).toBe(preference === "reduce" ? 0.00001 : 0.2);
        await expect
          .poll(() =>
            content.evaluate((el) => el.getBoundingClientRect().right),
          )
          .toBeLessThanOrEqual(376);
        if (preference === "normal")
          await page.screenshot({
            path: `${root}/${family}.png`,
            animations: "disabled",
          });
        let drawerEvents: Array<Record<string, unknown>> = [];
        if (family === "drawer") {
          await content.evaluate((node) => {
            const events: Array<Record<string, unknown>> = [];
            (
              window as unknown as { drawerEvents: typeof events }
            ).drawerEvents = events;
            for (const type of ["pointerdown", "pointerup", "click"])
              node.addEventListener(
                type,
                (event) => {
                  const target = event.target as HTMLElement;
                  events.push({
                    type,
                    trusted: event.isTrusted,
                    target: target.closest("button")?.textContent?.trim(),
                    state: node.getAttribute("data-state"),
                    defaultPrevented: event.defaultPrevented,
                  });
                },
                true,
              );
          });
        }
        if (family === "sheet" || family === "drawer") {
          await page
            .getByRole("button", { name: "Save changes", exact: true })
            .click();
          if (family === "drawer") {
            drawerEvents = await page.evaluate(
              () =>
                (
                  window as unknown as {
                    drawerEvents: Array<Record<string, unknown>>;
                  }
                ).drawerEvents,
            );
            await writeFile(
              `${root}/drawer-${preference}-native-events.json`,
              JSON.stringify(drawerEvents, null, 2),
            );
            expect(
              drawerEvents.some(
                (event) =>
                  event.type === "click" &&
                  event.trusted &&
                  event.target === "Save changes",
              ),
            ).toBe(true);
          }
        } else if (family === "alertdialog")
          await page
            .getByRole("button", { name: "Cancel", exact: true })
            .click();
        else
          await page
            .locator(`[data-scope=${scope}][data-part=close-trigger]`)
            .filter({ visible: true })
            .first()
            .click();
        await expect(content).toBeHidden();
        await expect(trigger).toBeFocused();
        await expect(
          page.locator(`[data-scope=${scope}][data-part=content][hidden]`),
        ).toBeHidden();
      }
    });
  }
}

test("日期范围浮层在桌面与手机尺寸间重新定位", async ({ page }) => {
  for (const mode of ["light", "dark"]) {
    for (const story of ["basic", "range"]) {
      await page.setViewportSize({ width: 900, height: 650 });
      await page.goto(
        `/iframe.html?id=components-date-picker--${story}&viewMode=story&globals=mode:${mode}`,
      );
      await expect(
        page.locator(`[data-scope="date-picker"][data-part="content"]`),
      ).toBeVisible();
      for (const width of [375, 900, 320, 900, 375]) {
        await page.setViewportSize({ width, height: 812 });
        await expect
          .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
          .toBeLessThanOrEqual(width + 1);
        await expect
          .poll(() =>
            page
              .locator(`[data-scope="date-picker"][data-part="content"]`)
              .evaluate((el) => el.getBoundingClientRect().right),
          )
          .toBeLessThanOrEqual(width + 1);
      }
    }
  }
});
