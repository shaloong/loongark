<script lang="ts">
  import type { QuestionnaireValue } from "@loongark/kit";
  import * as L from "@loongark/svelte";
  import { feedbackQuestions } from "../shared/conversationDemo";
  let failed = $state(true),
    removed = $state(false),
    count = $state(8),
    completed = $state(false);
  let answers = $state<QuestionnaireValue>({});
</script>

<L.LoongArkStack gap="lg"
  ><L.LoongArkStack
    ><L.LoongArkTypography
      as="h1"
      style="font-size:var(--lk-typography-fontsize-xl)"
      >Project conversation</L.LoongArkTypography
    >
    {#if removed}<L.LoongArkButton onclick={() => (removed = false)}
        >Restore attachment</L.LoongArkButton
      >{:else}<L.LoongArkAttachment
        name="Design-review-notes-with-a-long-filename.pdf"
        size={2457600}
        status={failed ? "error" : "ready"}
        href="data:text/plain,Design%20notes"
        onRetry={() => (failed = false)}
        onRemove={() => (removed = true)}
      />{/if}
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
      onRemove={() => (removed = true)}
    />
  </L.LoongArkStack>
  <L.LoongArkMessageScroller label="Project messages"
    >{#each Array.from({ length: count }, (_, i) => i) as i}<L.LoongArkMessage
        author={i % 2 ? "You" : "Lin"}
        side={i % 2 ? "outgoing" : "incoming"}
        dateTime="2026-10-03T09:30:00+08:00"
        timeLabel="09:30"
        ><L.LoongArkBubble side={i % 2 ? "outgoing" : "incoming"}
          >{i === 0
            ? "Let’s review the details together. Long messages should wrap comfortably on smaller screens."
            : "Message " +
              (i + 1) +
              " — spacing, focus and states look consistent."}</L.LoongArkBubble
        ></L.LoongArkMessage
      >{/each}</L.LoongArkMessageScroller
  >
  <L.LoongArkButton onclick={() => count++}>Add message</L.LoongArkButton>
  <L.LoongArkQuestionnaire
    label="Help shape LoongArk"
    questions={feedbackQuestions}
    bind:value={answers}
    {completed}
    onComplete={() => (completed = true)}
  /></L.LoongArkStack
>
