import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";

const examples = [
  ["DataTableComplexEditorsExample", "data-table"],
  ["CodeEditorExample", "editor"],
  ["RichTextEditorExample", "editor"],
  ["VirtualGridExample", "virtual-grid"],
  ["ChartInteractionExample", "chart"],
  ["QuestionnaireMatrixExample", "questionnaire"],
  ["CompoundFieldExample", "field"],
] as const;

for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`文本放大与强制颜色 ${framework} ${mode} ${width}`, async ({
        page,
      }, info) => {
        test.skip(
          !process.env.STATIC_DIR,
          "四端消费；模拟不代表设备或屏幕阅读器",
        );
        test.setTimeout(120_000);
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewportSize({ width, height: 1000 });
        await page.emulateMedia({
          reducedMotion: "reduce",
          forcedColors: "none",
        });
        const folder = `.artifacts/p1-boundaries/accessibility/${info.project.name}`;
        await mkdir(folder, { recursive: true });
        const records = [];
        for (const [example, scope] of examples) {
          await page.emulateMedia({ forcedColors: "none" });
          await page.goto(
            `/examples-${framework}/?example=${example}&mode=${mode}`,
          );
          const root = page.locator(`[data-scope="${scope}"]`).first();
          await expect(root).toBeVisible();
          if (scope === "editor")
            await expect(root).toHaveAttribute("data-mounted", "true");
          // 只放大排版 Token，保持控件尺寸 Token，暴露文字裁切；不是设备字体设置。
          await page.addStyleTag({
            content: `* {
            --lk-typography-fontsize-xs:24px !important;
            --lk-typography-fontsize-sm:28px !important;
            --lk-typography-fontsize-md:28px !important;
            --lk-typography-fontsize-lg:32px !important;
            --lk-typography-fontsize-xl:48px !important;
            --lk-typography-fontsize-display:80px !important;
          }`,
          });
          if (example === "DataTableComplexEditorsExample") {
            await page
              .getByRole("button", { name: /^Edit Project for alpha: / })
              .click();
            await expect(
              page.locator('[data-part="cell-input"]'),
            ).toBeFocused();
          } else if (scope === "editor") {
            await root.getByRole("textbox").focus();
            await expect(root.getByRole("textbox")).toBeFocused();
          } else if (scope === "virtual-grid") {
            await root.getByRole("gridcell").first().focus();
            await page.keyboard.press("ArrowRight");
            await expect(
              root.locator(
                '[data-column-key="column-1"][data-row-key="row-0"]',
              ),
            ).toBeFocused();
          } else if (scope === "chart") {
            await root.getByText("View chart data", { exact: true }).click();
            await expect(root.getByRole("table")).toBeVisible();
          } else if (scope === "questionnaire") {
            await root.getByRole("checkbox").first().check();
            await expect(root.getByRole("checkbox").first()).toBeChecked();
          }
          await page.evaluate(async () => {
            await document.fonts.ready;
            await new Promise<void>((resolve) =>
              requestAnimationFrame(() =>
                requestAnimationFrame(() => resolve()),
              ),
            );
          });
          if (scope === "data-table") {
            await expect
              .poll(() =>
                root.evaluate((node) => {
                  const button = node.querySelector("thead button")!;
                  return (
                    getComputedStyle(button).color ===
                    getComputedStyle(node).color
                  );
                }),
              )
              .toBe(true);
          }
          expect(
            await page.evaluate(
              () => matchMedia("(forced-colors: active)").matches,
            ),
          ).toBe(false);
          await page.screenshot({
            path: `${folder}/${example}-${framework}-${mode}-${width}-normal.png`,
            fullPage: true,
            animations: "disabled",
          });
          const normal = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa"])
            .analyze();
          await page.emulateMedia({ forcedColors: "active" });
          const metrics = await page.evaluate(() => ({
            width: innerWidth,
            scroll: document.documentElement.scrollWidth,
            forcedColors: matchMedia("(forced-colors: active)").matches,
          }));
          expect(metrics.forcedColors).toBe(true);
          let chartColors;
          if (scope === "chart") {
            chartColors = await root.evaluate((node) => {
              const sample = document.createElement("span");
              sample.style.color = "CanvasText";
              sample.style.background = "Canvas";
              node.append(sample);
              const palette = getComputedStyle(sample);
              const foreground = palette.color,
                background = palette.backgroundColor;
              const canvas = getComputedStyle(
                node.querySelector(":scope > svg")!,
              ).backgroundColor;
              const line = getComputedStyle(
                node.querySelector('[data-part="line"]')!,
              ).stroke;
              const label = getComputedStyle(
                node.querySelector('[data-part="value-label"]')!,
              ).fill;
              sample.remove();
              return { foreground, background, line, label, canvas };
            });
            expect(chartColors.canvas).toBe(chartColors.background);
            expect(chartColors.line).toBe(chartColors.foreground);
            expect(chartColors.label).toBe(chartColors.foreground);
            expect(chartColors.foreground).not.toBe(chartColors.background);
          }
          let focusOutline;
          if (scope === "editor") {
            const surface = root.locator('[data-part="surface"]');
            await expect
              .poll(() =>
                surface.evaluate((node) => {
                  const style = getComputedStyle(node);
                  return (
                    style.outlineStyle !== "none" &&
                    parseFloat(style.outlineWidth) >= 2
                  );
                }),
              )
              .toBe(true);
            focusOutline = await surface.evaluate((node) => {
              const style = getComputedStyle(node);
              return {
                style: style.outlineStyle,
                width: style.outlineWidth,
                color: style.outlineColor,
              };
            });
          }
          const { violations } = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa"])
            // 强制颜色的实际使用值不等于 getComputedStyle；普通配色在上面完整检查。
            .disableRules(["color-contrast"])
            .analyze();
          records.push({
            example,
            metrics,
            chartColors,
            focusOutline,
            normalViolations: normal.violations,
            violations,
            semantics: await root.ariaSnapshot(),
          });
          await page.screenshot({
            path: `${folder}/${example}-${framework}-${mode}-${width}.png`,
            fullPage: true,
            animations: "disabled",
          });
          expect
            .soft(metrics.scroll, `${example} 放大文字后的页面边界`)
            .toBeLessThanOrEqual(width + 1);
          expect
            .soft(
              [...normal.violations, ...violations].map(({ id, nodes }) => ({
                id,
                targets: nodes.map((n) => n.target),
              })),
            )
            .toEqual([]);
        }
        await writeFile(
          `${folder}/${framework}-${mode}-${width}.json`,
          JSON.stringify(records, null, 2),
        );
        expect(errors).toEqual([]);
      });
