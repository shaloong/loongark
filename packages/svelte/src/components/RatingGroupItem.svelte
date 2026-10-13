<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticRatingGroupStyles } from "@loongark/primitives/automatic-styles/rating-group";
  registerAutomaticStyles(lkAutomaticRatingGroupStyles);

  import { RatingGroup } from "@ark-ui/svelte/rating-group";
  import type { RatingGroupItemProps } from "@ark-ui/svelte/rating-group";
  export let index: RatingGroupItemProps["index"];
</script>

<RatingGroup.Item
  {index}
  data-scope="rating-group"
  data-part="item"
  {...$$restProps}
>
  <slot />
</RatingGroup.Item>
