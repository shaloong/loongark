/**
 * Toggle Group component - Solid wrapper.
 * Based on Ark UI Toggle Group.
 */
import { type Component, type JSX, mergeProps } from "solid-js";
import {
  ToggleGroup as ArkToggleGroup,
  type ToggleGroupRootProps as ArkToggleGroupRootProps,
  type ToggleGroupItemProps as ArkToggleGroupItemProps,
} from "@ark-ui/solid/toggle-group";
import type {
  ToggleGroupOrientation,
  ToggleGroupSize,
} from "@loongark/primitives";

export interface LoongArkToggleGroupRootProps extends Omit<
  ArkToggleGroupRootProps,
  "asChild"
> {
  size?: ToggleGroupSize;
  orientation?: ToggleGroupOrientation;
  children?: JSX.Element;
}

export const LoongArkToggleGroupRoot: Component<
  LoongArkToggleGroupRootProps
> = (props) => {
  const merged = mergeProps(
    {
      size: "md" as ToggleGroupSize,
      orientation: "horizontal" as ToggleGroupOrientation,
    },
    props,
  );

  return (
    <ArkToggleGroup.Root
      {...props}
      data-scope="toggle-group"
      data-part="root"
      data-size={merged.size}
      data-orientation={merged.orientation}
    >
      {props.children}
    </ArkToggleGroup.Root>
  );
};

export const LoongArkToggleGroupItem: Component<
  ArkToggleGroupItemProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkToggleGroup.Item {...props} data-scope="toggle-group" data-part="item">
      {props.children}
    </ArkToggleGroup.Item>
  );
};
