<script lang="ts">
  import { Select } from "@ark-ui/svelte/select";
</script>

<Select.Trigger data-scope="select" data-part="trigger" {...$$restProps}>
  <slot />
</Select.Trigger>
