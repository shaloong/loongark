import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
async function tools(page: Page) {
  const details = page
    .locator("details")
    .filter({ has: page.getByText("More controls", { exact: true }) });
  if (!(await details.evaluate((node) => (node as HTMLDetailsElement).open)))
    await details.locator("summary").click();
}
export async function checkCodeEditor(page: Page) {
  const root = page.locator('[data-scope="editor"][data-kind="code"]'),
    input = root.getByRole("textbox", { name: "Source code", exact: true }),
    field = root.locator('textarea[data-part="form-value"]');
  await expect(root).toHaveAttribute("data-mounted", "true");
  await expect(root).not.toHaveAttribute("aria-busy", "true");
  const initial = await field.inputValue(),
    edited = 'const message = "edited";\nconsole.log(message);';
  await input.click();
  await input.press("ControlOrMeta+a");
  await page.keyboard.insertText(edited);
  await expect(field).toHaveValue(edited);
  await root.getByRole("button", { name: "Undo", exact: true }).click();
  await expect(field).toHaveValue(initial);
  await root.getByRole("button", { name: "Redo", exact: true }).click();
  await expect(field).toHaveValue(edited);
  await root.getByRole("button", { name: "Find", exact: true }).click();
  const search = root.locator('.cm-search input[name="search"]');
  await expect(search).toBeFocused();
  await search.fill("message");
  await search.press("Escape");
  await expect(input).toBeFocused();
  await page
    .getByRole("button", { name: "Submit document", exact: true })
    .click();
  await expect(page.getByLabel("Submitted value")).toHaveText(edited);
  await page
    .getByRole("button", { name: "Use controlled value", exact: true })
    .click();
  await tools(page);
  await page
    .getByRole("button", { name: "Reject updates", exact: true })
    .click();
  await input.click();
  await input.press("ControlOrMeta+a");
  await page.keyboard.insertText("rejected source");
  await expect(field).toHaveValue(edited);
  // 序列化桥接值尚未刷新也可能暂时相同，必须同时等待可见引擎恢复。
  await expect(input.locator(".cm-line")).toHaveCount(2);
  await expect(input.locator(".cm-line").first()).toHaveText(
    'const message = "edited";',
  );
  await page
    .getByRole("button", { name: "Accept updates", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Enable extension", exact: true })
    .click();
  await input.focus();
  await input.press("Alt+Enter");
  await expect(field).toHaveValue(/extension inserted/);
  await expect(page.getByLabel("Editor extensions")).toContainText(
    "1 shortcuts",
  );
  await page
    .getByRole("button", { name: "Disable extension", exact: true })
    .click();
  const withoutExtension = await field.inputValue();
  await input.focus();
  await input.press("Alt+Enter");
  await expect(field).toHaveValue(withoutExtension);
  const outside = page.getByRole("button", {
    name: "Set external value",
    exact: true,
  });
  await outside.click();
  await expect(field).toHaveValue('const external = "Updated from outside";');
  await expect(outside).toBeFocused();
  await page.getByRole("button", { name: "Read only", exact: true }).click();
  const readonly = await field.inputValue();
  await input.focus();
  await input.press("ControlOrMeta+z");
  await page.keyboard.insertText("forbidden");
  await expect(field).toHaveValue(readonly);
  await page
    .getByRole("button", { name: "Allow editing", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Clear required value", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Submit document", exact: true })
    .click();
  await expect(input).toBeFocused();
  await expect(input).toHaveAttribute("aria-invalid", "true");
  await expect(root.locator('[data-part="error"]')).toBeVisible();
  await page.getByRole("button", { name: "Reset form", exact: true }).click();
  await expect(field).toHaveValue(initial);
  await expect(
    root.getByRole("button", { name: "Undo", exact: true }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Fail syntax load", exact: true })
    .click();
  await expect(root.getByRole("status")).toContainText(
    "plain text editing remains available",
  );
  await input.click();
  await input.press("ControlOrMeta+a");
  await page.keyboard.insertText("plain text still works");
  await expect(field).toHaveValue("plain text still works");
  await page
    .getByRole("button", { name: "Load slow syntax", exact: true })
    .click();
  await expect(root).toHaveAttribute("aria-busy", "true");
  await page
    .getByRole("button", { name: "Hide editor", exact: true })
    .evaluate((node) => (node as HTMLButtonElement).click());
  await expect(root).toHaveCount(0);
  await expect(page.getByLabel("Editor lifecycle")).toContainText(
    "1 destroyed",
  );
  await expect(page.getByLabel("Editor lifecycle")).toContainText("1 canceled");
  await page.getByRole("button", { name: "Show editor", exact: true }).click();
  await expect(root).toHaveAttribute("data-mounted", "true");
  await expect(page.getByLabel("Editor lifecycle")).toContainText("2 mounted");
  await page
    .getByRole("button", { name: "Use JSON syntax", exact: true })
    .click();
  await expect(root).not.toHaveAttribute("aria-busy", "true");
  await page.getByRole("button", { name: "Use RTL", exact: true }).click();
  await expect(root).toHaveAttribute("dir", "rtl");
  await page
    .getByRole("button", { name: "Disable editor", exact: true })
    .click();
  await expect(input).toHaveAttribute("aria-disabled", "true");
  await expect(input).toHaveAttribute("tabindex", "-1");
  await page
    .getByRole("button", { name: "Enable editor", exact: true })
    .click();
  expect(
    (await new AxeBuilder({ page }).include('[data-scope="editor"]').analyze())
      .violations,
  ).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
}
export async function checkRichTextEditor(page: Page) {
  const root = page.locator('[data-scope="editor"][data-kind="rich"]'),
    input = root.getByRole("textbox", { name: "Document", exact: true }),
    field = root.locator('textarea[data-part="form-value"]');
  await expect(root).toHaveAttribute("data-mounted", "true");
  const initial = await field.inputValue();
  await input.click();
  await input.press("ControlOrMeta+a");
  await page.keyboard.insertText("A fresh document");
  await expect(input).toHaveText("A fresh document");
  await input.press("ControlOrMeta+a");
  await root.getByRole("button", { name: "Bold", exact: true }).click();
  await expect(input.locator("strong")).toHaveText("A fresh document");
  await root.getByRole("button", { name: "Undo", exact: true }).click();
  await expect(input.locator("strong")).toHaveCount(0);
  await root.getByRole("button", { name: "Redo", exact: true }).click();
  await expect(input.locator("strong")).toHaveText("A fresh document");
  await root.getByRole("button", { name: "Bullet list", exact: true }).click();
  await expect(input.locator("ul li")).toContainText("A fresh document");
  await root.getByRole("button", { name: "Bullet list", exact: true }).click();
  await expect(input.locator("ul")).toHaveCount(0);
  await input.click();
  await input.press("ControlOrMeta+a");
  await root.getByRole("button", { name: "Link", exact: true }).click();
  const url = root.getByRole("textbox", { name: "Link URL", exact: true });
  await expect(url).toBeFocused();
  await url.fill("javascript:alert(1)");
  await url.press("Enter");
  await expect(url).toHaveAttribute("aria-invalid", "true");
  await expect(input.locator("a")).toHaveCount(0);
  await url.fill("https://shaloong.com/docs");
  await url.press("Enter");
  await expect(input.locator("a")).toHaveAttribute(
    "href",
    "https://shaloong.com/docs",
  );
  await expect(input).toBeFocused();
  await page
    .getByRole("button", { name: "Submit document", exact: true })
    .click();
  const submitted = await page.getByLabel("Submitted value").textContent();
  expect(JSON.parse(submitted!)).toMatchObject({ type: "doc" });
  expect(submitted).toContain("https://shaloong.com/docs");
  await page
    .getByRole("button", { name: "Use controlled value", exact: true })
    .click();
  await tools(page);
  await page
    .getByRole("button", { name: "Reject updates", exact: true })
    .click();
  const accepted = await field.inputValue();
  await input.click();
  await input.press("ControlOrMeta+a");
  await page.keyboard.insertText("Rejected document");
  await expect(field).toHaveValue(accepted);
  await expect(input).toHaveText("A fresh document");
  await page
    .getByRole("button", { name: "Accept updates", exact: true })
    .click();
  const outside = page.getByRole("button", {
    name: "Set external value",
    exact: true,
  });
  await outside.click();
  await expect(input).toHaveText("External structured document");
  await expect(outside).toBeFocused();
  await input.click();
  await input.press("End");
  await input.press("Enter");
  await root.getByRole("button", { name: "Insert table", exact: true }).click();
  await expect(input.locator("table")).toHaveCount(1);
  await expect(input.locator("tr")).toHaveCount(3);
  await root.locator('[data-part="table-tools"] summary').click();
  await root
    .getByRole("button", { name: "Insert row below", exact: true })
    .click();
  await expect(input.locator("tr")).toHaveCount(4);
  await root
    .getByRole("button", { name: "Insert column after", exact: true })
    .click();
  await expect(input.locator("tr").first().locator("th,td")).toHaveCount(4);
  const cells = input.locator("tr").nth(1).locator("td");
  await cells.nth(0).click();
  await cells.nth(1).click({ modifiers: ["Shift"] });
  await root.getByRole("button", { name: "Merge cells", exact: true }).click();
  await expect(cells).toHaveCount(3);
  await expect(cells.first()).toHaveAttribute("colspan", "2");
  await root.getByRole("button", { name: "Split cell", exact: true }).click();
  await expect(cells).toHaveCount(4);
  const resizedCell = input.locator("tr").first().locator("th,td").first();
  await resizedCell.scrollIntoViewIfNeeded();
  const box = (await resizedCell.boundingBox())!;
  await page.mouse.move(box.x + box.width - 1, box.y + box.height / 2);
  await expect(input.locator(".column-resize-handle").first()).toBeVisible();
  await page.mouse.down();
  await page.mouse.move(box.x + box.width + 29, box.y + box.height / 2, {
    steps: 4,
  });
  await page.mouse.up();
  await expect
    .poll(async () => (await resizedCell.boundingBox())!.width)
    .toBeGreaterThan(box.width + 15);
  await expect(field).toHaveValue(/"colwidth":\[[1-9]/);
  const removeTable = root.getByRole("button", { name: "Delete table", exact: true });
  await expect(removeTable).toBeEnabled();
  await removeTable.evaluate(button => {
    button.addEventListener("click", event => {
      button.setAttribute("data-test-trusted-click", String(event.isTrusted));
    }, { once: true, capture: true });
  });
  // 列宽和滚动可能继续更新；由定位器在派发真实指针时检查稳定性、可用性和命中。
  await removeTable.click();
  await expect(removeTable).toHaveAttribute("data-test-trusted-click", "true");
  await expect(input.locator("table")).toHaveCount(0);
  await root.getByRole("button", { name: "Undo", exact: true }).click();
  await expect(input.locator("table")).toHaveCount(1);
  await page.getByRole("button", { name: "Read only", exact: true }).click();
  const readonly = await field.inputValue();
  await input.focus();
  await input.press("ControlOrMeta+z");
  await page.keyboard.insertText("forbidden");
  await expect(field).toHaveValue(readonly);
  await page
    .getByRole("button", { name: "Allow editing", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Clear required value", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Submit document", exact: true })
    .click();
  await expect(input).toBeFocused();
  await expect(input).toHaveAttribute("aria-invalid", "true");
  await page.getByRole("button", { name: "Reset form", exact: true }).click();
  await expect(field).toHaveValue(initial);
  await expect(
    root.getByRole("button", { name: "Undo", exact: true }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Clear required value", exact: true })
    .click();
  await input.focus();
  await input.pressSequentially("## ");
  await expect(input.locator("h2")).toHaveCount(1);
  // 外部清空后的原生聚焦必须把输入留在当前段落，不能产生额外空段落。
  await expect(input.locator(":scope > *")).toHaveCount(1);
  await input.press("Backspace");
  await expect(input.locator("h2")).toHaveCount(0);
  await expect(input).toHaveText("## ");
  await input.press("ControlOrMeta+a");
  await input.press("Backspace");
  await input.pressSequentially("- ");
  await expect(input.locator("ul li")).toHaveCount(1);
  await page.getByRole("button", { name: "Reset form", exact: true }).click();
  await expect(field).toHaveValue(initial);
  await page
    .getByRole("button", { name: "Enable custom rendering", exact: true })
    .click();
  await expect(input.locator("[data-custom-paragraph]")).toHaveCount(3);
  await expect(page.getByLabel("Editor extensions")).toContainText(
    "1 plugins mounted",
  );
  await page
    .getByRole("button", { name: "Disable custom rendering", exact: true })
    .click();
  await expect(input.locator("[data-custom-paragraph]")).toHaveCount(0);
  await expect(page.getByLabel("Editor extensions")).toContainText(
    "1 plugins destroyed",
  );
  await expect(page.getByLabel("Editor extensions")).toContainText(
    "3 node views destroyed",
  );
  await page
    .getByRole("button", { name: "Enable custom rendering", exact: true })
    .click();
  await expect(page.getByLabel("Editor extensions")).toContainText(
    "2 plugins mounted",
  );
  await page.getByRole("button", { name: "Hide editor", exact: true }).click();
  await expect(page.getByLabel("Editor extensions")).toContainText(
    "2 plugins destroyed",
  );
  await expect(page.getByLabel("Editor extensions")).toContainText(
    "6 node views destroyed",
  );
  await expect(root).toHaveCount(0);
  await expect(page.getByLabel("Editor lifecycle")).toContainText(
    "1 destroyed",
  );
  await page.getByRole("button", { name: "Show editor", exact: true }).click();
  await expect(root).toHaveAttribute("data-mounted", "true");
  await expect(page.getByLabel("Editor lifecycle")).toContainText("2 mounted");
  await page.getByRole("button", { name: "Use RTL", exact: true }).click();
  await expect(root).toHaveAttribute("dir", "rtl");
  await page
    .getByRole("button", { name: "Disable editor", exact: true })
    .click();
  await expect(input).toHaveAttribute("aria-disabled", "true");
  await expect(input).toHaveAttribute("tabindex", "-1");
  await page
    .getByRole("button", { name: "Enable editor", exact: true })
    .click();
  expect(
    (await new AxeBuilder({ page }).include('[data-scope="editor"]').analyze())
      .violations,
  ).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
}
