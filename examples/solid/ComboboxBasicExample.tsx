/** @jsxImportSource solid-js */
import { createSignal, createMemo } from "solid-js";
import {
  createListCollection,
  LoongArkComboboxRoot,
  LoongArkComboboxLabel,
  LoongArkComboboxControl,
  LoongArkComboboxInput,
  LoongArkComboboxTrigger,
  LoongArkComboboxPositioner,
  LoongArkComboboxContent,
  LoongArkComboboxList,
  LoongArkComboboxItem,
  LoongArkComboboxItemText,
} from "@loongark/solid";
export function ComboboxBasicExample() {
  const [query, setQuery] = createSignal("");
  const options = [
    { value: "beijing", label: "北京" },
    { value: "shanghai", label: "上海" },
  ];
  const items = createMemo(() =>
    options.filter((item) => item.label.includes(query())),
  );
  const collection = createMemo(() => createListCollection({ items: items() }));
  return (
    <LoongArkComboboxRoot
      collection={collection()}
      inputValue={query()}
      onInputValueChange={(details: { inputValue: string }) =>
        setQuery(details.inputValue)
      }
    >
      <LoongArkComboboxLabel>搜索城市</LoongArkComboboxLabel>
      <LoongArkComboboxControl>
        <LoongArkComboboxInput placeholder="输入城市名称" />
        <LoongArkComboboxTrigger aria-label="展开选项" />
      </LoongArkComboboxControl>
      <LoongArkComboboxPositioner>
        <LoongArkComboboxContent>
          <LoongArkComboboxList>
            {items().map((item) => (
              <LoongArkComboboxItem item={item}>
                <LoongArkComboboxItemText>
                  {item.label}
                </LoongArkComboboxItemText>
              </LoongArkComboboxItem>
            ))}
          </LoongArkComboboxList>
        </LoongArkComboboxContent>
      </LoongArkComboboxPositioner>
    </LoongArkComboboxRoot>
  );
}
