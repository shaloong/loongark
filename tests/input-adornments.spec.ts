import { expect, test } from "@playwright/test";
for (const framework of ["Story", "react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 320])
      test(`input adornments ${framework} ${mode} ${width}`, async ({
        page,
        browserName,
      }) => {
        test.skip(
          framework === "Story"
            ? !!process.env.STATIC_DIR
            : !process.env.STATIC_DIR,
        );
        await page.setViewportSize({ width, height: 1100 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(
          framework === "Story"
            ? `/iframe.html?id=components-inputgroup--states&globals=mode:${mode}`
            : `/examples-${framework}/?example=InputAdornmentsExample&mode=${mode}`,
        );
        const root = page.locator("[data-input-adornments]");
        const toggle = (name: string) =>
          root.getByRole("button", { name, exact: true }).click();
        const capture = (state: string) =>
          page.screenshot({
            path: `.artifacts/p0-close/adornments-${browserName}-${framework}-${mode}-${width}-${state}.png`,
            fullPage: true,
          });
        for (const size of ["sm", "md", "lg"]) {
          const input = root.locator(`input[name="search-${size}"]`);
          const field = input.locator(
            'xpath=ancestor::*[@data-part="root"][1]',
          );
          const label = field.locator('[data-part="label"]');
          const group = field.locator('[data-part="group"]');
          const prefix = field.locator('[data-part="prefix"]');
          const clear = root.getByRole("button", {
            name: `Clear search ${size}`,
            exact: true,
          });
          await expect(input).toHaveValue("LoongArk");
          await expect(label).toHaveAttribute(
            "for",
            (await input.getAttribute("id"))!,
          );
          await input.focus();
          const geometry = await group.evaluate((node) => {
            const input = node.querySelector("input")!,
              prefix = node.querySelector("[data-part=prefix]")!,
              suffix = node.querySelector("button")!;
            const box = node.getBoundingClientRect(),
              a = input.getBoundingClientRect(),
              b = prefix.getBoundingClientRect(),
              c = suffix.getBoundingClientRect();
            return {
              outline: getComputedStyle(node).outlineStyle,
              innerOutline: getComputedStyle(input).outlineStyle,
              prefixOffset: Math.abs(b.y + b.height / 2 - (a.y + a.height / 2)),
              suffixOffset: Math.abs(c.y + c.height / 2 - (a.y + a.height / 2)),
              suffixHeight: c.height,
              fieldHeight: box.height,
              icon: !!prefix.querySelector("svg"),
            };
          });
          expect(geometry.outline).not.toBe("none");
          expect(geometry.innerOutline).toBe("none");
          expect(geometry.prefixOffset).toBeLessThan(1);
          expect(geometry.suffixOffset).toBeLessThan(1);
          expect(geometry.suffixHeight).toBeGreaterThanOrEqual(
            geometry.fieldHeight - 2,
          );
          expect(geometry.icon).toBe(true);
          const l = (await label.boundingBox())!,
            g = (await group.boundingBox())!;
          expect(g.y - l.y - l.height).toBeGreaterThanOrEqual(4);
          expect(g.y - l.y - l.height).toBeLessThanOrEqual(12);
          await input.press("Tab");
          await expect(clear).toBeFocused();
          await clear.press("Enter");
          await expect(input).toHaveValue("");
          await input.fill("Search term");
        }
        await root.locator('input[name="search-md"]').focus();
        await capture("focus");
        await toggle("Disabled");
        for (const size of ["sm", "md", "lg"]) {
          await expect(
            root.locator(`input[name="search-${size}"]`),
          ).toBeDisabled();
          await expect(
            root.getByRole("button", {
              name: `Clear search ${size}`,
              exact: true,
            }),
          ).toBeDisabled();
        }
        await capture("disabled");
        await toggle("Disabled");
        await toggle("Read only");
        const input = root.locator('input[name="search-md"]');
        await expect(input).toHaveAttribute("readonly", "");
        await expect(
          root.getByRole("button", { name: "Clear search md", exact: true }),
        ).toBeDisabled();
        await input.focus();
        await input.press("ControlOrMeta+a");
        await page.keyboard.insertText("forbidden");
        await expect(input).toHaveValue("Search term");
        await capture("readonly");
        await toggle("View instead of clear");
        const view = root.getByRole("button", {
          name: "View search md",
          exact: true,
        });
        await expect(view).toBeEnabled();
        await view.click();
        await expect(root.getByLabel("Viewed search value")).toHaveText(
          "Search term",
        );
        await expect(input).toHaveValue("Search term");
        await toggle("Disabled");
        await expect(view).toBeDisabled();
        await toggle("Disabled");
        await toggle("View instead of clear");
        const clear = root.getByRole("button", {
          name: "Clear search md",
          exact: true,
        });
        await expect(clear).toBeDisabled();
        await toggle("Enable suffix explicitly");
        await expect(clear).toBeEnabled();
        await clear.click();
        await expect(input).toHaveValue("");
        await toggle("Enable suffix explicitly");
        await toggle("Read only");
        await input.fill("Search term");
        await toggle("Invalid");
        await toggle("Long labels");
        for (const label of await root.locator('[data-part="label"]').all())
          await expect(label).toContainText("keep the full label readable");
        await toggle("Right-to-left");
        await expect(input).toHaveAttribute("aria-invalid", "true");
        const description = await input.getAttribute("aria-describedby");
        expect(description).toBeTruthy();
        await expect(
          root.getByText("Review the search term.", { exact: true }),
        ).toHaveCount(3);
        await input.focus();
        await expect
          .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
          .toBeLessThanOrEqual(width);
        await capture("invalid-long-rtl");
      });
