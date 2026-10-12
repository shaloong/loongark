"use client";
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticComboboxStyles } from "@loongark/primitives/automatic-styles/combobox";


import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
/**
 * Combobox component - React wrapper.
 * Based on Ark UI Combobox, injects data-scope/data-part attributes.
 */
import React, {
  createContext,
  createElement,
  forwardRef,
  useContext,
  type FC,
  type ReactNode,
} from "react";
import {
  Combobox as ArkCombobox,
  type ComboboxRootProps as ArkComboboxRootProps,
  type ComboboxLabelProps as ArkComboboxLabelProps,
  type ComboboxControlProps as ArkComboboxControlProps,
  type ComboboxInputProps as ArkComboboxInputProps,
  type ComboboxTriggerProps as ArkComboboxTriggerProps,
  type ComboboxClearTriggerProps as ArkComboboxClearTriggerProps,
  type ComboboxPositionerProps as ArkComboboxPositionerProps,
  type ComboboxContentProps as ArkComboboxContentProps,
  type ComboboxListProps as ArkComboboxListProps,
  type ComboboxItemGroupProps as ArkComboboxItemGroupProps,
  type ComboboxItemGroupLabelProps as ArkComboboxItemGroupLabelProps,
  type ComboboxItemProps as ArkComboboxItemProps,
  type ComboboxItemTextProps as ArkComboboxItemTextProps,
  type ComboboxItemIndicatorProps as ArkComboboxItemIndicatorProps,
} from "@ark-ui/react/combobox";
import { Portal as ArkPortal } from "./portal";
import type { ComboboxSize } from "@loongark/primitives";

const SafePortal: FC<{ children?: ReactNode }> = ({ children }) =>
  createElement(ArkPortal, null, children);

const ComboboxContext = createContext<{ size: ComboboxSize }>({ size: "md" });

export interface LoongArkComboboxRootProps<T = object> extends Omit<
  ArkComboboxRootProps<T>,
  "asChild"
> {
  size?: ComboboxSize;
  children?: ReactNode;
}

export const LoongArkComboboxRoot = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkComboboxRootProps
>(({ size = "md", children, ...props }, ref) => {
  return (
    <ComboboxContext.Provider value={{ size }}>
      <ArkCombobox.Root
        {...props}
        ref={ref}
        data-scope="combobox"
        data-part="root"
        data-size={size}
      >
        {children}
      </ArkCombobox.Root>
    </ComboboxContext.Provider>
  );
}) as (<T>(
  props: LoongArkComboboxRootProps<T> &
    import("react").RefAttributes<HTMLDivElement>,
) => import("react").ReactElement | null) & { displayName?: string }, lkAutomaticComboboxStyles);

LoongArkComboboxRoot.displayName = "LoongArkComboboxRoot";

export const LoongArkComboboxLabel = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLLabelElement,
  ArkComboboxLabelProps
>((props, ref) => {
  return (
    <ArkCombobox.Label
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="label"
    />
  );
}), lkAutomaticComboboxStyles);

LoongArkComboboxLabel.displayName = "LoongArkComboboxLabel";

export const LoongArkComboboxControl = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkComboboxControlProps
>((props, ref) => {
  return (
    <ArkCombobox.Control
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="control"
    />
  );
}), lkAutomaticComboboxStyles);

LoongArkComboboxControl.displayName = "LoongArkComboboxControl";

export const LoongArkComboboxInput = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLInputElement,
  ArkComboboxInputProps
>((props, ref) => {
  return (
    <ArkCombobox.Input
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="input"
    />
  );
}), lkAutomaticComboboxStyles);

LoongArkComboboxInput.displayName = "LoongArkComboboxInput";

export const LoongArkComboboxTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLButtonElement,
  ArkComboboxTriggerProps
>((props, ref) => {
  return (
    <ArkCombobox.Trigger
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="trigger"
    >
      {props.children ?? (
        <LoongArkIcon icon={controlIcons.chevronDown} size="sm" />
      )}
    </ArkCombobox.Trigger>
  );
}), lkAutomaticComboboxStyles);

LoongArkComboboxTrigger.displayName = "LoongArkComboboxTrigger";

export const LoongArkComboboxClearTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLButtonElement,
  ArkComboboxClearTriggerProps
>((props, ref) => {
  return (
    <ArkCombobox.ClearTrigger
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="clear-trigger"
    />
  );
}), lkAutomaticComboboxStyles);

LoongArkComboboxClearTrigger.displayName = "LoongArkComboboxClearTrigger";

export const LoongArkComboboxPositioner = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkComboboxPositionerProps
>((props, ref) => {
  return (
    <SafePortal>
      <ArkCombobox.Positioner
        {...props}
        ref={ref}
        data-scope="combobox"
        data-part="positioner"
      />
    </SafePortal>
  );
}), lkAutomaticComboboxStyles);

LoongArkComboboxPositioner.displayName = "LoongArkComboboxPositioner";

export const LoongArkComboboxContent = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkComboboxContentProps
>((props, ref) => {
  const { size } = useContext(ComboboxContext);
  return (
    <ArkCombobox.Content
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="content"
      data-size={size}
    />
  );
}), lkAutomaticComboboxStyles);

LoongArkComboboxContent.displayName = "LoongArkComboboxContent";

export const LoongArkComboboxList = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkComboboxListProps
>((props, ref) => {
  return (
    <ArkCombobox.List
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="list"
    />
  );
}), lkAutomaticComboboxStyles);

LoongArkComboboxList.displayName = "LoongArkComboboxList";

export const LoongArkComboboxItemGroup = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkComboboxItemGroupProps
>((props, ref) => {
  return (
    <ArkCombobox.ItemGroup
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="item-group"
    />
  );
}), lkAutomaticComboboxStyles);

LoongArkComboboxItemGroup.displayName = "LoongArkComboboxItemGroup";

export const LoongArkComboboxItemGroupLabel = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkComboboxItemGroupLabelProps
>((props, ref) => {
  return (
    <ArkCombobox.ItemGroupLabel
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="item-group-label"
    />
  );
}), lkAutomaticComboboxStyles);

LoongArkComboboxItemGroupLabel.displayName = "LoongArkComboboxItemGroupLabel";

export const LoongArkComboboxItem = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkComboboxItemProps
>((props, ref) => {
  return (
    <ArkCombobox.Item
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="item"
    />
  );
}), lkAutomaticComboboxStyles);

LoongArkComboboxItem.displayName = "LoongArkComboboxItem";

export const LoongArkComboboxItemText = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkComboboxItemTextProps
>((props, ref) => {
  return (
    <ArkCombobox.ItemText
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="item-text"
    />
  );
}), lkAutomaticComboboxStyles);

LoongArkComboboxItemText.displayName = "LoongArkComboboxItemText";

export const LoongArkComboboxItemIndicator = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkComboboxItemIndicatorProps
>(({ children, ...props }, ref) => {
  return (
    <ArkCombobox.ItemIndicator
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="item-indicator"
    >
      {children || <LoongArkIcon icon={controlIcons.check} size="sm" />}
    </ArkCombobox.ItemIndicator>
  );
}), lkAutomaticComboboxStyles);

LoongArkComboboxItemIndicator.displayName = "LoongArkComboboxItemIndicator";
