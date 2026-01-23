<script lang="ts">
  import { createListCollection } from "@ark-ui/svelte";
  import {
    LoongArkComboboxRoot,
    LoongArkComboboxLabel,
    LoongArkComboboxControl,
    LoongArkComboboxInput,
    LoongArkComboboxTrigger,
    LoongArkComboboxClearTrigger,
    LoongArkComboboxPositioner,
    LoongArkComboboxContent,
    LoongArkComboboxList,
    LoongArkComboboxItem,
    LoongArkComboboxItemText,
    LoongArkComboboxItemIndicator,
  } from "@loongark/svelte";
  import type { ComboboxSize } from "@loongark/primitives";

  export let size: ComboboxSize = "md";
  export let disabled: boolean = false;
  export let label: string = "City";
  export let placeholder: string = "Search...";

  const options = [
    { label: "Beijing", value: "beijing" },
    { label: "Shanghai", value: "shanghai" },
    { label: "Guangzhou", value: "guangzhou" },
    { label: "Shenzhen", value: "shenzhen" },
    { label: "Hangzhou", value: "hangzhou" },
  ];

  let value: string[] = [];
  let inputValue = "";

  $: filteredOptions = (() => {
    const query = inputValue.trim().toLowerCase();
    if (!query) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(query)
    );
  })();

  $: collection = createListCollection({ items: filteredOptions });

  const handleInputValueChange = (details: { inputValue: string }) => {
    inputValue = details.inputValue;
  };

  const handleValueChange = (details: { value: string[] }) => {
    value = details.value;
    const nextValue = details.value[0];
    const match = options.find((option) => option.value === nextValue);
    inputValue = match?.label ?? "";
  };
</script>

<LoongArkComboboxRoot
  {collection}
  {value}
  {inputValue}
  {size}
  {disabled}
  onInputValueChange={handleInputValueChange}
  onValueChange={handleValueChange}
>
  <LoongArkComboboxLabel>{label}</LoongArkComboboxLabel>
  <LoongArkComboboxControl>
    <LoongArkComboboxInput {placeholder} />
    <LoongArkComboboxClearTrigger aria-label="Clear">x</LoongArkComboboxClearTrigger>
    <LoongArkComboboxTrigger aria-label="Toggle">v</LoongArkComboboxTrigger>
  </LoongArkComboboxControl>
  <LoongArkComboboxPositioner>
    <LoongArkComboboxContent>
      <LoongArkComboboxList>
        {#each filteredOptions as option}
          <LoongArkComboboxItem item={option}>
            <LoongArkComboboxItemText>{option.label}</LoongArkComboboxItemText>
            <LoongArkComboboxItemIndicator>Check</LoongArkComboboxItemIndicator>
          </LoongArkComboboxItem>
        {/each}
      </LoongArkComboboxList>
    </LoongArkComboboxContent>
  </LoongArkComboboxPositioner>
</LoongArkComboboxRoot>

<p style="margin-top: 16px; font-size: 14px; color: #666;">
  Selected: {value.length > 0 ? value.join(", ") : "None"}
</p>
