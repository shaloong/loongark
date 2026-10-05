/** @jsxImportSource solid-js */
import { createSignal } from "solid-js";
import * as L from "@loongark/solid";
import { complexQuestions, createQuestionnaireTypesDemo } from "../shared/questionnaireTypesDemo";
export function QuestionnaireTypesExample() {
  const [revision, redraw] = createSignal(0), demo = createQuestionnaireTypesDemo(() => redraw(v => v + 1));
  const snapshot = () => { revision(); return demo.snapshot; };
  return <L.LoongArkStack gap="md" style={{"max-width":"640px",width:"100%"}}>
    <L.LoongArkTypography as="h2">Structured answers</L.LoongArkTypography>
    <L.LoongArkStack orientation="horizontal" gap="sm">
      <L.LoongArkButton variant="outline" onClick={demo.toggleReject}>{snapshot().reject ? "Accept updates" : "Reject updates"}</L.LoongArkButton>
      <L.LoongArkButton variant="outline" onClick={demo.toggleDisabled}>{snapshot().disabled ? "Enable survey" : "Disable survey"}</L.LoongArkButton>
      <L.LoongArkButton variant="outline" onClick={demo.toggleShown}>{snapshot().shown ? "Hide survey" : "Show survey"}</L.LoongArkButton>
      <L.LoongArkButton variant="outline" onClick={demo.reset}>Reset survey</L.LoongArkButton>
    </L.LoongArkStack>
    {snapshot().shown && <L.LoongArkQuestionnaire label="Structured review" questions={complexQuestions} value={snapshot().value} disabled={snapshot().disabled} completed={!!snapshot().saved} onValueChange={demo.change} onComplete={demo.complete} />}
    <output aria-label="Saved structured answers" style={{"min-width":"0","max-width":"100%","overflow-wrap":"anywhere"}}>{snapshot().saved ? JSON.stringify(snapshot().saved) : "No answers saved"}</output>
  </L.LoongArkStack>;
}
