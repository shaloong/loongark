import { readFileSync } from "node:fs";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const mappings: Record<string, { basic: string }> = JSON.parse(
  readFileSync("examples/reference-examples.json", "utf8"),
);
for (const framework of ["react", "vue", "solid", "svelte"]) {
  test(`${framework} 119 个组件独立基础示例`, async ({ page }) => {
    test.skip(!process.env.STATIC_DIR);
    test.setTimeout(300000);
    await page.setViewportSize({ width: 375, height: 900 });
    const failures: string[] = [];
    let family = "";
    page.on("pageerror", (error) =>
      failures.push(`${family}: ${error.message}`),
    );
    for (const [name, entry] of Object.entries(mappings)) {
      family = name;
      await page.goto(`/examples-${framework}/?example=${entry.basic}`);
      await expect(page.locator("[data-example-name]")).toHaveAttribute(
        "data-example-name",
        entry.basic,
      );
      await page.evaluate(
        () =>
          new Promise<void>((r) =>
            requestAnimationFrame(() => requestAnimationFrame(() => r())),
          ),
      );
      if (
        !(await page.locator("[data-example-content]").innerText()) &&
        !(await page
          .locator(
            "[data-example-content] select, [data-example-content] input, [data-example-content] svg, [data-example-content] iframe, [data-example-content] img",
          )
          .count())
      )
        failures.push(`${name}: 内容未渲染`);
      if (["Tooltip", "Popover", "Menu", "Menubar"].includes(name)) {
        const trigger = page.locator("[data-part=trigger]").first();
        await expect(trigger, `${name}: 实际触发器`).toBeVisible();
        await expect(trigger).toHaveJSProperty("tabIndex", 0);
      }
      if (await page.locator("button button").count())
        failures.push(`${name}: 嵌套按钮`);
      if (
        [
          "Button",
          "Input",
          "Checkbox",
          "Combobox",
          "Select",
          "TagsInput",
          "Questionnaire",
          "DataTable",
          "Chart",
          "NumberInput",
          "PasswordInput",
          "Textarea",
        ].includes(name)
      ) {
        const axe = await new AxeBuilder({ page }).analyze();
        for (const v of axe.violations.filter(
          (v) => v.impact === "serious" || v.impact === "critical",
        ))
          failures.push(`${name}: ${v.id}`);
      }
    }
    expect(failures).toEqual([]);
  });
  test(`${framework} 基础代码实际绑定与表单交互`, async ({ page }) => {
    test.skip(!process.env.STATIC_DIR);
    const open = async (family: string) =>
      page.goto(`/examples-${framework}/?example=${mappings[family].basic}`);
    await open("NativeSelect");
    const nativeSelect = page.getByRole("combobox", { name: "方案" });
    await expect(nativeSelect).toHaveValue("free");
    await nativeSelect.selectOption("pro");
    await expect(nativeSelect).toHaveValue("pro");
    await open("Direction");
    const rtlSelect = page.getByRole("combobox", { name: "从右向左的选项" });
    await expect(rtlSelect).toHaveCSS("direction", "rtl");
    await open("Tooltip");
    const tooltipTrigger = page.locator(
      '[data-scope="tooltip"][data-part="trigger"]',
    );
    await tooltipTrigger.focus();
    await expect(page.getByRole("tooltip")).toContainText("支持键盘聚焦");
    await tooltipTrigger.press("Escape");
    await expect(page.getByRole("tooltip")).toBeHidden();
    await open("Popover");
    await page.getByRole("button", { name: "打开详情" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("button", { name: "关闭" }).click();
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(page.getByRole("button", { name: "打开详情" })).toBeFocused();
    await open("Menu");
    const menuTrigger = page.getByRole("button", { name: "操作" });
    await menuTrigger.focus();
    await menuTrigger.press("ArrowDown");
    await expect(page.getByRole("menuitem", { name: "复制" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menuTrigger).toBeFocused();
    await open("Combobox");
    await page.getByRole("combobox").fill("北京");
    await expect(page.getByRole("option", { name: "北京" })).toBeVisible();
    await expect(page.getByRole("option", { name: "上海" })).toHaveCount(0);
    await page.getByRole("option", { name: "北京" }).click();
    await expect(page.getByRole("combobox")).toHaveValue("北京");
    await open("Select");
    await page.getByRole("combobox").click();
    await page.getByRole("option", { name: "上海" }).click();
    await expect(page.locator('[data-part="value-text"]')).toContainText(
      "上海",
    );
    await open("TagsInput");
    const input = page.getByRole("textbox");
    await input.fill("Solid");
    await input.press("Enter");
    await expect(
      page.getByRole("button", { name: "移除 Solid" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "移除 Solid" }).click();
    await expect(page.getByRole("button", { name: "移除 Solid" })).toHaveCount(
      0,
    );
    await open("Questionnaire");
    await page.getByLabel("姓名").fill("小林");
    await page.getByRole("button", { name: "Next", exact: true }).click();
    await page.getByLabel("建议").fill("继续完善文档");
    await page.getByRole("button", { name: /submit|提交/i }).click();
    await expect(page.getByRole("status")).toContainText("Thank you");
    await open("Toast");
    await page.getByRole("button", { name: "显示通知" }).click();
    await expect(page.getByText("已保存", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "关闭", exact: true }).click();
    await expect(page.getByText("已保存", { exact: true })).toHaveCount(0);
  });
}
