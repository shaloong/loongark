declare module "@ark-ui/vue/collapsible" {
  type VueComponent<P = any> = (props: P & { children?: any }) => any;

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
  }

  export interface CollapsibleTriggerProps {
    id?: string;
  }

  export interface CollapsibleContentProps {
    id?: string;
  }

  export interface CollapsibleIndicatorProps {
    id?: string;
  }

  export const Collapsible: {
    Root: VueComponent<CollapsibleRootProps>;
    Trigger: VueComponent<CollapsibleTriggerProps>;
    Content: VueComponent<CollapsibleContentProps>;
    Indicator: VueComponent<CollapsibleIndicatorProps>;
  };
}
