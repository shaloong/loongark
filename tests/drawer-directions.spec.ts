import { checkDrawer } from "./arkNextChecks";
import { test, expect } from "@playwright/test";
import { checkDrawerDirection } from "./drawerDirectionChecks";
for (const framework of ["react", "vue", "solid", "svelte", "Story"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`drawer directions ${framework} ${mode} ${width}`, async ({
        page,
        browserName,
      }) => {
        test.skip(
          framework === "Story"
            ? !!process.env.STATIC_DIR
            : !process.env.STATIC_DIR,
          "消费与Story专项",
        );
        test.setTimeout(120_000);
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewportSize({
          width,
          height: width === 375 ? 812 : 1100,
        });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(
          framework === "Story"
            ? `/iframe.html?id=components-drawer--directions&globals=mode:${mode}`
            : `/examples-${framework}/?example=DrawerDirectionsExample&mode=${mode}`,
        );
        await expect(
          page.locator('[data-scope="drawer"][data-part="trigger"]'),
        ).toHaveCount(8);
        const triggerIds = await page
          .locator('[data-scope="drawer"][data-part="trigger"]')
          .evaluateAll((nodes) =>
            nodes.map((node) => ({
              id: node.id,
              owner: node.getAttribute("data-ownedby"),
            })),
          );
        expect(triggerIds).toHaveLength(8);
        expect(new Set(triggerIds.map((node) => node.id)).size).toBe(8);
        for (const trigger of triggerIds) {
          expect(trigger.id).not.toContain("undefined");
          expect(trigger.owner).toBeTruthy();
        }
        for (const dir of ["ltr", "rtl"] as const)
          for (const direction of ["down", "up", "start", "end"] as const)
            await test.step(`${direction} ${dir}`, () =>
              checkDrawerDirection(
                page,
                direction,
                dir,
                `.artifacts/gap-completion/drawer-directions-${framework}-${mode}-${width}-${dir}-${direction}`,
                browserName === "chromium" && width === 375,
              ));
        expect(errors).toEqual([]);
      });

for (const framework of ["react", "vue", "solid", "svelte", "Story"])
  for (const mode of ["light", "dark"])
    test(`drawer nested ${framework} ${mode}`, async ({ page }) => {
      test.skip(
        framework === "Story"
          ? !!process.env.STATIC_DIR
          : !process.env.STATIC_DIR,
        "消费与Story专项",
      );
      await page.goto(
        framework === "Story"
          ? `/iframe.html?id=components-drawer--snap-points&globals=mode:${mode}`
          : `/examples-${framework}/?example=DrawerExample&mode=${mode}`,
      );
      await checkDrawer(page);
    });
