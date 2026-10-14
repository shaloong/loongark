
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticToggleStyles } from "@shaloong/loongark-primitives/automatic-styles/toggle";
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
import type { ToggleSize } from "@shaloong/loongark-primitives";

export interface LoongArkToggleRootProps extends Omit<
  ArkToggleRootProps,
  "asChild"
> {
  size?: ToggleSize;
  children?: JSX.Element;
}

export const LoongArkToggleRoot: Component<LoongArkToggleRootProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const merged = mergeProps({ size: "md" as ToggleSize }, props);

  return (
    <ArkToggle.Root
      {...props}
      data-scope="toggle"
      data-part="root"
      data-size={merged.size}
    >
      {props.children}
    </ArkToggle.Root>
  );
}, lkAutomaticToggleStyles);

export const LoongArkToggleIndicator: Component<
  ArkToggleIndicatorProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkToggle.Indicator {...props} data-scope="toggle" data-part="indicator">
      {props.children}
    </ArkToggle.Indicator>
  );
}, lkAutomaticToggleStyles);
