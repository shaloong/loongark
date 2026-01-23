<script lang="ts">
  import {
    LoongArkSegmentGroupRoot,
    LoongArkSegmentGroupItem,
  } from "@loongark/svelte";
  import type {
    SegmentGroupOrientation,
    SegmentGroupSize,
  } from "@loongark/primitives";

  export let size: SegmentGroupSize = "md";
  export let orientation: SegmentGroupOrientation = "horizontal";
  export let disabled = false;

  const options = [
    { label: "Overview", value: "overview" },
    { label: "Activity", value: "activity" },
    { label: "Settings", value: "settings" },
  ];

  let value: string[] = ["overview"];

  const handleValueChange = (details: { value: string[] }) => {
    value = details.value;
  };
</script>

<div style="display: flex; flex-direction: column; gap: 12px;">
  <LoongArkSegmentGroupRoot
    {size}
    {orientation}
    {disabled}
    {value}
    onValueChange={handleValueChange}
  >
    {#each options as option}
      <LoongArkSegmentGroupItem value={option.value}>
        {option.label}
      </LoongArkSegmentGroupItem>
    {/each}
  </LoongArkSegmentGroupRoot>
  <span style="font-size: 14px; color: #666;">
    Selected: {value[0] || "None"}
  </span>
</div>
