<script lang="ts">
  import { tick, untrack } from "svelte";
  import type { HTMLFormAttributes } from "svelte/elements";
  import {
    questionnaireQuestions,
    questionnaireValue,
    questionError,
    toggleQuestionAnswer,
    focusQuestion,
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
    index = $derived(Math.min(page, Math.max(0, questions.length - 1))),
    question = $derived(questionnaireQuestions(questions)[index]),
    blocked = $derived(disabled || submitting),
    options = $derived({ requiredLabel, invalidLabel }),
    err = $derived(
      showError && question ? questionError(question, current, options) : "",
    );
  function change(next: QuestionnaireValue) {
    if (blocked) return;
    if (value === undefined) internal = next;
    else value = next;
    onValueChange?.({ value: next });
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
    if (index < questions.length - 1) await move(index + 1);
    else {
      const invalid = questions.findIndex(
        (q) => !!questionError(q, current, options),
      );
      if (invalid >= 0) {
        page = invalid;
        await tick();
        focusQuestion(root);
      } else onComplete?.({ value: current });
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
    {#if !completed && questions.length > 0}<span
        data-scope="questionnaire"
        data-part="count"
        aria-live="polite">{index + 1} / {questions.length}</span
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
            value={typeof current[question.id] === "string"
              ? String(current[question.id])
              : ""}
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
    {#each Object.entries(current).filter(([key]) => question.type === "text" || key !== question.id) as [name, answer]}{#each typeof answer === "string" ? [answer] : answer as text}<input
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
          : index < questions.length - 1
            ? (nextLabel ?? "Next")
            : (submitLabel ?? "Submit")}</Button
      >
    </div>{/if}
</form>
