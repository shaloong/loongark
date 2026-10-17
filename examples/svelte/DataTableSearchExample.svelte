<script lang="ts">
  import {
    LoongArkStack,
    LoongArkInputRoot,
    LoongArkInputLabel,
    LoongArkInputControl,
    LoongArkButton,
    LoongArkDataTable,
  } from "@shaloong/loongark-svelte";
  import type { DataTableState } from "@shaloong/loongark-kit";
  import { searchRows, searchColumns } from "../shared/tableSearchDemo";
  let tableState = $state<DataTableState>({ query: "Alpha", page: 1 });
  let showSearch = $state(false);
</script>

<LoongArkStack gap="md">
  <LoongArkInputRoot>
    <LoongArkInputLabel>外部搜索</LoongArkInputLabel>
    <LoongArkInputControl
      type="search"
      value={tableState.query}
      oninput={(event) =>
        (tableState = {
          ...tableState,
          query: event.currentTarget.value,
          page: 1,
        })}
    />
  </LoongArkInputRoot>
  <LoongArkButton
    aria-pressed={showSearch}
    onclick={() => (showSearch = !showSearch)}>切换内置搜索</LoongArkButton
  >
  <LoongArkDataTable
    label="搜索示例"
    data={searchRows}
    columns={searchColumns}
    state={tableState}
    onStateChange={(next) => (tableState = next)}
    {showSearch}
  />
</LoongArkStack>
