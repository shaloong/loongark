declare module "@ark-ui/solid/combobox" {
  import type { Component, JSX } from "solid-js";

  export interface ComboboxRootProps<
    T extends Record<string, any> = Record<string, any>
  > {
    collection?: any;
    defaultValue?: string[];
    value?: string[];
    defaultOpen?: boolean;
    open?: boolean;
    inputValue?: string;
    defaultInputValue?: string;
    multiple?: boolean;
    disabled?: boolean;
    loopFocus?: boolean;
    id?: string;
    name?: string;
    closeOnSelect?: boolean;
    composite?: boolean;
    defaultHighlightedValue?: string;
    highlightedValue?: string;
    onInputValueChange?: (details: { inputValue: string }) => void;
    onValueChange?: (details: { value: string[] }) => void;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ComboboxLabelProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ComboboxControlProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ComboboxInputProps {
    placeholder?: string;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ComboboxTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ComboboxClearTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ComboboxPositionerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ComboboxContentProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ComboboxListProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ComboboxItemGroupProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ComboboxItemGroupLabelProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ComboboxItemProps {
    item?: any;
    disabled?: boolean;
    persistFocus?: boolean;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ComboboxItemTextProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ComboboxItemIndicatorProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export const Combobox: {
    Root: Component<ComboboxRootProps>;
    Label: Component<ComboboxLabelProps>;
    Control: Component<ComboboxControlProps>;
    Input: Component<ComboboxInputProps>;
    Trigger: Component<ComboboxTriggerProps>;
    ClearTrigger: Component<ComboboxClearTriggerProps>;
    Positioner: Component<ComboboxPositionerProps>;
    Content: Component<ComboboxContentProps>;
    List: Component<ComboboxListProps>;
    ItemGroup: Component<ComboboxItemGroupProps>;
    ItemGroupLabel: Component<ComboboxItemGroupLabelProps>;
    Item: Component<ComboboxItemProps>;
    ItemText: Component<ComboboxItemTextProps>;
    ItemIndicator: Component<ComboboxItemIndicatorProps>;
  };
}
