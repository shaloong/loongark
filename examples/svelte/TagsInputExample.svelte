<script lang="ts">
  import {
    LoongArkTagsInputRoot,
    LoongArkTagsInputLabel,
    LoongArkTagsInputControl,
    LoongArkTagsInputInput,
    LoongArkTagsInputItem,
    LoongArkTagsInputItemPreview,
    LoongArkTagsInputItemText,
    LoongArkTagsInputItemDeleteTrigger,
    LoongArkTagsInputClearTrigger,
    LoongArkTagsInputHiddenInput,
  } from "@loongark/svelte";
  import type { TagsInputSize, TagsInputState } from "@loongark/primitives";

  export let size: TagsInputSize = "md";
  export let state: TagsInputState = "default";
  export let disabled = false;
  export let readOnly = false;

  let value = ["React", "Vue", "Solid"];

  const handleValueChange = (details: { value: string[] }) => {
    value = details.value;
  };
</script>

<LoongArkTagsInputRoot
  {size}
  {state}
  {disabled}
  {readOnly}
  {value}
  onValueChange={handleValueChange}
>
  <LoongArkTagsInputLabel>Frameworks</LoongArkTagsInputLabel>
  <LoongArkTagsInputControl {size} {state} {disabled}>
    {#each value as tag, index (tag)}
      <LoongArkTagsInputItem value={tag} {index}>
        <LoongArkTagsInputItemPreview>
          <LoongArkTagsInputItemText>{tag}</LoongArkTagsInputItemText>
          <LoongArkTagsInputItemDeleteTrigger>
            ×
          </LoongArkTagsInputItemDeleteTrigger>
        </LoongArkTagsInputItemPreview>
      </LoongArkTagsInputItem>
    {/each}
    <LoongArkTagsInputInput
      {size}
      {state}
      {disabled}
      {readOnly}
      placeholder="Add tag"
    />
    <LoongArkTagsInputClearTrigger>Clear</LoongArkTagsInputClearTrigger>
  </LoongArkTagsInputControl>
  <LoongArkTagsInputHiddenInput />
</LoongArkTagsInputRoot>
