<script lang="ts">
  import { Select } from "@ark-ui/svelte/select";
  import { getSelectSize } from "./selectContext";

  const size = getSelectSize();
</script>

<Select.Content data-scope="select" data-part="content" data-size={$size}>
  <slot />
</Select.Content>
