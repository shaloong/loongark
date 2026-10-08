import { expect, test } from "@playwright/test";
import { checkQuestionnaireCustom } from "./questionnaireCustomChecks";
for (const framework of ["Story", "react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    test(`custom group long legend resize ${framework} ${mode}`, async ({
      page,
      browserName,
    }) => {
      test.skip(
        framework === "Story"
          ? !!process.env.STATIC_DIR
          : !process.env.STATIC_DIR,
      );
      await page.setViewportSize({ width: 1280, height: 1100 });
      await page.goto(
        framework === "Story"
          ? `/iframe.html?id=components-questionnaire--custom-renderer&globals=mode:${mode}`
          : `/examples-${framework}/?example=QuestionnaireCustomExample&mode=${mode}`,
      );
      const form = page.getByRole("form", { name: "Experience review" });
      await expect(form).toBeVisible();
      await page
        .locator("summary")
        .filter({ hasText: "More controls" })
        .click();
      await page
        .getByRole("button", { name: "Use nested questions", exact: true })
        .click();
      await form
        .getByRole("textbox", { name: "Person name", exact: true })
        .first()
        .fill("Layout review");
      const entries = () =>
        form.evaluate((node) =>
          Array.from(new FormData(node as HTMLFormElement).entries()),
        );
      const before = await entries();
      // 扩大可见标题，检查自定义语义树与第三方控件在缩屏后的排版和表单归属。
      await form.locator("legend").evaluateAll((nodes) => {
        for (const node of nodes)
          node.textContent +=
            " — review the full contact details and communication preferences before completing this questionnaire";
      });
      for (const width of [375, 320, 1280]) {
        await page.setViewportSize({ width, height: 1100 });
        await expect
          .poll(() =>
            page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
          )
          .toBe(true);
        for (const legend of await form.locator("legend").all()) {
          const box = await legend.boundingBox();
          expect(box!.x).toBeGreaterThanOrEqual(0);
          expect(box!.x + box!.width).toBeLessThanOrEqual(width);
        }
        expect(await entries()).toEqual(before);
        await expect(
          form
            .getByRole("textbox", { name: "Person name", exact: true })
            .first(),
        ).toHaveValue("Layout review");
        await page.evaluate(
          () =>
            new Promise<void>((resolve) =>
              requestAnimationFrame(() =>
                requestAnimationFrame(() => resolve()),
              ),
            ),
        );
        await page.screenshot({
          path: `.artifacts/p0-consistency/custom-long-${browserName}-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
      }
    });
for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`custom renderer ${framework} ${mode} ${width}`, async ({
        page,
      }) => {
        test.skip(!process.env.STATIC_DIR, "四端消费新构建后运行");
        const errors: string[] = [];
        page.on("pageerror", (e) => errors.push(e.message));
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(
          `/examples-${framework}/?example=QuestionnaireCustomExample&mode=${mode}`,
        );
        await checkQuestionnaireCustom(
          page,
          `.artifacts/gap-completion/custom-${framework}-${mode}-${width}`,
        );
        expect(errors).toEqual([]);
      });
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`custom renderer Story ${mode} ${width}`, async ({ page }) => {
      test.skip(!!process.env.STATIC_DIR, "Story专项");
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=components-questionnaire--custom-renderer&globals=mode:${mode}`,
      );
      await checkQuestionnaireCustom(page);
    });

test("custom imperative control restores rejected state and retires callbacks", async ({
  page,
}) => {
  test.skip(!process.env.STATIC_DIR, "Kit 发布模块消费回归");
  await page.goto("/");
  await page.evaluate(async () => {
    const modulePath = "/questionnaire-custom.js";
    const {
      createQuestionnaireCustomRegistry,
    }: typeof import("@loongark/kit") = await import(modulePath);
    const root = document.createElement("form");
    const input = document.createElement("input");
    input.setAttribute("aria-label", "Third-party answer");
    root.append(input);
    document.body.append(root);
    const output = document.createElement("output");
    output.setAttribute("aria-label", "Accepted answer");
    document.body.append(output);
    const count = document.createElement("output");
    count.setAttribute("aria-label", "Changes");
    document.body.append(count);
    const status = document.createElement("output");
    status.setAttribute("aria-label", "Lifecycle");
    document.body.append(status);
    let changes = 0,
      reject = false,
      disposed = 0;
    const state: import("@loongark/kit").QuestionnaireCustomState = {
      question: {
        id: "answer",
        label: "Answer",
        type: "custom",
        customKind: "editor",
      },
      value: { answer: "Initial" },
      disabled: false,
      pending: false,
      showError: false,
      errors: {},
      labels: {},
      renderers: { editor: () => null },
    };
    const registry = createQuestionnaireCustomRegistry(
      () => state,
      (next: import("@loongark/kit").QuestionnaireValue) => {
        changes++;
        if (!reject) state.value = next;
        output.textContent = String(state.value.answer);
        count.textContent = String(changes);
      },
    );
    const context = registry.context(["answer"], "third-party");
    const unmount = registry.mount(root);
    context.registerControl({
      element: input,
      restore: (answer: import("@loongark/kit").QuestionAnswer) => {
        input.value = typeof answer === "string" ? answer : "";
        context.onAnswerChange("Restore must not emit");
      },
      focus: () => input.focus(),
      dispose: () => {
        disposed++;
      },
    });
    output.textContent = String(state.value.answer);
    count.textContent = "0";
    input.addEventListener("input", () => context.onAnswerChange(input.value));
    const button = (name: string, action: () => void) => {
      const node = document.createElement("button");
      node.type = "button";
      node.textContent = name;
      node.addEventListener("click", action);
      document.body.append(node);
    };
    button("Reject", () => {
      reject = true;
    });
    button("Outside focus", () => {});
    button("Focus custom", () => registry.focus(root));
    button("Disable", () => {
      state.disabled = true;
      registry.sync();
      context.onAnswerChange("Late disabled");
      status.textContent = `${context.signal.aborted}/${disposed}`;
    });
    button("Unmount", () => {
      unmount();
      context.onAnswerChange("Late unmounted");
      status.textContent = `${context.signal.aborted}/${disposed}`;
    });
  });
  const input = page.getByRole("textbox", { name: "Third-party answer" });
  await expect(input).toHaveValue("Initial");
  await input.fill("Accepted");
  await expect(
    page.getByRole("status", { name: "Accepted answer" }),
  ).toHaveText("Accepted");
  await expect(page.getByRole("status", { name: "Changes" })).toHaveText("1");
  await page.getByRole("button", { name: "Reject", exact: true }).click();
  await input.fill("Rejected");
  await expect(input).toHaveValue("Accepted");
  await expect(page.getByRole("status", { name: "Changes" })).toHaveText("2");
  await page.getByRole("button", { name: "Focus custom", exact: true }).click();
  await expect(input).toBeFocused();
  const outside = page.getByRole("button", {
    name: "Outside focus",
    exact: true,
  });
  await outside.click();
  await expect(outside).toBeFocused();
  await page.getByRole("button", { name: "Disable", exact: true }).click();
  await expect(page.getByRole("status", { name: "Lifecycle" })).toHaveText(
    "true/1",
  );
  await page.getByRole("button", { name: "Unmount", exact: true }).click();
  await expect(page.getByRole("status", { name: "Lifecycle" })).toHaveText(
    "true/1",
  );
  await expect(page.getByRole("status", { name: "Changes" })).toHaveText("2");
});

test("custom renderer React StrictMode retains the current lifecycle", async ({
  page,
}) => {
  test.skip(!process.env.STATIC_DIR, "React 原生消费回归");
  await page.goto(
    "/examples-react/?example=QuestionnaireCustomExample&strict=true",
  );
  const ratings = page.getByRole("radiogroup", { name: "Experience rating" });
  await ratings.getByRole("radio").nth(3).click();
  await expect(page.getByRole("status", { name: "Rating updates" })).toHaveText(
    "1 callbacks",
  );
  await page.locator("summary").filter({ hasText: "More controls" }).click();
  await page
    .getByRole("button", { name: "Suggest five stars", exact: true })
    .click();
  await page.getByRole("button", { name: "Hide survey", exact: true }).click();
  await page.waitForTimeout(550);
  await expect(page.getByRole("status", { name: "Rating updates" })).toHaveText(
    "1 callbacks",
  );
  await page.getByRole("button", { name: "Show survey", exact: true }).click();
  await expect(ratings.getByRole("radio").nth(3)).toHaveAttribute(
    "aria-checked",
    "true",
  );
  await ratings.getByRole("radio").nth(1).click();
  await expect(page.getByRole("status", { name: "Rating updates" })).toHaveText(
    "2 callbacks",
  );
  await expect(
    page
      .getByRole("form", { name: "Experience review" })
      .locator('input[name="rating"]'),
  ).toHaveValue("2");
});

test("custom remount invalidates captured callbacks and stale cleanup", async ({
  page,
}) => {
  test.skip(!process.env.STATIC_DIR, "Kit 发布模块生命周期回归");
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const modulePath = "/questionnaire-custom.js";
    const {
      createQuestionnaireCustomRegistry,
    }: typeof import("@loongark/kit") = await import(modulePath);
    const root = document.createElement("form"),
      input = document.createElement("input");
    root.append(input);
    document.body.append(root);
    let changes = 0,
      disposed = 0;
    const state: import("@loongark/kit").QuestionnaireCustomState = {
      question: {
        id: "answer",
        label: "Answer",
        type: "custom",
        customKind: "editor",
      },
      value: { answer: "Initial" },
      disabled: false,
      pending: false,
      showError: false,
      errors: {},
      labels: {},
      renderers: { editor: () => null },
    };
    const registry = createQuestionnaireCustomRegistry(
      () => state,
      (next) => {
        changes++;
        state.value = next;
      },
    );
    const context = registry.context(["answer"], "remount"),
      firstSignal = context.signal;
    const firstCleanup = registry.mount(root);
    const control = () => ({
      element: input,
      restore: (answer: import("@loongark/kit").QuestionAnswer) => {
        input.value = String(answer);
        context.onAnswerChange("Restore must not emit");
      },
      dispose: () => disposed++,
    });
    context.registerControl(control());
    const oldAnswer = context.onAnswerChange,
      oldRegistration = context.registerControl;
    firstCleanup();
    const cleanup = registry.mount(root),
      currentSignal = context.signal;
    context.registerControl(control());
    oldAnswer("Old mount must not emit");
    oldRegistration({
      element: input,
      restore: () => {
        input.value = "Old registration";
      },
      dispose: () => {
        disposed += 100;
      },
    });
    firstCleanup();
    context.onAnswerChange("Fresh");
    registry.sync();
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => resolve()),
    );
    const active = {
      value: state.value.answer,
      changes,
      disposed,
      input: input.value,
      oldAborted: firstSignal.aborted,
      newAborted: currentSignal.aborted,
    };
    const currentAnswer = context.onAnswerChange;
    cleanup();
    currentAnswer("Late cleanup");
    return {
      active,
      final: {
        value: state.value.answer,
        changes,
        disposed,
        aborted: currentSignal.aborted,
      },
    };
  });
  expect(result).toEqual({
    active: {
      value: "Fresh",
      changes: 1,
      disposed: 1,
      input: "Fresh",
      oldAborted: true,
      newAborted: false,
    },
    final: { value: "Fresh", changes: 1, disposed: 2, aborted: true },
  });
});

