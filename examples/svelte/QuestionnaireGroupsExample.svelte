<script lang="ts">
  import * as L from "@loongark/svelte";
  import {
    groupsDisclosureIcon,
    groupsDisclosureCSS,
    createQuestionnaireGroupsDemo,
  } from "../shared/questionnaireGroupsDemo";
  let revision = $state(0);
  const demo = createQuestionnaireGroupsDemo(() => revision++);
  const snapshot = $derived.by(() => {
    revision;
    return demo.snapshot;
  });
</script>

<L.LoongArkStack gap="md" style="max-width:640px;width:100%">
  <svelte:element this="style">{groupsDisclosureCSS}</svelte:element>
  <L.LoongArkTypography as="h2"
    >Keep your contacts together</L.LoongArkTypography
  >
  <details data-groups-demo-controls="">
    <summary
      ><L.LoongArkIcon icon={groupsDisclosureIcon} size="sm" />More controls</summary
    >
    <L.LoongArkStack orientation="horizontal" gap="sm">
      <L.LoongArkButton variant="outline" onclick={demo.toggleReject}
        >{snapshot.reject
          ? "Accept updates"
          : "Reject updates"}</L.LoongArkButton
      >
      <L.LoongArkButton variant="outline" onclick={demo.toggleDisabled}
        >{snapshot.disabled
          ? "Enable survey"
          : "Disable survey"}</L.LoongArkButton
      >
      <L.LoongArkButton variant="outline" onclick={demo.toggleShown}
        >{snapshot.shown ? "Hide survey" : "Show survey"}</L.LoongArkButton
      >
      <L.LoongArkButton variant="outline" onclick={demo.reset}
        >Reset survey</L.LoongArkButton
      >
      <L.LoongArkButton variant="outline" onclick={demo.toggleLongLabels}
        >{snapshot.longLabels
          ? "Use short labels"
          : "Use long labels"}</L.LoongArkButton
      >
      <L.LoongArkButton variant="outline" onclick={demo.toggleAdvanced}
        >{snapshot.advanced
          ? "Hide advanced questions"
          : "Show advanced questions"}</L.LoongArkButton
      >
      <L.LoongArkButton variant="outline" onclick={demo.toggleAsync}
        >{snapshot.async
          ? "Use synchronous validation"
          : "Use async validation"}</L.LoongArkButton
      >
      <L.LoongArkButton variant="outline" onclick={demo.internal}
        >Restart internal answers</L.LoongArkButton
      >
      <L.LoongArkButton variant="outline" onclick={demo.toggleStrict}
        >{snapshot.strict
          ? "Allow any priority order"
          : "Require clarity first"}</L.LoongArkButton
      >
      <L.LoongArkButton variant="outline" onclick={demo.toggleMinimum}
        >{snapshot.minimum === 2
          ? "Require one contact"
          : "Require two contacts"}</L.LoongArkButton
      >
    </L.LoongArkStack>
  </details>
  {#key snapshot.revision}
    {#if snapshot.shown}<L.LoongArkQuestionnaire
        label="Contact review"
        questions={snapshot.questions}
        value={snapshot.controlled ? snapshot.value : undefined}
        defaultValue={snapshot.value}
        disabled={snapshot.disabled}
        completed={!!snapshot.saved}
        onValueChange={demo.change}
        onComplete={demo.complete}
      />{/if}
  {/key}
  <output aria-label="Contact updates">{snapshot.callbacks} callbacks</output>
  <output
    aria-label="Saved contact answers"
    style="min-width:0;max-width:100%;overflow-wrap:anywhere"
    >{snapshot.saved
      ? JSON.stringify(snapshot.saved)
      : "No answers saved"}</output
  >
</L.LoongArkStack>
