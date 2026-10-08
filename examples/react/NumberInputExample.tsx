import React, { useState } from "react";
import {
  LoongArkNumberInputRoot,
  LoongArkNumberInputLabel,
  LoongArkNumberInputControl,
  LoongArkNumberInputInput,
  LoongArkNumberInputIncrementTrigger,
  LoongArkNumberInputDecrementTrigger,
  LoongArkNumberInputValueText,
  LoongArkNumberInputScrubber,
} from "@loongark/react";
import type { NumberInputSize, NumberInputState } from "@loongark/primitives";

export interface NumberInputExampleProps {
  size?: NumberInputSize;
  state?: NumberInputState;
  disabled?: boolean;
}

export const NumberInputExample: React.FC<NumberInputExampleProps> = ({
  size = "md",
  state = "default",
  disabled = false,
}) => {
  const [value, setValue] = useState("24");

  return (
    <LoongArkNumberInputRoot
      value={value}
      min={0}
      max={100}
      step={1}
      size={size}
      state={state}
      disabled={disabled}
      onValueChange={(details: { value: string }) => setValue(details.value)}
    >
      <LoongArkNumberInputLabel>Amount</LoongArkNumberInputLabel>
      <LoongArkNumberInputControl size={size} state={state} disabled={disabled}>
        <LoongArkNumberInputInput
          size={size}
          state={state}
          disabled={disabled}
        />
        <LoongArkNumberInputIncrementTrigger
          size={size}
          state={state}
          disabled={disabled}
        />
        <LoongArkNumberInputDecrementTrigger
          size={size}
          state={state}
          disabled={disabled}
        />
      </LoongArkNumberInputControl>
      <LoongArkNumberInputScrubber>Drag to adjust</LoongArkNumberInputScrubber>
      <LoongArkNumberInputValueText size={size}>
        Value: {value || "0"}
      </LoongArkNumberInputValueText>
    </LoongArkNumberInputRoot>
  );
};
