import { defineComponent, h, ref } from "vue";
import type { QuestionnaireValue } from "@loongark/kit";
import * as L from "@loongark/vue";
import { feedbackQuestions } from "../shared/conversationDemo";
export const ConversationExample = defineComponent({
  setup() {
    const failed = ref(true),
      removed = ref(false),
      count = ref(8),
      completed = ref(false),
      answers = ref<QuestionnaireValue>({});
    return () =>
      h(L.LoongArkStack, { gap: "lg" }, () => [
        h(L.LoongArkStack, {}, () => [
          h(
            L.LoongArkTypography,
            {
              as: "h1",
              style: { fontSize: "var(--lk-typography-fontsize-xl)" },
            },
            () => "Project conversation",
          ),
          removed.value
            ? h(
                L.LoongArkButton,
                { onClick: () => (removed.value = false) },
                () => "Restore attachment",
              )
            : h(L.LoongArkAttachment, {
                name: "Design-review-notes-with-a-long-filename.pdf",
                size: 2457600,
                status: failed.value ? "error" : "ready",
                href: "data:text/plain,Design%20notes",
                onRetry: () => (failed.value = false),
                onRemove: () => (removed.value = true),
              }),
          h(L.LoongArkAttachment, {
            name: "Screenshots.zip",
            size: 8388608,
            status: "uploading",
            progress: 48,
          }),
          h(L.LoongArkAttachment, {
            name: "Private-draft.pdf",
            disabled: true,
            href: "data:text/plain,draft",
            onRemove: () => (removed.value = true),
          }),
        ]),
        h(L.LoongArkMessageScroller, { label: "Project messages" }, () =>
          Array.from({ length: count.value }, (_, i) =>
            h(
              L.LoongArkMessage,
              {
                key: i,
                author: i % 2 ? "You" : "Lin",
                side: i % 2 ? "outgoing" : "incoming",
                dateTime: "2026-10-03T09:30:00+08:00",
                timeLabel: "09:30",
              },
              () =>
                h(
                  L.LoongArkBubble,
                  { side: i % 2 ? "outgoing" : "incoming" },
                  () =>
                    i === 0
                      ? "Let’s review the details together. Long messages should wrap comfortably on smaller screens."
                      : "Message " +
                        (i + 1) +
                        " — spacing, focus and states look consistent.",
                ),
            ),
          ),
        ),
        h(
          L.LoongArkButton,
          { onClick: () => count.value++ },
          () => "Add message",
        ),
        h(L.LoongArkQuestionnaire, {
          label: "Help shape LoongArk",
          questions: feedbackQuestions,
          modelValue: answers.value,
          "onUpdate:modelValue": (value: QuestionnaireValue) =>
            (answers.value = value),
          completed: completed.value,
          onComplete: () => (completed.value = true),
        }),
      ]);
  },
});
