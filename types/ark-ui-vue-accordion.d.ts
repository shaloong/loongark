declare module "@ark-ui/vue/accordion" {
  type VueComponent<P = any> = (props: P & { children?: any }) => any;

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
  }

  export interface AccordionItemProps {
    value: string;
    disabled?: boolean;
    id?: string;
  }

  export interface AccordionItemTriggerProps {
    id?: string;
  }

  export interface AccordionItemContentProps {
    id?: string;
  }

  export interface AccordionItemIndicatorProps {
    id?: string;
  }

  export const Accordion: {
    Root: VueComponent<AccordionRootProps>;
    Item: VueComponent<AccordionItemProps>;
    ItemTrigger: VueComponent<AccordionItemTriggerProps>;
    ItemContent: VueComponent<AccordionItemContentProps>;
    ItemIndicator: VueComponent<AccordionItemIndicatorProps>;
  };
}
