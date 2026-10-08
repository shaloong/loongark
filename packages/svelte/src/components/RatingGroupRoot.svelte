<script lang="ts">
  import {
    RatingGroup,
    type RatingGroupRootProps,
  } from "@ark-ui/svelte/rating-group";
  import type { RatingGroupSize } from "@loongark/primitives";
  import { useRatingGroup } from "./use-rating.svelte";
  let {
    ref = $bindable(null),
    children,
    size = "md",
    disabled,
    allowHalf,
    autoFocus,
    count,
    defaultValue,
    form,
    id,
    ids,
    name,
    onHoverChange,
    onValueChange,
    readOnly,
    required,
    translations,
    value = $bindable(),
    ...dom
  }: RatingGroupRootProps & { size?: RatingGroupSize } = $props();
  const providedId = $props.id();
  const api = useRatingGroup(() => ({
    allowHalf,
    autoFocus,
    count,
    defaultValue,
    disabled,
    form,
    id: id ?? providedId,
    ids,
    name,
    onHoverChange,
    readOnly,
    required,
    translations,
    value,
    onValueChange(details) {
      if (!onValueChange) value = details.value;
      onValueChange?.(details);
    },
  }));
</script>

<RatingGroup.RootProvider
  value={api}
  bind:ref
  {...dom}
  data-scope="rating-group"
  data-part="root"
  data-size={size}
  data-disabled={disabled ? "true" : undefined}
  >{@render children?.()}</RatingGroup.RootProvider
>
