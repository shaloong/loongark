<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticTagsInputStyles } from "@loongark/primitives/automatic-styles/tags-input";
  registerAutomaticStyles(lkAutomaticTagsInputStyles);

  import { TagsInput } from "@ark-ui/svelte/tags-input";
</script>

<TagsInput.ItemText data-scope="tags-input" data-part="item-text" {...$$restProps}>
  <slot />
</TagsInput.ItemText>
