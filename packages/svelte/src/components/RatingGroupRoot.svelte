<script lang="ts">
  import { RatingGroup } from "@ark-ui/svelte/rating-group";
  import type { RatingGroupRootProps } from "@ark-ui/svelte/rating-group";
  import type { RatingGroupSize } from "@loongark/primitives";

  export let size: RatingGroupSize = "md";
  export let disabled: RatingGroupRootProps["disabled"] = undefined;
</script>

<RatingGroup.Root
  {disabled}
  data-scope="rating-group"
  data-part="root"
  data-size={size}
  data-disabled={disabled ? "true" : undefined}
  {...$$restProps}
>
  <slot />
</RatingGroup.Root>
