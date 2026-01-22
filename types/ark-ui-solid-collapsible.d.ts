declare module "@ark-ui/solid/collapsible" {
  import type { Component, JSX } from "solid-js";

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
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface CollapsibleTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface CollapsibleContentProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface CollapsibleIndicatorProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export const Collapsible: {
    Root: Component<CollapsibleRootProps>;
    Trigger: Component<CollapsibleTriggerProps>;
    Content: Component<CollapsibleContentProps>;
    Indicator: Component<CollapsibleIndicatorProps>;
  };
}
