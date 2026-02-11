<script lang="ts">
  import { RatingGroup } from "@ark-ui/svelte/rating-group";
  import type { RatingGroupItemProps } from "@ark-ui/svelte/rating-group";
</script>

<RatingGroup.Item
  data-scope="rating-group"
  data-part="item"
  {...$$restProps}
>
  <slot />
</RatingGroup.Item>
