declare module "@ark-ui/react/listbox" {
  import React, { type ReactNode } from "react";

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
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ListboxLabelProps {
    ref?: React.Ref<HTMLLabelElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ListboxListProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ListboxItemGroupProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ListboxItemGroupLabelProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ListboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
    item?: any;
    disabled?: boolean;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ListboxItemTextProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ListboxItemIndicatorProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export namespace Listbox {
    export const Root: React.FC<ListboxRootProps>;
    export const Label: React.FC<ListboxLabelProps>;
    export const List: React.FC<ListboxListProps>;
    export const ItemGroup: React.FC<ListboxItemGroupProps>;
    export const ItemGroupLabel: React.FC<ListboxItemGroupLabelProps>;
    export const Item: React.FC<ListboxItemProps>;
    export const ItemText: React.FC<ListboxItemTextProps>;
    export const ItemIndicator: React.FC<ListboxItemIndicatorProps>;
  }
}
