import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
export async function checkDataTableStructure(page: Page, captureName: string) {
  const table = page.getByRole("table", { name: "Structured projects" });
  const group = () =>
    table
      .locator('tr[data-row-kind="group"]')
      .filter({ hasText: "Team: Design" });
  await expect(group()).toContainText("Team: Design · 3 rows");
  await expect(group().locator('td[data-align="end"]')).toHaveText("3000");
  await expect(group().getByRole("checkbox")).toHaveCount(0);
  await expect(group().locator('[data-part="cell-trigger"]')).toHaveCount(0);
  const selectPage = table.getByRole("checkbox", {
    name: "Select current page",
  });
  await selectPage.check();
  await expect(page.getByLabel("Selected rows")).toHaveText(
    "Selected: atlas, tokens, accessibility, mobile, mobile-check",
  );
  await table
    .getByRole("button", {
      name: "Collapse Team: Design · 3 rows",
      exact: true,
    })
    .press("Space");
  await expect(
    table.getByRole("button", {
      name: "Expand Team: Design · 3 rows",
      exact: true,
    }),
  ).toBeFocused();
  await expect(
    table.getByRole("checkbox", { name: "Select tokens", exact: true }),
  ).toHaveCount(0);
  await expect(page.getByLabel("Selected rows")).toContainText("tokens");
  await table
    .getByRole("button", { name: "Expand Team: Design · 3 rows", exact: true })
    .press("Space");
  await expect(
    table.getByRole("button", {
      name: "Collapse Team: Design · 3 rows",
      exact: true,
    }),
  ).toBeFocused();
  await table
    .getByRole("button", {
      name: "Collapse Team: Design · 3 rows",
      exact: true,
    })
    .press("Space");
  await expect(
    table.getByRole("button", {
      name: "Expand Team: Design · 3 rows",
      exact: true,
    }),
  ).toBeFocused();
  await selectPage.uncheck();
  await expect(page.getByLabel("Selected rows")).toHaveText(
    "Selected: atlas, tokens, accessibility",
  );
  await page.getByRole("button", { name: "Reset data", exact: true }).click();
  await page
    .getByRole("button", { name: "Reject expansion", exact: true })
    .click();
  await table
    .getByRole("button", {
      name: "Collapse Team: Design · 3 rows",
      exact: true,
    })
    .click();
  await expect(
    table.getByRole("button", {
      name: "Collapse Team: Design · 3 rows",
      exact: true,
    }),
  ).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByLabel("Expansion state")).toContainText("Changes: 4");
  await page
    .getByRole("button", { name: "Allow expansion", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Start loading", exact: true })
    .click();
  await expect(
    table.getByRole("button", {
      name: "Collapse Team: Design · 3 rows",
      exact: true,
    }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Finish loading", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Remove token row", exact: true })
    .click();
  await expect(group()).toContainText("Team: Design · 2 rows");
  await expect(group().locator('td[data-align="end"]')).toHaveText("1800");
  await page.getByRole("button", { name: "Reset data", exact: true }).click();
  await table.getByRole("button", { name: "Budget", exact: true }).click();
  await expect(
    table
      .locator('tr[data-row-kind="group"]')
      .first()
      .locator('td[data-align="end"]'),
  ).toHaveText("400");
  await table
    .getByRole("button", { name: "Team", exact: true })
    .press("Shift+Enter");
  await expect(
    table.getByRole("button", { name: "Team", exact: true }),
  ).toHaveAttribute("aria-description", /priority 2/);
  await page.getByRole("button", { name: "Reset data", exact: true }).click();
  const budget = page.getByRole("textbox", {
    name: "Filter Budget",
    exact: true,
  });
  await page
    .getByRole("combobox", { name: "Condition for Budget", exact: true })
    .selectOption("gte");
  await budget.fill("900");
  await expect(group()).toContainText("Team: Design · 2 rows");
  await expect(group().locator('td[data-align="end"]')).toHaveText("2200");
  await budget.fill("");
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(table).toContainText(
    "Documentation with a longer project description",
  );
  await expect(
    table.getByRole("button", {
      name: "Collapse Team: Operations · 1 row",
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Previous", exact: true }).click();
  await page.screenshot({
    path: `.artifacts/advanced-completion/structure-group-${captureName}.png`,
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Show tree rows", exact: true })
    .click();
  await expect(table.locator('tr[data-row-kind="group"]')).toHaveCount(0);
  await expect(
    table.getByRole("button", { name: "Collapse atlas", exact: true }),
  ).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("button", { name: "Collapse all", exact: true }).click();
  await expect(
    table.getByRole("checkbox", { name: "Select tokens", exact: true }),
  ).toHaveCount(0);
  const filter = page.getByRole("textbox", {
    name: "Filter Project",
    exact: true,
  });
  const globalFilter = page.getByRole("textbox", {
    name: "Filter rows",
    exact: true,
  });
  await globalFilter.fill("a");
  await expect(
    table.getByRole("button", { name: "Collapse atlas", exact: true }),
  ).toBeDisabled();
  await expect(
    table.getByRole("checkbox", { name: "Select tokens", exact: true }),
  ).toHaveCount(1);
  await expect(page.getByLabel("Expansion state")).toContainText(
    "Expanded rows: 0",
  );
  await globalFilter.fill("");
  await filter.fill("keyboard");
  await expect(
    table.getByRole("button", { name: "Collapse mobile", exact: true }),
  ).toBeDisabled();
  await expect(table).toContainText("Mobile workspace");
  await expect(table).toContainText("Mobile keyboard checks");
  await expect(page.getByLabel("Expansion state")).toContainText(
    "Expanded rows: 0",
  );
  await filter.fill("");
  await expect(
    table.getByRole("button", { name: "Expand mobile", exact: true }),
  ).toBeEnabled();
  await expect(
    table.getByRole("checkbox", {
      name: "Select mobile-check",
      exact: true,
    }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Expand all", exact: true }).click();
  const child = table.getByRole("button", {
    name: /^Edit Project for tokens:/,
  });
  await child.click();
  const input = table.getByRole("textbox", {
    name: "Edit Project for tokens",
    exact: true,
  });
  await input.fill("Tokens edited in hierarchy");
  await input.press("Enter");
  await expect(table).toContainText("Tokens edited in hierarchy");
  // 从子行获得的焦点因外部折叠移除，恢复同一棵树的可见父按钮。
  await table
    .getByRole("button", { name: /^Edit Project for tokens:/ })
    .focus();
  await page
    .getByRole("button", { name: "Collapse all", exact: true })
    .evaluate((node: HTMLButtonElement) => node.click());
  await expect(
    table.getByRole("button", { name: "Expand atlas", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Expand all", exact: true }).click();
  await page.getByRole("button", { name: "Use RTL", exact: true }).click();
  await page
    .getByRole("button", { name: "Enable virtualization", exact: true })
    .click();
  await expect(table).toHaveAttribute("aria-rowcount", "6");
  // 缩进、展开与编辑图标不能把常见单词挤成单字断行。
  const textWidth = await child.evaluate((button) => {
    const style = getComputedStyle(button),
      canvas = document.createElement("canvas"),
      context = canvas.getContext("2d")!;
    context.font = style.font;
    return {
      available:
        button.getBoundingClientRect().width -
        button.querySelector("svg")!.getBoundingClientRect().width -
        parseFloat(style.gap),
      word: context.measureText("Tokens").width,
    };
  });
  expect(textWidth.available).toBeGreaterThanOrEqual(textWidth.word);

  await table
    .getByRole("button", { name: "Collapse atlas", exact: true })
    .press("Enter");
  await expect(
    table.getByRole("button", { name: "Expand atlas", exact: true }),
  ).toBeFocused();
  await expect(table).toHaveAttribute("aria-rowcount", "4");
  await page
    .getByRole("button", { name: "Use internal expansion", exact: true })
    .click();
  await table
    .getByRole("button", { name: "Expand atlas", exact: true })
    .click();
  await table
    .getByRole("button", { name: "Collapse atlas", exact: true })
    .click();
  await expect(
    table.getByRole("button", { name: "Expand atlas", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Hide table", exact: true }).click();
  await expect(table).toHaveCount(0);
  await page.getByRole("button", { name: "Show table", exact: true }).click();
  await expect(
    table.getByRole("button", { name: "Collapse atlas", exact: true }),
  ).toBeVisible();
  const axe = await new AxeBuilder({ page }).analyze();
  expect(axe.violations).toEqual([]);
}
