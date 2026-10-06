<script lang="ts">
  import { tick, untrack, onDestroy, onMount } from "svelte";
  import type { HTMLFormAttributes } from "svelte/elements";
  import {
    createQuestionnaireCustomRegistry,
    createQuestionnaireTreeRenderer,
    questionHasCustom,
    questionIncludes,
    questionnaireFormEntries,
    createQuestionControlRenderer,
    mountQuestionControls,
    questionnaireVisibleQuestions,
    questionnaireSubmittedValue,
    questionnaireValue,
    questionError,
    createQuestionnaireValidationController,
    type QuestionnaireValidationState,
    toggleQuestionAnswer,
    focusQuestion,
    restoreQuestionAnswers,
    type QuestionnaireOptions,
    type QuestionnaireValue,
  } from "@loongark/kit";
  import QuestionnaireTree from "./QuestionnaireTree.svelte";
  import type { LoongArkQuestionnaireRenderers } from "./questionnaire-custom.types";
  import Textarea from "./Textarea.svelte";
  import Button from "./Button.svelte";
  let {
    label,
    questions,
    value = $bindable<QuestionnaireValue | undefined>(undefined),
    defaultValue = {},
    disabled,
    submitting,
    completed,
    error,
    emptyLabel,
    successLabel,
    nextLabel,
    backLabel,
    submitLabel,
    requiredLabel,
    invalidLabel,
    validatingLabel,
    cancelValidationLabel,
    validationErrorLabel,
    onValueChange,
    onComplete,
    renderers = {},
    ...attrs
  }: QuestionnaireOptions &
    HTMLFormAttributes & {
      renderers?: LoongArkQuestionnaireRenderers;
    } = $props();
  const uid = $props.id();
  let root: HTMLFormElement;
  let internal = $state(untrack(() => defaultValue)),
    page = $state(0),
    showError = $state(false);
  let validationState = $state<QuestionnaireValidationState>({
    pending: false,
    errors: {},
  });
  const current = $derived(questionnaireValue(questions, value ?? internal)),
    visible = $derived(questionnaireVisibleQuestions(questions, current)),
    submittedValue = $derived(questionnaireSubmittedValue(questions, current)),
    index = $derived(Math.min(page, Math.max(0, visible.length - 1))),
    question = $derived(visible[index]),
    blocked = $derived(disabled || submitting),
    options = $derived({ requiredLabel, invalidLabel, validationErrorLabel }),
    err = $derived(
      showError && question
        ? questionError(question, current, options, validationState.errors)
        : "",
    );
  const validation = createQuestionnaireValidationController((next) => {
    validationState = next;
  });
  $effect(() => {
    const snapshot = {
      questions: visible,
      value: current,
      id: question?.id,
      blocked: !!(blocked || completed),
    };
    untrack(() =>
      validation.sync(
        snapshot.questions,
        snapshot.value,
        snapshot.id,
        snapshot.blocked,
      ),
    );
  });
  onDestroy(() => validation.dispose());
  let textAnswer = $state<string | undefined>(
    untrack(() =>
      question?.type === "text" ? String(current[question.id]) : "",
    ),
  );
  $effect(() => {
    textAnswer = question?.type === "text" ? String(current[question.id]) : "";
  });
  function change(next: QuestionnaireValue) {
    if (blocked) return;
    validation.cancel();
    if (value === undefined) internal = next;
    if (!onValueChange) value = next;
    onValueChange?.({ value: next });
    tick().then(() => {
      textAnswer =
        question?.type === "text" ? String(current[question.id]) : "";
      restoreQuestionAnswers(root, question, current);
    });
    showError = false;
  }
  const customRegistry = createQuestionnaireCustomRegistry(
    () => ({
      question,
      value: current,
      disabled: !!(blocked || completed),
      pending: validationState.pending,
      showError,
      errors: validationState.errors,
      labels: { requiredLabel, invalidLabel },
      renderers,
    }),
    change,
  );
  const renderTree = createQuestionnaireTreeRenderer();
  onMount(() => customRegistry.mount(root));
  $effect(() => {
    question;
    current;
    renderers;
    disabled;
    submitting;
    completed;
    showError;
    validationState;
    tick().then(() => customRegistry.sync());
  });
  const renderControl = createQuestionControlRenderer();
  $effect(() => {
    const q = question,
      v = current;
    tick().then(() => restoreQuestionAnswers(root, q, v));
  });
  onMount(() =>
    mountQuestionControls(
      root,
      () => ({ question, value: current, blocked: !!(blocked || completed) }),
      change,
    ),
  );
  async function move(next: number) {
    validation.cancel();
    page = next;
    showError = false;
    await tick();
    focusQuestion(root, undefined, customRegistry.focus);
  }
  async function submit(e: SubmitEvent) {
    e.preventDefault();
    if (blocked || completed || validation.state.pending || !question) return;
    validation.sync(visible, current, question?.id, !!(blocked || completed));
    const ownedAtStart = !!root?.contains(document.activeElement);
    const last = index === visible.length - 1;
    const result = await validation.run(
      last ? visible : [question],
      current,
      options,
    );
    if (!result) return;
    if (result.invalidId) {
      showError = true;
      const invalid = visible.findIndex((q) => q.id === result.invalidId);
      if (invalid !== index) {
        page = invalid;
        await tick();
        focusQuestion(root, ownedAtStart, customRegistry.focus);
      } else focusQuestion(root, ownedAtStart, customRegistry.focus);
    } else if (!last) await move(index + 1);
    else onComplete?.({ value: result.value! });
  }
