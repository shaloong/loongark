<script lang="ts">
  import { LoongArkTimePicker } from "@loongark/svelte";
</script>

<LoongArkTimePicker
  label="会议时间"
  name="meeting"
  defaultValue="09:30"
  minuteStep={15}
/>
