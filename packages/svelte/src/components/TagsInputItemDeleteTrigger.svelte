<script lang="ts">
  import { TagsInput } from "@ark-ui/svelte/tags-input";
</script>

<TagsInput.ItemDeleteTrigger
  data-scope="tags-input"
  data-part="item-delete-trigger"
  {...$$restProps}
>
  <slot />
</TagsInput.ItemDeleteTrigger>
