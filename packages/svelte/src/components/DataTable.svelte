<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticDataTableStyles } from "@shaloong/loongark-primitives/automatic-styles/data-table";
  registerAutomaticStyles(lkAutomaticDataTableStyles);

  import type { DataTableProps } from "@shaloong/loongark-kit";
  import Content from "./DataTableContent.svelte";
  const instanceId = $props.id();
  let props: DataTableProps = $props();
</script>

<Content {...props} {instanceId} />
