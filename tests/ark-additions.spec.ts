import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  checkImageCropper,
  checkJsonTreeView,
  checkArkUtilities,
  checkAdvancedSelection,
} from "./arkAdditionsChecks";
const examples = [
  ["ImageCropper", "components-imagecropper--basic", checkImageCropper],
  ["JsonTreeView", "components-jsontreeview--basic", checkJsonTreeView],
  ["Utilities", "compositions-ark-utilities--basic", checkArkUtilities],
  [
    "AdvancedSelection",
    "compositions-advanced-selection--basic",
    checkAdvancedSelection,
  ],
] as const;
for (const mode of ["light", "dark"])
  for (const [name, story, check] of examples)
    test(`${name} ${mode} 原生高级交互与语义`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story}&globals=mode:${mode}`);
      await check(page);
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    });
test("JsonTreeView 空对象和标量不会丢失语义", async ({ page }) => {
  for (const [story, text] of [
    ["empty", /\{\s*\}/],
    ["scalar", "null"],
  ]) {
    await page.goto(`/iframe.html?id=components-jsontreeview--${story}`);
    await expect(page.getByRole("tree")).toContainText(text);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  }
});
