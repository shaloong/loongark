<script lang="ts">
  import { controlIcons } from "@loongark/kit";
  import { LoongArkIcon } from "@loongark/svelte";

  import * as L from "@loongark/svelte";
  import { quickActions, mediaDemoItems } from "../shared/mediaDemo";
  let selected = "None",
    submitted = 0,
    opened = false;
</script>

<form on:submit|preventDefault={() => submitted++}>
  <L.LoongArkStack style="width:100%;max-width:800px">
    <L.LoongArkPaper
      ><L.LoongArkStack
        ><h2>Workspace actions</h2>
        <L.LoongArkStack orientation="horizontal" gap="sm">
          <L.LoongArkFloatingActionButton
            aria-label="Create workspace"
            on:click={() => (selected = "workspace")}
            ><span aria-hidden="true"
              ><LoongArkIcon icon={controlIcons.plus} size="sm" /></span
            ></L.LoongArkFloatingActionButton
          ><L.LoongArkFloatingActionButton
            extended
            variant="secondary"
            on:click={() => (selected = "import")}
            >Import files</L.LoongArkFloatingActionButton
          ><L.LoongArkFloatingActionButton
            disabled
            aria-label="Unavailable action"
            ><span aria-hidden="true"
              ><LoongArkIcon icon={controlIcons.minus} size="sm" /></span
            ></L.LoongArkFloatingActionButton
          ></L.LoongArkStack
        >
        <div
          style="display:flex;justify-content:flex-end;align-items:flex-end;min-height:200px"
        >
          <L.LoongArkSpeedDial
            label="Quick actions"
            actions={quickActions}
            bind:open={opened}
            onSelect={(d) => (selected = d.value)}
          />
        </div>
        <output data-testid="action-value">Action: {selected}</output
        ></L.LoongArkStack
      ></L.LoongArkPaper
    >
    <section>
      <h2>Image list</h2>
      <L.LoongArkImageList
        columns={3}
        gap="sm"
        rowHeight={180}
        aria-label="Image collection"
        >{#each mediaDemoItems.slice(0, 4) as item, i}<L.LoongArkImageListItem
            columnSpan={i === 0 ? 2 : 1}
            rowSpan={i === 0 ? 2 : 1}
            ><img
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
            /><L.LoongArkImageListCaption
              >{item.label}</L.LoongArkImageListCaption
            ></L.LoongArkImageListItem
          >{/each}</L.LoongArkImageList
      >
    </section>
    <section>
      <h2>Masonry</h2>
      <L.LoongArkMasonry columns={3} gap="sm" aria-label="Masonry collection"
        >{#each mediaDemoItems as item}<L.LoongArkMasonryItem
            ><img
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
            /></L.LoongArkMasonryItem
          >{/each}</L.LoongArkMasonry
      >
    </section>
    <span hidden data-testid="action-submitted">{submitted}</span
    ></L.LoongArkStack
  >
</form>
