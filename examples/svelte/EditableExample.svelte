<script lang="ts">
  import {
    LoongArkEditableRoot,
    LoongArkEditableLabel,
    LoongArkEditableArea,
    LoongArkEditableControl,
    LoongArkEditableInput,
    LoongArkEditablePreview,
    LoongArkEditableEditTrigger,
    LoongArkEditableSubmitTrigger,
    LoongArkEditableCancelTrigger,
  } from "@loongark/svelte";
  import type { EditableSize, EditableState } from "@loongark/primitives";

  export let size: EditableSize = "md";
  export let state: EditableState = "default";
  export let disabled = false;

  let value = "LoongArk Design System";

  const handleValueChange = (details: { value: string }) => {
    value = details.value;
  };
</script>

<LoongArkEditableRoot
  {size}
  {state}
  {disabled}
  {value}
  onValueChange={handleValueChange}
>
  <LoongArkEditableLabel>Project name</LoongArkEditableLabel>
  <LoongArkEditableArea>
    <LoongArkEditablePreview />
    <LoongArkEditableInput />
  </LoongArkEditableArea>
  <LoongArkEditableControl style="display: flex; gap: 8px;">
    <LoongArkEditableEditTrigger>Edit</LoongArkEditableEditTrigger>
    <LoongArkEditableSubmitTrigger>Save</LoongArkEditableSubmitTrigger>
    <LoongArkEditableCancelTrigger>Cancel</LoongArkEditableCancelTrigger>
  </LoongArkEditableControl>
</LoongArkEditableRoot>
