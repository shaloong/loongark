import {expect,test} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for(const framework of ['react','vue','solid','svelte'])
 for(const mode of ['light','dark','high-contrast'])
  for(const width of [1280,375])
   test(`Tour ${framework} ${mode} ${width}`,async({page},info)=>{
    test.skip(!process.env.STATIC_DIR,'通过真实四端消费入口验收');
    await page.setViewportSize({width,height:812});
    const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
    await page.goto(`/examples-${framework}/?example=TourExample&mode=${mode}`);
    const trigger=page.getByRole('button',{name:'开始引导',exact:true});
    const dialog=page.getByRole('alertdialog');
    await trigger.click();await expect(dialog).toBeVisible();
    await expect(dialog).toHaveCSS('opacity','1');
    const bounds=await dialog.boundingBox();expect(bounds).toBeTruthy();
    if(!bounds)throw Error('Tour 缺少真实布局');
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x+bounds.width).toBeLessThanOrEqual(width);
    expect(bounds.y).toBeGreaterThanOrEqual(0);
    expect(bounds.y+bounds.height).toBeLessThanOrEqual(812);
    const audit=await new AxeBuilder({page}).include('[data-scope="tour"][data-part="content"]').analyze();
    expect(audit.violations).toEqual([]);
    await page.screenshot({path:`.artifacts/tour-overlays/${info.project.name}/${framework}-${mode}-${width}.png`});
    // 真实指针必须穿过正确的层级；不强制点击或执行 DOM click。
    await dialog.getByRole('button',{name:'关闭',exact:true}).click({timeout:5000});
    await expect(dialog).toBeHidden();await expect(trigger).toBeFocused();
    await trigger.click();await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();expect(errors).toEqual([]);
   });
