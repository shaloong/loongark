<script lang="ts">
  import { NumberInput } from "@ark-ui/svelte/number-input";
  import type { NumberInputSize, NumberInputState } from "@loongark/primitives";

  export let size: NumberInputSize = "md";
  export let state: NumberInputState = "default";
  export let disabled: boolean = false;
</script>

<NumberInput.IncrementTrigger
  data-scope="number-input"
  data-part="increment-trigger"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  data-disabled={disabled ? "true" : undefined}
  {...$$restProps}
>
  <slot />
</NumberInput.IncrementTrigger>
