<script lang="ts">
  import { TagsInput } from "@ark-ui/svelte/tags-input";
</script>

<TagsInput.ClearTrigger
  data-scope="tags-input"
  data-part="clear-trigger"
  {...$$restProps}
>
  <slot />
</TagsInput.ClearTrigger>
