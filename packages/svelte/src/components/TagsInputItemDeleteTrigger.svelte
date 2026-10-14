<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticTagsInputStyles } from "@shaloong/loongark-primitives/automatic-styles/tags-input";
  registerAutomaticStyles(lkAutomaticTagsInputStyles);

  import { TagsInput } from "@ark-ui/svelte/tags-input";
</script>

<TagsInput.ItemDeleteTrigger
  data-scope="tags-input"
  data-part="item-delete-trigger"
  {...$$restProps}
>
  <slot />
</TagsInput.ItemDeleteTrigger>
