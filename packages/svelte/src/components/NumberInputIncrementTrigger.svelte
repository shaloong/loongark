<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticNumberInputStyles } from "@shaloong/loongark-primitives/automatic-styles/number-input";
  registerAutomaticStyles(lkAutomaticNumberInputStyles);

  import { nativeSelectionProps } from "@shaloong/loongark-kit";
  import { controlIcons } from "@shaloong/loongark-kit";
  import Icon from "./Icon.svelte";
  import { NumberInput } from "@ark-ui/svelte/number-input";
  import type { NumberInputSize, NumberInputState } from "@shaloong/loongark-primitives";

  export let size: NumberInputSize = "md";
  export let state: NumberInputState = "default";
  export let disabled: boolean | undefined = undefined;
</script>

<NumberInput.IncrementTrigger
  {...nativeSelectionProps({ disabled })}
  data-scope="number-input"
  data-part="increment-trigger"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  {...nativeSelectionProps({
    "data-disabled": disabled === undefined ? undefined : String(disabled),
  })}
  {...$$restProps}
>
  <slot><Icon icon={controlIcons.plus} size="sm" /></slot>
</NumberInput.IncrementTrigger>
