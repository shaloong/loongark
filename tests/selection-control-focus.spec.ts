import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const framework of ["Story", "react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 320])
      test(`native selection focus and form ${framework} ${mode} ${width}`, async ({
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
            ? `/iframe.html?id=components-radiogroup--responsive-controls&globals=mode:${mode}`
            : `/examples-${framework}/?example=SelectionControlsExample&mode=${mode}`,
        );
        const form = page.getByRole("form", { name: "Selection preferences" });
        await expect(form).toBeVisible();
        const entries = () =>
          form.evaluate((n) =>
            Object.fromEntries(new FormData(n as HTMLFormElement)),
          );
        const focus = async (scope: string) => {
          const input = form
            .locator(
              `[data-scope=${scope}] input:checked, [data-scope=${scope}] input`,
            )
            .first();
          await expect(input).toBeFocused();
          await expect
            .poll(() =>
              input.evaluate((n) => {
                const c = n.parentElement!.querySelector(
                  "[data-part=control],[data-part=item-control]",
                )!;
                return getComputedStyle(c).outlineStyle;
              }),
            )
            .toBe("solid");
          await page.screenshot({
            path: `.artifacts/p0-selection/focus-${browserName}-${framework}-${mode}-${width}-${scope}.png`,
            fullPage: true,
          });
          return input;
        };
        // 通过真实 Tab 到达视觉隐藏的原生输入，而不是程序化给 Control 焦点。
        await form.evaluate((n) => {
          const b = document.createElement("button");
          b.textContent = "Focus start";
          b.dataset.selectionStart = "";
          n.before(b);
        });
        const start = page.locator("[data-selection-start]");
        await start.focus();
        await start.press("Tab");
        const checkbox = await focus("checkbox");
        await checkbox.press("Space");
        await expect(checkbox).toBeChecked();
        await checkbox.press("Tab");
        const toggle = await focus("switch");
        await toggle.press("Space");
        await expect(toggle).toBeChecked();
        await toggle.press("Tab");
        const radio = await focus("radio-group");
        await radio.press("ArrowRight");
        await expect.poll(entries).toEqual({
          agreement: "on",
          notifications: "on",
          density: "comfortable",
          frameworks: "React, Vue, Solid",
        });
        await start.evaluate((n) => n.remove());
        await page.getByText("More controls", { exact: true }).click();
        const button = (name: string) =>
          page.getByRole("button", { name, exact: true });
        await button("Reject updates").click();
        const tags = form.locator("[data-scope=tags-input][data-part=input]");
        await tags.fill("Rejected framework");
        await tags.press("Enter");
        await expect(
          form.locator("[data-scope=tags-input][data-part=item]"),
        ).toHaveCount(3);

        await checkbox.press("Space");
        await toggle.press("Space");
        await form
          .locator("[data-scope=radio-group] input:checked")
          .press("ArrowRight");
        await expect.poll(entries).toEqual({
          agreement: "on",
          notifications: "on",
          density: "comfortable",
          frameworks: "React, Vue, Solid",
        });
        await expect(checkbox).toBeChecked();
        await expect(toggle).toBeChecked();
        await form.evaluate((n) => (n as HTMLFormElement).reset());
        await expect.poll(entries).toEqual({
          agreement: "on",
          notifications: "on",
          density: "comfortable",
          frameworks: "React, Vue, Solid",
        });
        await button("Reject updates").click();
        await button("Read only").click();
        await expect(tags).toHaveJSProperty("readOnly", true);
        await expect(
          form.locator("[data-scope=radio-group][data-part=root]"),
        ).toHaveAttribute("aria-readonly", "true");
        // 按实际 DOM 的 Tab 顺序检查只读控件，避免程序化跳转留下标签输入的待运行焦点任务。
        await form.evaluate((n) => {
          const b = document.createElement("button");
          b.textContent = "Focus start";
          b.dataset.selectionStart = "";
          n.before(b);
        });
        await start.focus();
        await page.keyboard.press("Tab");
        await expect(checkbox).toBeFocused();
        await page.keyboard.press("Space");
        await page.keyboard.press("Tab");
        await expect(toggle).toBeFocused();
        await page.keyboard.press("Space");
        await page.keyboard.press("Tab");
        const readonlyRadio = form.locator(
          "[data-scope=radio-group] input:checked",
        );
        await expect(readonlyRadio).toBeFocused();
        await page.keyboard.press("ArrowRight");
        await expect(readonlyRadio).toBeFocused();
        await page.keyboard.press("Tab");
        await expect(
          form.locator("[data-scope=tags-input][data-part=control]"),
        ).toBeFocused();
        await page.keyboard.press("Tab");
        await expect(tags).toBeFocused();
        const readonlyText = await tags.inputValue();
        await page.keyboard.press("x");
        await expect(tags).toHaveValue(readonlyText);
        await start.evaluate((n) => n.remove());
        await page.screenshot({
          path: `.artifacts/p0-field/readonly-${browserName}-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
        await expect.poll(entries).toEqual({
          agreement: "on",
          notifications: "on",
          density: "comfortable",
          frameworks: "React, Vue, Solid",
        });
        await button("Read only").click();
        await button("Disabled").click();
        await expect(checkbox).toBeDisabled();
        await expect(toggle).toBeDisabled();
        await expect(tags).toBeDisabled();
        await expect.poll(entries).toEqual({});
        await button("Disabled").click();
        await button("Long descriptions").click();
        for (const rtl of [false, true]) {
          if (rtl) await button("Right-to-left").click();
          for (const size of ["sm", "md", "lg"]) {
            await button(`Size ${size}`).click();
            await expect
              .poll(() =>
                page.evaluate(
                  () => document.documentElement.scrollWidth <= innerWidth,
                ),
              )
              .toBe(true);
            for (const scope of ["checkbox", "switch", "radio-group"]) {
              const control = form
                .locator(
                  `[data-scope=${scope}][data-part=${scope === "radio-group" ? "item-control" : "control"}]`,
                )
                .first();
              const label = form
                .locator(
                  `[data-scope=${scope}][data-part=${scope === "radio-group" ? "item-text" : "label"}]`,
                )
                .first();
              const c = (await control.boundingBox())!,
                l = (await label.boundingBox())!;
              const lineHeight = await label.evaluate((n) =>
                parseFloat(getComputedStyle(n).lineHeight),
              );
              expect(
                Math.abs(c.y + c.height / 2 - l.y - lineHeight / 2),
              ).toBeLessThanOrEqual(2);
              if (scope === "checkbox") {
                const gap = rtl ? c.x - l.x - l.width : l.x - c.x - c.width;
                const expected = await label.evaluate((n) =>
                  parseFloat(
                    getComputedStyle(n).getPropertyValue(
                      "--lk-space-component-sm",
                    ),
                  ),
                );
                expect(Math.abs(gap - expected)).toBeLessThanOrEqual(1);
              }
              if (scope === "switch") {
                const t = (await control
                  .locator("[data-part=thumb]")
                  .boundingBox())!;
                const padding = await control.evaluate((n) =>
                  parseFloat(getComputedStyle(n).paddingInlineStart),
                );
                expect(
                  await control.evaluate((n) => getComputedStyle(n).direction),
                ).toBe(rtl ? "rtl" : "ltr");
                expect(t.x).toBeGreaterThanOrEqual(c.x);
                expect(t.x + t.width).toBeLessThanOrEqual(c.x + c.width);
                expect(
                  Math.abs(
                    (rtl ? t.x - c.x : c.x + c.width - t.x - t.width) - padding,
                  ),
                ).toBeLessThanOrEqual(1);
              }
            }
            await page.screenshot({
              path: `.artifacts/p0-selection/layout-${browserName}-${framework}-${mode}-${width}-${rtl ? "rtl" : "ltr"}-${size}.png`,
              fullPage: true,
            });
          }
        }
        await button("Horizontal layout").click();
        await expect
          .poll(() =>
            page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
          )
          .toBe(true);
        // Story iframe 的宿主页地标不属于组件；WCAG 范围与全库扫描一致。
        const axe = new AxeBuilder({ page });
        const audit =
          framework === "Story" ? axe.withTags(["wcag2a", "wcag2aa"]) : axe;
        expect((await audit.analyze()).violations).toEqual([]);
      });

for (const framework of ["Story", "react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    test(`tags visible frame and native values ${framework} ${mode}`, async ({
      page,
      browserName,
    }) => {
      test.skip(
        framework === "Story"
          ? !!process.env.STATIC_DIR
          : !process.env.STATIC_DIR,
      );
      await page.setViewportSize({ width: 320, height: 900 });
      await page.goto(
        framework === "Story"
          ? `/iframe.html?id=components-tagsinput--basic&globals=mode:${mode}`
          : `/examples-${framework}/?example=TagsInputExample&mode=${mode}`,
      );
      const root = page
        .locator("[data-scope=tags-input][data-part=root]")
        .first();
      await expect(root).toBeVisible();
      await root.evaluate((n) => {
        const f = document.createElement("form");
        f.setAttribute("aria-label", "Framework preferences");
        n.before(f);
        f.append(n);
      });
      const form = page.getByRole("form", { name: "Framework preferences" });
      const values = () =>
        form.evaluate((n) =>
          new FormData(n as HTMLFormElement).get("frameworks"),
        );
      const input = root.locator("[data-part=input]");
      await expect.poll(values).toBe("React, Vue, Solid");
      await input.fill("Svelte");
      await input.press("Enter");
      await expect.poll(values).toBe("React, Vue, Solid, Svelte");
      await expect
        .poll(() =>
          input.evaluate((n) => ({
            inner: getComputedStyle(n).outlineStyle,
            outer: getComputedStyle(n.parentElement!).outlineStyle,
          })),
        )
        .toEqual({ inner: "none", outer: "solid" });
      await page.screenshot({
        path: `.artifacts/p0-selection/tags-${browserName}-${framework}-${mode}-320.png`,
        fullPage: true,
      });
      await input.press("ArrowLeft");
      await input.press("Delete");
      await expect.poll(values).toBe("React, Vue, Solid");
      await input.press("Tab");
      await expect(root.locator("[data-part=clear-trigger]")).toBeFocused();
      await page.keyboard.press("Enter");
      await expect.poll(values).toBe("");
      await expect(input).toBeFocused();
      expect(await root.locator("[data-part=item]").count()).toBe(0);
    });
