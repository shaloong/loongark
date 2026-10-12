import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

const nonce = "bG9vbmdhcmtjc3AxMjM0NTY=";
for (const framework of ["react", "vue", "solid", "svelte"]) {
  for (const width of [1280, 375]) {
    for (const csp of [true, false]) {
      test(`${framework} Core 按需样式、CSP、焦点与清理 ${width} ${csp ? "CSP" : "Axe"}`, async ({
        page,
      }, info) => {
        test.skip(!process.env.STATIC_DIR, "使用真实四端消费产物");
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.addInitScript(() => {
          document.addEventListener("securitypolicyviolation", (event) =>
            document.documentElement.setAttribute(
              "data-csp-violation",
              event.effectiveDirective,
            ),
          );
        });
        // Axe/截图可能注入测量样式；严格 CSP 与独立 Axe/视觉验收分开。
        if (csp)
          await page.route("**/*", async (route) => {
            if (route.request().resourceType() !== "document")
              return route.continue();
            const response = await route.fetch();
            await route.fulfill({
              response,
              headers: {
                ...response.headers(),
                "content-security-policy": `style-src-elem 'self' 'nonce-${nonce}'; style-src-attr 'unsafe-inline'`,
              },
              body: (await response.text()).replaceAll(
                "<style>",
                `<style nonce="${nonce}">`,
              ),
            });
          });
        await page.setViewportSize({ width, height: 812 });
        await page.goto(
          `/core-${framework}/?nonce=${encodeURIComponent(nonce)}`,
        );
        const styles = page.locator("style[id]");
        const assertStyles = async () => {
          const values = await styles.evaluateAll((elements) =>
            elements.map((element) => {
              if (!(element instanceof HTMLStyleElement))
                throw Error("样式节点类型错误");
              return {
                nonce: element.nonce,
                active: element.sheet !== null,
                css: element.textContent ?? "",
              };
            }),
          );
          expect(
            values.every((value) => value.nonce === nonce && value.active),
          ).toBe(true);
          const css = values.map((value) => value.css).join("\n");
          expect(css).not.toContain("[data-scope=editor]");
          expect(css).not.toContain("[data-scope=data-table]");
          expect(css.length).toBeLessThan(60000);
          expect(
            await page.locator("html").getAttribute("data-csp-violation"),
          ).toBeNull();
        };
        const button = page.getByRole("button", {
          name: "Core button",
          exact: true,
        });
        await expect(button).toHaveCSS("min-height", "36px");
        await assertStyles();
        const before = await styles.count();
        await page
          .getByRole("button", { name: "Change styles", exact: true })
          .click();
        await expect(styles).toHaveCount(before + 1);
        await expect(page.getByTestId("core-input")).toHaveCSS(
          "height",
          "36px",
        );
        await page.keyboard.press("Tab");
        await expect(button).toBeFocused();
        await assertStyles();
        for (const mode of ["light", "dark", "high-contrast"]) {
          if (mode !== "light")
            await page
              .getByRole("button", { name: "Theme", exact: true })
              .click();
          await expect(
            page.locator("[data-lk-theme][data-theme]").first(),
          ).toHaveAttribute("data-theme", mode);
          await expect(styles).toHaveCount(before + 1);
          await assertStyles();
          const trigger = page.getByRole("button", {
            name: "Open dialog",
            exact: true,
          });
          await trigger.click();
          const dialog = page.getByRole("dialog", { name: "Core dialog" });
          await expect(dialog).toBeVisible();
          await page.keyboard.press("Escape");
          await expect(dialog).toBeHidden();
          await expect(trigger).toBeFocused();
          if (!csp)
            expect(
              (
                await new AxeBuilder({ page })
                  .withTags(["wcag2a", "wcag2aa"])
                  .analyze()
              ).violations,
            ).toEqual([]);
          await mkdir(".artifacts/core-provider", { recursive: true });
          if (!csp) await page.screenshot({
            path: `.artifacts/core-provider/${info.project.name}-${framework}-${width}-${mode}-axe.png`,
            fullPage: true,
            animations: "disabled",
          });
        }
        await page
          .getByRole("button", { name: "Toggle survivor", exact: true })
          .click();
        const survivor = page.getByRole("button", {
          name: "Survivor",
          exact: true,
        });
        await expect(survivor).toHaveCSS("min-height", "36px");
        await page
          .getByRole("button", { name: "Toggle provider", exact: true })
          .click();
        await expect(button).toHaveCount(0);
        await expect(survivor).toHaveCSS("min-height", "36px");
        await expect(survivor).toHaveCSS(
          "background-color",
          "rgb(242, 242, 242)",
        );
        await expect(styles).toHaveCount(4);
        await page
          .getByRole("button", { name: "Toggle survivor", exact: true })
          .click();
        await expect(styles).toHaveCount(0);
        await page
          .getByRole("button", { name: "Toggle provider", exact: true })
          .click();
        await expect(button).toHaveCSS("min-height", "36px");
        await expect(styles).toHaveCount(before + 1);
        await assertStyles();
        expect(errors).toEqual([]);
      });
    }
  }
}
