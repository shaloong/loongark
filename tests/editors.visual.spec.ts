import { expect, test } from "@playwright/test";
for (const [kind, family] of [
  ["code", "codeeditor"],
  ["rich", "richtexteditor"],
] as const)
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`editor ${kind} ${mode} ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1200 });
        await page.goto(
          `/iframe.html?id=components-${family}--basic&globals=mode:${mode}`,
        );
        const root = page.locator('[data-scope="editor"]');
        await expect(root).toHaveAttribute("data-mounted", "true");
        await expect(root).not.toHaveAttribute("aria-busy", "true");
        await expect(page.locator("body")).toHaveScreenshot(
          `editor-${kind}-default-${mode}-${width}.png`,
          { animations: "disabled" },
        );
        if (kind === "code") {
          await root.getByRole("button", { name: "Find", exact: true }).click();
          await root.locator('.cm-search input[name="search"]').fill("greet");
        } else {
          await root
            .getByRole("button", { name: "Insert table", exact: true })
            .click();
          await root.locator('[data-part="table-tools"] summary').click();
        }
        await expect(page.locator("body")).toHaveScreenshot(
          `editor-${kind}-active-${mode}-${width}.png`,
          { animations: "disabled" },
        );
      });
