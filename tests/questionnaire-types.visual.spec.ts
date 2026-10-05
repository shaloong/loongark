import {test,expect} from "@playwright/test";
for(const mode of ["light","dark"])for(const width of [1280,375])for(const kind of ["matrix","ranking"])
 test(`Structured questionnaire ${kind} ${mode} ${width}`,async({page})=>{
  await page.setViewportSize({width,height:1100});await page.emulateMedia({reducedMotion:"reduce"});await page.goto(`/iframe.html?id=components-questionnaire--structured-types&globals=mode:${mode}`);
  const form=page.getByRole("form",{name:"Structured review"}),next=()=>form.getByRole("button",{name:"Next",exact:true}).click();
  await form.getByRole("spinbutton",{name:"Quantity",exact:true}).fill("0.5");await next();await form.getByLabel("Review date",{exact:true}).fill("2026-10-05");await next();await form.getByRole("combobox",{name:"Preferred format",exact:true}).selectOption("full");await next();
  await form.getByRole("group",{name:"Navigation and keyboard focus",exact:true}).getByRole("radio",{name:"Clear",exact:true}).check();await form.getByRole("group",{name:"Content clarity with longer labels on a narrow screen",exact:true}).getByRole("radio",{name:"Needs improvement",exact:true}).check();
  if(kind==="ranking"){await next();await form.getByRole("button",{name:"Move down: Accessibility and keyboard interaction",exact:true}).click();}
  await page.evaluate(()=>document.fonts.ready);await expect(page.locator("body")).toHaveScreenshot(`question-${kind}-${mode}-${width}.png`,{animations:"disabled"});
 });
