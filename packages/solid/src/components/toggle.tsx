/**
 * Toggle component - Solid wrapper.
 * Based on Ark UI Toggle.
 */
import { type Component, type JSX, mergeProps } from "solid-js";
import {
  Toggle as ArkToggle,
  type ToggleRootProps as ArkToggleRootProps,
  type ToggleIndicatorProps as ArkToggleIndicatorProps,
} from "@ark-ui/solid/toggle";
import type { ToggleSize } from "@loongark/primitives";

export interface LoongArkToggleRootProps
  extends Omit<ArkToggleRootProps, "asChild"> {
  size?: ToggleSize;
  children?: JSX.Element;
}

export const LoongArkToggleRoot: Component<LoongArkToggleRootProps> = (
  props
) => {
  const merged = mergeProps({ size: "md" as ToggleSize }, props);

  return (
    <ArkToggle.Root
      {...(props as any)}
      data-scope="toggle"
      data-part="root"
      data-size={merged.size}
    >
      {props.children}
    </ArkToggle.Root>
  );
};

export const LoongArkToggleIndicator: Component<
  ArkToggleIndicatorProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkToggle.Indicator
      {...props}
      data-scope="toggle"
      data-part="indicator"
    >
      {props.children}
    </ArkToggle.Indicator>
  );
};
