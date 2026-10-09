import React, { useState } from "react";
import { LoongArkQuestionnaire } from "@loongark/react";
export function QuestionnaireBasicExample() {
  const [completed, setCompleted] = useState(false);
  return (
    <LoongArkQuestionnaire
      label="反馈问卷"
      questions={[
        { id: "name", type: "text", label: "姓名", required: true },
        { id: "notes", type: "text", label: "建议" },
      ]}
      completed={completed}
      onComplete={() => setCompleted(true)}
    />
  );
}
