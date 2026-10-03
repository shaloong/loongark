/** @jsxImportSource solid-js */
import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import {
  LoongArkNumberInputRoot,
  LoongArkNumberInputLabel,
  LoongArkNumberInputControl,
  LoongArkNumberInputInput,
  LoongArkNumberInputIncrementTrigger,
  LoongArkNumberInputDecrementTrigger,
  LoongArkNumberInputValueText,
  LoongArkNumberInputScrubber,
} from "@loongark/solid";
import type { NumberInputSize, NumberInputState } from "@loongark/primitives";

export interface NumberInputExampleProps {
  size?: NumberInputSize;
  state?: NumberInputState;
  disabled?: boolean;
}

export const NumberInputExample: Component<NumberInputExampleProps> = (
  props,
) => {
  const size = () => props.size ?? "md";
  const state = () => props.state ?? "default";
  const disabled = () => props.disabled ?? false;
  const [value, setValue] = createSignal("24");

  return (
    <LoongArkNumberInputRoot
      value={value()}
      min={0}
      max={100}
      step={1}
      size={size()}
      state={state()}
      disabled={disabled()}
      onValueChange={(details: { value: string }) => setValue(details.value)}
    >
      <LoongArkNumberInputLabel>Amount</LoongArkNumberInputLabel>
      <LoongArkNumberInputControl
        size={size()}
        state={state()}
        disabled={disabled()}
      >
        <LoongArkNumberInputInput
          size={size()}
          state={state()}
          disabled={disabled()}
        />
        <LoongArkNumberInputIncrementTrigger
          size={size()}
          state={state()}
          disabled={disabled()}
        >
          +
        </LoongArkNumberInputIncrementTrigger>
        <LoongArkNumberInputDecrementTrigger
          size={size()}
          state={state()}
          disabled={disabled()}
        >
          -
        </LoongArkNumberInputDecrementTrigger>
      </LoongArkNumberInputControl>
      <LoongArkNumberInputScrubber>Drag to adjust</LoongArkNumberInputScrubber>
      <LoongArkNumberInputValueText size={size()}>
        Value: {value() || "0"}
      </LoongArkNumberInputValueText>
    </LoongArkNumberInputRoot>
  );
};
