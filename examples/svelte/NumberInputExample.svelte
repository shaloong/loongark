<script lang="ts">
  import {
    LoongArkNumberInputRoot,
    LoongArkNumberInputLabel,
    LoongArkNumberInputControl,
    LoongArkNumberInputInput,
    LoongArkNumberInputIncrementTrigger,
    LoongArkNumberInputDecrementTrigger,
    LoongArkNumberInputValueText,
    LoongArkNumberInputScrubber,
  } from "@loongark/svelte";
  import type { NumberInputSize, NumberInputState } from "@loongark/primitives";

  export let size: NumberInputSize = "md";
  export let state: NumberInputState = "default";
  export let disabled = false;

  let value = "24";

  const handleValueChange = (details: { value: string }) => {
    value = details.value;
  };
</script>

<LoongArkNumberInputRoot
  {value}
  min={0}
  max={100}
  step={1}
  {size}
  {state}
  {disabled}
  onValueChange={handleValueChange}
>
  <LoongArkNumberInputLabel>Amount</LoongArkNumberInputLabel>
  <LoongArkNumberInputControl {size} {state} {disabled}>
    <LoongArkNumberInputInput {size} {state} {disabled} />
    <LoongArkNumberInputIncrementTrigger {size} {state} {disabled} />
    <LoongArkNumberInputDecrementTrigger {size} {state} {disabled} />
  </LoongArkNumberInputControl>
  <LoongArkNumberInputScrubber>Drag to adjust</LoongArkNumberInputScrubber>
  <LoongArkNumberInputValueText {size}>
    Value: {value || "0"}
  </LoongArkNumberInputValueText>
</LoongArkNumberInputRoot>
