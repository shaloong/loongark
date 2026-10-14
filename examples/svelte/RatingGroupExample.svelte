<script lang="ts">
  import { LoongArkIcon } from "@shaloong/loongark-svelte";
  import { controlIcons } from "@shaloong/loongark-kit";
  import {
    LoongArkRatingGroupRoot,
    LoongArkRatingGroupLabel,
    LoongArkRatingGroupControl,
    LoongArkRatingGroupItem,
    LoongArkRatingGroupHiddenInput,
  } from "@shaloong/loongark-svelte";
  import type { RatingGroupSize } from "@shaloong/loongark-primitives";

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
