declare module "@ark-ui/svelte/accordion" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

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
    asChild?: boolean;
  }

  export interface AccordionItemProps {
    value: string;
    disabled?: boolean;
    id?: string;
    asChild?: boolean;
  }

  export interface AccordionItemTriggerProps {
    id?: string;
    asChild?: boolean;
  }

  export interface AccordionItemContentProps {
    id?: string;
    asChild?: boolean;
  }

  export interface AccordionItemIndicatorProps {
    id?: string;
    asChild?: boolean;
  }

  export const Accordion: {
    Root: SvelteComponent<AccordionRootProps>;
    Item: SvelteComponent<AccordionItemProps>;
    ItemTrigger: SvelteComponent<AccordionItemTriggerProps>;
    ItemContent: SvelteComponent<AccordionItemContentProps>;
    ItemIndicator: SvelteComponent<AccordionItemIndicatorProps>;
  };
}
