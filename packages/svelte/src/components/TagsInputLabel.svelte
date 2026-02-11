<script lang="ts">
  import { TagsInput } from "@ark-ui/svelte/tags-input";
</script>

<TagsInput.Label data-scope="tags-input" data-part="label" {...$$restProps}>
  <slot />
</TagsInput.Label>
