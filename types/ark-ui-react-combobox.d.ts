declare module "@ark-ui/react/combobox" {
  import React, { type ReactNode } from "react";

  export interface ComboboxRootProps<
    T extends Record<string, any> = Record<string, any>
  > {
    collection: any;
    onValueChange?: (details: any) => void;
    onInputValueChange?: (details: any) => void;
    onOpenChange?: (details: any) => void;
    closeOnSelect?: boolean;
    composite?: boolean;
    defaultHighlightedValue?: string;
    defaultInputValue?: string;
    defaultOpen?: boolean;
    defaultValue?: string[];
    deselectable?: boolean;
    disabled?: boolean;
    form?: string;
    highlightedValue?: string;
    id?: string;
    ids?: any;
    immediate?: boolean;
    inputValue?: string;
    invalid?: boolean;
    lazyMount?: boolean;
    loopFocus?: boolean;
    multiple?: boolean;
    name?: string;
    open?: boolean;
    positioning?: any;
    present?: boolean;
    readOnly?: boolean;
    required?: boolean;
    scrollToIndexFn?: any;
    skipAnimationOnMount?: boolean;
    unmountOnExit?: boolean;
    value?: string[];
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ComboboxLabelProps {
    ref?: React.Ref<HTMLLabelElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ComboboxControlProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ComboboxInputProps {
    ref?: React.Ref<HTMLInputElement>;
    placeholder?: string;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ComboboxTriggerProps {
    ref?: React.Ref<HTMLButtonElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ComboboxClearTriggerProps {
    ref?: React.Ref<HTMLButtonElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ComboboxPositionerProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ComboboxContentProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ComboboxListProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ComboboxItemGroupProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ComboboxItemGroupLabelProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ComboboxItemProps
    extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
    item?: any;
    persistFocus?: boolean;
    children?: ReactNode;
    asChild?: boolean;
    key?: string | number;
  }

  export interface ComboboxItemTextProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ComboboxItemIndicatorProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export namespace Combobox {
    export const Root: React.FC<ComboboxRootProps>;
    export const Label: React.FC<ComboboxLabelProps>;
    export const Control: React.FC<ComboboxControlProps>;
    export const Input: React.FC<ComboboxInputProps>;
    export const Trigger: React.FC<ComboboxTriggerProps>;
    export const ClearTrigger: React.FC<ComboboxClearTriggerProps>;
    export const Positioner: React.FC<ComboboxPositionerProps>;
    export const Content: React.FC<ComboboxContentProps>;
    export const List: React.FC<ComboboxListProps>;
    export const ItemGroup: React.FC<ComboboxItemGroupProps>;
    export const ItemGroupLabel: React.FC<ComboboxItemGroupLabelProps>;
    export const Item: React.FC<ComboboxItemProps>;
    export const ItemText: React.FC<ComboboxItemTextProps>;
    export const ItemIndicator: React.FC<ComboboxItemIndicatorProps>;
  }
}
