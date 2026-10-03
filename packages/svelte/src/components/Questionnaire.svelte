<script lang="ts">
  import { tick, untrack } from "svelte";
  import type { HTMLFormAttributes } from "svelte/elements";
  import {
    questionnaireVisibleQuestions,
    questionnaireValue,
    questionError,
    toggleQuestionAnswer,
    focusQuestion,
    restoreQuestionAnswers,
    type QuestionnaireOptions,
    type QuestionnaireValue,
  } from "@loongark/kit";
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
    onValueChange,
    onComplete,
    ...attrs
  }: QuestionnaireOptions & HTMLFormAttributes = $props();
  const uid = $props.id();
  let root: HTMLFormElement;
  let internal = $state(untrack(() => defaultValue)),
    page = $state(0),
    showError = $state(false);
  const current = $derived(questionnaireValue(questions, value ?? internal)),
    visible = $derived(questionnaireVisibleQuestions(questions, current)),
    submittedValue = $derived(questionnaireValue(visible, current)),
    index = $derived(Math.min(page, Math.max(0, visible.length - 1))),
    question = $derived(visible[index]),
    blocked = $derived(disabled || submitting),
    options = $derived({ requiredLabel, invalidLabel }),
    err = $derived(
      showError && question ? questionError(question, current, options) : "",
    );
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
  async function move(next: number) {
    page = next;
    showError = false;
    await tick();
    focusQuestion(root);
  }
  async function submit(e: SubmitEvent) {
    e.preventDefault();
    if (blocked || !question) return;
    showError = true;
    if (questionError(question, current, options)) {
      focusQuestion(root);
      return;
    }
    if (index < visible.length - 1) await move(index + 1);
    else {
      const invalid = visible.findIndex(
        (q) => !!questionError(q, current, options),
      );
      if (invalid >= 0) {
        page = invalid;
        await tick();
        focusQuestion(root);
      } else onComplete?.({ value: submittedValue });
    }
  }
</script>

<form
  data-scope="questionnaire"
  data-part="root"
  aria-label={label}
  aria-busy={submitting ? "true" : undefined}
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
        <legend data-scope="questionnaire" data-part="legend"
          >{question.label}{question.required ? " *" : ""}</legend
        >
        <p
          id={uid + "-description"}
          data-scope="questionnaire"
          data-part="description"
        >
          {question.description}
        </p>
        {#if question.type === "text"}<Textarea
            aria-label={question.label}
            aria-required={question.required}
            aria-invalid={err ? "true" : undefined}
            aria-describedby={uid + "-description " + uid + "-error"}
            bind:value={textAnswer}
            maxlength={question.maxLength}
            oninput={(e) =>
              change({ ...current, [question.id]: e.currentTarget.value })}
          />{:else}
          {#each question.options ?? [] as o}<label
              data-scope="questionnaire"
              data-part="option"
              data-selected={(
                question.type === "multiple"
                  ? current[question.id].includes(o.value)
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
                  ? current[question.id].includes(o.value)
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
    {#each Object.entries(submittedValue).filter(([key]) => question.type === "text" || key !== question.id) as [name, answer]}{#each typeof answer === "string" ? [answer] : answer as text}<input
          type="hidden"
          {name}
          value={text}
          disabled={blocked}
        />{/each}{/each}
    {#if error}<div data-scope="questionnaire" data-part="error" role="alert">
        {error}
      </div>{/if}
    <div data-scope="questionnaire" data-part="actions">
      <Button
        type="button"
        variant="outline"
        disabled={blocked || index === 0}
        onclick={() => move(index - 1)}>{backLabel ?? "Back"}</Button
      ><Button type="submit" disabled={blocked}
        >{submitting
          ? "Submitting…"
          : index < visible.length - 1
            ? (nextLabel ?? "Next")
            : (submitLabel ?? "Submit")}</Button
      >
    </div>{/if}
</form>
