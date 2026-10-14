"use client";
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticTooltipStyles } from "@shaloong/loongark-primitives/automatic-styles/tooltip";


/**
 * Tooltip 组件 - React 封装
 * 基于 Ark UI Tooltip，注入 data-scope/data-part 与 interactive 映射
 */
import React, {
  forwardRef,
  createElement,
  type FC,
  type ReactNode,
} from "react";
import {
  Tooltip as ArkTooltip,
  type TooltipRootProps as ArkTooltipRootProps,
  type TooltipTriggerProps as ArkTooltipTriggerProps,
  type TooltipContentProps as ArkTooltipContentProps,
  type TooltipPositionerProps as ArkTooltipPositionerProps,
  type TooltipArrowProps as ArkTooltipArrowProps,
  type TooltipArrowTipProps as ArkTooltipArrowTipProps,
} from "@ark-ui/react/tooltip";
import { Portal as ArkPortal } from "./portal";

const SafePortal: FC<{ children?: ReactNode }> = ({ children }) =>
  createElement(ArkPortal, null, children);

export interface LoongArkTooltipRootProps extends Omit<
  ArkTooltipRootProps,
  "asChild"
> {}

export const LoongArkTooltipRoot = /*#__PURE__*/ withAutomaticStyles((props: LoongArkTooltipRootProps) => {
  return <ArkTooltip.Root {...props} data-scope="tooltip" data-part="root" />;
}, lkAutomaticTooltipStyles);

export const LoongArkTooltipTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLButtonElement,
  ArkTooltipTriggerProps
>(({ asChild = true, children, ...rest }, ref) => {
  return (
    <ArkTooltip.Trigger
      {...rest}
      asChild={asChild}
      ref={ref}
      data-scope="tooltip"
      data-part="trigger"
    >
      {children}
    </ArkTooltip.Trigger>
  );
}), lkAutomaticTooltipStyles);
LoongArkTooltipTrigger.displayName = "LoongArkTooltipTrigger";

export const LoongArkTooltipPositioner = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  Omit<ArkTooltipPositionerProps, "asChild">
>((props, ref) => {
  return (
    <SafePortal>
      <ArkTooltip.Positioner
        {...props}
        ref={ref}
        data-scope="tooltip"
        data-part="positioner"
      />
    </SafePortal>
  );
}), lkAutomaticTooltipStyles);
LoongArkTooltipPositioner.displayName = "LoongArkTooltipPositioner";

export const LoongArkTooltipContent = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  Omit<ArkTooltipContentProps, "asChild"> & { interactive?: boolean }
>(({ children, interactive, ...rest }, ref) => {
  return (
    <ArkTooltip.Content
      {...rest}
      ref={ref}
      data-scope="tooltip"
      data-part="content"
      data-interactive={interactive ? "true" : undefined}
    >
      {children}
    </ArkTooltip.Content>
  );
}), lkAutomaticTooltipStyles);
LoongArkTooltipContent.displayName = "LoongArkTooltipContent";

export const LoongArkTooltipArrow = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  Omit<ArkTooltipArrowProps, "asChild">
>((props, ref) => {
  return (
    <ArkTooltip.Arrow
      {...props}
      ref={ref}
      data-scope="tooltip"
      data-part="arrow"
    />
  );
}), lkAutomaticTooltipStyles);
LoongArkTooltipArrow.displayName = "LoongArkTooltipArrow";

export const LoongArkTooltipArrowTip = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  Omit<ArkTooltipArrowTipProps, "asChild">
>((props, ref) => {
  return (
    <ArkTooltip.ArrowTip
      {...props}
      ref={ref}
      data-scope="tooltip"
      data-part="arrow-tip"
    />
  );
}), lkAutomaticTooltipStyles);
LoongArkTooltipArrowTip.displayName = "LoongArkTooltipArrowTip";
