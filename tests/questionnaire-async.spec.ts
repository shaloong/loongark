import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  checkQuestionnaireAsync,
  checkQuestionnaireCancellation,
} from "./questionnaireAsyncChecks";
for (const mode of ["light", "dark"]) {
  test(`Questionnaire async ${mode}: validation, retry and alignment`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 1100 });
    await page.goto(
      `/iframe.html?id=components-questionnaire--async-validation&globals=mode:${mode}`,
    );
    await checkQuestionnaireAsync(page);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
  test(`Questionnaire async ${mode}: replacement and unmount cancellation`, async ({
    page,
  }) => {
    await page.goto(
      `/iframe.html?id=components-questionnaire--async-validation&globals=mode:${mode}`,
    );
    await checkQuestionnaireCancellation(page);
  });
}

for (const mode of ["light", "dark"]) {
  test(`Questionnaire async ${mode}: external focus stays outside`, async ({
    page,
  }) => {
    await page.goto(
      `/iframe.html?id=components-questionnaire--async-validation&globals=mode:${mode}`,
    );
    const form = page.getByRole("form", { name: "Async workspace setup" });
    await form.getByRole("textbox").fill("reserved");
    await form.getByRole("button", { name: "Next", exact: true }).click();
    await expect(form).toHaveAttribute("aria-busy", "true");
    const outside = page.getByRole("button", {
      name: "Fail next check",
      exact: true,
    });
    await outside.focus();
    await expect(form.getByRole("alert")).toHaveText(
      "This name is already in use.",
    );
    await expect(outside).toBeFocused();
  });
  for (const width of [1280, 375])
    test(`Questionnaire footer ${mode} ${width}: logical edges after wrapping`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=components-questionnaire--long-options&globals=mode:${mode}`,
      );
      const form = page.getByRole("form", {
        name: "Choose how to collaborate",
      });
      await expect(form).toBeVisible();
      const geometry = await form.evaluate((el) => {
        const f = el.getBoundingClientRect(),
          buttons = el.querySelectorAll("[data-part=actions] button"),
          a = buttons[0].getBoundingClientRect(),
          b = buttons[1].getBoundingClientRect();
        return {
          leftDelta: Math.abs(a.left - f.left),
          rightDelta: Math.abs(b.right - f.right),
          wrapped: b.y > a.y,
        };
      });
      expect(geometry.leftDelta).toBeLessThanOrEqual(0.5);
      expect(geometry.rightDelta).toBeLessThanOrEqual(0.5);
      expect(geometry.wrapped).toBe(width === 375);
      const rtl = await form.evaluate((el) => {
        el.dir = "rtl";
        const f = el.getBoundingClientRect(),
          buttons = el.querySelectorAll("[data-part=actions] button"),
          a = buttons[0].getBoundingClientRect(),
          b = buttons[1].getBoundingClientRect();
        return {
          startDelta: Math.abs(a.right - f.right),
          endDelta: Math.abs(b.left - f.left),
        };
      });
      expect(rtl.startDelta).toBeLessThanOrEqual(0.5);
      expect(rtl.endDelta).toBeLessThanOrEqual(0.5);

      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    });
}

for (const mode of ["light", "dark"])
  test(`Questionnaire ${mode}: latest completion callback`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 1100 });
    await page.goto(
      `/iframe.html?id=components-questionnaire--callback-updates&globals=mode:${mode}`,
    );
    const form = page.getByRole("form", { name: "Callback updates" });
    await form.getByRole("button", { name: "Submit", exact: true }).click();
    await expect(form).toHaveAttribute("aria-busy", "true");
    const update = page.getByRole("button", {
      name: "Update completion handler",
      exact: true,
    });
    await update.click();
    await expect(page.getByLabel("Handled revision")).toHaveText(
      "Handled revision: 1",
    );
    await expect(update).toBeFocused();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
