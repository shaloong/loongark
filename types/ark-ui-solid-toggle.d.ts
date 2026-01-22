declare module "@ark-ui/solid/toggle" {
  import type { Component, JSX } from "solid-js";

  export interface ToggleRootProps {
    pressed?: boolean;
    defaultPressed?: boolean;
    disabled?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ToggleIndicatorProps {
    fallback?: JSX.Element;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export const Toggle: {
    Root: Component<ToggleRootProps>;
    Indicator: Component<ToggleIndicatorProps>;
  };
}
