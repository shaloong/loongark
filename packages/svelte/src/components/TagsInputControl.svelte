<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticTagsInputStyles } from "@shaloong/loongark-primitives/automatic-styles/tags-input";
  registerAutomaticStyles(lkAutomaticTagsInputStyles);

  import { TagsInput } from "@ark-ui/svelte/tags-input";
  import type { TagsInputSize, TagsInputState } from "@shaloong/loongark-primitives";

  export let size: TagsInputSize = "md";
  export let state: TagsInputState = "default";
  export let disabled: boolean = false;
</script>

<TagsInput.Control
  data-scope="tags-input"
  data-part="control"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  data-disabled={disabled ? "true" : undefined}
  {...$$restProps}
>
  <slot />
</TagsInput.Control>
