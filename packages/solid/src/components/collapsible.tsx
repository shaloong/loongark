
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticCollapsibleStyles } from "@loongark/primitives/automatic-styles/collapsible";
/**
 * Collapsible component - Solid wrapper.
 * Based on Ark UI Collapsible.
 */
import { type Component, type JSX, mergeProps } from "solid-js";
import {
  Collapsible as ArkCollapsible,
  type CollapsibleRootProps as ArkCollapsibleRootProps,
  type CollapsibleTriggerProps as ArkCollapsibleTriggerProps,
  type CollapsibleContentProps as ArkCollapsibleContentProps,
  type CollapsibleIndicatorProps as ArkCollapsibleIndicatorProps,
} from "@ark-ui/solid/collapsible";
import type { CollapsibleSize } from "@loongark/primitives";

export interface LoongArkCollapsibleRootProps extends Omit<
  ArkCollapsibleRootProps,
  "asChild"
> {
  size?: CollapsibleSize;
  children?: JSX.Element;
}

export const LoongArkCollapsibleRoot: Component<
  LoongArkCollapsibleRootProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const merged = mergeProps({ size: "md" as CollapsibleSize }, props);

  return (
    <ArkCollapsible.Root
      {...props}
      data-scope="collapsible"
      data-part="root"
      data-size={merged.size}
    >
      {props.children}
    </ArkCollapsible.Root>
  );
}, lkAutomaticCollapsibleStyles);

export const LoongArkCollapsibleTrigger: Component<
  ArkCollapsibleTriggerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkCollapsible.Trigger
      {...props}
      data-scope="collapsible"
      data-part="trigger"
    >
      {props.children}
    </ArkCollapsible.Trigger>
  );
}, lkAutomaticCollapsibleStyles);

export const LoongArkCollapsibleContent: Component<
  ArkCollapsibleContentProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkCollapsible.Content
      {...props}
      data-scope="collapsible"
      data-part="content"
    >
      {props.children}
    </ArkCollapsible.Content>
  );
}, lkAutomaticCollapsibleStyles);

export const LoongArkCollapsibleIndicator: Component<
  ArkCollapsibleIndicatorProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkCollapsible.Indicator
      {...props}
      data-scope="collapsible"
      data-part="indicator"
    >
      {props.children}
    </ArkCollapsible.Indicator>
  );
}, lkAutomaticCollapsibleStyles);
