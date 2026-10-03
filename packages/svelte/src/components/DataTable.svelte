<script lang="ts">
  import {
    createDataTableView,
    nextDataSort,
    type DataSort,
    type DataRow,
    type DataColumn,
  } from "@loongark/kit";
  export let data: readonly DataRow[];
  export let columns: readonly DataColumn[];
  export let pageSize = 10;
  export let rowKey = "id";
  export let onSelectionChange: ((ids: string[]) => void) | undefined =
    undefined;
  let query = "";
  let sort: DataSort | undefined;
  let page = 1;
  let selected: string[] = [];
  $: view = createDataTableView(data, columns, {
    query,
    sort,
    page,
    pageSize,
    rowKey,
  });
  function select(id: string) {
    selected = selected.includes(id)
      ? selected.filter((x) => x !== id)
      : [...selected, id];
    onSelectionChange?.(selected);
  }
</script>

<section data-scope="data-table" {...$$restProps}>
  <input
    aria-label="Filter rows"
    placeholder="Filter rows…"
    bind:value={query}
    on:input={() => (page = 1)}
  />
  <div data-scope="table" data-part="root">
    <table data-scope="table" data-part="table">
      <thead
        ><tr
          ><th scope="col">Select</th>{#each columns as c}<th
              scope="col"
              aria-sort={sort?.key === c.key
                ? sort.direction === "asc"
                  ? "ascending"
                  : "descending"
                : "none"}
              >{#if c.sortable === false}{c.label}{:else}<button
                  type="button"
                  on:click={() => (sort = nextDataSort(sort, c.key))}
                  >{c.label}</button
                >{/if}</th
            >{/each}</tr
        ></thead
      ><tbody
        >{#each view.rows as { row, id } (id)}<tr
            data-selected={selected.includes(id) || undefined}
            ><td
              ><input
                type="checkbox"
                aria-label={"Select " + id}
                checked={selected.includes(id)}
                on:change={() => select(id)}
              /></td
            >{#each columns as c}<td>{String(row[c.key] ?? "")}</td>{/each}</tr
          >{:else}<tr><td colspan={columns.length + 1}>No results</td></tr
          >{/each}</tbody
      >
    </table>
  </div>
  <footer>
    <span aria-live="polite"
      >{view.total} rows · {selected.length} selected · {view.page} / {view.pageCount}</span
    ><button
      type="button"
      disabled={view.page <= 1}
      on:click={() => (page = view.page - 1)}>Previous</button
    ><button
      type="button"
      disabled={view.page >= view.pageCount}
      on:click={() => (page = view.page + 1)}>Next</button
    >
  </footer>
</section>
