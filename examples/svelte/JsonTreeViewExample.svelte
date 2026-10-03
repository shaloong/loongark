<script lang="ts">
  import * as L from "@loongark/svelte";
  import { inspectionData } from "../shared/arkAdditionsDemo";
  let data = $state(inspectionData);
</script>

<L.LoongArkStack gap="md" style="width:100%;max-width:640px">
  <L.LoongArkTypography as="h2">Inspect structured data</L.LoongArkTypography>
  <L.LoongArkTypography variant="muted"
    >Expand branches with arrow keys. Values are rendered as text.</L.LoongArkTypography
  >
  <L.LoongArkButton
    type="button"
    variant="outline"
    onclick={() =>
      (data = {
        ...inspectionData,
        project: data.project === "LoongArk" ? "Updated project" : "LoongArk",
      })}>Update data</L.LoongArkButton
  >
  <L.LoongArkJsonTreeViewRoot {data} defaultExpandedDepth={1}
    ><L.LoongArkJsonTreeViewTree aria-label="Project data"
      >{#snippet arrow()}<span aria-hidden="true">›</span
        >{/snippet}</L.LoongArkJsonTreeViewTree
    ></L.LoongArkJsonTreeViewRoot
  >
</L.LoongArkStack>
