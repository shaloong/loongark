/** @jsxImportSource solid-js */
import { createSignal, For } from "solid-js";
import * as L from "@loongark/solid";
import {
  workspaceQuestions,
  workspaceDefaults,
  workspaceSummary,
} from "../shared/questionnaireAdvancedDemo";
export function QuestionnaireAdvancedExample() {
  const [answers, setAnswers] =
      createSignal<L.QuestionnaireValue>(workspaceDefaults()),
    [saved, setSaved] = createSignal<L.QuestionnaireValue | undefined>(
      undefined,
    ),
    [locked, setLocked] = createSignal(false),
    [revision, setRevision] = createSignal(0);
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", "max-width": "640px" }}>
      <L.LoongArkTypography as="h2">A workspace that fits</L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        Team details stay saved when you switch to a personal project. Only
        relevant answers are submitted.
      </L.LoongArkTypography>
      <L.LoongArkStack orientation="horizontal" gap="sm">
        <L.LoongArkButton
          variant="outline"
          onClick={() => setLocked(!locked())}
        >
          {locked() ? "Allow answer updates" : "Lock answer updates"}
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="outline"
          onClick={() => {
            setAnswers(workspaceDefaults());
            setSaved(undefined);
            setLocked(false);
            setRevision(revision() + 1);
          }}
        >
          Reset survey
        </L.LoongArkButton>
      </L.LoongArkStack>
      <For each={[revision()]}>
        {() => (
          <L.LoongArkQuestionnaire
            label="Workspace setup"
            questions={workspaceQuestions}
            value={answers()}
            completed={saved() !== undefined}
            onValueChange={(details) => {
              if (!locked()) setAnswers(details.value);
            }}
            onComplete={(details) => setSaved(details.value)}
          />
        )}
      </For>
      <output
        aria-label="Saved answers"
        data-answer-keys={Object.keys(saved() ?? {}).join(",")}
      >
        {workspaceSummary(saved())}
      </output>
    </L.LoongArkStack>
  );
}
