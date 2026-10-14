
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticPopoverStyles } from "@shaloong/loongark-primitives/automatic-styles/popover";
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

export const LoongArkPopoverRoot = /*#__PURE__*/ withAutomaticStyles((props: ArkPopoverRootProps) => (
  <ArkPopover.Root {...props} data-scope="popover" data-part="root" />
), lkAutomaticPopoverStyles);

export const LoongArkPopoverTrigger = /*#__PURE__*/ withAutomaticStyles((props: ArkPopoverTriggerProps) => {
  const merged = mergeProps({}, props);
  return (
    <ArkPopover.Trigger {...merged} data-scope="popover" data-part="trigger" />
  );
}, lkAutomaticPopoverStyles);

export const LoongArkPopoverPositioner = /*#__PURE__*/ withAutomaticStyles((props: ArkPopoverPositionerProps) => (
  <ArkPopover.Positioner
    {...props}
    data-scope="popover"
    data-part="positioner"
  />
), lkAutomaticPopoverStyles);

export const LoongArkPopoverContent = /*#__PURE__*/ withAutomaticStyles((
  props: ArkPopoverContentProps & { showArrow?: boolean },
) => (
  <ArkPopover.Content
    {...props}
    data-scope="popover"
    data-part="content"
    data-arrow={props.showArrow ? "true" : undefined}
  />
), lkAutomaticPopoverStyles);

export const LoongArkPopoverArrow = /*#__PURE__*/ withAutomaticStyles((props: ArkPopoverArrowProps) => (
  <ArkPopover.Arrow {...props} data-scope="popover" data-part="arrow" />
), lkAutomaticPopoverStyles);

export const LoongArkPopoverTitle = /*#__PURE__*/ withAutomaticStyles((props: ArkPopoverTitleProps) => (
  <ArkPopover.Title {...props} data-scope="popover" data-part="title" />
), lkAutomaticPopoverStyles);

export const LoongArkPopoverDescription = /*#__PURE__*/ withAutomaticStyles((
  props: ArkPopoverDescriptionProps,
) => (
  <ArkPopover.Description
    {...props}
    data-scope="popover"
    data-part="description"
  />
), lkAutomaticPopoverStyles);

export const LoongArkPopoverCloseTrigger = /*#__PURE__*/ withAutomaticStyles((
  props: ArkPopoverCloseTriggerProps,
) => (
  <ArkPopover.CloseTrigger
    {...props}
    data-scope="popover"
    data-part="close-trigger"
  />
), lkAutomaticPopoverStyles);
