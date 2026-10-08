/** @jsxImportSource solid-js */
import { createSignal } from "solid-js";
import * as L from "@loongark/solid";
import { createQuestionnaireRankingDemo } from "../shared/questionnaireRankingDemo";
export function QuestionnaireRankingExample() {
  const [revision, redraw] = createSignal(0),
    demo = createQuestionnaireRankingDemo(() => redraw((v) => v + 1));
  const snapshot = () => {
    revision();
    return demo.snapshot;
  };
  return (
    <L.LoongArkStack gap="md" style={{ "max-width": "640px", width: "100%" }}>
      <L.LoongArkTypography as="h2">
        Reorder your priorities
      </L.LoongArkTypography>
      <L.LoongArkStack orientation="horizontal" gap="sm">
        <L.LoongArkButton variant="outline" onClick={demo.toggleReject}>
          {snapshot().reject ? "Accept updates" : "Reject updates"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.toggleDisabled}>
          {snapshot().disabled ? "Enable survey" : "Disable survey"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.toggleShown}>
          {snapshot().shown ? "Hide survey" : "Show survey"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.reset}>
          Reset survey
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.toggleOptions}>
          {snapshot().limited ? "Restore final option" : "Remove final option"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.replaceOrder}>
          External order
        </L.LoongArkButton>
      </L.LoongArkStack>
      {snapshot().shown && (
        <L.LoongArkQuestionnaire
          label="Ranking review"
          questions={snapshot().questions}
          value={snapshot().value}
          disabled={snapshot().disabled}
          completed={!!snapshot().saved}
          onValueChange={demo.change}
          onComplete={demo.complete}
        />
      )}
      <output aria-label="Ranking updates">
        {snapshot().callbacks} callbacks
      </output>
      <output
        aria-label="Saved ranking answers"
        style={{
          "min-width": "0",
          "max-width": "100%",
          "overflow-wrap": "anywhere",
        }}
      >
        {snapshot().saved
          ? JSON.stringify(snapshot().saved)
          : "No answers saved"}
      </output>
    </L.LoongArkStack>
  );
}
