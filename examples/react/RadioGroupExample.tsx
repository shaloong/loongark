import React, { useState } from "react";
import {
  LoongArkRadioGroupRoot,
  LoongArkRadioGroupLabel,
  LoongArkRadioGroupItem,
  LoongArkRadioGroupItemControl,
  LoongArkRadioGroupItemText,
  LoongArkRadioGroupIndicator,
  LoongArkRadioGroupItemHiddenInput,
} from "@loongark/react";
import type {
  RadioGroupSize,
  RadioGroupOrientation,
} from "@loongark/primitives";

export interface RadioGroupExampleProps {
  size?: RadioGroupSize;
  orientation?: RadioGroupOrientation;
  disabled?: boolean;
}

export const RadioGroupExample: React.FC<RadioGroupExampleProps> = ({
  size = "md",
  orientation = "vertical",
  disabled = false,
}) => {
  const [value, setValue] = useState("option1");

  const options = [
    { value: "option1", label: "选项 1" },
    { value: "option2", label: "选项 2" },
    { value: "option3", label: "选项 3" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <LoongArkRadioGroupRoot
        size={size}
        orientation={orientation}
        disabled={disabled}
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        <LoongArkRadioGroupLabel
          style={{ marginBottom: "12px", fontWeight: 500 }}
        >
          请选择一个选项
        </LoongArkRadioGroupLabel>

        {options.map((option) => (
          <LoongArkRadioGroupItem key={option.value} value={option.value}>
            <LoongArkRadioGroupItemControl />
            <LoongArkRadioGroupItemText>
              {option.label}
            </LoongArkRadioGroupItemText>
            <LoongArkRadioGroupItemHiddenInput />
          </LoongArkRadioGroupItem>
        ))}
      </LoongArkRadioGroupRoot>

      <p style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
        当前选择: {value}
      </p>
    </div>
  );
};
