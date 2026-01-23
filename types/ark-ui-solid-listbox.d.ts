declare module "@ark-ui/solid/listbox" {
  import type { Component, JSX } from "solid-js";

  export interface ListboxRootProps<
    T extends Record<string, any> = Record<string, any>
  > {
    collection?: any;
    defaultValue?: string[];
    value?: string[];
    multiple?: boolean;
    disabled?: boolean;
    loopFocus?: boolean;
    orientation?: "horizontal" | "vertical";
    id?: string;
    onValueChange?: (details: { value: string[] }) => void;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ListboxLabelProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ListboxListProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ListboxItemGroupProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ListboxItemGroupLabelProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ListboxItemProps {
    item?: any;
    disabled?: boolean;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ListboxItemTextProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ListboxItemIndicatorProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export const Listbox: {
    Root: Component<ListboxRootProps>;
    Label: Component<ListboxLabelProps>;
    List: Component<ListboxListProps>;
    ItemGroup: Component<ListboxItemGroupProps>;
    ItemGroupLabel: Component<ListboxItemGroupLabelProps>;
    Item: Component<ListboxItemProps>;
    ItemText: Component<ListboxItemTextProps>;
    ItemIndicator: Component<ListboxItemIndicatorProps>;
  };
}
