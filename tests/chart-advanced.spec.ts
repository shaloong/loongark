import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { checkChartAdvanced } from "./chartAdvancedChecks";
for (const mode of ["light", "dark"])
  test(`Chart ${mode} 交互图例、范围、数据表与焦点`, async ({ page }) => {
    await page.goto(
      `/iframe.html?id=components-chart--interactive&globals=mode:${mode}`,
    );
    await checkChartAdvanced(page);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.goto(
      `/iframe.html?id=components-chart--disabled-controls&globals=mode:${mode}`,
    );
    const button = page.getByRole("button", { name: "Revenue", exact: true });
    await expect(button).toBeDisabled();
    await button.evaluate((el: HTMLButtonElement) => el.click());
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await page.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("table", { name: "Disabled chart controls" }),
    ).toBeVisible();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
