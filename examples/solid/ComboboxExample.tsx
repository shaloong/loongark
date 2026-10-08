/** @jsxImportSource solid-js */
import type { Component } from "solid-js";
import { createMemo, createSignal } from "solid-js";
import { createListCollection } from "@loongark/solid";
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
} from "@loongark/solid";
import type { ComboboxSize } from "@loongark/primitives";

export interface ComboboxExampleProps {
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

export const ComboboxExample: Component<ComboboxExampleProps> = (props) => {
  const size = () => props.size ?? "md";
  const disabled = () => props.disabled ?? false;
  const label = () => props.label ?? "City";
  const placeholder = () => props.placeholder ?? "Search...";
  const [value, setValue] = createSignal<string[]>([]);
  const [inputValue, setInputValue] = createSignal("");

  const filteredOptions = createMemo(() => {
    const query = inputValue().trim().toLowerCase();
    if (!query) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  });

  const collection = createMemo(() =>
    createListCollection({ items: filteredOptions() }),
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
        size={size()}
        disabled={disabled()}
        collection={collection()}
        value={value()}
        inputValue={inputValue()}
        onInputValueChange={(details: { inputValue: string }) =>
          setInputValue(details.inputValue)
        }
        onValueChange={handleValueChange}
      >
        <LoongArkComboboxLabel>{label()}</LoongArkComboboxLabel>
        <LoongArkComboboxControl>
          <LoongArkComboboxInput placeholder={placeholder()} />
          <LoongArkComboboxClearTrigger aria-label="Clear" />
          <LoongArkComboboxTrigger aria-label="Toggle" />
        </LoongArkComboboxControl>
        <LoongArkComboboxPositioner>
          <LoongArkComboboxContent>
            <LoongArkComboboxList>
              {filteredOptions().map((option) => (
                <LoongArkComboboxItem item={option}>
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
          "margin-top": "16px",
          "font-size": "14px",
          color: "var(--lk-color-semantic-mutedforeground)",
        }}
      >
        Selected: {value().length > 0 ? value().join(", ") : "None"}
      </p>
    </div>
  );
};
