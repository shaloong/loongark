import { expect, test } from "@playwright/test";

for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`native disclosures ${framework} ${mode} ${width}`, async ({
        page,
      }, testInfo) => {
        test.skip(!process.env.STATIC_DIR, "四端消费构建后运行");
        await page.setViewportSize({ width, height: 1000 });
        for (const example of [
          "CodeEditorExample",
          "RichTextEditorExample",
          "DataTableRangeExample",
        ]) {
          await page.goto(
            `/examples-${framework}/?example=${example}&mode=${mode}`,
          );
          if (example !== "DataTableRangeExample")
            await expect(page.locator('[data-scope="editor"]')).toHaveAttribute(
              "data-mounted",
              "true",
            );
          const summaries = page.locator("summary");
          await expect(summaries).toHaveCount(
            example === "RichTextEditorExample" ? 2 : 1,
          );
          for (const [index, summary] of (await summaries.all()).entries()) {
            await expect(summary.locator("svg")).toHaveAttribute(
              "aria-hidden",
              "true",
            );
            await expect(summary).toHaveCSS("list-style-type", "none");
            const details = summary.locator("..");
            await summary.click();
            await expect(details).toHaveAttribute("open", "");
            await expect(summary).toBeFocused();
            await summary.press("Space");
            await expect(details).not.toHaveAttribute("open");
            await summary.press("Enter");
            await expect(details).toHaveAttribute("open", "");
            await expect(summary.locator("svg")).toHaveCSS(
              "transform",
              "matrix(0, 1, -1, 0, 0, 0)",
            );
            // 用真实文字边界检查指示器垂直对齐，长标签不能把图标挤到另一行。
            const delta = await summary.evaluate((node) => {
              const icon = node.querySelector("svg")!.getBoundingClientRect();
              const text =
                node.querySelector('[data-part="table-tools-label"]') ??
                Array.from(node.childNodes).find(
                  (child) =>
                    child.nodeType === Node.TEXT_NODE &&
                    child.textContent?.trim(),
                )!;
              const range = document.createRange();
              range.selectNodeContents(text);
              const label = range.getBoundingClientRect();
              return Math.abs(
                icon.y + icon.height / 2 - label.y - label.height / 2,
              );
            });
            expect(delta).toBeLessThan(3);
            await page.screenshot({
              path: `.artifacts/p0-close/disclosures-open-${testInfo.project.name}-${example}-${framework}-${mode}-${width}-${index}.png`,
              fullPage: true,
            });
            await summary.press("Space");
            await expect(details).not.toHaveAttribute("open");
            await expect(summary).toBeFocused();
          }
          if (example === "RichTextEditorExample") {
            await page
              .getByRole("button", { name: "Use RTL", exact: true })
              .click();
            const summary = page.locator('[data-part="table-tools"] summary');
            await expect(summary.locator("svg")).toHaveCSS(
              "transform",
              "matrix(-1, 0, 0, -1, 0, 0)",
            );
            await summary.click();
            await expect(summary.locator("..")).toHaveAttribute("open", "");
            await expect(summary.locator("svg")).toHaveCSS(
              "transform",
              "matrix(0, 1, -1, 0, 0, 0)",
            );
            await page.screenshot({
              path: `.artifacts/p0-close/disclosures-rtl-${testInfo.project.name}-${framework}-${mode}-${width}.png`,
              fullPage: true,
            });
            await summary.press("Space");
            await expect(summary.locator("..")).not.toHaveAttribute("open");
            await page
              .getByRole("button", { name: "Use LTR", exact: true })
              .click();
          }
          expect(
            await page.evaluate(() => document.documentElement.scrollWidth),
          ).toBeLessThanOrEqual(width + 1);
          await page.screenshot({
            path: `.artifacts/p0-close/disclosures-${testInfo.project.name}-${example}-${framework}-${mode}-${width}.png`,
            fullPage: true,
          });
        }
      });
