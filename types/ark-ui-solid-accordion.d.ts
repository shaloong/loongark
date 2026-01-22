declare module "@ark-ui/solid/accordion" {
  import type { Component, JSX } from "solid-js";

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
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface AccordionItemProps {
    value: string;
    disabled?: boolean;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface AccordionItemTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface AccordionItemContentProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface AccordionItemIndicatorProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export const Accordion: {
    Root: Component<AccordionRootProps>;
    Item: Component<AccordionItemProps>;
    ItemTrigger: Component<AccordionItemTriggerProps>;
    ItemContent: Component<AccordionItemContentProps>;
    ItemIndicator: Component<AccordionItemIndicatorProps>;
  };
}
