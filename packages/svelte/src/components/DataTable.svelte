<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticDataTableStyles } from "@loongark/primitives/automatic-styles/data-table";
  registerAutomaticStyles(lkAutomaticDataTableStyles);

  import type { DataTableProps } from "@loongark/kit";
  import Content from "./DataTableContent.svelte";
  const instanceId = $props.id();
  let props: DataTableProps = $props();
</script>

<Content {...props} {instanceId} />
