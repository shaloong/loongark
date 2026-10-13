<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticRatingGroupStyles } from "@loongark/primitives/automatic-styles/rating-group";
  registerAutomaticStyles(lkAutomaticRatingGroupStyles);

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
