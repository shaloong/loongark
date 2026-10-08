import { expect, test } from "@playwright/test";
import { readFileSync, mkdirSync } from "node:fs";

const index = process.env.STATIC_DIR ? { entries: {} } : JSON.parse(readFileSync("storybook-static/index.json", "utf8"));
const entries = Object.values(index.entries) as Array<{
  type: string;
  title: string;
  name: string;
  id: string;
}>;
const families = [
  ...new Set(
    entries
      .filter(
        (entry) =>
          entry.type === "story" && entry.title.startsWith("Components/"),
      )
      .map((entry) => entry.title),
  ),
];
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`全组件启用态 cursor ${mode} ${width}`, async ({ page }) => {
      test.skip(!!process.env.STATIC_DIR, "Storybook 族目录");
      test.setTimeout(240000);
      await page.setViewportSize({ width, height: 1000 });
      for (const family of families) {
        const stories = entries.filter(
          (entry) => entry.type === "story" && entry.title === family,
        );
        const story =
          stories.find((entry) => entry.name === "Basic") ?? stories[0];
        await page.goto(`/iframe.html?id=${story.id}&globals=mode:${mode}`);
        await expect(page.locator(".loongark-story-surface")).toBeVisible();
        const failures = await page.evaluate(() =>
          Array.from(
            document.querySelectorAll<HTMLElement>(
              'input:not([type="hidden"]),textarea,select,button,[role="checkbox"],[role="radio"],[role="combobox"]',
            ),
          ).flatMap((element) => {
            const rectangle = element.getBoundingClientRect();
            if (
              !rectangle.width ||
              !rectangle.height ||
              getComputedStyle(element).visibility === "hidden" ||
              element.closest(
                '[hidden],[data-disabled=""],[data-disabled="true"],[aria-disabled="true"]',
              ) ||
              element.matches(":disabled")
            )
              return [];
            return getComputedStyle(element).cursor === "not-allowed"
              ? [
                  {
                    tag: element.tagName,
                    scope: element.dataset.scope,
                    part: element.dataset.part,
                    label:
                      element.getAttribute("aria-label") ||
                      element.textContent?.slice(0, 60),
                  },
                ]
              : [];
          }),
        );
        expect(
          failures,
          `${family} ${mode} ${width} 的启用控件不得显示禁止指针`,
        ).toEqual([]);
      }
    });

for (const mode of ["light", "dark"])
  test(`Password false 与 Checkbox hover ${mode}`, async ({ page }, info) => {
    test.skip(!!process.env.STATIC_DIR);
    await page.goto(
      `/iframe.html?id=components-passwordinput--basic&globals=mode:${mode}`,
    );
    const input = page.locator(
      '[data-scope="password-input"][data-part="input"]',
    );
    await expect(input).toBeEnabled();
    await expect(input).not.toHaveCSS("cursor", "not-allowed");
    await input.fill("password");
    await page.goto(
      `/iframe.html?id=components-checkbox--playground&globals=mode:${mode}`,
    );
    const control = page
      .locator('[data-scope="checkbox"][data-part="control"]')
      .first();
    await control.click();
    await expect(control).toHaveAttribute("data-state", "checked");
    await control.hover();
    await expect
      .poll(() =>
        control.evaluate((node) => {
          const channels = getComputedStyle(node)
            .backgroundColor.match(/[\d.]+/g)
            ?.slice(0, 3)
            .map(Number);
          return (
            channels &&
            channels[0] === channels[1] &&
            channels[1] === channels[2]
          );
        }),
      )
      .toBe(true);
    mkdirSync(".artifacts/interaction-styles", { recursive: true });
    await page.screenshot({
      path: `.artifacts/interaction-styles/${info.project.name}-checkbox-${mode}.png`,
    });
  });

for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`四端基础组合与 NativeSelect 留白 ${framework} ${mode} ${width}`, async ({
        page,
      }, info) => {
        test.skip(!process.env.STATIC_DIR);
        test.setTimeout(120000);
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewportSize({ width, height: 1000 });
        await page.goto(
          `/examples-${framework}/?example=CoreComponentsExample&mode=${mode}`,
        );
        const picker = page.getByRole("combobox", {
          name: "组件示例",
          exact: true,
        });
        const names = await picker.locator("option").allTextContents();
        for (const name of names) {
          await picker.selectOption({ label: name });
          await expect(
            page.locator(`[data-core-family="${name}"]`),
          ).toBeVisible();
          expect(
            await page.evaluate(
              () => document.documentElement.scrollWidth - window.innerWidth,
            ),
            name,
          ).toBeLessThanOrEqual(1);
        }
        await picker.selectOption({ label: "NativeSelect" });
        const select = page.getByRole("combobox", {
          name: "方案",
          exact: true,
        });
        await expect(select).toHaveCSS("appearance", "none");
        const spacing = await select.evaluate((node) => {
          const style = getComputedStyle(node);
          return {
            end: parseFloat(style.paddingInlineEnd),
            start: parseFloat(style.paddingInlineStart),
            icon: parseFloat(style.backgroundSize),
          };
        });
        expect(spacing.end).toBeGreaterThanOrEqual(
          spacing.start * 2 + spacing.icon,
        );
        const position = async (edge: "right" | "left") =>
          select.evaluate((node, edge) => {
            const style = getComputedStyle(node);
            const reference = document.createElement("div");
            reference.style.backgroundPosition = `${edge} ${style.paddingInlineStart} center`;
            document.body.append(reference);
            const expected = getComputedStyle(reference).backgroundPosition;
            reference.remove();
            return { actual: style.backgroundPosition, expected };
          }, edge);
        const ltr = await position("right");
        expect(ltr.actual).toBe(ltr.expected);
        await select.selectOption("pro");
        await expect(select).toHaveValue("pro");
        await select.evaluate((node) => {
          node.setAttribute("dir", "rtl");
        });
        const rtl = await position("left");
        expect(rtl.actual).toBe(rtl.expected);
        await select.evaluate((node) => {
          (node as HTMLSelectElement).disabled = true;
        });
        await expect(select).toHaveCSS("cursor", "not-allowed");
        await select.evaluate((node) => {
          (node as HTMLSelectElement).disabled = false;
        });
        await expect(select).not.toHaveCSS("cursor", "not-allowed");
        mkdirSync(".artifacts/interaction-styles", { recursive: true });
        await page.screenshot({
          path: `.artifacts/interaction-styles/${info.project.name}-${framework}-${mode}-${width}.png`,
        });
        await page.goto(
          `/examples-${framework}/?example=CompoundFieldExample&mode=${mode}`,
        );
        for (const field of await page
          .locator('[data-scope="password-input"][data-part="input"]')
          .all()) {
          if (await field.isEnabled())
            await expect(field).not.toHaveCSS("cursor", "not-allowed");
        }
        expect(errors).toEqual([]);
      });
