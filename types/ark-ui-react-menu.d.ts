declare module "@ark-ui/react/menu" {
  import type {
    ReactNode,
    RefAttributes,
    ForwardRefExoticComponent,
    FC,
  } from "react";

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
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface MenuTriggerProps {
    children?: ReactNode;
    asChild?: boolean;
    disabled?: boolean;
  }

  export interface MenuContextTriggerProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface MenuPositionerProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface MenuContentProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface MenuArrowProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface MenuArrowTipProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface MenuItemProps {
    value?: string;
    disabled?: boolean;
    closeOnSelect?: boolean;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface MenuTriggerItemProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface MenuCheckboxItemProps {
    value?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    closeOnSelect?: boolean;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface MenuRadioItemProps {
    value?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    closeOnSelect?: boolean;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface MenuRadioItemGroupProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (details: { value: string }) => void;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface MenuItemGroupProps {
    id?: string;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface MenuItemGroupLabelProps {
    htmlFor?: string;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface MenuItemTextProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface MenuItemIndicatorProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface MenuIndicatorProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface MenuSeparatorProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export const Root: FC<MenuRootProps>;
  export const Trigger: ForwardRefExoticComponent<
    MenuTriggerProps & RefAttributes<HTMLElement>
  >;
  export const ContextTrigger: ForwardRefExoticComponent<
    MenuContextTriggerProps & RefAttributes<HTMLElement>
  >;
  export const Positioner: ForwardRefExoticComponent<
    MenuPositionerProps & RefAttributes<HTMLDivElement>
  >;
  export const Content: ForwardRefExoticComponent<
    MenuContentProps & RefAttributes<HTMLDivElement>
  >;
  export const Arrow: ForwardRefExoticComponent<
    MenuArrowProps & RefAttributes<HTMLDivElement>
  >;
  export const ArrowTip: ForwardRefExoticComponent<
    MenuArrowTipProps & RefAttributes<HTMLDivElement>
  >;
  export const Item: ForwardRefExoticComponent<
    MenuItemProps & RefAttributes<HTMLDivElement>
  >;
  export const TriggerItem: ForwardRefExoticComponent<
    MenuTriggerItemProps & RefAttributes<HTMLDivElement>
  >;
  export const CheckboxItem: ForwardRefExoticComponent<
    MenuCheckboxItemProps & RefAttributes<HTMLDivElement>
  >;
  export const RadioItem: ForwardRefExoticComponent<
    MenuRadioItemProps & RefAttributes<HTMLDivElement>
  >;
  export const RadioItemGroup: ForwardRefExoticComponent<
    MenuRadioItemGroupProps & RefAttributes<HTMLDivElement>
  >;
  export const ItemGroup: ForwardRefExoticComponent<
    MenuItemGroupProps & RefAttributes<HTMLDivElement>
  >;
  export const ItemGroupLabel: ForwardRefExoticComponent<
    MenuItemGroupLabelProps & RefAttributes<HTMLDivElement>
  >;
  export const ItemText: ForwardRefExoticComponent<
    MenuItemTextProps & RefAttributes<HTMLDivElement>
  >;
  export const ItemIndicator: ForwardRefExoticComponent<
    MenuItemIndicatorProps & RefAttributes<HTMLDivElement>
  >;
  export const Indicator: ForwardRefExoticComponent<
    MenuIndicatorProps & RefAttributes<HTMLDivElement>
  >;
  export const Separator: ForwardRefExoticComponent<
    MenuSeparatorProps & RefAttributes<HTMLDivElement>
  >;

  export const Menu: {
    Root: typeof Root;
    Trigger: typeof Trigger;
    ContextTrigger: typeof ContextTrigger;
    Positioner: typeof Positioner;
    Content: typeof Content;
    Arrow: typeof Arrow;
    ArrowTip: typeof ArrowTip;
    Item: typeof Item;
    TriggerItem: typeof TriggerItem;
    CheckboxItem: typeof CheckboxItem;
    RadioItem: typeof RadioItem;
    RadioItemGroup: typeof RadioItemGroup;
    ItemGroup: typeof ItemGroup;
    ItemGroupLabel: typeof ItemGroupLabel;
    ItemText: typeof ItemText;
    ItemIndicator: typeof ItemIndicator;
    Indicator: typeof Indicator;
    Separator: typeof Separator;
  };
}
