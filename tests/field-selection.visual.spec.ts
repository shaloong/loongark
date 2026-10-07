import { expect, test } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 320])
    for (const state of ["default", "invalid-long-rtl"])
      test(`Field native selections ${mode} ${width} ${state}`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height: 1400 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(
          `/iframe.html?id=components-field--inherited-selections&globals=mode:${mode}`,
        );
        const form = page.getByRole("form", { name: "Field preferences" });
        await expect(form).toBeVisible();
        if (state === "invalid-long-rtl") {
          for (const name of [
            "Invalid",
            "Required",
            "Long descriptions",
            "Right-to-left",
          ])
            await page.getByRole("button", { name, exact: true }).click();
          await expect(
            form.locator("[data-scope=tags-input][data-part=input]"),
          ).toHaveAttribute("aria-invalid", "true");
        }
        await page
          .getByRole("button", { name: "Size md", exact: true })
          .focus();
        // 真实 Tab 到原生 Checkbox，focus-visible 应画在完整控件上。
        await page
          .getByRole("button", { name: "Override Field state", exact: true })
          .focus();
        await page.keyboard.press("Tab");
        await expect(form.locator("input[name=agreement]")).toBeFocused();
        await expect(
          form.locator("[data-scope=checkbox][data-part=control]"),
        ).toHaveCSS("outline-style", "solid");
        await page.screenshot({
          path: `.artifacts/p0-field/visual-${mode}-${width}-${state}.png`,
          fullPage: true,
          animations: "disabled",
        });
        await expect(page).toHaveScreenshot(
          `field-selection-${mode}-${width}-${state}.png`,
          { fullPage: true, animations: "disabled" },
        );
      });
