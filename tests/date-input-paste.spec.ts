import { test, expect } from "@playwright/test";
for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`${framework} ${mode} ${width} 日期完整粘贴与边界`, async ({
        page,
      }) => {
        test.skip(!process.env.STATIC_DIR, "使用四端消费服务器");
        await page.setViewportSize({ width, height: 1000 });
        await page.goto(
          `/examples-${framework}/?example=DateInputExample&mode=${mode}`,
        );
        const root = page
          .locator('[data-scope="date-input"][data-part="root"]')
          .first();
        const day = root.getByRole("spinbutton", { name: "Day", exact: true });
        const hidden = root.locator('input[name="appointment"]');
        const paste = async (text: string, target = day) => {
          await target.focus();
          await target.evaluate((element, value) => {
            const clipboardData = new DataTransfer();
            clipboardData.setData("text/plain", value);
            element.dispatchEvent(
              new ClipboardEvent("paste", {
                clipboardData,
                bubbles: true,
                cancelable: true,
              }),
            );
          }, text);
        };
        await paste(" 2026-10-18 ");
        await expect(hidden).toHaveValue("10/18/2026");
        await expect(day).toBeFocused();
        for (const invalid of ["not-a-date", "2026-02-29", "   "]) {
          await paste(invalid);
          await expect(hidden).toHaveValue("10/18/2026");
        }
        await paste("2025-02-28");
        await expect(
          root.getByRole("spinbutton", { name: "Month", exact: true }),
        ).toHaveAttribute("aria-valuenow", "10");
        await expect(
          root.getByRole("spinbutton", { name: "Year", exact: true }),
        ).toHaveAttribute("aria-valuenow", "2026");
        await paste("2027-01-01");
        await expect(
          root.getByRole("spinbutton", { name: "Month", exact: true }),
        ).toHaveAttribute("aria-valuenow", "10");
        await expect(
          root.getByRole("spinbutton", { name: "Year", exact: true }),
        ).toHaveAttribute("aria-valuenow", "2026");
        const boundedValue = await hidden.inputValue();
        await page
          .getByRole("button", { name: "Submit date", exact: true })
          .click();
        await expect(page.getByLabel("Submitted date")).toHaveText(
          boundedValue,
        );
        const range = page
          .locator('[data-scope="date-input"][data-part="root"]')
          .nth(1);
        await paste(
          "2026-10-20",
          range.getByRole("spinbutton", { name: "Day", exact: true }).nth(1),
        );
        await expect(range.locator('input[name="trip[0]"]')).toHaveValue(
          "10/3/2026",
        );
        await expect(range.locator('input[name="trip[1]"]')).toHaveValue(
          "10/20/2026",
        );
        await page.evaluate(() => document.fonts.ready);
        await page.locator("[data-example-content]").screenshot({
          path: `.artifacts/date-paste/${framework}-${mode}-${width}.png`,
        });
      });
