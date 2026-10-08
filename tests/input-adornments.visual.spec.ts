import { expect, test } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 320])
    test(`input adornment visual states ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(
        `/iframe.html?id=components-inputgroup--states&globals=mode:${mode}`,
      );
      const root = page.locator("[data-input-adornments]");
      const input = root.locator('input[name="search-md"]');
      await input.focus();
      await expect(page).toHaveScreenshot(
        `adornments-focus-${mode}-${width}.png`,
        { fullPage: true },
      );
      await root.getByRole("button", { name: "Disabled", exact: true }).click();
      await expect(input).toBeDisabled();
      await expect(page).toHaveScreenshot(
        `adornments-disabled-${mode}-${width}.png`,
        { fullPage: true },
      );
      await root.getByRole("button", { name: "Disabled", exact: true }).click();
      await root
        .getByRole("button", { name: "Read only", exact: true })
        .click();
      await expect(input).toHaveAttribute("readonly", "");
      await expect(page).toHaveScreenshot(
        `adornments-readonly-${mode}-${width}.png`,
        { fullPage: true },
      );
      await root
        .getByRole("button", { name: "Read only", exact: true })
        .click();
      for (const name of ["Invalid", "Long labels", "Right-to-left"])
        await root.getByRole("button", { name, exact: true }).click();
      await input.focus();
      await expect(page).toHaveScreenshot(
        `adornments-invalid-rtl-${mode}-${width}.png`,
        { fullPage: true },
      );
    });
