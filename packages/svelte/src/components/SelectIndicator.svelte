<script lang="ts">
  import { Select } from "@ark-ui/svelte/select";
</script>

<Select.Indicator data-scope="select" data-part="indicator" {...$$restProps}>
  <slot />
</Select.Indicator>
