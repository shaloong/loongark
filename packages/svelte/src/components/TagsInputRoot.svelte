<script lang="ts">
  import {
    TagsInput,
    useTagsInput,
    type TagsInputRootProps,
  } from "@ark-ui/svelte/tags-input";
  import type { TagsInputSize, TagsInputState } from "@loongark/primitives";
  let {
    children,
    ref = $bindable(null),
    value = $bindable(),
    inputValue = $bindable(),
    size = "md",
    state = "default",
    defaultValue,
    defaultInputValue,
    disabled,
    readOnly,
    required,
    invalid,
    name,
    form,
    id,
    ids,
    addOnPaste,
    allowDuplicates,
    allowOverflow,
    autoFocus,
    blurBehavior,
    delimiter,
    editable,
    max,
    maxLength,
    placeholder,
    sanitizeValue,
    translations,
    validate,
    onValueChange,
    onInputValueChange,
    onValueInvalid,
    onFocusOutside,
    onHighlightChange,
    onInteractOutside,
    onPointerDownOutside,
    ...dom
  }: TagsInputRootProps & {
    size?: TagsInputSize;
    state?: TagsInputState;
  } = $props();
  const providedId = $props.id();
  const api = useTagsInput(() => ({
    id: id ?? providedId,
    ids,
    value,
    inputValue,
    defaultValue,
    defaultInputValue,
    disabled,
    readOnly,
    required,
    invalid,
    name,
    form,
    addOnPaste,
    allowDuplicates,
    allowOverflow,
    autoFocus,
    blurBehavior,
    delimiter,
    editable,
    max,
    maxLength,
    placeholder,
    sanitizeValue,
    translations,
    validate,
    onValueInvalid,
    onFocusOutside,
    onHighlightChange,
    onInteractOutside,
    onPointerDownOutside,
    onValueChange(details) {
      if (!onValueChange) value = details.value;
      onValueChange?.(details);
    },
    onInputValueChange(details) {
      if (!onInputValueChange) inputValue = details.inputValue;
      onInputValueChange?.(details);
    },
  }));
</script>

<TagsInput.RootProvider
  value={api}
  bind:ref
  {...dom}
  data-scope="tags-input"
  data-part="root"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  data-disabled={disabled ? "true" : undefined}
  data-readonly={readOnly ? "true" : undefined}
>
  {@render children?.()}
</TagsInput.RootProvider>
