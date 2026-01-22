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

export interface LoongArkCollapsibleRootProps
  extends Omit<ArkCollapsibleRootProps, "asChild"> {
  size?: CollapsibleSize;
  children?: JSX.Element;
}

export const LoongArkCollapsibleRoot: Component<
  LoongArkCollapsibleRootProps
> = (props) => {
  const merged = mergeProps({ size: "md" as CollapsibleSize }, props);

  return (
    <ArkCollapsible.Root
      {...(props as any)}
      data-scope="collapsible"
      data-part="root"
      data-size={merged.size}
    >
      {props.children}
    </ArkCollapsible.Root>
  );
};

export const LoongArkCollapsibleTrigger: Component<
  ArkCollapsibleTriggerProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkCollapsible.Trigger
      {...props}
      data-scope="collapsible"
      data-part="trigger"
    >
      {props.children}
    </ArkCollapsible.Trigger>
  );
};

export const LoongArkCollapsibleContent: Component<
  ArkCollapsibleContentProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkCollapsible.Content
      {...props}
      data-scope="collapsible"
      data-part="content"
    >
      {props.children}
    </ArkCollapsible.Content>
  );
};

export const LoongArkCollapsibleIndicator: Component<
  ArkCollapsibleIndicatorProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkCollapsible.Indicator
      {...props}
      data-scope="collapsible"
      data-part="indicator"
    >
      {props.children}
    </ArkCollapsible.Indicator>
  );
};
