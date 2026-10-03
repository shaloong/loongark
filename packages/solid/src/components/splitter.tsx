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

export const LoongArkSplitterRoot: Component<LoongArkSplitterRootProps> = (
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
};

export interface LoongArkSplitterPanelProps extends Omit<
  ArkSplitterPanelProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkSplitterPanel: Component<LoongArkSplitterPanelProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSplitter.Panel {...others} data-scope="splitter" data-part="panel">
      {local.children}
    </ArkSplitter.Panel>
  );
};

export interface LoongArkSplitterResizeTriggerProps extends Omit<
  ArkSplitterResizeTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkSplitterResizeTrigger: Component<
  LoongArkSplitterResizeTriggerProps
> = (props) => {
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
};

export interface LoongArkSplitterResizeTriggerIndicatorProps extends Omit<
  ArkSplitterResizeTriggerIndicatorProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkSplitterResizeTriggerIndicator: Component<
  LoongArkSplitterResizeTriggerIndicatorProps
> = (props) => {
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
};
