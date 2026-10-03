import { test, expect } from "@playwright/test";
import {
  defaultScenario,
  scenarioTestIds,
} from "../examples/shared/demoScenario";
import { filterBarTestIds } from "../examples/shared/filterBarScenario";

const storyPath =
  "/iframe.html?id=examples-complete-demos-button-input-dialog--default&viewMode=story";
const filterBarStoryPath =
  "/iframe.html?id=examples-complete-demos-filter-bar--default&viewMode=story";

test.describe("ButtonInputDialog story", () => {
  test("renders helper texts and enables dialog button", async ({ page }) => {
    await page.goto(storyPath);
    await expect(page.getByTestId(scenarioTestIds.inputPrefix)).toHaveText(
      defaultScenario.prefixLabel,
    );

    const primaryButton = page.getByTestId(scenarioTestIds.primaryButton);
    await expect(primaryButton).toBeDisabled();

    await page
      .getByPlaceholder(defaultScenario.emailPlaceholder)
      .fill("user@loongark.dev");

    await expect(primaryButton).toBeEnabled();
    await primaryButton.click();

    await expect(page.getByTestId(scenarioTestIds.dialogTitle)).toHaveText(
      defaultScenario.dialogTitle,
    );
  });
});

test.describe("FilterBar story", () => {
  test("toggles chips and resets state", async ({ page }) => {
    await page.goto(filterBarStoryPath);

    const pendingChipId = filterBarTestIds.chip("pending");
    const pendingChip = page.getByTestId(pendingChipId);
    await pendingChip.click();
    await expect(pendingChip).toHaveAttribute("data-active", "true");

    const searchInput = page
      .getByTestId(filterBarTestIds.search)
      .locator("input");
    await searchInput.fill("Ark Workspaces");
    await expect(searchInput).toHaveValue("Ark Workspaces");

    await page.getByTestId(filterBarTestIds.secondaryAction).click();

    await expect(searchInput).toHaveValue("");
    await expect(
      page.getByTestId(filterBarTestIds.chip("all")),
    ).toHaveAttribute("data-active", "true");
  });
});
