declare module "@ark-ui/svelte/menu" {
  import type { Component } from "svelte";

  export interface MenuRootProps {
    id?: string;
    ids?: any;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (details: { open: boolean }) => void;
    onSelect?: (details: { value: string }) => void;
    highlightedValue?: string | null;
    defaultHighlightedValue?: string | null;
    onHighlightChange?: (details: { highlightedValue: string | null }) => void;
    positioning?: any;
    anchorPoint?: any;
    closeOnSelect?: boolean;
    loopFocus?: boolean;
    typeahead?: boolean;
    composite?: boolean;
    navigate?: (details: any) => void;
    lazyMount?: boolean;
    unmountOnExit?: boolean;
    present?: boolean;
    skipAnimationOnMount?: boolean;
  }

  export interface MenuTriggerProps {
    asChild?: boolean;
    id?: string;
    disabled?: boolean;
  }

  export interface MenuContextTriggerProps {
    asChild?: boolean;
    id?: string;
  }

  export interface MenuPositionerProps {}

  export interface MenuContentProps {}

  export interface MenuArrowProps {}

  export interface MenuArrowTipProps {}

  export interface MenuItemProps {
    value?: string;
    disabled?: boolean;
    closeOnSelect?: boolean;
  }

  export interface MenuTriggerItemProps {}

  export interface MenuCheckboxItemProps extends MenuItemProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  }

  export interface MenuRadioItemProps extends MenuItemProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  }

  export interface MenuRadioItemGroupProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (details: { value: string }) => void;
  }

  export interface MenuItemGroupProps {
    id?: string;
  }

  export interface MenuItemGroupLabelProps {
    htmlFor?: string;
  }

  export interface MenuItemTextProps {}

  export interface MenuItemIndicatorProps {}

  export interface MenuIndicatorProps {}

  export interface MenuSeparatorProps {}

  export namespace Menu {
    export const Root: Component<MenuRootProps>;
    export const Trigger: Component<MenuTriggerProps>;
    export const ContextTrigger: Component<MenuContextTriggerProps>;
    export const Positioner: Component<MenuPositionerProps>;
    export const Content: Component<MenuContentProps>;
    export const Arrow: Component<MenuArrowProps>;
    export const ArrowTip: Component<MenuArrowTipProps>;
    export const Item: Component<MenuItemProps>;
    export const TriggerItem: Component<MenuTriggerItemProps>;
    export const CheckboxItem: Component<MenuCheckboxItemProps>;
    export const RadioItem: Component<MenuRadioItemProps>;
    export const RadioItemGroup: Component<MenuRadioItemGroupProps>;
    export const ItemGroup: Component<MenuItemGroupProps>;
    export const ItemGroupLabel: Component<MenuItemGroupLabelProps>;
    export const ItemText: Component<MenuItemTextProps>;
    export const ItemIndicator: Component<MenuItemIndicatorProps>;
    export const Indicator: Component<MenuIndicatorProps>;
    export const Separator: Component<MenuSeparatorProps>;
  }
}
