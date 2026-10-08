import { useEffect, useState } from "react";
import * as L from "@loongark/react";
import { createQuestionnaireCustomDemo } from "../shared/questionnaireCustomDemo";
import {
  groupsDisclosureCSS,
  groupsDisclosureIcon,
} from "../shared/questionnaireGroupsDemo";
import { QuestionnaireRatingControl } from "./QuestionnaireRatingControl";
export function QuestionnaireCustomExample() {
  const [, redraw] = useState(0),
    [demo] = useState(() =>
      createQuestionnaireCustomDemo(() => redraw((v) => v + 1)),
    );
  useEffect(() => () => demo.dispose(), [demo]);
  const [renderers] = useState<L.LoongArkQuestionnaireRenderers>(() => {
    const rating: L.LoongArkQuestionnaireRenderers[string] = (context) => (
      <QuestionnaireRatingControl context={context} suggest={demo.suggest} />
    );
    return { rating, "compact-rating": rating };
  });
  const snapshot = demo.snapshot;
  return (
    <L.LoongArkStack gap="md" style={{ maxWidth: 640, width: "100%" }}>
      <style>{groupsDisclosureCSS}</style>
      <L.LoongArkTypography as="h2">
        Give your experience a rating
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
          <L.LoongArkButton variant="outline" onClick={demo.toggleNested}>
            {snapshot.nested
              ? "Use standalone question"
              : "Use nested questions"}
          </L.LoongArkButton>
          <L.LoongArkButton variant="outline" onClick={demo.toggleCompact}>
            {snapshot.compact
              ? "Use standard renderer"
              : "Use compact renderer"}
          </L.LoongArkButton>
          <L.LoongArkButton variant="outline" onClick={demo.toggleAsync}>
            {snapshot.async
              ? "Use synchronous validation"
              : "Use async validation"}
          </L.LoongArkButton>
          <L.LoongArkButton variant="outline" onClick={demo.reset}>
            {"Reset survey"}
          </L.LoongArkButton>
        </L.LoongArkStack>
      </details>
      {snapshot.shown && (
        <L.LoongArkQuestionnaire
          key={snapshot.revision}
          label="Experience review"
          questions={snapshot.questions}
          value={snapshot.value}
          disabled={snapshot.disabled}
          completed={!!snapshot.saved}
          renderers={renderers}
          onValueChange={demo.change}
          onComplete={demo.complete}
        />
      )}
      <output aria-label="Rating updates">
        {snapshot.callbacks} callbacks
      </output>
      <output aria-label="Saved rating answers">
        {snapshot.saved ? JSON.stringify(snapshot.saved) : "No answers saved"}
      </output>
    </L.LoongArkStack>
  );
}
