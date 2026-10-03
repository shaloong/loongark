<script lang="ts">
  import {
    LoongArkButton,
    LoongArkSegmentGroupRoot,
    LoongArkSegmentGroupItem,
    LoongArkSegmentGroupItemHiddenInput,
    LoongArkSegmentGroupItemText,
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

  let value: string | null = "overview";
</script>

<form style="display: flex; flex-direction: column; gap: 12px;">
  <LoongArkSegmentGroupRoot
    aria-label="View"
    name="view"
    {size}
    {orientation}
    {disabled}
    bind:value
  >
    {#each options as option}
      <LoongArkSegmentGroupItem value={option.value}>
        <LoongArkSegmentGroupItemHiddenInput /><LoongArkSegmentGroupItemText
          >{option.label}</LoongArkSegmentGroupItemText
        >
      </LoongArkSegmentGroupItem>
    {/each}
  </LoongArkSegmentGroupRoot>
  <span
    style="font-size: 14px; color: var(--lk-color-semantic-mutedforeground);"
  >
    Selected: {value || "None"}
  </span>
  <LoongArkButton
    type="button"
    variant="outline"
    onclick={() => (value = "overview")}>Reset view</LoongArkButton
  >
</form>
