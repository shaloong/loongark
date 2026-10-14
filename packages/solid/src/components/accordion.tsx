
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticAccordionStyles } from "@shaloong/loongark-primitives/automatic-styles/accordion";
/**
 * Accordion component - Solid wrapper.
 * Based on Ark UI Accordion.
 */
import { type Component, type JSX, mergeProps } from "solid-js";
import {
  Accordion as ArkAccordion,
  type AccordionRootProps as ArkAccordionRootProps,
  type AccordionItemProps as ArkAccordionItemProps,
  type AccordionItemTriggerProps as ArkAccordionItemTriggerProps,
  type AccordionItemContentProps as ArkAccordionItemContentProps,
  type AccordionItemIndicatorProps as ArkAccordionItemIndicatorProps,
} from "@ark-ui/solid/accordion";
import type { AccordionOrientation, AccordionSize } from "@shaloong/loongark-primitives";

export interface LoongArkAccordionRootProps extends Omit<
  ArkAccordionRootProps,
  "asChild"
> {
  size?: AccordionSize;
  orientation?: AccordionOrientation;
  children?: JSX.Element;
}

export const LoongArkAccordionRoot: Component<LoongArkAccordionRootProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const merged = mergeProps(
    {
      size: "md" as AccordionSize,
      orientation: "vertical" as AccordionOrientation,
    },
    props,
  );

  return (
    <ArkAccordion.Root
      {...props}
      orientation={merged.orientation}
      data-scope="accordion"
      data-part="root"
      data-size={merged.size}
      data-orientation={merged.orientation}
    >
      {props.children}
    </ArkAccordion.Root>
  );
}, lkAutomaticAccordionStyles);

export const LoongArkAccordionItem: Component<
  ArkAccordionItemProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkAccordion.Item {...props} data-scope="accordion" data-part="item">
      {props.children}
    </ArkAccordion.Item>
  );
}, lkAutomaticAccordionStyles);

export const LoongArkAccordionItemTrigger: Component<
  ArkAccordionItemTriggerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkAccordion.ItemTrigger
      {...props}
      data-scope="accordion"
      data-part="item-trigger"
    >
      {props.children}
    </ArkAccordion.ItemTrigger>
  );
}, lkAutomaticAccordionStyles);

export const LoongArkAccordionItemContent: Component<
  ArkAccordionItemContentProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkAccordion.ItemContent
      {...props}
      data-scope="accordion"
      data-part="item-content"
    >
      {props.children}
    </ArkAccordion.ItemContent>
  );
}, lkAutomaticAccordionStyles);

export const LoongArkAccordionItemIndicator: Component<
  ArkAccordionItemIndicatorProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkAccordion.ItemIndicator
      {...props}
      data-scope="accordion"
      data-part="item-indicator"
    >
      {props.children}
    </ArkAccordion.ItemIndicator>
  );
}, lkAutomaticAccordionStyles);
