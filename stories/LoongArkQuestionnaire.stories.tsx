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
