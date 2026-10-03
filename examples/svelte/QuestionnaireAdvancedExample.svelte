<script lang="ts">
  import * as L from "@loongark/svelte";
  import {
    workspaceQuestions,
    workspaceDefaults,
    workspaceSummary,
  } from "../shared/questionnaireAdvancedDemo";
  let answers = $state<L.QuestionnaireValue>(workspaceDefaults()),
    saved = $state<L.QuestionnaireValue | undefined>(),
    locked = $state(false),
    revision = $state(0);
</script>

<L.LoongArkStack gap="lg" style="width:100%;max-width:640px">
  <L.LoongArkTypography as="h2">A workspace that fits</L.LoongArkTypography>
  <L.LoongArkTypography variant="muted"
    >Team details stay saved when you switch to a personal project. Only
    relevant answers are submitted.</L.LoongArkTypography
  >
  <L.LoongArkStack orientation="horizontal" gap="sm">
    <L.LoongArkButton variant="outline" onclick={() => (locked = !locked)}
      >{locked
        ? "Allow answer updates"
        : "Lock answer updates"}</L.LoongArkButton
    >
    <L.LoongArkButton
      variant="outline"
      onclick={() => {
        answers = workspaceDefaults();
        saved = undefined;
        locked = false;
        revision++;
      }}>Reset survey</L.LoongArkButton
    >
  </L.LoongArkStack>
  {#key revision}<L.LoongArkQuestionnaire
      label="Workspace setup"
      questions={workspaceQuestions}
      value={answers}
      completed={saved !== undefined}
      onValueChange={(details) => {
        if (!locked) answers = details.value;
      }}
      onComplete={(details) => (saved = details.value)}
    />{/key}
  <output
    aria-label="Saved answers"
    data-answer-keys={Object.keys(saved ?? {}).join(",")}
    >{workspaceSummary(saved)}</output
  >
</L.LoongArkStack>
