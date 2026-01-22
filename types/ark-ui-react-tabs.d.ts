declare module "@ark-ui/react/tabs" {
  import type {
    ReactNode,
    RefAttributes,
    ForwardRefExoticComponent,
  } from "react";

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
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface TabsListProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface TabsTriggerProps {
    value: string;
    disabled?: boolean;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface TabsContentProps {
    value: string;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface TabsIndicatorProps {
    children?: ReactNode;
    asChild?: boolean;
  }

  export const Root: ForwardRefExoticComponent<
    TabsRootProps & RefAttributes<HTMLDivElement>
  >;
  export const List: ForwardRefExoticComponent<
    TabsListProps & RefAttributes<HTMLDivElement>
  >;
  export const Trigger: ForwardRefExoticComponent<
    TabsTriggerProps & RefAttributes<HTMLButtonElement>
  >;
  export const Content: ForwardRefExoticComponent<
    TabsContentProps & RefAttributes<HTMLDivElement>
  >;
  export const Indicator: ForwardRefExoticComponent<
    TabsIndicatorProps & RefAttributes<HTMLDivElement>
  >;

  export const Tabs: {
    Root: typeof Root;
    List: typeof List;
    Trigger: typeof Trigger;
    Content: typeof Content;
    Indicator: typeof Indicator;
  };
}
