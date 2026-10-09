<script lang="ts">
  import {
    LoongArkJsonTreeViewRoot,
    LoongArkJsonTreeViewTree,
  } from "@loongark/svelte";
</script>

<LoongArkJsonTreeViewRoot
  data={{ project: "示例项目", members: 2 }}
  defaultExpandedDepth={1}
>
  <LoongArkJsonTreeViewTree aria-label="项目数据" />
</LoongArkJsonTreeViewRoot>
