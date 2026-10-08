<script lang="ts">
  import { onDestroy } from "svelte";
  import * as L from "@loongark/svelte";
  import { createQuestionnaireCustomDemo } from "../shared/questionnaireCustomDemo";
  import {
    groupsDisclosureCSS,
    groupsDisclosureIcon,
  } from "../shared/questionnaireGroupsDemo";
  import type { QuestionnaireCustomContext } from "@loongark/kit";
  import Rating from "./QuestionnaireRatingControl.svelte";
  let revision = $state(0);
  const demo = createQuestionnaireCustomDemo(() => revision++);
  const snapshot = $derived.by(() => {
    revision;
    return demo.snapshot;
  });
  onDestroy(() => demo.dispose());
</script>

{#snippet rating(context: QuestionnaireCustomContext)}<Rating
    {context}
    suggest={demo.suggest}
  />{/snippet}
<L.LoongArkStack gap="md" style="max-width:640px;width:100%"
  ><svelte:element this={"style"}>{groupsDisclosureCSS}</svelte:element
  ><L.LoongArkTypography as="h2"
    >Give your experience a rating</L.LoongArkTypography
  >
  <details data-groups-demo-controls="">
    <summary
      ><L.LoongArkIcon icon={groupsDisclosureIcon} size="sm" />More controls</summary
    ><L.LoongArkStack orientation="horizontal" gap="sm">
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
      <L.LoongArkButton variant="outline" onclick={demo.toggleNested}
        >{snapshot.nested
          ? "Use standalone question"
          : "Use nested questions"}</L.LoongArkButton
      >
      <L.LoongArkButton variant="outline" onclick={demo.toggleCompact}
        >{snapshot.compact
          ? "Use standard renderer"
          : "Use compact renderer"}</L.LoongArkButton
      >
      <L.LoongArkButton variant="outline" onclick={demo.toggleAsync}
        >{snapshot.async
          ? "Use synchronous validation"
          : "Use async validation"}</L.LoongArkButton
      >
      <L.LoongArkButton variant="outline" onclick={demo.reset}
        >{"Reset survey"}</L.LoongArkButton
      >
    </L.LoongArkStack>
  </details>
  {#if snapshot.shown}{#key snapshot.revision}<L.LoongArkQuestionnaire
        label="Experience review"
        questions={snapshot.questions}
        value={snapshot.value}
        disabled={snapshot.disabled}
        completed={!!snapshot.saved}
        renderers={{ rating, "compact-rating": rating }}
        onValueChange={demo.change}
        onComplete={demo.complete}
      />{/key}{/if}
  <output aria-label="Rating updates">{snapshot.callbacks} callbacks</output
  ><output aria-label="Saved rating answers"
    >{snapshot.saved
      ? JSON.stringify(snapshot.saved)
      : "No answers saved"}</output
  >
</L.LoongArkStack>
