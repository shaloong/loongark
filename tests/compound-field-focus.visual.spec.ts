import { expect, test } from "@playwright/test";

for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    for (const [family, scope] of [
      ["combobox", "combobox"],
      ["command", "combobox"],
      ["date-picker", "date-picker"],
      ["numberinput", "number-input"],
    ])
      test(`focused outer border ${family} ${mode} ${width}`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height: 812 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(
          `/iframe.html?id=components-${family}--${family === "combobox" ? "playground" : "basic"}&globals=mode:${mode}`,
        );
        const input = page
          .locator(`[data-scope="${scope}"][data-part="input"]`)
          .first();
        await input.focus();
        await expect(input).toBeFocused();
        const bounds = await page
          .locator(`[data-scope="${scope}"][data-part="control"]`)
          .first()
          .boundingBox();
        expect(bounds).toBeTruthy();
        // 包含外框四周，防止仅截控件内部而遗漏缩小或被裁切的焦点环。
        const screenshot = await page.screenshot({
          clip: {
            x: bounds!.x - 6,
            y: bounds!.y - 6,
            width: bounds!.width + 12,
            height: bounds!.height + 12,
          },
          animations: "disabled",
        });
        expect(screenshot).toMatchSnapshot(`${family}-${mode}-${width}.png`);
      });
