<script lang="ts">
  import {
    TagsInput,
    useTagsInputContext,
    type TagsInputInputProps,
  } from "@ark-ui/svelte/tags-input";
  import type { TagsInputSize, TagsInputState } from "@loongark/primitives";
  let {
    size = "md",
    state = "default",
    disabled,
    readOnly,
    readonly: nativeReadOnly,
    ...props
  }: Omit<TagsInputInputProps, "size"> & {
    size?: TagsInputSize;
    state?: TagsInputState;
    readOnly?: boolean;
  } = $props();
  const api = useTagsInputContext();
  const isDisabled = $derived(
    disabled ?? !!api().getHiddenInputProps().disabled,
  );
  const isReadOnly = $derived(
    readOnly ?? nativeReadOnly ?? !!api().getHiddenInputProps().readonly,
  );
</script>

<TagsInput.Input
  {...props}
  disabled={isDisabled}
  readonly={isReadOnly}
  data-scope="tags-input"
  data-part="input"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  data-disabled={isDisabled ? "true" : undefined}
  data-readonly={isReadOnly ? "true" : undefined}
/>
