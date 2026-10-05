import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
export async function checkDataTableQuery(page: Page) {
  const root = page.locator('[data-scope="data-table"][data-part="root"]');
  const rows = root.locator("tbody tr");
  const names = () => rows.locator("td:nth-child(2)").allInnerTexts();
  const project = root.getByRole("textbox", {
    name: "Filter Project",
    exact: true,
  });
  const revenue = root.getByRole("textbox", {
    name: "Filter Revenue",
    exact: true,
  });
  const team = root.getByRole("combobox", { name: "Filter Team", exact: true });
  const sortTeam = root.getByRole("button", { name: "Team", exact: true });
  const sortRevenue = root.getByRole("button", {
    name: "Revenue",
    exact: true,
  });
  await sortTeam.click();
  await sortRevenue.click({ modifiers: ["Shift"] });
  await expect.poll(names).toEqual(["Zeta", "Alpha", "Epsilon"]);
  await expect(root.locator("th[aria-sort]")).toHaveCount(1);
  await expect(sortTeam.locator('[data-part="sort-priority"]')).toHaveText("1");
  await expect(sortRevenue.locator('[data-part="sort-priority"]')).toHaveText(
    "2",
  );
  await sortRevenue.focus();
  await page.keyboard.press("Shift+Enter");
  await expect.poll(names).toEqual(["Zeta", "Gamma", "Alpha"]);
  await expect(sortRevenue).toHaveAttribute("aria-description", /desc.*2/i);
  await sortRevenue.press("Shift+Enter");
  await expect(sortRevenue.locator('[data-part="sort-priority"]')).toHaveCount(
    0,
  );
  // Space 保留主排序，且不再次触发原生 click。
  await sortRevenue.press("Shift+Space");
  await expect(sortRevenue).toHaveAttribute("aria-description", /asc.*2/i);
  await expect(sortTeam.locator('[data-part="sort-priority"]')).toHaveText("1");
  await sortRevenue.press("Shift+Enter");
  await sortRevenue.press("Shift+Enter");
  await team.selectOption({ label: "Design" });
  await expect.poll(names).toEqual(["Alpha", "Gamma", "Epsilon"]);
  await root
    .getByRole("combobox", { name: "Condition for Revenue", exact: true })
    .selectOption("gte");
  await revenue.pressSequentially("21");
  await expect(revenue).toBeFocused();
  await expect(revenue).toHaveValue("21");
  await expect.poll(names).toEqual(["Gamma"]);
  await project.pressSequentially("AM");
  await expect(project).toBeFocused();
  await expect.poll(names).toEqual(["Gamma"]);
  await project.fill("");
  await revenue.fill("-");
  await expect(revenue).toHaveAttribute("aria-invalid", "true");
  await expect(root.getByRole("alert")).toHaveText("Enter a finite number");
  await expect(revenue).toBeFocused();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await expect.poll(names).toEqual(["Alpha", "Gamma", "Epsilon"]);
  await revenue.fill("20");
  await expect(revenue).not.toHaveAttribute("aria-invalid");
  await page.getByRole("button", { name: "Reset query", exact: true }).click();
  await team.selectOption({ label: "Unassigned" });
  await expect.poll(names).toEqual(["Zeta"]);
  await team.selectOption({ label: "All options" });
  await expect(rows).toHaveCount(3);
  await root.getByRole("button", { name: "Next", exact: true }).click();
  await revenue.fill("-");
  await expect(revenue).toBeFocused();
  await expect(
    root.getByRole("button", { name: "Previous", exact: true }),
  ).toBeEnabled();
  await expect.poll(names).toEqual(["Delta", "Epsilon", "Zeta"]);
  await revenue.fill("10");
  await expect(
    root.getByRole("button", { name: "Previous", exact: true }),
  ).toBeDisabled();
  await expect.poll(names).toEqual(["Beta"]);
  await page.getByRole("button", { name: "Reset query", exact: true }).click();
  await root.getByRole("button", { name: "Next", exact: true }).click();
  await project.fill("Alpha");
  await expect.poll(names).toEqual(["Alpha"]);
  await expect(
    root.getByRole("button", { name: "Previous", exact: true }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Reject query updates", exact: true })
    .click();
  await project.fill("Rejected");
  await expect(project).toHaveValue("Alpha");
  await team.selectOption({ label: "Design" });
  await expect(team).toHaveValue("-1");
  await sortRevenue.click();
  await expect(root.locator("th[aria-sort]")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Allow query updates", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Start loading", exact: true })
    .click();
  await expect(project).toBeDisabled();
  await expect(team).toBeDisabled();
  await expect(sortRevenue).toBeDisabled();
  await page
    .getByRole("button", { name: "Finish loading", exact: true })
    .click();
  await page.getByRole("button", { name: "Hide table", exact: true }).click();
  await expect(root).toHaveCount(0);
  await page.getByRole("button", { name: "Show table", exact: true }).click();
  await expect(project).toHaveValue("Alpha");
  await page.getByRole("button", { name: "Reset query", exact: true }).click();
  await sortTeam.click();
  await sortRevenue.click({ modifiers: ["Shift"] });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    ),
  ).toBe(false);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
}
