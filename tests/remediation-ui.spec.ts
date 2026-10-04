import { auditRoot as resolveAuditRoot } from "./auditDirectory";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const auditRoot = resolveAuditRoot();

test("中性展示页明暗、窄屏和无障碍", async ({ page }) => {
  for (const mode of ["light", "dark", "high-contrast"]) {
    await page.setViewportSize({ width: 1200, height: 1000 });
    await page.goto(
      `/iframe.html?id=examples-neutral-gallery--overview&viewMode=story&globals=mode:${mode}`,
    );
    await expect(
      page.getByRole("heading", { name: "Workspace", exact: true }),
    ).toBeVisible();
    await page
      .locator("#loongark-primitive-button")
      .waitFor({ state: "attached" });
    expect(
      (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
        .violations,
    ).toEqual([]);
    await page.screenshot({
      animations: "disabled",
      path: `${auditRoot}/gallery-${mode}.png`,
      fullPage: true,
    });
    await page.setViewportSize({ width: 375, height: 812 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(375);
    await page.screenshot({
      animations: "disabled",
      path: `${auditRoot}/gallery-${mode}-mobile.png`,
      fullPage: true,
    });
  }
});

test("新增表格、右键菜单、确认弹窗及底部面板可操作", async ({ page }) => {
  await page.goto("/iframe.html?id=components-datatable--basic&viewMode=story");
  await page.getByRole("button", { name: "Revenue", exact: true }).click();
  await expect(
    page.locator('[data-scope="data-table"] tbody tr').first(),
  ).toContainText("Beta");
  await page.getByLabel("Filter rows").fill("missing");
  await expect(page.getByText("No results", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Next", exact: true }),
  ).toBeDisabled();
  await page.goto(
    "/iframe.html?id=components-contextmenu--basic&viewMode=story",
  );
  await page
    .getByText("Right-click here", { exact: true })
    .click({ button: "right" });
  await expect(page.getByRole("menuitem", { name: "Refresh" })).toBeVisible();
  await page.keyboard.press("Escape");
  await page.goto(
    "/iframe.html?id=components-alertdialog--basic&viewMode=story",
  );
  await page.getByRole("button", { name: "Delete workspace" }).click();
  await expect(page.getByRole("alertdialog")).toBeVisible();
  await page.mouse.click(4, 4);
  await expect(page.getByRole("alertdialog")).toBeVisible();
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(page.getByRole("alertdialog")).toBeHidden();
  for (const family of ["sheet", "drawer"]) {
    await page.goto(
      `/iframe.html?id=components-${family}--basic&viewMode=story`,
    );
    await page
      .getByRole("button", { name: `Open ${family}`, exact: true })
      .click();
    await expect(
      page.getByRole("dialog", { name: "Edit profile" }),
    ).toBeVisible();
    await page
      .getByRole("button", { name: "Save changes", exact: true })
      .click();
    await expect(page.getByRole("dialog")).toBeHidden();
  }
});

test("所有组件默认展示截图", async ({ page, request }) => {
  test.setTimeout(180000);
  const index = (await (await request.get("/index.json")).json()) as {
    entries: Record<string, { id: string; type: string; title: string }>;
  };
  const families = new Map<string, string>();
  for (const item of Object.values(index.entries))
    if (
      item.type === "story" &&
      item.title.startsWith("Components/") &&
      !families.has(item.title)
    )
      families.set(item.title, item.id);
  await page.setViewportSize({ width: 900, height: 650 });
  for (const [title, id] of families) {
    await page.goto(`/iframe.html?id=${id}&viewMode=story`);
    await page
      .locator("#loongark-primitive-button")
      .waitFor({ state: "attached" });
    await page.screenshot({
      animations: "disabled",
      path: `${auditRoot}/after-components/${title.slice(11).replaceAll(" ", "-").toLowerCase()}.png`,
    });
  }
});
