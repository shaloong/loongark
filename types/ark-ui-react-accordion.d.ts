declare module "@ark-ui/react/accordion" {
  import type {
    ReactNode,
    RefAttributes,
    ForwardRefExoticComponent,
  } from "react";

  export interface AccordionRootProps {
    value?: string[];
    defaultValue?: string[];
    multiple?: boolean;
    collapsible?: boolean;
    disabled?: boolean;
    orientation?: "horizontal" | "vertical";
    id?: string;
    ids?: Record<string, unknown>;
    onValueChange?: (details: { value: string[] }) => void;
    onFocusChange?: (details: { value: string | null }) => void;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface AccordionItemProps {
    value: string;
    disabled?: boolean;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface AccordionItemTriggerProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface AccordionItemContentProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface AccordionItemIndicatorProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export const Root: ForwardRefExoticComponent<
    AccordionRootProps & RefAttributes<HTMLDivElement>
  >;
  export const Item: ForwardRefExoticComponent<
    AccordionItemProps & RefAttributes<HTMLDivElement>
  >;
  export const ItemTrigger: ForwardRefExoticComponent<
    AccordionItemTriggerProps & RefAttributes<HTMLButtonElement>
  >;
  export const ItemContent: ForwardRefExoticComponent<
    AccordionItemContentProps & RefAttributes<HTMLDivElement>
  >;
  export const ItemIndicator: ForwardRefExoticComponent<
    AccordionItemIndicatorProps & RefAttributes<HTMLDivElement>
  >;

  export const Accordion: {
    Root: typeof Root;
    Item: typeof Item;
    ItemTrigger: typeof ItemTrigger;
    ItemContent: typeof ItemContent;
    ItemIndicator: typeof ItemIndicator;
  };
}
