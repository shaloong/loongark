/**
 * Popover 组件 - Solid 封装
 * 基于 Ark UI Popover，透传 data-scope/data-part 并默认 asChild 避免嵌套
 */
import { mergeProps } from "solid-js";
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
} from "@ark-ui/solid/popover";

export const LoongArkPopoverRoot = (props: ArkPopoverRootProps) => (
  <ArkPopover.Root {...props} data-scope="popover" data-part="root" />
);

export const LoongArkPopoverTrigger = (props: ArkPopoverTriggerProps) => {
  const merged = mergeProps({ asChild: true }, props);
  return <ArkPopover.Trigger {...merged} data-scope="popover" data-part="trigger" />;
};

export const LoongArkPopoverPositioner = (props: ArkPopoverPositionerProps) => (
  <ArkPopover.Positioner {...props} data-scope="popover" data-part="positioner" />
);

export const LoongArkPopoverContent = (props: ArkPopoverContentProps & { showArrow?: boolean }) => (
  <ArkPopover.Content
    {...props}
    data-scope="popover"
    data-part="content"
    data-arrow={props.showArrow ? "true" : undefined}
  />
);

export const LoongArkPopoverArrow = (props: ArkPopoverArrowProps) => (
  <ArkPopover.Arrow {...props} data-scope="popover" data-part="arrow" />
);

export const LoongArkPopoverTitle = (props: ArkPopoverTitleProps) => (
  <ArkPopover.Title {...props} data-scope="popover" data-part="title" />
);

export const LoongArkPopoverDescription = (props: ArkPopoverDescriptionProps) => (
  <ArkPopover.Description {...props} data-scope="popover" data-part="description" />
);

export const LoongArkPopoverCloseTrigger = (props: ArkPopoverCloseTriggerProps) => (
  <ArkPopover.CloseTrigger {...props} data-scope="popover" data-part="close-trigger" />
);
