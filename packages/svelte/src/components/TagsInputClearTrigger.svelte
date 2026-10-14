<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticTagsInputStyles } from "@shaloong/loongark-primitives/automatic-styles/tags-input";
  registerAutomaticStyles(lkAutomaticTagsInputStyles);

  import { TagsInput } from "@ark-ui/svelte/tags-input";
</script>

<TagsInput.ClearTrigger
  data-scope="tags-input"
  data-part="clear-trigger"
  {...$$restProps}
>
  <slot />
</TagsInput.ClearTrigger>
