import { test, expect } from "@playwright/test";
import { captureWidthFailure } from "./width-diagnostics";
import AxeBuilder from "@axe-core/playwright";
for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`chart window ${framework} ${mode} ${width}`, async ({ page }) => {
        test.skip(!process.env.STATIC_DIR, "四端消费构建后运行");
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(
          `/examples-${framework}/?example=ChartInteractionExample&mode=${mode}`,
        );
        const chart = page.locator('[data-scope="chart"]'),
          range = chart.locator('[data-part="range-status"]'),
          inspection = chart.locator('[data-part="inspection"]');
        const start = chart.getByRole("slider", {
            name: "Start category",
            exact: true,
          }),
          end = chart.getByRole("slider", {
            name: "End category",
            exact: true,
          }),
          select = chart.getByRole("combobox", {
            name: "Inspect category",
            exact: true,
          });
        await expect(range).toHaveText("Categories 1–12 of 12");
        await select.selectOption("4");
        await expect(inspection).toContainText("Sample 05");
        await expect(inspection).toContainText("Primary: 46; Secondary: 30");
        await chart.getByText("View chart data", { exact: true }).click();
        await expect(chart.locator("details")).toHaveAttribute("open", "");
        await chart.locator('[data-chart-index="4"]').first().hover();
        await expect(chart.getByRole("tooltip")).toContainText("Sample 05");
        const bounds = await chart.getByRole("tooltip").boundingBox();
        expect(bounds!.x).toBeGreaterThanOrEqual(0);
        expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1);
        await page.keyboard.press("Escape");
        await expect(chart.getByRole("tooltip")).toHaveCount(0);
        await chart
          .getByRole("button", { name: "Zoom in", exact: true })
          .click();
        await expect(range).toHaveText("Categories 4–9 of 12");
        await expect(
          chart.getByRole("button", { name: "Zoom in", exact: true }),
        ).toBeFocused();
        await expect(chart.locator("details")).toHaveAttribute("open", "");
        await expect(chart.getByRole("row")).toHaveCount(7);
        await expect(inspection).toContainText("Sample 05");
        await start.focus();
        await start.press("Home");
        await expect(range).toHaveText("Categories 1–9 of 12");
        await expect(start).toBeFocused();
        await end.focus();
        await end.press("Home");
        await expect(range).toHaveText("Categories 1–1 of 12");
        await expect(
          chart.getByRole("button", { name: "Zoom in", exact: true }),
        ).toBeDisabled();
        await expect(end).toBeFocused();
        await chart
          .getByRole("button", { name: "Reset zoom", exact: true })
          .click();
        await expect(range).toHaveText("Categories 1–12 of 12");
        const reject = page.getByRole("button", {
          name: "Reject range changes",
          exact: true,
        });
        await reject.click();
        await expect(
          page.getByRole("button", {
            name: "Accept range changes",
            exact: true,
          }),
        ).toBeFocused();
        await start.focus();
        await start.press("ArrowRight");
        await expect(
          page.getByText("Range change rejected", { exact: true }),
        ).toBeVisible();
        await expect(start).toHaveValue("0");
        await expect(start).toBeFocused();
        await expect(range).toHaveText("Categories 1–12 of 12");
        await page
          .getByRole("button", { name: "Accept range changes", exact: true })
          .click();
        await page
          .getByRole("button", { name: "Use uncontrolled range", exact: true })
          .click();
        await chart
          .getByRole("button", { name: "Zoom in", exact: true })
          .click();
        await expect(range).toHaveText("Categories 4–9 of 12");
        await chart
          .getByRole("button", { name: "Reset zoom", exact: true })
          .click();
        await expect(range).toHaveText("Categories 1–12 of 12");
        await page
          .getByRole("button", { name: "Use controlled range", exact: true })
          .click();
        await page
          .getByRole("button", { name: "Disable chart", exact: true })
          .click();
        await expect(start).toBeDisabled();
        await expect(select).toBeDisabled();
        await page
          .getByRole("button", { name: "Append point", exact: true })
          .click();
        await expect(
          page.getByText("13 samples", { exact: true }),
        ).toBeVisible();
        await expect(range).toHaveText("Categories 1–12 of 13");
        await page
          .getByRole("button", { name: "Enable chart", exact: true })
          .click();
        await chart
          .getByRole("button", { name: "Reset zoom", exact: true })
          .click();
        await expect(range).toHaveText("Categories 1–13 of 13");
        await page
          .getByRole("button", { name: "Trim data", exact: true })
          .click();
        await expect(range).toHaveText("Categories 1–6 of 6");
        await expect(select.locator("option")).toHaveCount(6);
        await page
          .getByRole("button", { name: "Clear data", exact: true })
          .click();
        await expect(start).toBeDisabled();
        await expect(select).toBeDisabled();
        await expect(chart.locator('[data-part="empty"]')).toHaveText(
          "No data",
        );
        await page
          .getByRole("button", { name: "Restore data", exact: true })
          .click();
        await expect(range).toHaveText("Categories 1–12 of 12");
        await page
          .getByRole("button", { name: "Use bars", exact: true })
          .click();
        await expect(chart.locator('[data-part="bar"]').first()).toBeVisible();
        await page
          .getByRole("button", { name: "Start live updates", exact: true })
          .click();
        const count = page
          .locator("output")
          .filter({ hasText: /^\d+ samples$/ });
        await expect
          .poll(async () => Number((await count.textContent())?.split(" ")[0]))
          .toBeGreaterThan(12);
        await page
          .getByRole("button", { name: "Stop live updates", exact: true })
          .click();
        const stopped = await count.textContent();
        await page.waitForTimeout(900);
        await expect(count).toHaveText(stopped!);
        await page
          .getByRole("button", { name: "Hide chart", exact: true })
          .click();
        await expect(chart).toHaveCount(0);
        await page
          .getByRole("button", { name: "Append point", exact: true })
          .click();
        await page
          .getByRole("button", { name: "Show chart", exact: true })
          .click();
        await expect(chart).toBeVisible();
        expect(errors).toEqual([]);
        const measured = await page.evaluate(() => ({
          scroll: document.documentElement.scrollWidth,
          viewport: innerWidth,
        }));
        if (measured.scroll > measured.viewport + 1)
          await captureWidthFailure(
            page,
            test.info(),
            measured.scroll,
            measured.viewport,
          );
        expect(measured.scroll > measured.viewport + 1).toBe(false);
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        );
        await page.screenshot({
          path: `.artifacts/advanced-completion/chart-window-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
      });
