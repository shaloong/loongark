
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticTabsStyles } from "@loongark/primitives/automatic-styles/tabs";
/**
 * Tabs 组件 - Solid 实现
 * 基于 Ark UI Tabs 的标签页
 */
import { type Component, type JSX, mergeProps } from "solid-js";
import {
  Tabs as ArkTabs,
  type TabsRootProps as ArkTabsRootProps,
  type TabListProps as ArkTabListProps,
  type TabTriggerProps as ArkTabTriggerProps,
  type TabContentProps as ArkTabContentProps,
  type TabIndicatorProps as ArkTabIndicatorProps,
} from "@ark-ui/solid/tabs";
import type { TabsOrientation, TabsSize } from "@loongark/primitives";

export interface LoongArkTabsRootProps extends Omit<
  ArkTabsRootProps,
  "asChild"
> {
  size?: TabsSize;
  orientation?: TabsOrientation;
  children?: JSX.Element;
}

export const LoongArkTabsRoot: Component<LoongArkTabsRootProps> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const merged = mergeProps(
    { size: "md" as TabsSize, orientation: "horizontal" as TabsOrientation },
    props,
  );

  return (
    <ArkTabs.Root
      {...props}
      orientation={merged.orientation}
      data-scope="tabs"
      data-part="root"
      data-size={merged.size}
      data-orientation={merged.orientation}
    >
      {props.children}
    </ArkTabs.Root>
  );
}, lkAutomaticTabsStyles);

export const LoongArkTabsList: Component<
  ArkTabListProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkTabs.List {...props} data-scope="tabs" data-part="list">
      {props.children}
    </ArkTabs.List>
  );
}, lkAutomaticTabsStyles);

export const LoongArkTabsTrigger: Component<
  ArkTabTriggerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkTabs.Trigger {...props} data-scope="tabs" data-part="trigger">
      {props.children}
    </ArkTabs.Trigger>
  );
}, lkAutomaticTabsStyles);

export const LoongArkTabsContent: Component<
  ArkTabContentProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkTabs.Content {...props} data-scope="tabs" data-part="content">
      {props.children}
    </ArkTabs.Content>
  );
}, lkAutomaticTabsStyles);

export const LoongArkTabsIndicator: Component<
  ArkTabIndicatorProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkTabs.Indicator {...props} data-scope="tabs" data-part="indicator">
      {props.children}
    </ArkTabs.Indicator>
  );
}, lkAutomaticTabsStyles);
