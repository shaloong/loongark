declare module "@ark-ui/svelte/collapsible" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface CollapsibleRootProps {
    open?: boolean;
    defaultOpen?: boolean;
    disabled?: boolean;
    collapsedHeight?: number;
    collapsedWidth?: number;
    id?: string;
    ids?: Record<string, unknown>;
    lazyMount?: boolean;
    unmountOnExit?: boolean;
    onOpenChange?: (details: { open: boolean }) => void;
    onExitComplete?: () => void;
    asChild?: boolean;
  }

  export interface CollapsibleTriggerProps {
    id?: string;
    asChild?: boolean;
  }

  export interface CollapsibleContentProps {
    id?: string;
    asChild?: boolean;
  }

  export interface CollapsibleIndicatorProps {
    id?: string;
    asChild?: boolean;
  }

  export const Collapsible: {
    Root: SvelteComponent<CollapsibleRootProps>;
    Trigger: SvelteComponent<CollapsibleTriggerProps>;
    Content: SvelteComponent<CollapsibleContentProps>;
    Indicator: SvelteComponent<CollapsibleIndicatorProps>;
  };
}
