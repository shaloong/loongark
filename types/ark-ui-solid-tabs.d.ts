declare module "@ark-ui/solid/tabs" {
  import type { Component, JSX } from "solid-js";

  export interface TabsRootProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (details: { value: string }) => void;
    onFocusChange?: (details: { value: string }) => void;
    activationMode?: "automatic" | "manual";
    orientation?: "horizontal" | "vertical";
    loopFocus?: boolean;
    composite?: boolean;
    id?: string;
    lazyMount?: boolean;
    unmountOnExit?: boolean;
    present?: boolean;
    skipAnimationOnMount?: boolean;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface TabsListProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface TabsTriggerProps {
    value: string;
    disabled?: boolean;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface TabsContentProps {
    value: string;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface TabsIndicatorProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export const Tabs: {
    Root: Component<TabsRootProps>;
    List: Component<TabsListProps>;
    Trigger: Component<TabsTriggerProps>;
    Content: Component<TabsContentProps>;
    Indicator: Component<TabsIndicatorProps>;
  };
}
