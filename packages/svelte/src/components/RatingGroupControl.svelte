<script lang="ts">
  import { RatingGroup } from "@ark-ui/svelte/rating-group";
  import type { RatingGroupControlProps } from "@ark-ui/svelte/rating-group";
</script>

<RatingGroup.Control
  data-scope="rating-group"
  data-part="control"
  {...$$restProps}
>
  <slot />
</RatingGroup.Control>
