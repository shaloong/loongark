/**
 * Hover Card component - Solid wrapper.
 * Uses Ark UI Hover Card with data attributes for styling.
 */
import { type Component, type JSX, mergeProps, splitProps } from "solid-js";
import {
  HoverCard as ArkHoverCard,
  type HoverCardRootProps as ArkHoverCardRootProps,
  type HoverCardTriggerProps as ArkHoverCardTriggerProps,
  type HoverCardPositionerProps as ArkHoverCardPositionerProps,
  type HoverCardContentProps as ArkHoverCardContentProps,
  type HoverCardArrowProps as ArkHoverCardArrowProps,
  type HoverCardArrowTipProps as ArkHoverCardArrowTipProps,
} from "@ark-ui/solid/hover-card";
import type { HoverCardSize } from "@loongark/primitives";

export interface LoongArkHoverCardRootProps extends Omit<
  ArkHoverCardRootProps,
  "asChild"
> {
  size?: HoverCardSize;
  children?: JSX.Element;
}

export const LoongArkHoverCardRoot: Component<LoongArkHoverCardRootProps> = (
  props,
) => {
  const merged = mergeProps({ size: "md" as HoverCardSize }, props);
  const [local, others] = splitProps(merged, ["children", "size"]);

  return (
    <ArkHoverCard.Root
      {...others}
      data-scope="hover-card"
      data-part="root"
      data-size={local.size}
    >
      {local.children}
    </ArkHoverCard.Root>
  );
};

export interface LoongArkHoverCardTriggerProps extends Omit<
  ArkHoverCardTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkHoverCardTrigger: Component<
  LoongArkHoverCardTriggerProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkHoverCard.Trigger
      {...others}
      data-scope="hover-card"
      data-part="trigger"
    >
      {local.children}
    </ArkHoverCard.Trigger>
  );
};

export interface LoongArkHoverCardPositionerProps extends Omit<
  ArkHoverCardPositionerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkHoverCardPositioner: Component<
  LoongArkHoverCardPositionerProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkHoverCard.Positioner
      {...others}
      data-scope="hover-card"
      data-part="positioner"
    >
      {local.children}
    </ArkHoverCard.Positioner>
  );
};

export interface LoongArkHoverCardContentProps extends Omit<
  ArkHoverCardContentProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkHoverCardContent: Component<
  LoongArkHoverCardContentProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkHoverCard.Content
      {...others}
      data-scope="hover-card"
      data-part="content"
    >
      {local.children}
    </ArkHoverCard.Content>
  );
};

export interface LoongArkHoverCardArrowProps extends Omit<
  ArkHoverCardArrowProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkHoverCardArrow: Component<LoongArkHoverCardArrowProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkHoverCard.Arrow {...others} data-scope="hover-card" data-part="arrow">
      {local.children}
    </ArkHoverCard.Arrow>
  );
};

export interface LoongArkHoverCardArrowTipProps extends Omit<
  ArkHoverCardArrowTipProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkHoverCardArrowTip: Component<
  LoongArkHoverCardArrowTipProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkHoverCard.ArrowTip
      {...others}
      data-scope="hover-card"
      data-part="arrow-tip"
    >
      {local.children}
    </ArkHoverCard.ArrowTip>
  );
};
