<script lang="ts">
  import { NumberInput } from "@ark-ui/svelte/number-input";
  import type { NumberInputSize } from "@loongark/primitives";

  export let size: NumberInputSize = "md";
</script>

<NumberInput.ValueText
  data-scope="number-input"
  data-part="value-text"
  data-size={size}
  {...$$restProps}
>
  <slot />
</NumberInput.ValueText>
