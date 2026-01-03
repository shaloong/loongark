declare module "@ark-ui/solid/select" {
  import type { Component, JSX } from "solid-js";

  export interface SelectRootProps<
    T extends Record<string, any> = Record<string, any>
  > {
    collection: any;
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
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SelectLabelProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SelectControlProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SelectTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SelectValueTextProps {
    placeholder?: string;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SelectIndicatorProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SelectClearTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SelectPositionerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SelectContentProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SelectListProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SelectItemGroupProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SelectItemGroupLabelProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SelectItemProps {
    item?: any;
    persistFocus?: boolean;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SelectItemTextProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SelectItemIndicatorProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface SelectHiddenSelectProps {
    asChild?: boolean;
  }

  export namespace Select {
    export const Root: Component<SelectRootProps>;
    export const Label: Component<SelectLabelProps>;
    export const Control: Component<SelectControlProps>;
    export const Trigger: Component<SelectTriggerProps>;
    export const ValueText: Component<SelectValueTextProps>;
    export const Indicator: Component<SelectIndicatorProps>;
    export const ClearTrigger: Component<SelectClearTriggerProps>;
    export const Positioner: Component<SelectPositionerProps>;
    export const Content: Component<SelectContentProps>;
    export const List: Component<SelectListProps>;
    export const ItemGroup: Component<SelectItemGroupProps>;
    export const ItemGroupLabel: Component<SelectItemGroupLabelProps>;
    export const Item: Component<SelectItemProps>;
    export const ItemText: Component<SelectItemTextProps>;
    export const ItemIndicator: Component<SelectItemIndicatorProps>;
    export const HiddenSelect: Component<SelectHiddenSelectProps>;
  }
}
