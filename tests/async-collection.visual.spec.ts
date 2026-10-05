import {test,expect} from "@playwright/test";
for(const mode of ["light","dark"])for(const width of [1280,375])for(const kind of ["loaded","error"])
 test(`Async Collection ${kind} ${mode} ${width}`,async({page})=>{
  await page.setViewportSize({width,height:1100});await page.emulateMedia({reducedMotion:"reduce"});await page.goto(`/iframe.html?id=compositions-ark-utilities--async-collection&globals=mode:${mode}`);
  await page.getByRole("button",{name:"Load collection",exact:true}).click();const items=page.getByRole("list",{name:"Collection items"}).getByRole("listitem");await expect(items).toHaveCount(3);
  if(kind==="error"){await page.getByRole("button",{name:"Cycle next cursor",exact:true}).click();await page.getByRole("button",{name:"Load more",exact:true}).click();await expect(page.getByRole("alert")).toContainText("cursor cycle");}else{await page.getByRole("button",{name:"Load more",exact:true}).click();await expect(items).toHaveCount(5);}
  await page.evaluate(()=>document.fonts.ready);await expect(page.locator("body")).toHaveScreenshot(`collection-${kind}-${mode}-${width}.png`,{animations:"disabled"});
 });
