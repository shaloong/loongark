<script lang="ts">
  import { TagsInput } from "@ark-ui/svelte/tags-input";
  import type { TagsInputSize, TagsInputState } from "@loongark/primitives";

  export let size: TagsInputSize = "md";
  export let state: TagsInputState = "default";
  export let disabled: boolean = false;
  export let readOnly: boolean = false;
</script>

<TagsInput.Input
  {disabled}
  readonly={readOnly}
  data-scope="tags-input"
  data-part="input"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  data-disabled={disabled ? "true" : undefined}
  data-readonly={readOnly ? "true" : undefined}
  {...$$restProps}
/>
