<script lang="ts">
  import { TagsInput } from "@ark-ui/svelte/tags-input";
</script>

<TagsInput.ItemText data-scope="tags-input" data-part="item-text" {...$$restProps}>
  <slot />
</TagsInput.ItemText>
