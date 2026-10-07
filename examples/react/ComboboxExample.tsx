import React, { useMemo, useState } from "react";
import { createListCollection } from "@ark-ui/react";
import {
  LoongArkComboboxRoot,
  LoongArkComboboxLabel,
  LoongArkComboboxControl,
  LoongArkComboboxInput,
  LoongArkComboboxTrigger,
  LoongArkComboboxClearTrigger,
  LoongArkComboboxPositioner,
  LoongArkComboboxContent,
  LoongArkComboboxList,
  LoongArkComboboxItem,
  LoongArkComboboxItemText,
  LoongArkComboboxItemIndicator,
  type ComboboxSize,
} from "@loongark/react";

interface ComboboxExampleProps {
  size?: ComboboxSize;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
}

const options = [
  { label: "Beijing", value: "beijing" },
  { label: "Shanghai", value: "shanghai" },
  { label: "Guangzhou", value: "guangzhou" },
  { label: "Shenzhen", value: "shenzhen" },
  { label: "Hangzhou", value: "hangzhou" },
];

export const ComboboxExample: React.FC<ComboboxExampleProps> = ({
  size = "md",
  disabled = false,
  label = "City",
  placeholder = "Search...",
}) => {
  const [value, setValue] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const filteredOptions = useMemo(() => {
    const query = inputValue.trim().toLowerCase();
    if (!query) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  }, [inputValue]);

  const collection = useMemo(
    () => createListCollection({ items: filteredOptions }),
    [filteredOptions],
  );

  const handleValueChange = (details: { value: string[] }) => {
    setValue(details.value);
    const nextValue = details.value[0];
    const match = options.find((option) => option.value === nextValue);
    setInputValue(match?.label ?? "");
  };

  return (
    <div style={{ padding: "20px", width: "320px" }}>
      <LoongArkComboboxRoot
        size={size}
        disabled={disabled}
        collection={collection}
        value={value}
        inputValue={inputValue}
        onInputValueChange={(details: { inputValue: string }) =>
          setInputValue(details.inputValue)
        }
        onValueChange={handleValueChange}
      >
        <LoongArkComboboxLabel>{label}</LoongArkComboboxLabel>
        <LoongArkComboboxControl>
          <LoongArkComboboxInput placeholder={placeholder} />
          <LoongArkComboboxClearTrigger aria-label="Clear" />
          <LoongArkComboboxTrigger aria-label="Toggle" />
        </LoongArkComboboxControl>
        <LoongArkComboboxPositioner>
          <LoongArkComboboxContent>
            <LoongArkComboboxList>
              {filteredOptions.map((option) => (
                <LoongArkComboboxItem key={option.value} item={option}>
                  <LoongArkComboboxItemText>
                    {option.label}
                  </LoongArkComboboxItemText>
                  <LoongArkComboboxItemIndicator />
                </LoongArkComboboxItem>
              ))}
            </LoongArkComboboxList>
          </LoongArkComboboxContent>
        </LoongArkComboboxPositioner>
      </LoongArkComboboxRoot>
      <p
        style={{
          marginTop: "16px",
          fontSize: "14px",
          color: "var(--lk-color-semantic-mutedforeground)",
        }}
      >
        Selected: {value.length > 0 ? value.join(", ") : "None"}
      </p>
    </div>
  );
};
