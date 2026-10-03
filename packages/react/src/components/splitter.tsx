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

export const LoongArkSplitterRoot = forwardRef<
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
});

LoongArkSplitterRoot.displayName = "LoongArkSplitterRoot";

export const LoongArkSplitterPanel = forwardRef<
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
});

LoongArkSplitterPanel.displayName = "LoongArkSplitterPanel";

export const LoongArkSplitterResizeTrigger = forwardRef<
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
});

LoongArkSplitterResizeTrigger.displayName = "LoongArkSplitterResizeTrigger";

export const LoongArkSplitterResizeTriggerIndicator = forwardRef<
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
});

LoongArkSplitterResizeTriggerIndicator.displayName =
  "LoongArkSplitterResizeTriggerIndicator";
