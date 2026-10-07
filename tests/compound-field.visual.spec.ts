import { expect, test } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 320])
    for (const state of ["default", "disabled", "invalid-long-rtl"])
      test(`Compound Field ${mode} ${width} ${state}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1400 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(
          `/iframe.html?id=components-field--compound-inputs&globals=mode:${mode}`,
        );
        const form = page.getByRole("form", {
          name: "Compound field preferences",
        });
        await expect(form).toBeVisible();
        if (state === "disabled") {
          await page
            .getByRole("button", { name: "Disabled", exact: true })
            .click();
          await expect(form.locator('input[name="quantity"]')).toBeDisabled();
        }
        if (state === "invalid-long-rtl") {
          for (const name of ["Invalid", "Long descriptions", "Right-to-left"])
            await page.getByRole("button", { name, exact: true }).click();
          await expect(form.locator('input[name="quantity"]')).toHaveAttribute(
            "aria-invalid",
            "true",
          );
        }
        if (state !== "disabled")
          await form.locator('input[name="quantity"]').focus();
        await page.screenshot({
          path: `.artifacts/p0-field/compound-visual-${mode}-${width}-${state}.png`,
          fullPage: true,
          animations: "disabled",
        });
        await expect(page).toHaveScreenshot(
          `compound-field-${mode}-${width}-${state}.png`,
          { fullPage: true, animations: "disabled" },
        );
      });
