import { test, expect } from "@playwright/test";

const nonce = "bG9vbmdhcmtjc3AxMjM0NTY=";
for (const framework of ["react", "vue", "solid", "svelte"]) {
  for (const configured of [false, true]) {
    test(`${framework} CSP ${configured ? "允许配置的 nonce" : "拒绝缺失 nonce"}`, async ({
      page,
    }) => {
      test.skip(!process.env.STATIC_DIR, "使用真实四端消费产物");
      await page.addInitScript(() => {
        const violations: string[] = [];
        document.addEventListener("securitypolicyviolation", (event) => {
          violations.push(event.effectiveDirective);
          document.documentElement.setAttribute(
            "data-csp-violations",
            JSON.stringify(violations),
          );
        });
      });
      // 响应头由浏览器实际执行；只为宿主自己的 SSR style 加 nonce，不改库注入逻辑。
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
      await page.goto(
        `/${framework}/${configured ? `?nonce=${encodeURIComponent(nonce)}` : ""}`,
      );
      const button = page.getByTestId("busy-cancel");
      await expect(button).toBeVisible();
      const controlHeight = () =>
        button.evaluate((element) =>
          getComputedStyle(element)
            .getPropertyValue("--lk-control-height-md")
            .trim(),
        );
      if (!configured) {
        await expect.poll(controlHeight).toBe("");
        await expect
          .poll(() => page.locator("html").getAttribute("data-csp-violations"))
          .toContain("style-src-elem");
        return;
      }
      await expect.poll(controlHeight).toBe("36px");
      await expect(button).toHaveCSS("min-height", "36px");
      const styleNonces = () =>
        page.locator("style[id]").evaluateAll((styles) =>
          styles.map((style) => {
            if (!(style instanceof HTMLStyleElement))
              throw new Error("样式节点类型错误");
            return {
              id: style.id,
              nonce: style.nonce,
              active: style.sheet !== null,
            };
          }),
        );
      const initial = await styleNonces();
      expect(initial.length).toBeGreaterThan(1);
      for (const style of initial) {
        expect(style.nonce, style.id).toBe(nonce);
        expect(style.active, style.id).toBe(true);
      }
      // 主题重建仍保持 nonce、共享规则与真实交互，而不只是首次 style 属性正确。
      await page.getByTestId("mode").click();
      await expect(
        page.locator("[data-lk-theme][data-theme]").first(),
      ).toHaveAttribute("data-theme", "dark");
      await expect.poll(controlHeight).toBe("36px");
      await page.getByTestId("email").fill("nonce@loongark.test");
      await expect(page.getByTestId("submit")).toBeEnabled();
      const updated = await styleNonces();
      expect(updated.length).toBe(initial.length);
      expect(
        updated.every((style) => style.nonce === nonce && style.active),
      ).toBe(true);
      await page.evaluate(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          ),
      );
      expect(
        await page.locator("html").getAttribute("data-csp-violations"),
      ).toBeNull();
    });
  }
}
