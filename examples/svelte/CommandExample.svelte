<script lang="ts">
  import * as L from "@loongark/svelte";
  const rows = [
    { id: "overview", name: "组件概览" },
    { id: "api", name: "API 参考" },
    { id: "release", name: "发布说明" },
  ];
  let query = $state("");
  const items = $derived(
    L.filterCommandItems(rows, query, (item) => item.name),
  );
  const collection = $derived(
    L.createCommandCollection({
      items,
      itemToString: (item) => item.name,
      itemToValue: (item) => item.id,
    }),
  );
  const setQuery = (next: string) => (query = next);
</script>

<L.LoongArkCommand.Root
  {collection}
  open
  inputValue={query}
  onInputValueChange={(details) => setQuery(details.inputValue)}
  ><L.LoongArkCommand.Label>搜索命令</L.LoongArkCommand.Label
  ><L.LoongArkCommand.Control
    ><L.LoongArkCommand.Input
      placeholder="搜索组件、API 或发布说明"
    /></L.LoongArkCommand.Control
  ><L.LoongArkCommand.Content
    >{#each items as item (item.id)}<L.LoongArkCommand.Item {item}
        ><L.LoongArkCommand.ItemText>{item.name}</L.LoongArkCommand.ItemText
        ></L.LoongArkCommand.Item
      >{/each}</L.LoongArkCommand.Content
  ></L.LoongArkCommand.Root
>
