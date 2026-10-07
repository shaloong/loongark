import { useState } from "react";
import * as L from "@loongark/react";
import {
  groupsDisclosureIcon,
  groupsDisclosureCSS,
  createQuestionnaireGroupsDemo,
} from "../shared/questionnaireGroupsDemo";
export function QuestionnaireGroupsExample() {
  const [, redraw] = useState(0),
    [demo] = useState(() =>
      createQuestionnaireGroupsDemo(() => redraw((v) => v + 1)),
    );
  const snapshot = demo.snapshot;
  return (
    <L.LoongArkStack gap="md" style={{ maxWidth: 640, width: "100%" }}>
      <style>{groupsDisclosureCSS}</style>
      <L.LoongArkTypography as="h2">
        Keep your contacts together
      </L.LoongArkTypography>
      <details data-groups-demo-controls="">
        <summary>
          <L.LoongArkIcon icon={groupsDisclosureIcon} size="sm" />
          More controls
        </summary>
        <L.LoongArkStack orientation="horizontal" gap="sm">
          <L.LoongArkButton variant="outline" onClick={demo.toggleReject}>
            {snapshot.reject ? "Accept updates" : "Reject updates"}
          </L.LoongArkButton>
          <L.LoongArkButton variant="outline" onClick={demo.toggleDisabled}>
            {snapshot.disabled ? "Enable survey" : "Disable survey"}
          </L.LoongArkButton>
          <L.LoongArkButton variant="outline" onClick={demo.toggleShown}>
            {snapshot.shown ? "Hide survey" : "Show survey"}
          </L.LoongArkButton>
          <L.LoongArkButton variant="outline" onClick={demo.reset}>
            Reset survey
          </L.LoongArkButton>
          <L.LoongArkButton variant="outline" onClick={demo.toggleLongLabels}>
            {snapshot.longLabels ? "Use short labels" : "Use long labels"}
          </L.LoongArkButton>
          <L.LoongArkButton variant="outline" onClick={demo.toggleAdvanced}>
            {snapshot.advanced
              ? "Hide advanced questions"
              : "Show advanced questions"}
          </L.LoongArkButton>
          <L.LoongArkButton variant="outline" onClick={demo.toggleAsync}>
            {snapshot.async
              ? "Use synchronous validation"
              : "Use async validation"}
          </L.LoongArkButton>
          <L.LoongArkButton variant="outline" onClick={demo.internal}>
            Restart internal answers
          </L.LoongArkButton>
          <L.LoongArkButton variant="outline" onClick={demo.toggleStrict}>
            {snapshot.strict
              ? "Allow any priority order"
              : "Require clarity first"}
          </L.LoongArkButton>
          <L.LoongArkButton variant="outline" onClick={demo.toggleMinimum}>
            {snapshot.minimum === 2
              ? "Require one contact"
              : "Require two contacts"}
          </L.LoongArkButton>
        </L.LoongArkStack>
      </details>
      {snapshot.shown && (
        <L.LoongArkQuestionnaire
          label="Contact review"
          questions={snapshot.questions}
          key={snapshot.revision}
          value={snapshot.controlled ? snapshot.value : undefined}
          defaultValue={snapshot.value}
          disabled={snapshot.disabled}
          completed={!!snapshot.saved}
          onValueChange={demo.change}
          onComplete={demo.complete}
        />
      )}
      <output aria-label="Contact updates">
        {snapshot.callbacks} callbacks
      </output>
      <output
        aria-label="Saved contact answers"
        style={{ minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere" }}
      >
        {snapshot.saved ? JSON.stringify(snapshot.saved) : "No answers saved"}
      </output>
    </L.LoongArkStack>
  );
}
