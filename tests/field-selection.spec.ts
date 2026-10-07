import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const framework of ["Story", "react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 320])
      test(`Field selection inheritance ${framework} ${mode} ${width}`, async ({
        page,
        browserName,
      }) => {
        test.skip(
          framework === "Story"
            ? !!process.env.STATIC_DIR
            : !process.env.STATIC_DIR,
        );
        await page.setViewportSize({ width, height: 1000 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(
          framework === "Story"
            ? `/iframe.html?id=components-field--inherited-selections&globals=mode:${mode}`
            : `/examples-${framework}/?example=FieldSelectionExample&mode=${mode}`,
        );
        const form = page.getByRole("form", { name: "Field preferences" });
        await expect(form).toBeVisible();
        const button = (name: string) =>
          page.getByRole("button", { name, exact: true });
        const checkbox = form.locator('input[name="agreement"]');
        const toggle = form.locator('input[name="notifications"]');
        const tags = form.locator("[data-scope=tags-input][data-part=input]");
        const radio = form.locator('input[name="density"]:checked');
        const group = form.getByTestId("field-radio-group");
        const values = () =>
          form.evaluate((n) =>
            Object.fromEntries(new FormData(n as HTMLFormElement)),
          );
        const defaults = {
          density: "compact",
          frameworks: "React, Vue, Solid",
        };
        await expect.poll(values).toEqual(defaults);
        await expect(group).toHaveJSProperty("tagName", "FIELDSET");
        await expect(group.locator(":scope > legend")).toHaveText(
          "Display density",
        );
        // 同一原生标签、帮助文本和错误描述必须指向现存且唯一的元素。
        const descriptions = async (invalid: boolean) => {
          for (const control of [checkbox, toggle, tags, group]) {
            await expect
              .poll(() =>
                control.evaluate((n) => {
                  const ids = (n.getAttribute("aria-describedby") ?? "")
                    .split(/\s+/)
                    .filter(Boolean);
                  return {
                    helper: ids.some((id) => id.endsWith("helper-text")),
                    error: ids.some((id) => id.endsWith("error-text")),
                    resolved: ids.every(
                      (id) => !!n.ownerDocument.getElementById(id),
                    ),
                  };
                }),
              )
              .toEqual({ helper: true, error: invalid, resolved: true });
          }
          const ids = await form
            .locator("[id]")
            .evaluateAll((ns) => ns.map((n) => n.id));
          expect(new Set(ids).size).toBe(ids.length);
        };
        await descriptions(false);
        await button("Disabled").click();
        for (const input of [checkbox, toggle, tags, radio])
          await expect(input).toBeDisabled();
        await expect.poll(values).toEqual({});
        for (const scope of ["switch", "tags-input"]) {
          await expect(
            form.locator(`[data-scope=${scope}][data-part=control]`),
          ).toHaveCSS("cursor", "not-allowed");
        }
        await button("Override Field state").click();
        // 原生 fieldset disabled 始终约束所有后代，单字段允许显式 false。
        for (const input of [checkbox, toggle, tags])
          await expect(input).toBeEnabled();
        await expect(radio).toBeDisabled();
        for (const scope of ["switch", "tags-input"]) {
          await expect(
            form.locator(`[data-scope=${scope}][data-part=control]`),
          ).not.toHaveCSS("cursor", "not-allowed");
        }
        await expect.poll(values).toEqual({ frameworks: defaults.frameworks });
        await button("Override Field state").click();
        await button("Disabled").click();
        await button("Read only").click();
        await expect(tags).toHaveJSProperty("readOnly", true);
        await expect(form.locator("[role=radiogroup]")).toHaveAttribute(
          "aria-readonly",
          "true",
        );
        for (const input of [checkbox, toggle]) {
          await input.press("Space");
          await expect(input).not.toBeChecked();
          await expect(input).toBeFocused();
        }
        await radio.press("ArrowRight");
        await expect(radio).toBeFocused();
        await tags.press("x");
        await expect(tags).toHaveValue("");
        await expect.poll(values).toEqual(defaults);
        await button("Override Field state").click();
        await expect(tags).toHaveJSProperty("readOnly", false);
        await checkbox.press("Space");
        await toggle.press("Space");
        await expect
          .poll(values)
          .toEqual({ agreement: "on", notifications: "on", ...defaults });
        await button("Override Field state").click();
        await button("Read only").click();
        await button("Required").click();
        for (const input of [
          checkbox,
          toggle,
          form.locator('input[name="frameworks"]'),
          radio,
        ])
          await expect(input).toHaveJSProperty("required", true);
        await expect
          .poll(() =>
            form.evaluate((n) => (n as HTMLFormElement).checkValidity()),
          )
          .toBe(true);
        await checkbox.press("Space");
        await expect
          .poll(() =>
            form.evaluate((n) => (n as HTMLFormElement).checkValidity()),
          )
          .toBe(false);
        await button("Submit preferences").click();
        await expect(checkbox).toBeFocused();
        await expect(page.getByLabel("Submitted preferences")).toHaveText("{}");
        await button("Override Field state").click();
        for (const input of [
          checkbox,
          toggle,
          form.locator('input[name="frameworks"]'),
          radio,
        ])
          await expect(input).toHaveJSProperty("required", false);
        await button("Submit preferences").click();
        await expect(page.getByLabel("Submitted preferences")).toHaveText(
          JSON.stringify({ notifications: "on", ...defaults }),
        );
        await button("Override Field state").click();
        await button("Required").click();
        await button("Invalid").click();
        await descriptions(true);
        for (const input of [checkbox, toggle, tags])
          await expect(input).toHaveAttribute("aria-invalid", "true");
        await tags.focus();
        await page.screenshot({
          path: `.artifacts/p0-field/invalid-${browserName}-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
        await button("Override Field state").click();
        for (const input of [checkbox, toggle, tags])
          await expect(input).not.toHaveAttribute("aria-invalid", "true");
        await button("Override Field state").click();
        await button("Invalid").click();
        await descriptions(false);
        // Field 只给自己的原生输入加边框，嵌套复合输入保持单一可见边框。
        await expect(tags).toHaveCSS("border-top-width", "0px");
        expect(
          await form.evaluate(
            (n) => n.ownerDocument.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        if (framework !== "Story" && width === 1280) {
          const accessibility = await new AxeBuilder({ page })
            .include('form[aria-label="Field preferences"]')
            .withTags(["wcag2a", "wcag2aa"])
            .analyze();
          expect(accessibility.violations).toEqual([]);
        }
      });

for (const framework of ["Story", "react", "vue", "solid", "svelte"])
  test(`Required empty serialized tags focus visible input ${framework}`, async ({
    page,
  }) => {
    test.skip(
      framework === "Story"
        ? !!process.env.STATIC_DIR
        : !process.env.STATIC_DIR,
    );
    const errors: string[] = [];
    page.on("console", (message) => {
      if (
        message.type() === "error" &&
        message.text().includes("not focusable")
      )
        errors.push(message.text());
    });
    await page.goto(
      framework === "Story"
        ? "/iframe.html?id=components-field--inherited-selections"
        : `/examples-${framework}/?example=FieldSelectionExample`,
    );
    const form = page.getByRole("form", { name: "Field preferences" });
    const input = form.locator("[data-scope=tags-input][data-part=input]");
    const hidden = form.locator("input[name=frameworks]");
    await page.getByRole("button", { name: "Required", exact: true }).click();
    await expect(hidden).toHaveJSProperty("required", true);
    await form
      .locator("[data-scope=tags-input][data-part=clear-trigger]")
      .click();
    await expect(hidden).toHaveValue("");
    await page
      .getByRole("button", { name: "Submit preferences", exact: true })
      .click();
    await page.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
    await expect(form.locator("input[name=agreement]")).toBeFocused();
    await form.locator("input[name=agreement]").press("Space");
    await form.locator("input[name=notifications]").press("Space");
    await page
      .getByRole("button", { name: "Submit preferences", exact: true })
      .click();
    await expect(input).toBeFocused();
    await expect(
      page.getByRole("status", { name: "Submitted preferences" }),
    ).toHaveText("{}");
    expect(errors).toEqual([]);
    await input.fill("Ark");
    await input.press("Enter");
    await expect(hidden).toHaveValue("Ark");
    await page
      .getByRole("button", { name: "Submit preferences", exact: true })
      .click();
    await expect
      .poll(() =>
        page
          .getByRole("status", { name: "Submitted preferences" })
          .textContent(),
      )
      .toBe(
        JSON.stringify({
          agreement: "on",
          notifications: "on",
          density: "compact",
          frameworks: "Ark",
        }),
      );
  });
