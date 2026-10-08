<script lang="ts">
  import { Select } from "@ark-ui/svelte/select";

  export let item: object;
</script>

<Select.Item {item} data-scope="select" data-part="item" {...$$restProps}>
  <slot />
</Select.Item>
