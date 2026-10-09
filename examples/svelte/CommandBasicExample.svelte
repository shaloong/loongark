<script lang="ts">
  import { createCommandCollection, LoongArkCommand } from "@loongark/svelte";
  let query = $state("");
  const options = [
    { value: "beijing", label: "北京" },
    { value: "shanghai", label: "上海" },
  ];
  const items = $derived(options.filter((item) => item.label.includes(query)));
  const collection = $derived(createCommandCollection({ items }));
</script>

<LoongArkCommand.Root
  {collection}
  open
  inputValue={query}
  onInputValueChange={(details: { inputValue: string }) =>
    (query = details.inputValue)}
>
  <LoongArkCommand.Label>搜索城市</LoongArkCommand.Label>
  <LoongArkCommand.Control>
    <LoongArkCommand.Input placeholder="输入城市名称" />
  </LoongArkCommand.Control>
  <LoongArkCommand.Content>
    {#each items as item}<LoongArkCommand.Item {item}>
        <LoongArkCommand.ItemText>
          {item.label}
        </LoongArkCommand.ItemText>
      </LoongArkCommand.Item>{/each}
  </LoongArkCommand.Content>
</LoongArkCommand.Root>
