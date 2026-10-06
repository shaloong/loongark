import type { StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import * as L from "@loongark/react";
import { feedbackQuestions } from "../examples/shared/conversationDemo";
export default { title: "Components/Questionnaire" };
function Survey() {
  const [completed, setCompleted] = useState(false);
  return (
    <L.LoongArkQuestionnaire
      label="Help shape LoongArk"
      questions={feedbackQuestions}
      completed={completed}
      onComplete={() => setCompleted(true)}
    />
  );
}
export const Basic = { render: () => <Survey /> };
export const Empty = {
  render: () => <L.LoongArkQuestionnaire label="Feedback" questions={[]} />,
};
export const Disabled = {
  render: () => (
    <L.LoongArkQuestionnaire
      label="Feedback"
      questions={feedbackQuestions}
      disabled
    />
  ),
};
export const Submitting = {
  render: () => (
    <L.LoongArkQuestionnaire
      label="Feedback"
      questions={[feedbackQuestions[2]]}
      defaultValue={{ notes: "Support more real scenarios." }}
      submitting
    />
  ),
};
export const Error = {
  render: () => (
    <L.LoongArkQuestionnaire
      label="Feedback"
      questions={[feedbackQuestions[2]]}
      defaultValue={{ notes: "Support more real scenarios." }}
      error="We could not save your answers. Please try again."
    />
  ),
};

import { QuestionnaireAdvancedExample } from "../examples/react/QuestionnaireAdvancedExample";
import { withArkExamplePage } from "./arkStory";
export const Conditional = {
  decorators: [withArkExamplePage],
  render: () => <QuestionnaireAdvancedExample />,
};

export const ConditionalEmpty = {
  decorators: [withArkExamplePage],
  render: () => (
    <L.LoongArkQuestionnaire
      label="No applicable questions"
      questions={feedbackQuestions.map((question) => ({
        ...question,
        when: () => false,
      }))}
    />
  ),
};

import { QuestionnaireAsyncExample } from "../examples/react/QuestionnaireAsyncExample";
import { createQuestionnaireAsyncDemo } from "../examples/shared/questionnaireAsyncDemo";
export const AsyncValidation = {
  decorators: [withArkExamplePage],
  render: () => <QuestionnaireAsyncExample />,
};
const alignmentQuestions = createQuestionnaireAsyncDemo(
  () => {},
).questions.slice(1);
export const LongOptions = {
  decorators: [withArkExamplePage],
  render: () => (
    <L.LoongArkQuestionnaire
      label="Choose how to collaborate"
      backLabel="Return to the previous question"
      submitLabel="Save collaboration preferences"
      questions={alignmentQuestions}
      defaultValue={{ plan: "team" }}
    />
  ),
};

function CallbackSurvey() {
  const [revision, setRevision] = useState(0),
    [handled, setHandled] = useState<number>();
  const [demo] = useState(() => createQuestionnaireAsyncDemo(() => {}));
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", maxWidth: 640 }}>
      <L.LoongArkButton
        variant="outline"
        onClick={() => setRevision(revision + 1)}
      >
        Update completion handler
      </L.LoongArkButton>
      <L.LoongArkQuestionnaire
        label="Callback updates"
        questions={demo.questions.slice(0, 1)}
        defaultValue={{ name: "Shaloong" }}
        onComplete={() => setHandled(revision)}
      />
      <output aria-label="Handled revision">
        {`Handled revision: ${handled ?? "Not submitted"}`}
      </output>
    </L.LoongArkStack>
  );
}
export const CallbackUpdates = {
  decorators: [withArkExamplePage],
  render: () => <CallbackSurvey />,
};

import { QuestionnaireTypesExample } from "../examples/react/QuestionnaireTypesExample";
export const StructuredTypes: StoryObj = { render: () => <QuestionnaireTypesExample /> };

import { QuestionnaireMatrixExample } from "../examples/react/QuestionnaireMatrixExample";
export const MatrixMultiple: StoryObj = { decorators: [withArkExamplePage], render: () => <QuestionnaireMatrixExample /> };

import { QuestionnaireRankingExample } from "../examples/react/QuestionnaireRankingExample";
export const RankingInteraction: StoryObj = {decorators:[withArkExamplePage], render:()=> <QuestionnaireRankingExample />};

import { QuestionnaireGroupsExample } from "../examples/react/QuestionnaireGroupsExample";
export const RepeatedGroups: StoryObj = { decorators:[withArkExamplePage], render:()=> <QuestionnaireGroupsExample /> };

import { QuestionnaireCustomExample } from "../examples/react/QuestionnaireCustomExample";
export const CustomRenderer: StoryObj = { decorators:[withArkExamplePage], render:()=> <QuestionnaireCustomExample /> };
