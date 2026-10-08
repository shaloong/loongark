<script lang="ts">
  import type { DataTableProps } from "@loongark/kit";
  import Content from "./DataTableContent.svelte";
  const instanceId = $props.id();
  let props: DataTableProps = $props();
</script>

<Content {...props} {instanceId} />
