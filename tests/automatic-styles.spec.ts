import type {} from './automaticStyleProbe';
import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for(const framework of ['react','vue','solid','svelte'])
 for(const width of [1280,375])
  for(const bootstrap of ['default','explicit'])
   test(`自动样式 ${framework} ${bootstrap} ${width}`,async({page},info)=>{
    test.skip(!process.env.STATIC_DIR,'使用真实四端消费产物');
    const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
    await page.setViewportSize({width,height:850});
    await page.goto(`/automatic-${framework}/${bootstrap==='explicit'?'?explicit=1':''}`);
    await expect.poll(()=>page.evaluate(()=>window.loongarkAutomaticStyles?.ready)).toBe(true);
    const first=page.locator('[data-owner=a]'),second=page.locator('[data-owner=b]');
    await expect(first.getByRole('button',{name:'Automatic button',exact:true})).toHaveCount(1);
    const styles=()=>page.locator('style[id^="loongark-primitive-"], style[id^="loongark-kit-"]').allTextContents();
    const css=(await styles()).join('\n');
    expect(new TextEncoder().encode(css).byteLength).toBeLessThan(60000);
    expect(css).not.toContain('[data-scope=data-table]');
    expect(css).not.toContain('[data-scope=editor]');
    await expect(first.locator('[data-scope=app-bar][data-part=toolbar]')).toHaveCSS('display','flex');
    const boxPadding=await first.locator('[data-scope=box]').evaluate(element=>parseFloat(getComputedStyle(element).paddingLeft));expect(boxPadding).toBeGreaterThan(0);
    await expect(first.getByRole('combobox',{name:'Automatic selection'})).not.toHaveCSS('background-image','none');
    const button=first.getByRole('button',{name:'Automatic button',exact:true});
    const height=await button.evaluate(element=>parseFloat(getComputedStyle(element).minHeight));expect(height).toBeGreaterThanOrEqual(32);
    const light=await button.evaluate(element=>getComputedStyle(element).backgroundColor);
    await page.screenshot({path:`.artifacts/automatic-styles/${info.project.name}/automatic-${framework}-light-${width}-${bootstrap}.png`});
    for(const mode of ['dark','high-contrast']){
     await page.evaluate(()=>{const probe=window.loongarkAutomaticStyles;if(!probe)throw Error('缺少实际探针');probe.changeTheme();});
     await expect(page.locator('[data-lk-theme=automatic-a]').first()).toHaveAttribute('data-theme',mode);
     await page.evaluate(async()=>{
      await Promise.all(document.getAnimations().map(animation=>animation.finished.catch(()=>{})));
     });
     const violations=(await new AxeBuilder({page}).analyze()).violations;expect(violations).toEqual([]);
     if(mode==='dark')expect(await button.evaluate(element=>getComputedStyle(element).backgroundColor)).not.toBe(light);
     await page.screenshot({path:`.artifacts/automatic-styles/${info.project.name}/automatic-${framework}-${mode}-${width}-${bootstrap}.png`});
    }
    await page.evaluate(async()=>{const probe=window.loongarkAutomaticStyles;if(!probe)throw Error('缺少实际探针');await probe.loadDialog();});
    await expect(first.getByRole('button',{name:'Late dialog',exact:true})).toBeVisible();
    await first.getByRole('button',{name:'Late dialog',exact:true}).click();
    const dialog=page.getByRole('dialog',{name:'Late dialog title'});
    await expect(dialog).toBeVisible();await expect(dialog).toHaveCSS('opacity','1');
    await expect(dialog).toHaveCSS('border-style','solid');
    await expect(dialog).not.toHaveCSS('background-color','rgba(0, 0, 0, 0)');
    expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
    await page.keyboard.press('Escape');await expect(dialog).toBeHidden();
    await expect(first.getByRole('button',{name:'Late dialog',exact:true})).toBeFocused();
    await page.evaluate(()=>{const probe=window.loongarkAutomaticStyles;if(!probe)throw Error('缺少实际探针');probe.removeFirst();});
    await expect(first).toHaveCount(0);await expect(second.getByRole('button',{name:'Automatic button',exact:true})).toBeVisible();
    expect((await styles()).join('\n')).toContain('--lk-button-height');
    await second.getByRole('button',{name:'Late dialog',exact:true}).click();await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');await expect(dialog).toBeHidden();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1);
    await page.evaluate(()=>{const probe=window.loongarkAutomaticStyles;if(!probe)throw Error('缺少实际探针');probe.removeAll();});
    await expect(page.locator('[data-owner]')).toHaveCount(0);await expect(page.locator('style[id^="loongark-"]')).toHaveCount(0);
    await page.evaluate(async()=>{const probe=window.loongarkAutomaticStyles;if(!probe)throw Error('缺少实际探针');await probe.loadAfterUnmount();});
    await expect(page.locator('style[id^="loongark-"]')).toHaveCount(0);
    await expect(page.locator('html')).not.toHaveAttribute('data-lk-theme',/./);
    expect(errors).toEqual([]);
   });
