declare module "@ark-ui/react/toggle-group" {
  import type {
    ReactNode,
    RefAttributes,
    ForwardRefExoticComponent,
  } from "react";

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
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface ToggleGroupItemProps {
    value: string;
    disabled?: boolean;
    children?: ReactNode;
    asChild?: boolean;
  }

  export const Root: ForwardRefExoticComponent<
    ToggleGroupRootProps & RefAttributes<HTMLDivElement>
  >;
  export const Item: ForwardRefExoticComponent<
    ToggleGroupItemProps & RefAttributes<HTMLButtonElement>
  >;

  export const ToggleGroup: {
    Root: typeof Root;
    Item: typeof Item;
  };
}
