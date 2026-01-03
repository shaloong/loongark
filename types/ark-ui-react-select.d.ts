declare module "@ark-ui/react/select" {
  import React, { type ReactNode } from "react";

  export function createListCollection<T = any>(options: { items: T[] }): any;

  export interface SelectRootProps<
    T extends Record<string, any> = Record<string, any>
  > {
    collection: any;
    onValueChange?: (details: any) => void;
    closeOnSelect?: boolean;
    composite?: boolean;
    defaultHighlightedValue?: string;
    defaultOpen?: boolean;
    defaultValue?: string[];
    deselectable?: boolean;
    disabled?: boolean;
    form?: string;
    highlightedValue?: string;
    id?: string;
    ids?: any;
    immediate?: boolean;
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

  export interface SelectLabelProps {
    ref?: React.Ref<HTMLLabelElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SelectControlProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SelectTriggerProps {
    ref?: React.Ref<HTMLButtonElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SelectValueTextProps {
    ref?: React.Ref<HTMLSpanElement>;
    placeholder?: string;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SelectIndicatorProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SelectClearTriggerProps {
    ref?: React.Ref<HTMLButtonElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SelectPositionerProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SelectContentProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SelectListProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SelectItemGroupProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SelectItemGroupLabelProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SelectItemProps
    extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
    item?: any;
    persistFocus?: boolean;
    children?: ReactNode;
    asChild?: boolean;
    key?: string | number;
  }

  export interface SelectItemTextProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SelectItemIndicatorProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface SelectHiddenSelectProps {
    ref?: React.Ref<HTMLSelectElement>;
    asChild?: boolean;
  }

  export namespace Select {
    export const Root: React.FC<SelectRootProps>;
    export const Label: React.FC<SelectLabelProps>;
    export const Control: React.FC<SelectControlProps>;
    export const Trigger: React.FC<SelectTriggerProps>;
    export const ValueText: React.FC<SelectValueTextProps>;
    export const Indicator: React.FC<SelectIndicatorProps>;
    export const ClearTrigger: React.FC<SelectClearTriggerProps>;
    export const Positioner: React.FC<SelectPositionerProps>;
    export const Content: React.FC<SelectContentProps>;
    export const List: React.FC<SelectListProps>;
    export const ItemGroup: React.FC<SelectItemGroupProps>;
    export const ItemGroupLabel: React.FC<SelectItemGroupLabelProps>;
    export const Item: React.FC<SelectItemProps>;
    export const ItemText: React.FC<SelectItemTextProps>;
    export const ItemIndicator: React.FC<SelectItemIndicatorProps>;
    export const HiddenSelect: React.FC<SelectHiddenSelectProps>;
  }
}
