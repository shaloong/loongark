import { expect, test } from "@playwright/test";
import { checkCodeEditor, checkRichTextEditor } from "./editorChecks";
for (const [kind, example, check] of [
  ["code", "CodeEditorExample", checkCodeEditor],
  ["rich", "RichTextEditorExample", checkRichTextEditor],
] as const)
  for (const framework of ["react", "vue", "solid", "svelte"])
    for (const mode of ["light", "dark"])
      for (const width of [1280, 375])
        test(`editor ${kind} ${framework} ${mode} ${width}`, async ({
          page,
        }) => {
          test.skip(!process.env.STATIC_DIR, "四端消费构建后运行");
          const errors: string[] = [];
          page.on("pageerror", (error) => errors.push(error.message));
          await page.setViewportSize({ width, height: 1200 });
          await page.goto(
            `/examples-${framework}/?example=${example}&mode=${mode}`,
          );
          await expect(page.locator('[data-scope="editor"]')).toHaveAttribute(
            "data-mounted",
            "true",
          );
          await expect(
            page.locator(kind === "code" ? ".cm-editor" : ".ProseMirror"),
          ).toBeVisible();
          await page.screenshot({
            path: `.artifacts/advanced-completion/editor-default-${kind}-${framework}-${mode}-${width}.png`,
            fullPage: true,
          });
          await check(page);
          expect(errors).toEqual([]);
          await page.screenshot({
            path: `.artifacts/advanced-completion/editor-${kind}-${framework}-${mode}-${width}.png`,
            fullPage: true,
          });
        });
for (const [kind, family, check] of [
  ["code", "codeeditor", checkCodeEditor],
  ["rich", "richtexteditor", checkRichTextEditor],
] as const)
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`editor ${kind} Story ${mode} ${width}`, async ({ page }) => {
        test.skip(!!process.env.STATIC_DIR, "Story专项");
        await page.setViewportSize({ width, height: 1200 });
        await page.goto(
          `/iframe.html?id=components-${family}--basic&globals=mode:${mode}`,
        );
        await check(page);
      });
