import { test, expect } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    for (const [name, story] of [
      ["crop", "components-imagecropper--basic"],
      ["json", "components-jsontreeview--basic"],
      ["utilities", "compositions-ark-utilities--basic"],
      ["selection", "compositions-advanced-selection--basic"],
    ])
      test(`Ark ${name} ${mode} ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(`/iframe.html?id=${story}&globals=mode:${mode}`);
        if (name === "utilities")
          await expect(
            page
              .frameLocator("iframe")
              .getByRole("button", { name: "Inside frame" }),
          ).toBeVisible();
        else if (name === "crop")
          await expect
            .poll(() =>
              page
                .locator("[data-part=image]")
                .evaluate((el: HTMLImageElement) => el.naturalWidth),
            )
            .toBe(640);
        else await expect(page.locator("[data-scope]").first()).toBeVisible();
        await expect(page.locator("body")).toHaveScreenshot(
          `ark-${name}-${mode}-${width}.png`,
          { animations: "disabled" },
        );
      });
