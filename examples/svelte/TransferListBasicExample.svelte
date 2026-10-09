<script lang="ts">
  import { LoongArkTransferList } from "@loongark/svelte";
</script>

<LoongArkTransferList
  items={[
    { value: "design", label: "设计" },
    { value: "dev", label: "开发" },
  ]}
  defaultValue={["dev"]}
  name="members"
/>
