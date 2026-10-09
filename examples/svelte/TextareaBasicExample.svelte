<script lang="ts">
  import { LoongArkLabel, LoongArkTextarea } from "@loongark/svelte";
</script>

<div>
  <LoongArkLabel for="basic-notes">备注</LoongArkLabel>
  <LoongArkTextarea
    id="basic-notes"
    name="notes"
    autoSize
    minRows={2}
    maxRows={5}
    placeholder="输入备注…"
  />
</div>
