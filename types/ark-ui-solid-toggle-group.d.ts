declare module "@ark-ui/solid/toggle-group" {
  import type { Component, JSX } from "solid-js";

  export interface ToggleGroupRootProps {
    value?: string[];
    defaultValue?: string[];
    multiple?: boolean;
    disabled?: boolean;
    orientation?: "horizontal" | "vertical";
    loopFocus?: boolean;
    rovingFocus?: boolean;
    deselectable?: boolean;
    id?: string;
    ids?: Record<string, unknown>;
    onValueChange?: (details: { value: string[] }) => void;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface ToggleGroupItemProps {
    value: string;
    disabled?: boolean;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export const ToggleGroup: {
    Root: Component<ToggleGroupRootProps>;
    Item: Component<ToggleGroupItemProps>;
  };
}
