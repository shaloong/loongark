<script lang="ts">
  import { createListCollection } from "@ark-ui/svelte";
  import {
    LoongArkListboxRoot,
    LoongArkListboxLabel,
    LoongArkListboxList,
    LoongArkListboxItem,
    LoongArkListboxItemText,
    LoongArkListboxItemIndicator,
  } from "@loongark/svelte";
  import type { ListboxOrientation, ListboxSize } from "@loongark/primitives";

  export let size: ListboxSize = "md";
  export let orientation: ListboxOrientation = "vertical";

  const options = [
    { label: "Beijing", value: "beijing" },
    { label: "Shanghai", value: "shanghai" },
    { label: "Guangzhou", value: "guangzhou" },
    { label: "Shenzhen", value: "shenzhen" },
    { label: "Hangzhou", value: "hangzhou" },
  ];

  const collection = createListCollection({ items: options });
  let value: string[] = ["beijing"];

  const handleValueChange = (details: { value: string[] }) => {
    value = details.value;
  };
</script>

<LoongArkListboxRoot
  {collection}
  {value}
  {size}
  {orientation}
  onValueChange={handleValueChange}
>
  <LoongArkListboxLabel>City</LoongArkListboxLabel>
  <LoongArkListboxList>
    {#each options as option}
      <LoongArkListboxItem item={option}>
        <LoongArkListboxItemText>{option.label}</LoongArkListboxItemText>
        <LoongArkListboxItemIndicator>Check</LoongArkListboxItemIndicator>
      </LoongArkListboxItem>
    {/each}
  </LoongArkListboxList>
</LoongArkListboxRoot>
