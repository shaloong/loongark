import { auditDirectory } from "./auditDirectory";
import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { checkSelectionInputs } from "./selectionInputChecks";
import AxeBuilder from "@axe-core/playwright";
const root = auditDirectory("2026-10-03/selection-inputs");
for (const mode of ["light", "dark"] as const)
  test(
    "Selection inputs " + mode + " transfer, picker and autosize",
    async ({ page }) => {
      test.setTimeout(90000);
      await mkdir(root, { recursive: true });
      await page.setViewportSize({ width: 900, height: 900 });
      await page.goto(
        "/iframe.html?id=examples-selection-inputs--overview&viewMode=story&globals=mode:" +
          mode,
      );
      await expect(
        page.getByLabel("Meeting time", { exact: true }),
      ).toBeVisible();
      await page.screenshot({
        path: root + "/selection-" + mode + ".png",
        fullPage: true,
        animations: "disabled",
      });
      await page.setViewportSize({ width: 375, height: 812 });
      await page.screenshot({
        path: root + "/selection-" + mode + "-mobile.png",
        fullPage: true,
        animations: "disabled",
      });
      await page.setViewportSize({ width: 900, height: 900 });
      await checkSelectionInputs(page);
      await page.goto(
        "/iframe.html?id=components-timepicker--night-shift&viewMode=story&globals=mode:" +
          mode,
      );
      const input = page.getByLabel("Night shift", { exact: true });
      await expect(input).toHaveValue("23:30");
      await input.fill("01:30");
      await expect(input).not.toHaveAttribute("aria-invalid", "true");
      await input.fill("13:00");
      await expect(input).toHaveAttribute("aria-invalid", "true");
      await page
        .getByRole("button", { name: "Choose time", exact: true })
        .click();
      await expect(
        page
          .getByRole("combobox", { name: "Hours", exact: true })
          .locator('option[value="13"]'),
      ).toHaveAttribute("disabled", "");
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
      await page.screenshot({
        path: root + "/picker-" + mode + "-expanded.png",
        fullPage: true,
        animations: "disabled",
      });
      await page.keyboard.press("Escape");
      await page.goto(
        "/iframe.html?id=components-timepicker--states&viewMode=story&globals=mode:" +
          mode,
      );
      await expect(
        page.getByLabel("Read-only time", { exact: true }),
      ).toHaveAttribute("readonly", "");
      await expect(
        page.getByLabel("Disabled time", { exact: true }),
      ).toBeDisabled();
      await expect(
        page.getByLabel("Out-of-range time", { exact: true }),
      ).toHaveAttribute("aria-invalid", "true");
    },
  );
