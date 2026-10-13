
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticSplitterStyles } from "@loongark/primitives/automatic-styles/splitter";
/**
 * Splitter component - Solid wrapper.
 * Uses Ark UI Splitter with data attributes for styling.
 */
import { type Component, type JSX, mergeProps, splitProps } from "solid-js";
import {
  Splitter as ArkSplitter,
  type SplitterRootProps as ArkSplitterRootProps,
  type SplitterPanelProps as ArkSplitterPanelProps,
  type SplitterResizeTriggerProps as ArkSplitterResizeTriggerProps,
  type SplitterResizeTriggerIndicatorProps as ArkSplitterResizeTriggerIndicatorProps,
} from "@ark-ui/solid/splitter";
import type { SplitterSize } from "@loongark/primitives";

export interface LoongArkSplitterRootProps extends Omit<
  ArkSplitterRootProps,
  "asChild" | "size"
> {
  size?: SplitterSize;
  children?: JSX.Element;
}

export const LoongArkSplitterRoot: Component<LoongArkSplitterRootProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const merged = mergeProps({ size: "md" as SplitterSize }, props);
  const [local, others] = splitProps(merged, ["children", "size"]);

  return (
    <ArkSplitter.Root
      {...others}
      data-scope="splitter"
      data-part="root"
      data-size={local.size}
    >
      {local.children}
    </ArkSplitter.Root>
  );
}, lkAutomaticSplitterStyles);

export interface LoongArkSplitterPanelProps extends Omit<
  ArkSplitterPanelProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkSplitterPanel: Component<LoongArkSplitterPanelProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSplitter.Panel {...others} data-scope="splitter" data-part="panel">
      {local.children}
    </ArkSplitter.Panel>
  );
}, lkAutomaticSplitterStyles);

export interface LoongArkSplitterResizeTriggerProps extends Omit<
  ArkSplitterResizeTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkSplitterResizeTrigger: Component<
  LoongArkSplitterResizeTriggerProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSplitter.ResizeTrigger
      aria-label="Resize panels"
      {...others}
      data-scope="splitter"
      data-part="resize-trigger"
    >
      {local.children}
    </ArkSplitter.ResizeTrigger>
  );
}, lkAutomaticSplitterStyles);

export interface LoongArkSplitterResizeTriggerIndicatorProps extends Omit<
  ArkSplitterResizeTriggerIndicatorProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkSplitterResizeTriggerIndicator: Component<
  LoongArkSplitterResizeTriggerIndicatorProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSplitter.ResizeTriggerIndicator
      {...others}
      data-scope="splitter"
      data-part="resize-trigger-indicator"
    >
      {local.children}
    </ArkSplitter.ResizeTriggerIndicator>
  );
}, lkAutomaticSplitterStyles);
