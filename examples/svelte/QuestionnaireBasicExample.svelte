<script lang="ts">
  import { LoongArkQuestionnaire } from "@loongark/svelte";
  let completed = $state(false);
</script>

<LoongArkQuestionnaire
  label="反馈问卷"
  questions={[
    { id: "name", type: "text", label: "姓名", required: true },
    { id: "notes", type: "text", label: "建议" },
  ]}
  {completed}
  onComplete={() => (completed = true)}
/>
