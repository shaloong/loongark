import { test, expect } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    for (const state of ["default", "error", "localized"])
      test(`date time ${mode} ${width} ${state}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(
          `/iframe.html?id=components-dateinput--date-time&globals=mode:${mode}`,
        );
        const input = page.getByRole("textbox", {
          name: "Localized date",
          exact: true,
        });
        await expect(input).toBeVisible();
        if (state === "error") {
          await input.fill("February 29, 2026");
          await input.press("Enter");
          await expect(input).toHaveAttribute("aria-invalid", "true");
        }
        if (state === "localized") {
          await page
            .getByRole("button", { name: "Use Shanghai time", exact: true })
            .click();
          await page
            .getByRole("button", { name: "ar-EG", exact: true })
            .click();
          await input.fill("٧/١٠/٢٠٢٦");
          await input.press("Enter");
          await expect(
            page.getByLabel("Current appointment", { exact: true }),
          ).toHaveText("2026-10-07T14:35:20+08:00[Asia/Shanghai]");
        }
        await page.evaluate(async () => {
          await document.fonts.ready;
          await new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          );
        });
        const name = `date-time-${mode}-${width}-${state}.png`;
        await page
          .locator("body")
          .screenshot({
            path: `.artifacts/gap-completion/${name}`,
            animations: "disabled",
          });
        await expect(page.locator("body")).toHaveScreenshot(name, {
          animations: "disabled",
        });
      });
