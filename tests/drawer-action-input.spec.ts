import { expect, test } from "@playwright/test";

for (const framework of ["Story", "react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    test(`drawer action tolerates pointer motion ${framework} ${mode}`, async ({
      page,
    }) => {
      test.skip(
        framework === "Story"
          ? !!process.env.STATIC_DIR
          : !process.env.STATIC_DIR,
      );
      await page.setViewportSize({ width: 375, height: 812 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(
        framework === "Story"
          ? `/iframe.html?id=components-drawer--basic&globals=mode:${mode}`
          : `/examples-${framework}/?example=DrawerExample&mode=${mode}`,
      );
      const trigger = page.getByRole("button", {
        name: framework === "Story" ? "Open drawer" : "Open details drawer",
        exact: true,
      });
      await trigger.click();
      const content = page
        .locator(
          '[data-scope="drawer"][data-part="content"][data-state="open"]',
        )
        .first();
      await expect(content).toBeVisible();
      if (framework !== "Story") {
        await page
          .getByRole("button", { name: "Expand drawer", exact: true })
          .click();
        await expect(page.getByLabel("Drawer snap point")).toHaveText("440px");
      }
      const action = page.getByRole("button", {
        name: framework === "Story" ? "Save changes" : "Close details",
        exact: true,
      });
      await action.scrollIntoViewIfNeeded();
      await expect(action).toBeInViewport({ ratio: 1 });
      const rect = (await action.boundingBox())!;
      const x = rect.x + rect.width / 2,
        y = rect.y + rect.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      // 手指/鼠标在同一按钮内的少量位移应仍是点击，不得启动 Drawer 拖拽。
      await page.mouse.move(x, y + 4, { steps: 4 });
      await page.mouse.up();
      await expect(content).toBeHidden();
      await expect(trigger).toBeFocused();
    });
