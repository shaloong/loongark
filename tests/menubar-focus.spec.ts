import { expect, test } from "@playwright/test";

for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`menubar exit focus ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(
        `/iframe.html?id=components-menubar--basic&globals=mode:${mode}`,
      );
      const bar = page.getByRole("menubar"),
        file = bar.getByRole("menuitem", { name: "File", exact: true }),
        edit = bar.getByRole("menuitem", { name: "Edit", exact: true }),
        undo = page.getByRole("menuitem", { name: "Undo", exact: true }),
        menu = page.getByRole("menu", { name: "Edit", exact: true });
      await file.focus();
      await file.press("End");
      await expect(edit).toBeFocused();
      // 展开内容刚可见即按 Escape，覆盖菜单容器获得焦点前的快速关闭。
      for (let cycle = 0; cycle < 3; cycle++) {
        await edit.press("ArrowDown");
        await expect(undo).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(undo).toBeHidden();
        await expect(edit).toBeFocused();
      }
      await edit.press("ArrowDown");
      await expect(menu).toBeFocused();
      await expect(menu).toHaveAttribute(
        "aria-activedescendant",
        (await undo.getAttribute("id"))!,
      );
      await page.keyboard.press("Escape");
      await expect(edit).toBeFocused();
      await page.evaluate(() => {
        const button = document.createElement("button");
        button.textContent = "Outside menu";
        document.body.append(button);
      });
      await edit.press("ArrowDown");
      await expect(menu).toBeFocused();
      await expect(menu).toHaveAttribute(
        "aria-activedescendant",
        (await undo.getAttribute("id"))!,
      );
      await page.keyboard.press("Escape");
      const outside = page.getByRole("button", {
        name: "Outside menu",
        exact: true,
      });
      await outside.focus();
      await expect(undo).toBeHidden();
      await expect(outside).toBeFocused();
      await bar.evaluate((node) => node.setAttribute("dir", "rtl"));
      await file.focus();
      await file.press("ArrowLeft");
      await expect(edit).toBeFocused();
      await edit.press("Home");
      await expect(file).toBeFocused();
      await expect(bar).toHaveAttribute("aria-orientation", "horizontal");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBe(true);
      await page.screenshot({
        path: `.artifacts/advanced-completion/menubar-${mode}-${width}-${test.info().repeatEachIndex}.png`,
        fullPage: true,
      });
    });
