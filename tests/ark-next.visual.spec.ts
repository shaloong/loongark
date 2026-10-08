import { test, expect } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    for (const [name, story] of [
      ["date", "components-dateinput--basic"],
      ["toc", "components-toc--basic"],
      ["swap", "components-swap--basic"],
      ["drawer", "components-drawer--snap-points"],
    ])
      test(`Ark next ${name} ${mode} ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(`/iframe.html?id=${story}&globals=mode:${mode}`);
        await expect(page.locator("[data-scope]").first()).toBeVisible();
        if (name === "drawer") {
          await page
            .getByRole("button", { name: "Open details drawer", exact: true })
            .click();
          await page
            .getByRole("button", { name: "Expand drawer", exact: true })
            .click();
          await expect(page.getByLabel("Drawer snap point")).toHaveText(
            "440px",
          );
        }
        await expect(page.locator("body")).toHaveScreenshot(
          `ark-next-${name}-${mode}-${width}.png`,
          { animations: "disabled" },
        );
      });
