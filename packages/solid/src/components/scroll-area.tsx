/**
 * Scroll Area component - Solid wrapper.
 * Uses Ark UI Scroll Area with data attributes for styling.
 */
import { type Component, type JSX, mergeProps, splitProps } from "solid-js";
import {
  ScrollArea as ArkScrollArea,
  type ScrollAreaRootProps as ArkScrollAreaRootProps,
  type ScrollAreaViewportProps as ArkScrollAreaViewportProps,
  type ScrollAreaContentProps as ArkScrollAreaContentProps,
  type ScrollAreaScrollbarProps as ArkScrollAreaScrollbarProps,
  type ScrollAreaThumbProps as ArkScrollAreaThumbProps,
  type ScrollAreaCornerProps as ArkScrollAreaCornerProps,
} from "@ark-ui/solid/scroll-area";
import type { ScrollAreaSize } from "@loongark/primitives";

export interface LoongArkScrollAreaRootProps
  extends Omit<ArkScrollAreaRootProps, "asChild"> {
  size?: ScrollAreaSize;
  children?: JSX.Element;
}

export const LoongArkScrollAreaRoot: Component<LoongArkScrollAreaRootProps> = (
  props
) => {
  const merged = mergeProps({ size: "md" as ScrollAreaSize }, props);
  const [local, others] = splitProps(merged, ["children", "size"]);

  return (
    <ArkScrollArea.Root
      {...(others as any)}
      data-scope="scroll-area"
      data-part="root"
      data-size={local.size}
    >
      {local.children}
    </ArkScrollArea.Root>
  );
};

export interface LoongArkScrollAreaViewportProps
  extends Omit<ArkScrollAreaViewportProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkScrollAreaViewport: Component<
  LoongArkScrollAreaViewportProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkScrollArea.Viewport
      {...others}
      data-scope="scroll-area"
      data-part="viewport"
    >
      {local.children}
    </ArkScrollArea.Viewport>
  );
};

export interface LoongArkScrollAreaContentProps
  extends Omit<ArkScrollAreaContentProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkScrollAreaContent: Component<
  LoongArkScrollAreaContentProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkScrollArea.Content
      {...others}
      data-scope="scroll-area"
      data-part="content"
    >
      {local.children}
    </ArkScrollArea.Content>
  );
};

export interface LoongArkScrollAreaScrollbarProps
  extends Omit<ArkScrollAreaScrollbarProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkScrollAreaScrollbar: Component<
  LoongArkScrollAreaScrollbarProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkScrollArea.Scrollbar
      {...others}
      data-scope="scroll-area"
      data-part="scrollbar"
    >
      {local.children}
    </ArkScrollArea.Scrollbar>
  );
};

export interface LoongArkScrollAreaThumbProps
  extends Omit<ArkScrollAreaThumbProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkScrollAreaThumb: Component<
  LoongArkScrollAreaThumbProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkScrollArea.Thumb
      {...others}
      data-scope="scroll-area"
      data-part="thumb"
    >
      {local.children}
    </ArkScrollArea.Thumb>
  );
};

export interface LoongArkScrollAreaCornerProps
  extends Omit<ArkScrollAreaCornerProps, "asChild"> {
  children?: JSX.Element;
}

export const LoongArkScrollAreaCorner: Component<
  LoongArkScrollAreaCornerProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkScrollArea.Corner
      {...others}
      data-scope="scroll-area"
      data-part="corner"
    >
      {local.children}
    </ArkScrollArea.Corner>
  );
};
