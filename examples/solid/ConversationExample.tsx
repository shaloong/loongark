/** @jsxImportSource solid-js */
import { createSignal, For } from "solid-js";
import type { QuestionnaireValue } from "@loongark/kit";
import * as L from "@loongark/solid";
import { feedbackQuestions } from "../shared/conversationDemo";
export function ConversationExample() {
  const [failed, setFailed] = createSignal(true),
    [removed, setRemoved] = createSignal(false),
    [count, setCount] = createSignal(8),
    [completed, setCompleted] = createSignal(false),
    [answers, setAnswers] = createSignal<QuestionnaireValue>({});
  return (
    <L.LoongArkStack gap="lg">
      <L.LoongArkStack>
        <L.LoongArkTypography
          as="h1"
          style={{ "font-size": "var(--lk-typography-fontsize-xl)" }}
        >
          Project conversation
        </L.LoongArkTypography>
        {removed() ? (
          <L.LoongArkButton onClick={() => setRemoved(false)}>
            Restore attachment
          </L.LoongArkButton>
        ) : (
          <L.LoongArkAttachment
            name="Design-review-notes-with-a-long-filename.pdf"
            size={2457600}
            status={failed() ? "error" : "ready"}
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
        <For each={Array.from({ length: count() }, (_, i) => i)}>
          {(i) => (
            <L.LoongArkMessage
              author={i % 2 ? "You" : "Lin"}
              side={i % 2 ? "outgoing" : "incoming"}
              dateTime="2026-10-03T09:30:00+08:00"
              timeLabel="09:30"
            >
              <L.LoongArkBubble side={i % 2 ? "outgoing" : "incoming"}>
                {i === 0
                  ? "Let’s review the details together. Long messages should wrap comfortably on smaller screens."
                  : "Message " +
                    (i + 1) +
                    " — spacing, focus and states look consistent."}
              </L.LoongArkBubble>
            </L.LoongArkMessage>
          )}
        </For>
      </L.LoongArkMessageScroller>
      <L.LoongArkButton onClick={() => setCount(count() + 1)}>
        Add message
      </L.LoongArkButton>
      <L.LoongArkQuestionnaire
        label="Help shape LoongArk"
        questions={feedbackQuestions}
        value={answers()}
        onValueChange={({ value }) => setAnswers(value)}
        completed={completed()}
        onComplete={() => setCompleted(true)}
      />
    </L.LoongArkStack>
  );
}
