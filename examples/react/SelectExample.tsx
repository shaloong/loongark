import React, { useState } from "react";
import { createListCollection } from "@ark-ui/react";
import {
  LoongArkSelectRoot,
  LoongArkSelectLabel,
  LoongArkSelectControl,
  LoongArkSelectTrigger,
  LoongArkSelectValueText,
  LoongArkSelectIndicator,
  LoongArkSelectPositioner,
  LoongArkSelectContent,
  LoongArkSelectList,
  LoongArkSelectItem,
  LoongArkSelectItemText,
  LoongArkSelectItemIndicator,
  LoongArkSelectHiddenSelect,
  type SelectSize,
} from "@loongark/react";

interface SelectExampleProps {
  size?: SelectSize;
  disabled?: boolean;
  label?: string;
}

const options = [
  { label: "北京", value: "beijing" },
  { label: "上海", value: "shanghai" },
  { label: "广州", value: "guangzhou" },
  { label: "深圳", value: "shenzhen" },
  { label: "杭州", value: "hangzhou" },
];

export const SelectExample: React.FC<SelectExampleProps> = ({
  size = "md",
  disabled = false,
  label = "选择城市",
}) => {
  const [value, setValue] = useState<string[]>([]);
  const collection = createListCollection({ items: options });

  return (
    <div style={{ padding: "20px", width: "300px" }}>
      <LoongArkSelectRoot
        size={size}
        disabled={disabled}
        collection={collection}
        value={value}
        onValueChange={(details: any) => setValue(details.value)}
      >
        <LoongArkSelectLabel>{label}</LoongArkSelectLabel>
        <LoongArkSelectControl>
          <LoongArkSelectTrigger>
            <LoongArkSelectValueText placeholder="请选择..." />
            <LoongArkSelectIndicator>▼</LoongArkSelectIndicator>
          </LoongArkSelectTrigger>
        </LoongArkSelectControl>
        <LoongArkSelectPositioner>
          <LoongArkSelectContent>
            <LoongArkSelectList>
              {options.map((option) => (
                <LoongArkSelectItem key={option.value} item={option}>
                  <LoongArkSelectItemText>
                    {option.label}
                  </LoongArkSelectItemText>
                  <LoongArkSelectItemIndicator />
                </LoongArkSelectItem>
              ))}
            </LoongArkSelectList>
          </LoongArkSelectContent>
        </LoongArkSelectPositioner>
        <LoongArkSelectHiddenSelect />
      </LoongArkSelectRoot>
      <p style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
        已选择: {value.length > 0 ? value.join(", ") : "无"}
      </p>
    </div>
  );
};
