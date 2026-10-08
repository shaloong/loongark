<script lang="ts">
  import { nativeSelectionProps } from "@loongark/kit";
  import { controlIcons } from "@loongark/kit";
  import Icon from "./Icon.svelte";
  import { NumberInput } from "@ark-ui/svelte/number-input";
  import type { NumberInputSize, NumberInputState } from "@loongark/primitives";

  export let size: NumberInputSize = "md";
  export let state: NumberInputState = "default";
  export let disabled: boolean | undefined = undefined;
</script>

<NumberInput.DecrementTrigger
  {...nativeSelectionProps({ disabled })}
  data-scope="number-input"
  data-part="decrement-trigger"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  {...nativeSelectionProps({
    "data-disabled": disabled === undefined ? undefined : String(disabled),
  })}
  {...$$restProps}
>
  <slot><Icon icon={controlIcons.minus} size="sm" /></slot>
</NumberInput.DecrementTrigger>
