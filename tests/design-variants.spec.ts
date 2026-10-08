import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("变体中的禁用文字、分页和树选择语义", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const mode of ["light", "dark"]) {
    for (const id of [
      "clipboard--states",
      "tagsinput--disabled",
      "pagination--with-ellipsis",
      "progress--interactive",
      "treeview--variants",
    ]) {
      await page.goto(
        `/iframe.html?id=components-${id}&viewMode=story&globals=mode:${mode}`,
      );
      await page
        .locator("#loongark-primitive-neutral-system")
        .waitFor({ state: "attached" });
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa"])
            .analyze()
        ).violations,
        `${mode}: ${id}`,
      ).toEqual([]);
    }
    const checkbox = page.getByRole("checkbox", { name: "Select src" });
    await checkbox.click();
    await expect(checkbox).toHaveAttribute("aria-checked", "true");
    const branch = page
      .locator("[data-scope=tree-view][data-part=branch-control]")
      .last();
    await branch.focus();
    await page.keyboard.press("ArrowRight");
    await expect(branch).toHaveAttribute("data-state", "open");
    await page.goto(
      `/iframe.html?id=components-pagination--with-ellipsis&viewMode=story&globals=mode:${mode}`,
    );
    const last = page.getByRole("button", {
      name: "last page, page 10",
      exact: true,
    });
    await expect(last).toBeEnabled();
    await last.click();
    await expect(last).toHaveAttribute("aria-current", "page");
  }
});
