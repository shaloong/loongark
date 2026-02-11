<script lang="ts">
  import { TagsInput } from "@ark-ui/svelte/tags-input";
  import type { TagsInputRootProps } from "@ark-ui/svelte/tags-input";
  import type { TagsInputSize, TagsInputState } from "@loongark/primitives";

  export let size: TagsInputSize = "md";
  export let state: TagsInputState = "default";
  export let value: TagsInputRootProps["value"] = undefined;
  export let defaultValue: TagsInputRootProps["defaultValue"] = undefined;
  export let inputValue: TagsInputRootProps["inputValue"] = undefined;
  export let defaultInputValue: TagsInputRootProps["defaultInputValue"] = undefined;
  export let disabled: TagsInputRootProps["disabled"] = undefined;
  export let readOnly: TagsInputRootProps["readOnly"] = undefined;
  export let required: TagsInputRootProps["required"] = undefined;
  export let invalid: TagsInputRootProps["invalid"] = undefined;
  export let name: TagsInputRootProps["name"] = undefined;
  export let form: TagsInputRootProps["form"] = undefined;
  export let id: TagsInputRootProps["id"] = undefined;
  export let ids: TagsInputRootProps["ids"] = undefined;
  export let onValueChange: TagsInputRootProps["onValueChange"] = undefined;
  export let onInputValueChange: TagsInputRootProps["onInputValueChange"] =
    undefined;
  export let onValueInvalid: TagsInputRootProps["onValueInvalid"] = undefined;
</script>

<TagsInput.Root
  {value}
  {defaultValue}
  {inputValue}
  {defaultInputValue}
  {disabled}
  {readOnly}
  {required}
  {invalid}
  {name}
  {form}
  {id}
  {ids}
  {onValueChange}
  {onInputValueChange}
  {onValueInvalid}
  data-scope="tags-input"
  data-part="root"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  data-disabled={disabled ? "true" : undefined}
  data-readonly={readOnly ? "true" : undefined}
  {...$$restProps}
>
  <slot />
</TagsInput.Root>
