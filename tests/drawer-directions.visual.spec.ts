import { test, expect } from "@playwright/test";
import { openDirection, expectDrawerExtent } from "./drawerDirectionChecks";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    for (const dir of ["ltr", "rtl"] as const)
      for (const direction of ["down", "up", "start", "end"] as const)
        test(`drawer ${direction} ${dir} ${mode} ${width}`, async ({
          page,
        }) => {
          await page.setViewportSize({
            width,
            height: width === 375 ? 812 : 1100,
          });
          await page.emulateMedia({ reducedMotion: "reduce" });
          await page.goto(
            `/iframe.html?id=components-drawer--directions&globals=mode:${mode}`,
          );
          const { dialog } = await openDirection(page, direction, dir);
          await expect(
            dialog.getByLabel("Drawer snap point", { exact: true }),
          ).toHaveText(
            direction === "up" || direction === "down" ? "480px" : "320px",
          );
          await expectDrawerExtent(
            page,
            dialog,
            direction,
            direction === "up" || direction === "down" ? 480 : 320,
          );
          await page.evaluate(() => document.fonts.ready);
          await page.locator("body").screenshot({
            path: `.artifacts/gap-completion/drawer-baseline-${direction}-${dir}-${mode}-${width}.png`,
            animations: "disabled",
          });
          await expect(page.locator("body")).toHaveScreenshot(
            `drawer-${direction}-${dir}-${mode}-${width}.png`,
            { animations: "disabled" },
          );
        });
