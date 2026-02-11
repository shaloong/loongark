<script lang="ts">
  import { TagsInput } from "@ark-ui/svelte/tags-input";
  import type { TagsInputItemProps } from "@ark-ui/svelte/tags-input";

  export let value: TagsInputItemProps["value"] = undefined;
  export let index: TagsInputItemProps["index"] = undefined;
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
