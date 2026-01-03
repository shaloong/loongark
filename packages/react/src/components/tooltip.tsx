/**
 * Tooltip 组件 - React 封装
 * 基于 Ark UI Tooltip，注入 data-scope/data-part 与 interactive 映射
 */
import React, { forwardRef, createElement, type FC, type ReactNode } from "react";
import {
  Tooltip as ArkTooltip,
  type TooltipRootProps as ArkTooltipRootProps,
  type TooltipTriggerProps as ArkTooltipTriggerProps,
  type TooltipContentProps as ArkTooltipContentProps,
  type TooltipPositionerProps as ArkTooltipPositionerProps,
  type TooltipArrowProps as ArkTooltipArrowProps,
  type TooltipArrowTipProps as ArkTooltipArrowTipProps,
} from "@ark-ui/react/tooltip";
import { Portal as ArkPortal } from "@ark-ui/react/portal";

const SafePortal: FC<{ children?: ReactNode }> = ({ children }) =>
  createElement(ArkPortal as unknown as FC<{ children?: ReactNode }>, null, children);

export interface LoongArkTooltipRootProps extends Omit<ArkTooltipRootProps, "asChild"> {}

export const LoongArkTooltipRoot = (props: LoongArkTooltipRootProps) => {
  return <ArkTooltip.Root {...props} data-scope="tooltip" data-part="root" />;
};

export const LoongArkTooltipTrigger = forwardRef<
  HTMLElement,
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
});
LoongArkTooltipTrigger.displayName = "LoongArkTooltipTrigger";

export const LoongArkTooltipPositioner = forwardRef<
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
});
LoongArkTooltipPositioner.displayName = "LoongArkTooltipPositioner";

export const LoongArkTooltipContent = forwardRef<
  HTMLDivElement,
  Omit<ArkTooltipContentProps, "asChild">
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
});
LoongArkTooltipContent.displayName = "LoongArkTooltipContent";

export const LoongArkTooltipArrow = forwardRef<
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
});
LoongArkTooltipArrow.displayName = "LoongArkTooltipArrow";

export const LoongArkTooltipArrowTip = forwardRef<
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
});
LoongArkTooltipArrowTip.displayName = "LoongArkTooltipArrowTip";

