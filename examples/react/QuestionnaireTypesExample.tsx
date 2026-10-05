import { useState } from "react";
import * as L from "@loongark/react";
import { complexQuestions, createQuestionnaireTypesDemo } from "../shared/questionnaireTypesDemo";
export function QuestionnaireTypesExample() {
  const [, redraw] = useState(0), [demo] = useState(() => createQuestionnaireTypesDemo(() => redraw(v => v + 1)));
  const snapshot = demo.snapshot;
  return <L.LoongArkStack gap="md" style={{maxWidth:640,width:"100%"}}>
    <L.LoongArkTypography as="h2">Structured answers</L.LoongArkTypography>
    <L.LoongArkStack orientation="horizontal" gap="sm">
      <L.LoongArkButton variant="outline" onClick={demo.toggleReject}>{snapshot.reject ? "Accept updates" : "Reject updates"}</L.LoongArkButton>
      <L.LoongArkButton variant="outline" onClick={demo.toggleDisabled}>{snapshot.disabled ? "Enable survey" : "Disable survey"}</L.LoongArkButton>
      <L.LoongArkButton variant="outline" onClick={demo.toggleShown}>{snapshot.shown ? "Hide survey" : "Show survey"}</L.LoongArkButton>
      <L.LoongArkButton variant="outline" onClick={demo.reset}>Reset survey</L.LoongArkButton>
    </L.LoongArkStack>
    {snapshot.shown && <L.LoongArkQuestionnaire label="Structured review" questions={complexQuestions} value={snapshot.value} disabled={snapshot.disabled} completed={!!snapshot.saved} onValueChange={demo.change} onComplete={demo.complete} />}
    <output aria-label="Saved structured answers">{snapshot.saved ? JSON.stringify(snapshot.saved) : "No answers saved"}</output>
  </L.LoongArkStack>;
}
