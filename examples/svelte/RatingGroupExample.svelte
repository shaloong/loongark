<script lang="ts">
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
        <svg viewBox="0 0 24 24" aria-hidden="true"
          ><path
            d="m12 3 2.8 5.7 6.3.9-4.5 4.4 1.1 6.3-5.7-3-5.7 3 1.1-6.3-4.5-4.4 6.3-.9Z"
          /></svg
        >
      </LoongArkRatingGroupItem>
    {/each}
  </LoongArkRatingGroupControl>
  <LoongArkRatingGroupHiddenInput />
</LoongArkRatingGroupRoot>
