<script lang="ts">
  import { NumberInput } from "@ark-ui/svelte/number-input";
</script>

<NumberInput.Label data-scope="number-input" data-part="label" {...$$restProps}>
  <slot />
</NumberInput.Label>
