<script lang="ts">
  import { LoongArkIcon } from "@loongark/svelte";
  import { controlIcons } from "@loongark/kit";
  import {
    LoongArkRatingGroupRoot,
    LoongArkRatingGroupLabel,
    LoongArkRatingGroupControl,
    LoongArkRatingGroupItem,
    LoongArkRatingGroupHiddenInput,
  } from "@loongark/svelte";
  import type { RatingGroupSize } from "@loongark/primitives";

  export let size: RatingGroupSize = "md";
  export let disabled = false;

  let value = 3;

  const handleValueChange = (details: { value: number }) => {
    value = details.value;
  };
</script>

<LoongArkRatingGroupRoot
  {size}
  {disabled}
  {value}
  onValueChange={handleValueChange}
>
  <LoongArkRatingGroupLabel>Rating</LoongArkRatingGroupLabel>
  <LoongArkRatingGroupControl>
    {#each [1, 2, 3, 4, 5] as item}
      <LoongArkRatingGroupItem index={item}>
        <LoongArkIcon icon={controlIcons.star} size="lg" />
      </LoongArkRatingGroupItem>
    {/each}
  </LoongArkRatingGroupControl>
  <LoongArkRatingGroupHiddenInput />
</LoongArkRatingGroupRoot>
