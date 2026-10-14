<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticTagsInputStyles } from "@shaloong/loongark-primitives/automatic-styles/tags-input";
  registerAutomaticStyles(lkAutomaticTagsInputStyles);

  import { TagsInput } from "@ark-ui/svelte/tags-input";
  import type { TagsInputItemProps } from "@ark-ui/svelte/tags-input";

  export let value: TagsInputItemProps["value"];
  export let index: TagsInputItemProps["index"];
  export let disabled: TagsInputItemProps["disabled"] = undefined;
</script>

<TagsInput.Item
  {value}
  {index}
  {disabled}
  data-scope="tags-input"
  data-part="item"
  {...$$restProps}
>
  <slot />
</TagsInput.Item>
