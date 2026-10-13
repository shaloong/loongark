import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";

for (const width of [1280, 375]) for (const mode of ["light", "dark"]) {
  test(`快速开始 ${width}/${mode}：对应四端代码、真实按钮和窄屏`, async ({ page }, info) => {
    test.skip(!!process.env.STATIC_DIR);
    await page.setViewportSize({width,height:900});
    await page.goto('/iframe.html?id=guides-getting-started--docs&viewMode=docs');
    const guide = page.locator('[data-getting-started]');
    const themes = guide.getByRole('group', {name:'预览主题'});
    const selected = themes.getByRole('button',{name:mode,exact:true});
    await selected.click();
    await expect(selected).toHaveAttribute('aria-pressed','true');
    await page.mouse.move(0,0);
    await expect.poll(async () => {
      const active = await selected.evaluate(node => getComputedStyle(node).backgroundColor);
      const inactive = await themes.getByRole('button',{name:mode === 'dark' ? 'light' : 'dark',exact:true}).evaluate(node => getComputedStyle(node).backgroundColor);
      return active === inactive;
    }).toBe(false);
    for (const framework of ['react','vue','solid','svelte']) {
      await guide.getByRole('group',{name:'选择框架'}).getByRole('button',{name:framework,exact:true}).click();
      await expect(guide).toContainText(`pnpm add @loongark/${framework}`);
      await expect(guide).toContainText(`@loongark/${framework}/button`);
      await expect(guide).toContainText(`@loongark/${framework}/provider`);
    }
    const demo=guide.getByRole('button',{name:'接入示例'});
    await demo.focus(); await page.keyboard.press('Enter');
    await expect(demo).toHaveText('已点击 1 次');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
    await mkdir('.artifacts/getting-started',{recursive:true});
    await page.evaluate(() => window.scrollTo(0,0));
    await page.screenshot({path:`.artifacts/getting-started/${info.project.name}-${width}-${mode}.png`});
  });
}
