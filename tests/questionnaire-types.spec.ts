import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const framework of ["react", "vue", "solid", "svelte"])
 for (const mode of ["light", "dark"])
  for (const width of [1280,375])
   test(`question types ${framework} ${mode} ${width}`, async ({page}) => {
    test.skip(!process.env.STATIC_DIR,"四端消费构建后运行");
    const errors:string[]=[]; page.on("pageerror",e=>errors.push(e.message));
    await page.setViewportSize({width,height:1100});
    await page.goto(`/examples-${framework}/?example=QuestionnaireTypesExample&mode=${mode}`);
    const form=page.getByRole("form",{name:"Structured review"});
    const next=()=>form.getByRole("button",{name:"Next",exact:true}).click();
    await next(); await expect(form.getByRole("alert").first()).toContainText("Please answer");
    const number=form.getByRole("spinbutton",{name:"Quantity",exact:true});
    await number.fill("10.5"); await next(); await expect(form.getByRole("alert").first()).toContainText("allowed range"); await expect(number).toHaveAttribute("aria-invalid","true");
    await number.fill("0"); await number.press("End"); await number.pressSequentially(".5"); await expect(number).toHaveValue("0.5"); await expect(number).toBeFocused();
    await page.getByRole("button",{name:"Reject updates",exact:true}).click(); await number.fill("2"); await expect(number).toHaveValue("0.5"); await expect(number).toBeFocused();
    await page.getByRole("button",{name:"Accept updates",exact:true}).click(); await next();
    const date=form.getByLabel("Review date",{exact:true});await expect(date).toBeFocused();
    await date.fill("2025-12-31");await next();await expect(form.getByRole("alert").first()).toContainText("valid date");await date.fill("2026-10-05");await next();
    const select=form.getByRole("combobox",{name:"Preferred format",exact:true});await expect(select).toBeFocused();await select.selectOption("full");await expect(select).toBeFocused();await next();
    const navigation=form.getByRole("group",{name:"Navigation and keyboard focus",exact:true});
    const content=form.getByRole("group",{name:"Content clarity with longer labels on a narrow screen",exact:true});
    await navigation.getByRole("radio",{name:"Clear",exact:true}).check(); await expect(navigation.getByRole("radio",{name:"Clear",exact:true})).toBeFocused();await next();await expect(form.getByRole("alert").first()).toContainText("Please answer");
    await content.getByRole("radio",{name:"Needs improvement",exact:true}).check();await expect(content.getByRole("radio",{name:"Needs improvement",exact:true})).toBeFocused();
    await expect(form.getByRole("group",{name:"Retired area",exact:true}).getByRole("radio").first()).toBeDisabled();
    expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
    await page.screenshot({path:`.artifacts/advanced-completion/question-matrix-${framework}-${mode}-${width}.png`,fullPage:true});
    await next();
    await expect(form.getByRole("button",{name:"Move down: Accessibility and keyboard interaction",exact:true})).toBeFocused();
    const down=form.getByRole("button",{name:"Move down: Accessibility and keyboard interaction",exact:true});
    await down.focus();await down.press("Enter");await expect(down).toBeFocused();await expect(form.locator('[data-part="rank-row"] > span')).toHaveText(["Layout and alignment","Accessibility and keyboard interaction","Responsiveness"]);
    await down.press("Enter");await expect(form.getByRole("button",{name:"Move up: Accessibility and keyboard interaction",exact:true})).toBeFocused();
    await page.getByRole("button",{name:"Reject updates",exact:true}).click();
    const up=form.getByRole("button",{name:"Move up: Accessibility and keyboard interaction",exact:true});await up.click();await expect(up).toBeFocused();await expect(form.locator('[data-part="rank-row"] > span')).toHaveText(["Layout and alignment","Responsiveness","Accessibility and keyboard interaction"]);
    await page.getByRole("button",{name:"Accept updates",exact:true}).click();
    const entries=await form.evaluate(node=>Array.from(new FormData(node as HTMLFormElement).entries()));
    expect(entries).toEqual([["priority","layout"],["priority","speed"],["priority","access"],["quantity","0.5"],["date","2026-10-05"],["format","full"],["review[navigation]","clear"],["review[content]","improve"]]);
    await page.getByRole("button",{name:"Disable survey",exact:true}).click();await expect(up).toBeDisabled();await expect(form.getByRole("button",{name:"Submit",exact:true})).toBeDisabled();await page.getByRole("button",{name:"Enable survey",exact:true}).click();
    expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
    await page.screenshot({path:`.artifacts/advanced-completion/question-ranking-${framework}-${mode}-${width}.png`,fullPage:true});
    await form.getByRole("button",{name:"Back",exact:true}).click();await expect(navigation.getByRole("radio",{name:"Clear",exact:true})).toBeChecked();await next();
    await form.getByRole("button",{name:"Submit",exact:true}).click();await expect(form.getByRole("status")).toHaveText("Checking answers…");await page.getByRole("button",{name:"Hide survey",exact:true}).click();await page.waitForTimeout(350);await expect(page.getByLabel("Saved structured answers")).toHaveText("No answers saved");await page.getByRole("button",{name:"Show survey",exact:true}).click();
    await expect(number).toHaveValue("0.5");await next();await next();await next();await next();await form.getByRole("button",{name:"Submit",exact:true}).click();await expect(form.getByRole("status")).toHaveText("Thank you for your answers.");
    const saved=JSON.parse(await page.getByLabel("Saved structured answers").innerText());expect(saved.review).toEqual({navigation:"clear",content:"improve"});expect(saved.priority).toEqual(["layout","speed","access"]);
    expect(errors).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   });
