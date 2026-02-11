<script lang="ts">
  import { TagsInput } from "@ark-ui/svelte/tags-input";
</script>

<TagsInput.ItemPreview
  data-scope="tags-input"
  data-part="item-preview"
  {...$$restProps}
>
  <slot />
</TagsInput.ItemPreview>
