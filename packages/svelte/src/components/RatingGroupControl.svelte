<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticRatingGroupStyles } from "@shaloong/loongark-primitives/automatic-styles/rating-group";
  registerAutomaticStyles(lkAutomaticRatingGroupStyles);

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
