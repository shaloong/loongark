<script lang="ts">
  import { Select } from "@ark-ui/svelte/select";
</script>

<Select.ItemText data-scope="select" data-part="item-text" {...$$restProps}>
  <slot />
</Select.ItemText>
