import { useState } from "react";
import type { QuestionnaireValue } from "@loongark/kit";
import * as L from "@loongark/react";
import { feedbackQuestions } from "../shared/conversationDemo";
export function ConversationExample() {
  const [failed, setFailed] = useState(true),
    [removed, setRemoved] = useState(false),
    [count, setCount] = useState(8),
    [completed, setCompleted] = useState(false),
    [answers, setAnswers] = useState<QuestionnaireValue>({});
  return (
    <L.LoongArkStack gap="lg">
      <L.LoongArkStack>
        <L.LoongArkTypography
          as="h1"
          style={{ fontSize: "var(--lk-typography-fontsize-xl)" }}
        >
          Project conversation
        </L.LoongArkTypography>
        {removed ? (
          <L.LoongArkButton onClick={() => setRemoved(false)}>
            Restore attachment
          </L.LoongArkButton>
        ) : (
          <L.LoongArkAttachment
            name="Design-review-notes-with-a-long-filename.pdf"
            size={2457600}
            status={failed ? "error" : "ready"}
            href="data:text/plain,Design%20notes"
            onRetry={() => setFailed(false)}
            onRemove={() => setRemoved(true)}
          />
        )}
        <L.LoongArkAttachment
          name="Screenshots.zip"
          size={8388608}
          status="uploading"
          progress={48}
        />
        <L.LoongArkAttachment
          name="Private-draft.pdf"
          disabled
          href="data:text/plain,draft"
          onRemove={() => setRemoved(true)}
        />
      </L.LoongArkStack>
      <L.LoongArkMessageScroller label="Project messages">
        {Array.from({ length: count }, (_, i) => (
          <L.LoongArkMessage
            author={i % 2 ? "You" : "Lin"}
            side={i % 2 ? "outgoing" : "incoming"}
            dateTime="2026-10-03T09:30:00+08:00"
            timeLabel="09:30"
            key={i}
          >
            <L.LoongArkBubble side={i % 2 ? "outgoing" : "incoming"}>
              {i === 0
                ? "Let’s review the details together. Long messages should wrap comfortably on smaller screens."
                : "Message " +
                  (i + 1) +
                  " — spacing, focus and states look consistent."}
            </L.LoongArkBubble>
          </L.LoongArkMessage>
        ))}
      </L.LoongArkMessageScroller>
      <L.LoongArkButton onClick={() => setCount(count + 1)}>
        Add message
      </L.LoongArkButton>
      <L.LoongArkQuestionnaire
        label="Help shape LoongArk"
        questions={feedbackQuestions}
        value={answers}
        onValueChange={({ value }) => setAnswers(value)}
        completed={completed}
        onComplete={() => setCompleted(true)}
      />
    </L.LoongArkStack>
  );
}