</script>

<form
  data-scope="questionnaire"
  data-part="root"
  aria-label={label}
  aria-busy={submitting || validationState.pending ? "true" : undefined}
  novalidate
  onsubmit={submit}
  {...attrs}
  bind:this={root}
>
  <header data-scope="questionnaire" data-part="header">
    <h2 data-scope="questionnaire" data-part="title">{label}</h2>
    {#if !completed && visible.length > 0}<span
        data-scope="questionnaire"
        data-part="count"
        aria-live="polite">{index + 1} / {visible.length}</span
      >{/if}
  </header>
  {#if completed}<p role="status">
      {successLabel ?? "Thank you for your answers."}
    </p>{:else if !question}<p>
      {emptyLabel ?? "No questions available."}
    </p>{:else}
    {#key question.id}
      <fieldset
        data-scope="questionnaire"
        data-part="question"
        disabled={blocked}
        tabindex="-1"
        aria-describedby={uid + "-description " + uid + "-error"}
      >
        <legend
          id={uid + "-label"}
          data-scope="questionnaire"
          data-part="legend"
          >{question.label}{question.required ? " *" : ""}</legend
        >
        <p
          id={uid + "-description"}
          data-scope="questionnaire"
          data-part="description"
        >
          {question.description}
        </p>
        {#if questionHasCustom(question)}<QuestionnaireTree
            node={renderTree(
              question,
              current,
              uid,
              !!err,
              validationState.errors,
              { requiredLabel, invalidLabel },
              customRegistry,
            )}
            {renderers}
          />
        {:else if question.type === "text"}<Textarea
            aria-label={question.label}
            aria-required={question.required}
            aria-invalid={err ? "true" : undefined}
            aria-describedby={uid + "-description " + uid + "-error"}
            bind:value={textAnswer}
            maxlength={question.maxLength}
            oninput={(e) =>
              change({ ...current, [question.id]: e.currentTarget.value })}
          />{:else if !["single", "multiple"].includes(question.type)}
          <div data-part="advanced-answer">
            {@html renderControl(
              question,
              current,
              uid + "-description " + uid + "-error",
              !!err,
              validationState.errors,
              { requiredLabel, invalidLabel },
            )}
          </div>
        {:else}
          {#each question.options ?? [] as o}<label
              data-scope="questionnaire"
              data-part="option"
              data-selected={(
                question.type === "multiple"
                  ? questionIncludes(current[question.id], o.value)
                  : current[question.id] === o.value
              )
                ? "true"
                : undefined}
            >
              <input
                type={question.type === "multiple" ? "checkbox" : "radio"}
                name={question.id}
                value={o.value}
                disabled={o.disabled}
                checked={question.type === "multiple"
                  ? questionIncludes(current[question.id], o.value)
                  : current[question.id] === o.value}
                aria-required={question.required}
                aria-invalid={err ? "true" : undefined}
                aria-describedby={uid + "-error"}
                onchange={(e) =>
                  change(
                    toggleQuestionAnswer(
                      current,
                      question,
                      o.value,
                      e.currentTarget.checked,
                    ),
                  )}
              /><span>{o.label}</span></label
            >{/each}{/if}
        <div
          id={uid + "-error"}
          data-scope="questionnaire"
          data-part="error"
          role="alert"
        >
          {err}
        </div>
      </fieldset>
    {/key}
    {#each questionnaireFormEntries(submittedValue, question.type === "text" ? undefined : question.id) as [name, answer]}<input
        type="hidden"
        {name}
        value={answer}
        disabled={blocked}
      />{/each}
    {#if error}<div data-scope="questionnaire" data-part="error" role="alert">
        {error}
      </div>{/if}
    {#if validationState.pending}<p
        data-scope="questionnaire"
        data-part="validation"
        role="status"
      >
        {validatingLabel ?? "Checking answers…"}
      </p>{/if}
    <div data-scope="questionnaire" data-part="actions">
      <Button
        type="button"
        variant="outline"
        disabled={blocked || index === 0}
        onclick={() => move(index - 1)}>{backLabel ?? "Back"}</Button
      >
      {#if validationState.pending}<Button
          type="button"
          variant="outline"
          disabled={blocked}
          onclick={() => {
            validation.cancel();
            focusQuestion(root, undefined, customRegistry.focus);
          }}>{cancelValidationLabel ?? "Cancel validation"}</Button
        >{/if}
      <Button type="submit" disabled={blocked || validationState.pending}
        >{submitting
          ? "Submitting…"
          : index < visible.length - 1
            ? (nextLabel ?? "Next")
            : (submitLabel ?? "Submit")}</Button
      >
    </div>{/if}
</form>
