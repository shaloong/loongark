import { test, expect } from "@playwright/test";
import { checkDateTime } from "./dateTimeChecks";
for (const framework of ["react", "vue", "solid", "svelte", "Story"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`date time ${framework} ${mode} ${width}`, async ({ page }) => {
        test.skip(
          framework === "Story"
            ? !!process.env.STATIC_DIR
            : !process.env.STATIC_DIR,
          "消费与Story专项",
        );
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(
          framework === "Story"
            ? `/iframe.html?id=components-dateinput--date-time&globals=mode:${mode}`
            : `/examples-${framework}/?example=DateTimeExample&mode=${mode}`,
        );
        await checkDateTime(
          page,
          `.artifacts/gap-completion/date-time-${framework}-${mode}-${width}`,
        );
        expect(errors).toEqual([]);
      });
