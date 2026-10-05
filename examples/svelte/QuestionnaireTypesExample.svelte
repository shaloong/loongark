<script lang="ts">
 import * as L from "@loongark/svelte";
 import { complexQuestions, createQuestionnaireTypesDemo } from "../shared/questionnaireTypesDemo";
 let revision = $state(0);
 const demo = createQuestionnaireTypesDemo(() => revision++);
 const snapshot = $derived.by(() => { revision; return demo.snapshot; });
</script>
<L.LoongArkStack gap="md" style="max-width:640px;width:100%">
 <L.LoongArkTypography as="h2">Structured answers</L.LoongArkTypography>
 <L.LoongArkStack orientation="horizontal" gap="sm">
  <L.LoongArkButton variant="outline" onclick={demo.toggleReject}>{snapshot.reject ? "Accept updates" : "Reject updates"}</L.LoongArkButton>
  <L.LoongArkButton variant="outline" onclick={demo.toggleDisabled}>{snapshot.disabled ? "Enable survey" : "Disable survey"}</L.LoongArkButton>
  <L.LoongArkButton variant="outline" onclick={demo.toggleShown}>{snapshot.shown ? "Hide survey" : "Show survey"}</L.LoongArkButton>
  <L.LoongArkButton variant="outline" onclick={demo.reset}>Reset survey</L.LoongArkButton>
 </L.LoongArkStack>
 {#if snapshot.shown}<L.LoongArkQuestionnaire label="Structured review" questions={complexQuestions} value={snapshot.value} disabled={snapshot.disabled} completed={!!snapshot.saved} onValueChange={demo.change} onComplete={demo.complete} />{/if}
 <output aria-label="Saved structured answers" style="min-width:0;max-width:100%;overflow-wrap:anywhere">{snapshot.saved ? JSON.stringify(snapshot.saved) : "No answers saved"}</output>
</L.LoongArkStack>
