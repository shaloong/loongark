import {
  checkImageCropper,
  checkJsonTreeView,
  checkArkUtilities,
  checkAdvancedSelection,
  checkSegmentGroup,
} from "./arkAdditionsChecks";
import { auditDirectory } from "./auditDirectory";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { checkSelectionInputs } from "./selectionInputChecks";
import { checkChart } from "./chartChecks";
import { checkDataTable } from "./dataTableChecks";
import { checkConversation } from "./conversationChecks";
import { checkActionMedia } from "./actionMediaChecks";
import { mkdir } from "node:fs/promises";
for (const framework of ["react", "vue", "solid", "svelte"])
  test(`${framework} 全部现有组件示例运行`, async ({ page, request }) => {
    test.skip(!process.env.STATIC_DIR, "通过四端消费服务器运行");
    test.setTimeout(180000);
    const names = (await (await request.get("/examples-index.json")).json())[
      framework
    ] as string[];
    const failures: string[] = [];
    let current = "";
    page.on("pageerror", (error) =>
      failures.push(current + ": " + (error.stack ?? error.message)),
    );
    for (const name of names) {
      current = name;
      await page.goto(`/examples-${framework}/?example=${name}`);
      try {
        await expect(page.locator("[data-example-name]")).toHaveText(name);
      } catch {
        failures.push(name + ": 页面未完成渲染");
        continue;
      }
      await page.evaluate(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          ),
      );
      if (!(await page.locator("[data-example-content] [data-scope]").count()))
        failures.push(name + ": 没有组件内容");
      if (await page.locator("button button").count())
        failures.push(name + ": 嵌套按钮");

      if (name === "ChartExample") await checkChart(page, framework);
      if (name === "DataTableExample") await checkDataTable(page, framework);
      if (name === "ConversationExample") {
        await checkConversation(page, framework);
      }
      if (name === "ActionMediaExample") {
        await page.setViewportSize({ width: 900, height: 900 });
        await checkActionMedia(page);
        await mkdir(auditDirectory("2026-10-03/action-media"), {
          recursive: true,
        });
        await page.screenshot({
          path:
            auditDirectory("2026-10-03/action-media") +
            "/action-" +
            framework +
            "-mobile.png",
          fullPage: true,
          animations: "disabled",
        });
        await page.setViewportSize({ width: 1280, height: 720 });
      }
      if (name === "SelectionInputsExample") {
        await page.setViewportSize({ width: 900, height: 900 });
        await checkSelectionInputs(page);
        const root = auditDirectory("2026-10-03/action-media");
        await mkdir(root, { recursive: true });
        await page.screenshot({
          path: root + "/" + framework + "-mobile.png",
          fullPage: true,
          animations: "disabled",
        });
        await page.setViewportSize({ width: 1280, height: 720 });
      }
      if (name === "FoundationsExample") {
        const textarea = page.getByRole("textbox", {
          name: "Notes",
          exact: true,
        });
        await textarea.fill("hello\nworld");
        await expect(page.getByTestId("notes-count")).toHaveText(
          "11 characters",
        );
        expect(
          await page
            .locator("form")
            .evaluate((el) => new FormData(el as HTMLFormElement).get("notes")),
        ).toBe("hello\nworld");
        await page
          .getByRole("button", { name: "Remove Design", exact: true })
          .press("Enter");
        await expect(
          page.getByRole("button", { name: "Restore Design", exact: true }),
        ).toBeVisible();
        await expect(page.getByTestId("submitted")).toHaveText("0");
        await page
          .getByRole("button", { name: "Members", exact: true })
          .click();
        await expect(
          page.getByRole("button", { name: "Members", exact: true }),
        ).toHaveAttribute("aria-pressed", "true");
        await page
          .getByRole("link", { name: "Settings", exact: true })
          .press("Enter");
        await expect(
          page.getByRole("link", { name: "Settings", exact: true }),
        ).toHaveAttribute("aria-current", "page");
        await expect(
          page.getByRole("link", { name: "Home", exact: true }),
        ).not.toHaveAttribute("aria-current", "page");
        await page.setViewportSize({ width: 375, height: 812 });
        await expect
          .poll(() =>
            page
              .locator("[data-scope=grid]")
              .evaluate(
                (el) =>
                  getComputedStyle(el).gridTemplateColumns.split(" ").length,
              ),
          )
          .toBe(1);
        expect(
          (
            await new AxeBuilder({ page })
              .withTags(["wcag2a", "wcag2aa"])
              .analyze()
          ).violations,
        ).toEqual([]);
        await page.screenshot({
          path:
            auditDirectory("2026-10-03/action-media") +
            "/foundations-" +
            framework +
            "-mobile.png",
          fullPage: true,
          animations: "disabled",
        });
        await page.setViewportSize({ width: 1280, height: 720 });
      }
      if (name === "ImageCropperExample")
        await checkImageCropper(page, framework);
      if (name === "JsonTreeViewExample") await checkJsonTreeView(page);
      if (name === "ArkUtilitiesExample") await checkArkUtilities(page);
      if (name === "AdvancedSelectionExample")
        await checkAdvancedSelection(page);
      if (name === "SegmentGroupExample") await checkSegmentGroup(page);
      if (name === "ColorPickerExample") {
        await page
          .locator("[data-scope=color-picker][data-part=trigger]")
          .click();
        await expect(
          page.locator("[data-scope=color-picker][data-part=area]"),
        ).toBeVisible();
        await expect
          .poll(() =>
            page
              .locator("[data-scope=color-picker][data-part=area-background]")
              .evaluate((el) => el.getBoundingClientRect().height),
          )
          .toBeGreaterThan(100);
        expect(
          (
            await new AxeBuilder({ page })
              .withTags(["wcag2a", "wcag2aa"])
              .analyze()
          ).violations,
        ).toEqual([]);
      }
      if (name === "ListboxExample") {
        const items = page.locator("[data-scope=listbox][data-part=item]");
        await expect(items.first()).toHaveAttribute("data-selected", "");
        await items.nth(1).click();
        await expect(items.nth(1)).toHaveAttribute("data-selected", "");
      }
      if (name === "StepsExample") {
        await page
          .locator("[data-scope=steps][data-part=next-trigger]")
          .click();
        await expect(
          page.getByRole("tab", { name: "Workspace", exact: true }),
        ).toHaveAttribute("aria-selected", "true");
        await expect(
          page.locator("[data-scope=steps][data-part=content]").nth(1),
        ).toBeVisible();
        expect(
          (
            await new AxeBuilder({ page })
              .withTags(["wcag2a", "wcag2aa"])
              .analyze()
          ).violations,
        ).toEqual([]);
      }
    }
    console.log(`${framework}: ${names.length} 个组件示例已运行`);
    expect(failures).toEqual([]);
  });
