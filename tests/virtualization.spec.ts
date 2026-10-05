import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`virtual ${framework} ${mode} ${width}`, async ({ page }) => {
        test.skip(!process.env.STATIC_DIR, "四端消费构建后运行");
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(
          `/examples-${framework}/?example=VirtualizationExample&mode=${mode}`,
        );
        const table = page.locator(
          '[data-scope="data-table"][data-part="root"]',
        );
        const tableViewport = table.locator(
          '[data-scope="table"][data-part="root"]',
        );
        const rows = table.locator("tbody [data-virtual-key]");
        await expect(table.locator("table")).toHaveAttribute(
          "aria-rowcount",
          "1001",
        );
        await expect.poll(() => rows.count()).toBeLessThan(25);
        await page
          .getByRole("button", { name: "Scroll to row 501", exact: true })
          .click();
        await expect(
          table.locator('[data-virtual-key="row-500"]'),
        ).toBeVisible();
        await expect(
          table.locator('[data-virtual-key="row-500"]'),
        ).toHaveAttribute("aria-rowindex", "502");
        await page
          .getByRole("button", { name: /^Edit Project for row-500:/ })
          .click();
        const editor = table.getByRole("textbox", {
          name: "Edit Project for row-500",
          exact: true,
        });
        await expect(editor).toBeFocused();
        await editor.fill("Edited visible row\nwith retained focus");
        await tableViewport.evaluate((el) => {
          el.scrollTop = 1000;
          el.dispatchEvent(new Event("scroll"));
        });
        await expect(editor).toBeFocused();
        await expect(editor).toHaveValue(
          "Edited visible row\nwith retained focus",
        );
        await editor.press("Control+Enter");
        await expect(
          page.getByText("Saved name for row-500", { exact: true }),
        ).toBeVisible();
        await page
          .getByRole("button", { name: "Scroll to first row", exact: true })
          .click();
        await page
          .getByRole("button", { name: /^Edit Project for row-0:/ })
          .click();
        await page
          .getByRole("button", { name: "Edit selected", exact: true })
          .click();
        await expect(table.locator('[data-part="cell-editor"]')).toHaveCount(0);
        await expect(
          table.getByRole("button", { name: /^Edit Project for/ }),
        ).toHaveCount(0);
        await table
          .getByRole("button", { name: "Cancel", exact: true })
          .click();
        const filter = table.getByRole("textbox", {
          name: "Filter rows",
          exact: true,
        });
        await filter.fill("Project 0999");
        await expect(table.locator("table")).toHaveAttribute(
          "aria-rowcount",
          "2",
        );
        await expect(rows).toHaveCount(1);
        await expect(rows.first()).toHaveAttribute(
          "data-virtual-key",
          "row-998",
        );
        await filter.fill("No such project");
        await expect(rows).toHaveCount(0);
        await filter.fill("");
        await expect(table.locator('[data-virtual-key="row-0"]')).toBeVisible();
        const scroller = page.locator(
          '[data-scope="message-scroller"][data-part="root"]',
        );
        const messages = scroller.locator("[data-virtual-key]");
        await expect.poll(() => messages.count()).toBeLessThan(25);
        await expect(
          scroller.locator('[data-virtual-key="message-499"]'),
        ).toBeVisible();
        await page
          .getByRole("button", { name: "Read middle messages", exact: true })
          .click();
        const anchor = scroller.locator('[data-virtual-key="message-250"]');
        await expect(anchor).toBeVisible();
        await expect(anchor).toHaveAttribute("aria-posinset", "251");
        await expect(anchor).toHaveAttribute("aria-setsize", "500");
        await page.waitForTimeout(200);
        const top = await anchor.evaluate(
          (el) => el.getBoundingClientRect().top,
        );
        await page
          .getByRole("button", { name: "Add earlier message", exact: true })
          .click();
        await expect(anchor).toHaveAttribute("aria-posinset", "252");
        await expect
          .poll(async () =>
            Math.abs(
              (await anchor.evaluate((el) => el.getBoundingClientRect().top)) -
                top,
            ),
          )
          .toBeLessThan(2);
        await page
          .getByRole("button", { name: "Append message", exact: true })
          .click();
        await expect(anchor).toHaveAttribute("aria-setsize", "502");
        await expect
          .poll(async () =>
            Math.abs(
              (await anchor.evaluate((el) => el.getBoundingClientRect().top)) -
                top,
            ),
          )
          .toBeLessThan(2);
        await page
          .getByRole("button", { name: "Expand message 251", exact: true })
          .click();
        await expect(anchor).toContainText("Additional detail");
        await expect
          .poll(async () =>
            Math.abs(
              (await anchor.evaluate((el) => el.getBoundingClientRect().top)) -
                top,
            ),
          )
          .toBeLessThan(2);
        await page
          .getByRole("button", { name: "Remove message 251", exact: true })
          .click();
        await expect(anchor).toHaveCount(0);
        await expect(
          scroller.locator('[data-virtual-key="message-251"]'),
        ).toBeVisible();
        await scroller
          .getByRole("button", { name: "Jump to latest", exact: true })
          .click();
        await expect(
          scroller.locator('[data-virtual-key="message-500"]'),
        ).toBeVisible();
        await page
          .getByRole("button", { name: "Append message", exact: true })
          .click();
        await expect(
          scroller.locator('[data-virtual-key="message-501"]'),
        ).toBeVisible();
        const inspect = scroller.getByRole("button", {
          name: "Inspect message-501",
          exact: true,
        });
        await inspect.focus();
        await scroller.locator('[data-part="viewport"]').evaluate((el) => {
          el.scrollTop = 1000;
          el.dispatchEvent(new Event("scroll"));
        });
        await expect(inspect).toBeFocused();
        await expect.poll(() => messages.count()).toBeLessThan(25);
        await page
          .getByRole("button", { name: "Hide windows", exact: true })
          .click();
        await expect(table).toHaveCount(0);
        await expect(scroller).toHaveCount(0);
        await page
          .getByRole("button", { name: "Show windows", exact: true })
          .click();
        await expect(table).toBeVisible();
        await expect(scroller).toBeVisible();
        await expect.poll(() => rows.count()).toBeLessThan(25);
        expect(errors).toEqual([]);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth + 1,
          ),
        ).toBe(false);
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        );
        await page.screenshot({
          path: `.artifacts/advanced-completion/virtual-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
      });
