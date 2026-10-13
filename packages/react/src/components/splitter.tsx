"use client";
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticSplitterStyles } from "@loongark/primitives/automatic-styles/splitter";


/**
 * Splitter component - React wrapper.
 * Uses Ark UI Splitter with data attributes for styling.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Splitter } from "@ark-ui/react/splitter";
import type { SplitterSize } from "@loongark/primitives";

type ArkSplitterRootProps = ComponentPropsWithoutRef<typeof Splitter.Root>;
type ArkSplitterPanelProps = ComponentPropsWithoutRef<typeof Splitter.Panel>;
type ArkSplitterResizeTriggerProps = ComponentPropsWithoutRef<
  typeof Splitter.ResizeTrigger
>;
type ArkSplitterResizeTriggerIndicatorProps = ComponentPropsWithoutRef<
  typeof Splitter.ResizeTriggerIndicator
>;

export interface LoongArkSplitterRootProps extends Omit<
  ArkSplitterRootProps,
  "asChild" | "size"
> {
  size?: SplitterSize;
  children?: ReactNode;
}

export const LoongArkSplitterRoot = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkSplitterRootProps
>(({ size = "md", children, ...props }, ref) => {
  return (
    <Splitter.Root
      {...props}
      ref={ref}
      data-scope="splitter"
      data-part="root"
      data-size={size}
    >
      {children}
    </Splitter.Root>
  );
}), lkAutomaticSplitterStyles);

LoongArkSplitterRoot.displayName = "LoongArkSplitterRoot";

export const LoongArkSplitterPanel = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkSplitterPanelProps
>((props, ref) => {
  return (
    <Splitter.Panel
      {...props}
      ref={ref}
      data-scope="splitter"
      data-part="panel"
    />
  );
}), lkAutomaticSplitterStyles);

LoongArkSplitterPanel.displayName = "LoongArkSplitterPanel";

export const LoongArkSplitterResizeTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLButtonElement,
  ArkSplitterResizeTriggerProps
>((props, ref) => {
  return (
    <Splitter.ResizeTrigger
      aria-label="Resize panels"
      {...props}
      ref={ref}
      data-scope="splitter"
      data-part="resize-trigger"
    />
  );
}), lkAutomaticSplitterStyles);

LoongArkSplitterResizeTrigger.displayName = "LoongArkSplitterResizeTrigger";

export const LoongArkSplitterResizeTriggerIndicator = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkSplitterResizeTriggerIndicatorProps
>((props, ref) => {
  return (
    <Splitter.ResizeTriggerIndicator
      {...props}
      ref={ref}
      data-scope="splitter"
      data-part="resize-trigger-indicator"
    />
  );
}), lkAutomaticSplitterStyles);

LoongArkSplitterResizeTriggerIndicator.displayName =
  "LoongArkSplitterResizeTriggerIndicator";
