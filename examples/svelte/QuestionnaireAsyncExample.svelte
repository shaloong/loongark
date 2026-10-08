<script lang="ts">
  import * as L from "@loongark/svelte";
  import {
    createQuestionnaireAsyncDemo,
    asyncSurveyDefaults,
    asyncSurveySummary,
  } from "../shared/questionnaireAsyncDemo";
  let answers = $state<L.QuestionnaireValue>(asyncSurveyDefaults()),
    saved = $state<L.QuestionnaireValue>(),
    aborted = $state(0),
    short = $state(false),
    shown = $state(true);
  const demo = createQuestionnaireAsyncDemo((n) => {
    aborted = n;
  });
</script>

<L.LoongArkStack gap="lg" style="width:100%;max-width:640px">
  <L.LoongArkTypography as="h2"
    >Check answers without losing your place</L.LoongArkTypography
  >
  <L.LoongArkTypography variant="muted"
    >Checks belong to your service. Editing, cancelling or hiding the survey
    aborts pending work.</L.LoongArkTypography
  >
  <L.LoongArkStack orientation="horizontal" gap="sm">
    <L.LoongArkButton variant="outline" onclick={() => demo.failNext()}
      >Fail next check</L.LoongArkButton
    >
    <L.LoongArkButton
      variant="outline"
      onclick={() => {
        short = !short;
      }}>{short ? "Restore questions" : "Use shorter survey"}</L.LoongArkButton
    >
    <L.LoongArkButton
      variant="outline"
      onclick={() => {
        shown = !shown;
      }}>{shown ? "Hide survey" : "Show survey"}</L.LoongArkButton
    >
  </L.LoongArkStack>
  {#if shown}<L.LoongArkQuestionnaire
      label="Async workspace setup"
      questions={short ? demo.questions.slice(1) : demo.questions}
      value={answers}
      completed={saved !== undefined}
      onValueChange={(d) => {
        answers = d.value;
      }}
      onComplete={(d) => {
        saved = d.value;
      }}
    />{/if}
  <output aria-label="Cancelled checks">Cancelled checks: {aborted}</output>
  <output aria-label="Saved async answers">{asyncSurveySummary(saved)}</output>
</L.LoongArkStack>
