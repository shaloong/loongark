/** @jsxImportSource solid-js */
import { createSignal, createMemo } from "solid-js";
import { LoongArkQuestionnaire } from "@loongark/solid";
export function QuestionnaireBasicExample() {
  const [completed, setCompleted] = createSignal(false);
  return (
    <LoongArkQuestionnaire
      label="反馈问卷"
      questions={[
        { id: "name", type: "text", label: "姓名", required: true },
        { id: "notes", type: "text", label: "建议" },
      ]}
      completed={completed()}
      onComplete={() => setCompleted(true)}
    />
  );
}
