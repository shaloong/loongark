import { test, expect } from "@playwright/test";
for (const framework of ["react", "vue", "solid", "svelte", "Story"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`context input ${framework} ${mode} ${width}`, async ({ page }) => {
        test.skip(
          framework === "Story"
            ? !!process.env.STATIC_DIR
            : !process.env.STATIC_DIR,
          "消费与Story专项",
        );
        await page.setViewportSize({ width, height: 900 });
        await page.goto(
          framework === "Story"
            ? `/iframe.html?id=components-contextmenu--native-input&globals=mode:${mode}`
            : `/examples-${framework}/?example=ContextMenuExample&mode=${mode}`,
        );
        const target = page.locator('[data-part="context-trigger"]'),
          item = page.getByRole("menuitem", { name: "Refresh", exact: true });
        await expect(target).toBeVisible();
        await expect(target).toHaveCSS("text-align", "start");
        await expect(target).toHaveCSS("display", "block");
        const actions = page.getByRole("button", {
          name: "Open actions",
          exact: true,
        });
        await expect(actions).toHaveCSS("font-size", "14px");
        await expect(actions).toHaveCSS("justify-content", "center");
        await target.click({ button: "right" });
        await expect(item).toBeVisible();
        await item.click();
        await expect(page.getByLabel("Selected action")).toHaveText("refresh");
        await expect(item).toBeHidden();
        // 未知指针不启动长按，也不能由松开事件取消合法的 contextmenu。
        await target.dispatchEvent("pointerdown", {
          pointerType: "",
          button: 2,
          clientX: 60,
          clientY: 180,
        });
        await target.dispatchEvent("contextmenu", {
          button: 2,
          clientX: 60,
          clientY: 180,
        });
        await target.dispatchEvent("pointerup", { pointerType: "", button: 2 });
        await expect(item).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(item).toBeHidden();
        // 协议事件仅验证长按分支；真实触摸设备另行验收。
        for (const pointerType of ["touch", "pen"]) {
          for (const cancel of ["pointerup", "pointercancel", "pointermove"]) {
            await target.dispatchEvent("pointerdown", {
              pointerType,
              clientX: 60,
              clientY: 180,
            });
            await target.dispatchEvent(cancel, {
              pointerType,
              clientX: 61,
              clientY: 180,
            });
            await page.waitForTimeout(800);
            await expect(item).toBeHidden();
          }
          await target.dispatchEvent("pointerdown", {
            pointerType,
            clientX: 60,
            clientY: 180,
          });
          await expect(item).toBeVisible();
          await target.dispatchEvent("pointerup", { pointerType });
          await expect(item).toBeVisible();
          await page.keyboard.press("Escape");
          await expect(item).toBeHidden();
        }
        const trigger = page.getByRole("button", {
          name: "Open actions",
          exact: true,
        });
        await page.mouse.move(0, 0);
        await trigger.focus();
        await trigger.press("ArrowDown");
        await expect(item).toBeVisible();
        await expect(item).toHaveAttribute("data-highlighted", "");
        await expect(page.getByRole("menu")).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(item).toBeHidden();
        await expect(page.getByLabel("Selected action")).toHaveText("refresh");
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth),
        ).toBeLessThanOrEqual(width + 1);
        await target.click({ button: "right" });
        await expect(item).toBeVisible();
        await page.screenshot({
          path: `.artifacts/gap-completion/context-input-${framework}-${mode}-${width}.png`,
          fullPage: true,
          animations: "disabled",
        });
      });

for (const framework of ["react", "vue", "solid", "svelte"])
  test(`context native touch ${framework}`, async ({ page, browserName }) => {
    test.skip(
      !process.env.STATIC_DIR || browserName !== "chromium",
      "Chromium 原生触摸协议输入专项",
    );
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto(`/examples-${framework}/?example=ContextMenuExample`);
    const target = page.locator('[data-part="context-trigger"]'),
      item = page.getByRole("menuitem", { name: "Refresh", exact: true });
    await expect(target).toBeVisible();
    const cdp = await page.context().newCDPSession(page);
    try {
      await cdp.send("Emulation.setTouchEmulationEnabled", {
        enabled: true,
        maxTouchPoints: 1,
      });
      const bounds = (await target.boundingBox())!;
      const points = [
        { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 },
      ];
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: points,
      });
      await expect(item).toBeVisible();
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchEnd",
        touchPoints: [],
      });
      await expect(item).toBeVisible();
      await page.screenshot({
        path: `.artifacts/gap-completion/context-native-touch-${framework}.png`,
        fullPage: true,
        animations: "disabled",
      });
      await page.keyboard.press("Escape");
      await expect(item).toBeHidden();
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: points,
      });
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchCancel",
        touchPoints: [],
      });
      await page.waitForTimeout(800);
      await expect(item).toBeHidden();
    } finally {
      await cdp.detach();
    }
  });
