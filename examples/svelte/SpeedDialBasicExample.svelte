<script lang="ts">
  import { LoongArkSpeedDial } from "@loongark/svelte";
</script>

<LoongArkSpeedDial
  label="快捷操作"
  actions={[
    { value: "new", label: "新建" },
    { value: "search", label: "搜索" },
  ]}
/>
