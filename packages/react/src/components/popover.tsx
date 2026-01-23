/**
 * Popover 组件 - React 封装
 * 基于 Ark UI Popover，注入 data-scope/data-part 并默认启用 asChild 避免嵌套
 */
import React, { forwardRef, createElement } from "react";
import type { ReactNode, FC } from "react";
import {
  Popover as ArkPopover,
  type PopoverRootProps as ArkPopoverRootProps,
  type PopoverTriggerProps as ArkPopoverTriggerProps,
  type PopoverContentProps as ArkPopoverContentProps,
  type PopoverPositionerProps as ArkPopoverPositionerProps,
  type PopoverArrowProps as ArkPopoverArrowProps,
  type PopoverCloseTriggerProps as ArkPopoverCloseTriggerProps,
  type PopoverTitleProps as ArkPopoverTitleProps,
  type PopoverDescriptionProps as ArkPopoverDescriptionProps,
} from "@ark-ui/react/popover";
import { Portal as ArkPortal } from "@ark-ui/react/portal";

export interface LoongArkPopoverRootProps extends Omit<ArkPopoverRootProps, "asChild"> {}

type ArkTriggerProps = ArkPopoverTriggerProps & { children?: ReactNode };
type ArkContentProps = ArkPopoverContentProps & { children?: ReactNode };

const SafePortal: FC<{ children?: ReactNode }> = ({ children }) =>
  createElement(ArkPortal as unknown as FC<{ children?: ReactNode }>, null, children);

export const LoongArkPopoverRoot = (props: LoongArkPopoverRootProps) => (
  <ArkPopover.Root {...props} data-scope="popover" data-part="root" />
);

export const LoongArkPopoverTrigger = forwardRef<
  HTMLButtonElement,
  ArkTriggerProps
>(({ asChild = true, children, ...rest }, ref) => (
  <ArkPopover.Trigger
    {...rest}
    asChild={asChild}
    ref={ref}
    data-scope="popover"
    data-part="trigger"
  >
    {children}
  </ArkPopover.Trigger>
));
LoongArkPopoverTrigger.displayName = "LoongArkPopoverTrigger";

export const LoongArkPopoverPositioner = forwardRef<
  HTMLDivElement,
  Omit<ArkPopoverPositionerProps, "asChild">
>((props, ref) => (
  <SafePortal>
    <ArkPopover.Positioner
      {...props}
      ref={ref}
      data-scope="popover"
      data-part="positioner"
    />
  </SafePortal>
 ));
 LoongArkPopoverPositioner.displayName = "LoongArkPopoverPositioner";

export const LoongArkPopoverContent = forwardRef<
  HTMLDivElement,
  Omit<ArkPopoverContentProps, "asChild"> & { showArrow?: boolean }
>(({ showArrow, ...props }, ref) => {
  return (
    <ArkPopover.Content
      {...props}
      ref={ref}
      data-scope="popover"
      data-part="content"
      data-arrow={showArrow ? "true" : undefined}
    />
  );
});
LoongArkPopoverContent.displayName = "LoongArkPopoverContent";

export const LoongArkPopoverArrow = forwardRef<
  HTMLDivElement,
  Omit<ArkPopoverArrowProps, "asChild">
>((props, ref) => (
  <ArkPopover.Arrow
    {...props}
    ref={ref}
    data-scope="popover"
    data-part="arrow"
  />
));
LoongArkPopoverArrow.displayName = "LoongArkPopoverArrow";

export const LoongArkPopoverTitle = forwardRef<
  HTMLDivElement,
  Omit<ArkPopoverTitleProps, "asChild">
>((props, ref) => (
  <ArkPopover.Title {...props} ref={ref} data-scope="popover" data-part="title" />
));
LoongArkPopoverTitle.displayName = "LoongArkPopoverTitle";

export const LoongArkPopoverDescription = forwardRef<
  HTMLParagraphElement,
  Omit<ArkPopoverDescriptionProps, "asChild">
>((props, ref) => (
  <ArkPopover.Description
    {...props}
    ref={ref}
    data-scope="popover"
    data-part="description"
  />
));
LoongArkPopoverDescription.displayName = "LoongArkPopoverDescription";

export const LoongArkPopoverCloseTrigger = forwardRef<
  HTMLButtonElement,
  Omit<ArkPopoverCloseTriggerProps, "asChild">
>((props, ref) => (
  <ArkPopover.CloseTrigger
    {...props}
    ref={ref}
    data-scope="popover"
    data-part="close-trigger"
  />
));
LoongArkPopoverCloseTrigger.displayName = "LoongArkPopoverCloseTrigger";

