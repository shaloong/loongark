"use client";
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticListboxStyles } from "@shaloong/loongark-primitives/automatic-styles/listbox";


/**
 * Listbox component - React wrapper.
 * Uses Ark UI Listbox with data attributes for styling.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Listbox } from "@ark-ui/react/listbox";
import type { ListboxOrientation, ListboxSize } from "@shaloong/loongark-primitives";

type ArkListboxRootProps<T = object> =
  import("@ark-ui/react/listbox").ListboxRootProps<T>;
type ArkListboxLabelProps = ComponentPropsWithoutRef<typeof Listbox.Label>;
type ArkListboxListProps = ComponentPropsWithoutRef<typeof Listbox.Content>;
type ArkListboxItemGroupProps = ComponentPropsWithoutRef<
  typeof Listbox.ItemGroup
>;
type ArkListboxItemGroupLabelProps = ComponentPropsWithoutRef<
  typeof Listbox.ItemGroupLabel
>;
type ArkListboxItemProps = ComponentPropsWithoutRef<typeof Listbox.Item>;
type ArkListboxItemTextProps = ComponentPropsWithoutRef<
  typeof Listbox.ItemText
>;
type ArkListboxItemIndicatorProps = ComponentPropsWithoutRef<
  typeof Listbox.ItemIndicator
>;

export interface LoongArkListboxRootProps<T = object> extends Omit<
  ArkListboxRootProps<T>,
  "asChild"
> {
  size?: ListboxSize;
  orientation?: ListboxOrientation;
  children?: ReactNode;
}

export interface LoongArkListboxLabelProps extends Omit<
  ArkListboxLabelProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkListboxListProps extends Omit<
  ArkListboxListProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkListboxItemGroupProps extends Omit<
  ArkListboxItemGroupProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkListboxItemGroupLabelProps extends Omit<
  ArkListboxItemGroupLabelProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkListboxItemProps extends Omit<
  ArkListboxItemProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkListboxItemTextProps extends Omit<
  ArkListboxItemTextProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkListboxItemIndicatorProps extends Omit<
  ArkListboxItemIndicatorProps,
  "asChild"
> {
  children?: ReactNode;
}

export const LoongArkListboxRoot = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkListboxRootProps
>(({ children, size = "md", orientation = "vertical", ...props }, ref) => {
  return (
    <Listbox.Root
      {...props}
      ref={ref}
      orientation={orientation}
      data-scope="listbox"
      data-part="root"
      data-size={size}
      data-orientation={orientation}
    >
      {children}
    </Listbox.Root>
  );
}) as (<T>(
  props: LoongArkListboxRootProps<T> &
    import("react").RefAttributes<HTMLDivElement>,
) => import("react").ReactElement | null) & { displayName?: string }, lkAutomaticListboxStyles);

LoongArkListboxRoot.displayName = "LoongArkListboxRoot";

export const LoongArkListboxLabel = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLLabelElement,
  LoongArkListboxLabelProps
>(({ children, ...props }, ref) => {
  return (
    <Listbox.Label {...props} ref={ref} data-scope="listbox" data-part="label">
      {children}
    </Listbox.Label>
  );
}), lkAutomaticListboxStyles);

LoongArkListboxLabel.displayName = "LoongArkListboxLabel";

export const LoongArkListboxList = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkListboxListProps
>(({ children, ...props }, ref) => {
  return (
    <Listbox.Content {...props} ref={ref} data-scope="listbox" data-part="list">
      {children}
    </Listbox.Content>
  );
}), lkAutomaticListboxStyles);

LoongArkListboxList.displayName = "LoongArkListboxList";

export const LoongArkListboxItemGroup = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkListboxItemGroupProps
>(({ children, ...props }, ref) => {
  return (
    <Listbox.ItemGroup
      {...props}
      ref={ref}
      data-scope="listbox"
      data-part="item-group"
    >
      {children}
    </Listbox.ItemGroup>
  );
}), lkAutomaticListboxStyles);

LoongArkListboxItemGroup.displayName = "LoongArkListboxItemGroup";

export const LoongArkListboxItemGroupLabel = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkListboxItemGroupLabelProps
>(({ children, ...props }, ref) => {
  return (
    <Listbox.ItemGroupLabel
      {...props}
      ref={ref}
      data-scope="listbox"
      data-part="item-group-label"
    >
      {children}
    </Listbox.ItemGroupLabel>
  );
}), lkAutomaticListboxStyles);

LoongArkListboxItemGroupLabel.displayName = "LoongArkListboxItemGroupLabel";

export const LoongArkListboxItem = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkListboxItemProps
>(({ children, ...props }, ref) => {
  return (
    <Listbox.Item {...props} ref={ref} data-scope="listbox" data-part="item">
      {children}
    </Listbox.Item>
  );
}), lkAutomaticListboxStyles);

LoongArkListboxItem.displayName = "LoongArkListboxItem";

export const LoongArkListboxItemText = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkListboxItemTextProps
>(({ children, ...props }, ref) => {
  return (
    <Listbox.ItemText
      {...props}
      ref={ref}
      data-scope="listbox"
      data-part="item-text"
    >
      {children}
    </Listbox.ItemText>
  );
}), lkAutomaticListboxStyles);

LoongArkListboxItemText.displayName = "LoongArkListboxItemText";

export const LoongArkListboxItemIndicator = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkListboxItemIndicatorProps
>(({ children, ...props }, ref) => {
  return (
    <Listbox.ItemIndicator
      {...props}
      ref={ref}
      data-scope="listbox"
      data-part="item-indicator"
    >
      {children}
    </Listbox.ItemIndicator>
  );
}), lkAutomaticListboxStyles);

LoongArkListboxItemIndicator.displayName = "LoongArkListboxItemIndicator";
