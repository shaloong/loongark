import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const allViews = [
  { mode: "light", width: 1280 },
  { mode: "light", width: 375 },
  { mode: "dark", width: 1280 },
  { mode: "dark", width: 375 },
];
const views =
  process.env.FRAMEWORK_TEST_SUITE === "critical"
    ? allViews.filter((view) => view.mode === "dark" && view.width === 375)
    : allViews;
for (const framework of ["Story", "react", "vue", "solid", "svelte"])
  for (const { mode, width } of views)
    test(`Ticket workflow ${framework} ${mode} ${width}`, async ({
      page,
    }, info) => {
      test.skip(
        framework === "Story"
          ? !!process.env.STATIC_DIR
          : !process.env.STATIC_DIR,
      );
      await page.setViewportSize({ width, height: 900 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(
        framework === "Story"
          ? `/iframe.html?id=compositions-ticket-workflow--basic&globals=mode:${mode}`
          : `/examples-${framework}/?example=TicketWorkflowExample&mode=${mode}&strict=true`,
      );
      const search = page.getByRole("searchbox", { name: "搜索工单" });
      const trigger = page.getByRole("button", {
        name: "编辑所选工单",
        exact: true,
      });
      await expect(trigger).toBeDisabled();
      await expect(page.getByRole("textbox", { name: "Filter rows", exact: true })).toHaveCount(0);
      await search.fill("不存在");
      await expect(
        page.getByText("找到 0 条工单", { exact: true }),
      ).toBeVisible();
      await search.fill("");
      await page
        .getByRole("combobox", { name: "状态筛选" })
        .selectOption("已解决");
      await expect(
        page.getByText("找到 1 条工单", { exact: true }),
      ).toBeVisible();
      await page.getByRole("combobox", { name: "状态筛选" }).selectOption("");
      const row = page.getByRole("row").filter({ hasText: "T-101" });
      await row.getByRole("checkbox").check();
      await trigger.click();
      const dialog = page.getByRole("dialog", { name: "编辑工单 T-101" });
      await expect(dialog).toBeVisible();
      await expect(dialog).toHaveCSS("opacity", "1");
      const title = dialog.getByRole("textbox", {
        name: "标题",
        exact: true,
      });
      const email = dialog.getByRole("textbox", {
        name: "联系邮箱",
        exact: true,
      });
      const save = dialog.getByRole("button", {
        name: "保存工单",
        exact: true,
      });
      await title.fill("");
      await email.fill("bad");
      await save.click();
      await expect(title).toBeFocused();
      await expect(title).toHaveAttribute("aria-invalid", "true");
      await expect(title).toHaveAccessibleDescription(/标题至少需要 3 个字符/);
      await expect(email).toHaveAccessibleDescription(/请输入有效的联系邮箱/);
      expect(
        (
          await new AxeBuilder({ page })
            .include('[data-scope="dialog"][data-part="content"]')
            .analyze()
        ).violations,
      ).toEqual([]);
      await page.screenshot({
        path: `.artifacts/ticket-workflow/${info.project.name}/${framework}-${mode}-${width}-validation.png`,
      });
      await title.fill("尚未保存");
      await dialog
        .getByRole("button", { name: "重置修改", exact: true })
        .click();
      await expect(title).toHaveValue("更新项目文档");
      await expect(email).toHaveValue("docs@example.com");
      await title.fill("已验收的新标题");
      await dialog
        .getByRole("button", { name: "模拟下次保存失败", exact: true })
        .click();
      await save.click();
      await expect(dialog.getByRole("alert")).toHaveText(
        "保存失败，草稿已保留，请重试",
      );
      await expect(title).toHaveValue("已验收的新标题");
      await save.click();
      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();
      await expect(row).toContainText("已验收的新标题");
      await expect(
        page.getByRole("status").filter({ hasText: "已保存工单 T-101" }),
      ).toBeVisible();
      await trigger.click();
      await expect(dialog).toHaveCSS("opacity", "1");
      await page.clock.install();
      await page.clock.pauseAt(new Date(Date.now() + 1000));
      await title.fill("取消中的修改");
      await save.click();
      await expect(
        dialog.getByRole("button", { name: "保存中…", exact: true }),
      ).toBeDisabled();
      await dialog.getByRole("button", { name: "取消", exact: true }).click();
      await page.clock.runFor(400);
      await page.clock.resume();
      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();
      await expect(row).toContainText("已验收的新标题");
      await trigger.click();
      await expect(title).toHaveValue("已验收的新标题");
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(
        page.locator('[data-scope="dialog"][data-part="content"]'),
      ).toBeHidden();
      await expect(trigger).toBeFocused();
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        )
        .toBe(true);
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
      expect(errors).toEqual([]);
      await page.screenshot({
        path: `.artifacts/ticket-workflow/${info.project.name}/${framework}-${mode}-${width}-saved.png`,
      });
    });
