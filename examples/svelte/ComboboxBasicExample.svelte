<script lang="ts">
  import {
    createListCollection,
    LoongArkComboboxRoot,
    LoongArkComboboxLabel,
    LoongArkComboboxControl,
    LoongArkComboboxInput,
    LoongArkComboboxTrigger,
    LoongArkComboboxPositioner,
    LoongArkComboboxContent,
    LoongArkComboboxList,
    LoongArkComboboxItem,
    LoongArkComboboxItemText,
  } from "@loongark/svelte";
  let query = $state("");
  const options = [
    { value: "beijing", label: "北京" },
    { value: "shanghai", label: "上海" },
  ];
  const items = $derived(options.filter((item) => item.label.includes(query)));
  const collection = $derived(createListCollection({ items }));
</script>

<LoongArkComboboxRoot
  {collection}
  inputValue={query}
  onInputValueChange={(details: { inputValue: string }) =>
    (query = details.inputValue)}
>
  <LoongArkComboboxLabel>搜索城市</LoongArkComboboxLabel>
  <LoongArkComboboxControl>
    <LoongArkComboboxInput placeholder="输入城市名称" />
    <LoongArkComboboxTrigger aria-label="展开选项" />
  </LoongArkComboboxControl>
  <LoongArkComboboxPositioner>
    <LoongArkComboboxContent>
      <LoongArkComboboxList>
        {#each items as item}<LoongArkComboboxItem {item}>
            <LoongArkComboboxItemText>
              {item.label}
            </LoongArkComboboxItemText>
          </LoongArkComboboxItem>{/each}
      </LoongArkComboboxList>
    </LoongArkComboboxContent>
  </LoongArkComboboxPositioner>
</LoongArkComboboxRoot>