for (const framework of ["react", "vue", "solid", "svelte"])
  test(`native rating keyboard preview and hidden input ${framework}`, async ({
    page,
  }) => {
    test.skip(!process.env.STATIC_DIR, "评分原生消费回归");
    await page.goto(`/examples-${framework}/?example=RatingGroupExample`);
    const group = page.getByRole("radiogroup", { name: "Rating", exact: true });
    const radio = (score: number) => group.getByRole("radio").nth(score - 1);
    const hidden = page.locator(
      '[data-scope="rating-group"][data-part="hidden-input"]',
    );
    await expect(hidden).toHaveValue("3");
    await radio(5).hover();
    await expect(radio(3)).toHaveAttribute("aria-checked", "true");
    await radio(5).click();
    await expect(hidden).toHaveValue("5");
    await radio(2).hover();
    await radio(5).focus();
    await page.keyboard.press("ArrowLeft");
    await expect(hidden).toHaveValue("4");
    await expect(radio(4)).toHaveAttribute("aria-checked", "true");
    await expect(radio(4)).toHaveAttribute("data-highlighted", "");
    await expect(radio(5)).not.toHaveAttribute("data-highlighted");
    await expect(radio(4)).toBeFocused();
    await page.keyboard.press("Home");
    await expect(hidden).toHaveValue("1");
    await expect(radio(1)).toBeFocused();
    await page.keyboard.press("End");
    await expect(hidden).toHaveValue("5");
    await expect(radio(5)).toBeFocused();
    await page.evaluate(() => {
      const focused = document.activeElement;
      const outside = document.createElement("button");
      outside.textContent = "Continue outside rating";
      document.body.append(outside);
      focused?.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }),
      );
      outside.focus();
    });
    await expect(hidden).toHaveValue("4");
    await expect(
      page.getByRole("button", { name: "Continue outside rating" }),
    ).toBeFocused();
  });
