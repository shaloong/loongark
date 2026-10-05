/** @jsxImportSource solid-js */
import { createSignal } from "solid-js";
import * as L from "@loongark/solid";
import {
  createQuestionnaireAsyncDemo,
  asyncSurveyDefaults,
  asyncSurveySummary,
} from "../shared/questionnaireAsyncDemo";
export function QuestionnaireAsyncExample() {
  const [answers, setAnswers] = createSignal<L.QuestionnaireValue>(
      asyncSurveyDefaults(),
    ),
    [saved, setSaved] = createSignal<L.QuestionnaireValue>(),
    [aborted, setAborted] = createSignal(0),
    [short, setShort] = createSignal(false),
    [shown, setShown] = createSignal(true);
  const demo = createQuestionnaireAsyncDemo(setAborted);
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", "max-width": "640px" }}>
      <L.LoongArkTypography as="h2">
        Check answers without losing your place
      </L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        Checks belong to your service. Editing, cancelling or hiding the survey
        aborts pending work.
      </L.LoongArkTypography>
      <L.LoongArkStack orientation="horizontal" gap="sm">
        <L.LoongArkButton variant="outline" onClick={() => demo.failNext()}>
          Fail next check
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={() => setShort(!short())}>
          {short() ? "Restore questions" : "Use shorter survey"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={() => setShown(!shown())}>
          {shown() ? "Hide survey" : "Show survey"}
        </L.LoongArkButton>
      </L.LoongArkStack>
      {shown() && (
        <L.LoongArkQuestionnaire
          label="Async workspace setup"
          questions={short() ? demo.questions.slice(1) : demo.questions}
          value={answers()}
          completed={saved() !== undefined}
          onValueChange={(d) => setAnswers(d.value)}
          onComplete={(d) => setSaved(d.value)}
        />
      )}
      <output aria-label="Cancelled checks">
        Cancelled checks: {aborted()}
      </output>
      <output aria-label="Saved async answers">
        {asyncSurveySummary(saved())}
      </output>
    </L.LoongArkStack>
  );
}
