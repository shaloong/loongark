declare module "@ark-ui/react/toggle" {
  import type {
    ReactNode,
    RefAttributes,
    ForwardRefExoticComponent,
  } from "react";

  export interface ToggleRootProps {
    pressed?: boolean;
    defaultPressed?: boolean;
    disabled?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ToggleIndicatorProps {
    fallback?: ReactNode;
    children?: ReactNode;
    asChild?: boolean;
  }

  export const Root: ForwardRefExoticComponent<
    ToggleRootProps & RefAttributes<HTMLButtonElement>
  >;
  export const Indicator: ForwardRefExoticComponent<
    ToggleIndicatorProps & RefAttributes<HTMLDivElement>
  >;

  export const Toggle: {
    Root: typeof Root;
    Indicator: typeof Indicator;
  };
}
