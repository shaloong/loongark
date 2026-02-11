<script lang="ts">
  import { RatingGroup } from "@ark-ui/svelte/rating-group";
  import type { RatingGroupLabelProps } from "@ark-ui/svelte/rating-group";
</script>

<RatingGroup.Label
  data-scope="rating-group"
  data-part="label"
  {...$$restProps}
>
  <slot />
</RatingGroup.Label>
