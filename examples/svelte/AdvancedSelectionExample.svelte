<script lang="ts">
  import * as L from "@loongark/svelte";
  const choices = [
      { label: "React", value: "react" },
      { label: "Vue", value: "vue" },
      { label: "Solid", value: "solid", disabled: true },
      { label: "Svelte", value: "svelte" },
    ],
    collection = L.createListCollection({ items: choices });
  const select = L.useSelect(() => ({
      collection,
      multiple: true,
      name: "frameworks",
      defaultValue: ["react"],
      closeOnSelect: false,
    })),
    pagination = L.usePagination(() => ({
      count: 100,
      pageSize: 10,
      defaultPage: 5,
    }));
  let submitted = $state("");
</script>

<L.LoongArkStack gap="lg" style="width:100%;max-width:640px">
  <L.LoongArkTypography as="h2">Control a selection</L.LoongArkTypography>
  <form
    onsubmit={(event) => {
      event.preventDefault();
      submitted = new FormData(event.currentTarget)
        .getAll("frameworks")
        .join(", ");
    }}
  >
    <L.LoongArkSelectRootProvider value={select}>
      <L.LoongArkSelectLabel>Frameworks</L.LoongArkSelectLabel
      ><L.LoongArkSelectControl
        ><L.LoongArkSelectTrigger
          ><L.LoongArkSelectValueText
            placeholder="Choose frameworks"
          /><L.LoongArkSelectIndicator aria-hidden="true"
            >⌄</L.LoongArkSelectIndicator
          ></L.LoongArkSelectTrigger
        ></L.LoongArkSelectControl
      >
      <L.LoongArkSelectPositioner
        ><L.LoongArkSelectContent
          ><L.LoongArkSelectList
            >{#each choices as item}<L.LoongArkSelectItem {item}
                ><L.LoongArkSelectItemText
                  >{item.label}</L.LoongArkSelectItemText
                ><L.LoongArkSelectItemIndicator /></L.LoongArkSelectItem
              >{/each}</L.LoongArkSelectList
          ></L.LoongArkSelectContent
        ></L.LoongArkSelectPositioner
      ><L.LoongArkSelectHiddenSelect />
    </L.LoongArkSelectRootProvider>
    <L.LoongArkStack
      orientation="horizontal"
      gap="sm"
      style="margin-top:var(--lk-space-component-md)"
      ><L.LoongArkButton
        type="button"
        variant="outline"
        onclick={() => select().setValue(["react"])}
        >Reset selection</L.LoongArkButton
      ><L.LoongArkButton type="submit">Submit frameworks</L.LoongArkButton
      ></L.LoongArkStack
    >
  </form>
  <output aria-label="Submitted frameworks"
    >{submitted || "Not submitted"}</output
  >
  <L.LoongArkPaginationRootProvider
    value={pagination}
    aria-label="Results pages"
    ><L.LoongArkPaginationFirstTrigger>First</L.LoongArkPaginationFirstTrigger
    ><L.LoongArkPaginationPrevTrigger>Previous</L.LoongArkPaginationPrevTrigger
    ><span>Page {pagination().page} of {pagination().totalPages}</span
    ><L.LoongArkPaginationNextTrigger>Next</L.LoongArkPaginationNextTrigger
    ><L.LoongArkPaginationLastTrigger>Last</L.LoongArkPaginationLastTrigger
    ></L.LoongArkPaginationRootProvider
  >
</L.LoongArkStack>
