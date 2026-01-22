declare module "@ark-ui/react/collapsible" {
  import type {
    ReactNode,
    RefAttributes,
    ForwardRefExoticComponent,
  } from "react";

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
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface CollapsibleTriggerProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface CollapsibleContentProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface CollapsibleIndicatorProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export const Root: ForwardRefExoticComponent<
    CollapsibleRootProps & RefAttributes<HTMLDivElement>
  >;
  export const Trigger: ForwardRefExoticComponent<
    CollapsibleTriggerProps & RefAttributes<HTMLButtonElement>
  >;
  export const Content: ForwardRefExoticComponent<
    CollapsibleContentProps & RefAttributes<HTMLDivElement>
  >;
  export const Indicator: ForwardRefExoticComponent<
    CollapsibleIndicatorProps & RefAttributes<HTMLDivElement>
  >;

  export const Collapsible: {
    Root: typeof Root;
    Trigger: typeof Trigger;
    Content: typeof Content;
    Indicator: typeof Indicator;
  };
}
