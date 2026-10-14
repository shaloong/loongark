"use client";
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticSelectStyles } from "@shaloong/loongark-primitives/automatic-styles/select";

import { controlIcons } from "@shaloong/loongark-kit";
import { LoongArkIcon } from "./icon";
/**
 * Select 组件 - React 实现
 * 基于 Ark UI Select 的下拉选择器
 */

import React, {
  forwardRef,
  createContext,
  useContext,
  createElement,
  type FC,
  type ReactNode,
} from "react";
import {
  Select as ArkSelect,
  type SelectRootProps as ArkSelectRootProps,
  type SelectLabelProps as ArkSelectLabelProps,
  type SelectControlProps as ArkSelectControlProps,
  type SelectTriggerProps as ArkSelectTriggerProps,
  type SelectValueTextProps as ArkSelectValueTextProps,
  type SelectIndicatorProps as ArkSelectIndicatorProps,
  type SelectClearTriggerProps as ArkSelectClearTriggerProps,
  type SelectPositionerProps as ArkSelectPositionerProps,
  type SelectContentProps as ArkSelectContentProps,
  type SelectListProps as ArkSelectListProps,
  type SelectItemGroupProps as ArkSelectItemGroupProps,
  type SelectItemGroupLabelProps as ArkSelectItemGroupLabelProps,
  type SelectItemProps as ArkSelectItemProps,
  type SelectItemTextProps as ArkSelectItemTextProps,
  type SelectItemIndicatorProps as ArkSelectItemIndicatorProps,
  type SelectHiddenSelectProps as ArkSelectHiddenSelectProps,
} from "@ark-ui/react/select";
import type { SelectSize } from "@shaloong/loongark-primitives";
import { Portal as ArkPortal } from "./portal";

const SafePortal: FC<{ children?: ReactNode }> = ({ children }) =>
  createElement(ArkPortal, null, children);

const SelectContext = createContext<{ size: SelectSize }>({ size: "md" });

/**
 * Select Root Props
 */
export interface SelectRootProps<T = object> extends Omit<
  ArkSelectRootProps<T>,
  "asChild"
> {
  size?: SelectSize;
}

/**
 * Select Root 组件
 */
export const SelectRoot = /*#__PURE__*/ withAutomaticStyles(Object.assign(function SelectRoot<T = object>(props: SelectRootProps<T>) {
  const { size = "md", ...rest } = props;

  return (
    <SelectContext.Provider value={{ size }}>
      <ArkSelect.Root
        {...rest}
        data-scope="select"
        data-part="root"
        data-size={size}
      />
    </SelectContext.Provider>
  );
}, { displayName: "LoongArkSelectRoot" }), lkAutomaticSelectStyles);

/**
 * Select Label 组件
 */
export const SelectLabel = /*#__PURE__*/ withAutomaticStyles(forwardRef<HTMLLabelElement, ArkSelectLabelProps>(
  (props, ref) => {
    return (
      <ArkSelect.Label
        {...props}
        ref={ref}
        data-scope="select"
        data-part="label"
      />
    );
  },
), lkAutomaticSelectStyles);

SelectLabel.displayName = "LoongArkSelectLabel";

/**
 * Select Control 组件
 */
export const SelectControl = /*#__PURE__*/ withAutomaticStyles(forwardRef<HTMLDivElement, ArkSelectControlProps>(
  (props, ref) => {
    return (
      <ArkSelect.Control
        {...props}
        ref={ref}
        data-scope="select"
        data-part="control"
      />
    );
  },
), lkAutomaticSelectStyles);

SelectControl.displayName = "LoongArkSelectControl";

/**
 * Select Trigger 组件
 */
export const SelectTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLButtonElement,
  ArkSelectTriggerProps
>((props, ref) => {
  return (
    <ArkSelect.Trigger
      {...props}
      ref={ref}
      data-scope="select"
      data-part="trigger"
    />
  );
}), lkAutomaticSelectStyles);

SelectTrigger.displayName = "LoongArkSelectTrigger";

/**
 * Select ValueText 组件
 */
export const SelectValueText = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLSpanElement,
  ArkSelectValueTextProps
>((props, ref) => {
  return (
    <ArkSelect.ValueText
      {...props}
      ref={ref}
      data-scope="select"
      data-part="value-text"
    />
  );
}), lkAutomaticSelectStyles);

SelectValueText.displayName = "LoongArkSelectValueText";

/**
 * Select Indicator 组件
 */
export const SelectIndicator = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkSelectIndicatorProps
>((props, ref) => {
  return (
    <ArkSelect.Indicator
      {...props}
      ref={ref}
      data-scope="select"
      data-part="indicator"
    >
      {props.children ?? (
        <LoongArkIcon icon={controlIcons.chevronDown} size="sm" />
      )}
    </ArkSelect.Indicator>
  );
}), lkAutomaticSelectStyles);

SelectIndicator.displayName = "LoongArkSelectIndicator";

/**
 * Select ClearTrigger 组件
 */
export const SelectClearTrigger = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLButtonElement,
  ArkSelectClearTriggerProps
>((props, ref) => {
  return (
    <ArkSelect.ClearTrigger
      {...props}
      ref={ref}
      data-scope="select"
      data-part="clear-trigger"
    />
  );
}), lkAutomaticSelectStyles);

SelectClearTrigger.displayName = "LoongArkSelectClearTrigger";

/**
 * Select Positioner 组件
 */
export const SelectPositioner = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkSelectPositionerProps
>((props, ref) => {
  return (
    <SafePortal>
      <ArkSelect.Positioner
        {...props}
        ref={ref}
        data-scope="select"
        data-part="positioner"
      />
    </SafePortal>
  );
}), lkAutomaticSelectStyles);

SelectPositioner.displayName = "LoongArkSelectPositioner";

/**
 * Select Content 组件
 */
export const SelectContent = /*#__PURE__*/ withAutomaticStyles(forwardRef<HTMLDivElement, ArkSelectContentProps>(
  (props, ref) => {
    const { size } = useContext(SelectContext);
    return (
      <ArkSelect.Content
        {...props}
        ref={ref}
        data-scope="select"
        data-part="content"
        data-size={size}
      />
    );
  },
), lkAutomaticSelectStyles);

SelectContent.displayName = "LoongArkSelectContent";

/**
 * Select List 组件
 */
export const SelectList = /*#__PURE__*/ withAutomaticStyles(forwardRef<HTMLDivElement, ArkSelectListProps>(
  (props, ref) => {
    return (
      <ArkSelect.List
        {...props}
        ref={ref}
        data-scope="select"
        data-part="list"
      />
    );
  },
), lkAutomaticSelectStyles);

SelectList.displayName = "LoongArkSelectList";

/**
 * Select ItemGroup 组件
 */
export const SelectItemGroup = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkSelectItemGroupProps
>((props, ref) => {
  return (
    <ArkSelect.ItemGroup
      {...props}
      ref={ref}
      data-scope="select"
      data-part="item-group"
    />
  );
}), lkAutomaticSelectStyles);

SelectItemGroup.displayName = "LoongArkSelectItemGroup";

/**
 * Select ItemGroupLabel 组件
 */
export const SelectItemGroupLabel = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkSelectItemGroupLabelProps
>((props, ref) => {
  return (
    <ArkSelect.ItemGroupLabel
      {...props}
      ref={ref}
      data-scope="select"
      data-part="item-group-label"
    />
  );
}), lkAutomaticSelectStyles);

SelectItemGroupLabel.displayName = "LoongArkSelectItemGroupLabel";

/**
 * Select Item 组件
 */
export const SelectItem = /*#__PURE__*/ withAutomaticStyles(forwardRef<HTMLDivElement, ArkSelectItemProps>(
  (props, ref) => {
    return (
      <ArkSelect.Item
        {...props}
        ref={ref}
        data-scope="select"
        data-part="item"
      />
    );
  },
), lkAutomaticSelectStyles);

SelectItem.displayName = "LoongArkSelectItem";

/**
 * Select ItemText 组件
 */
export const SelectItemText = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkSelectItemTextProps
>((props, ref) => {
  return (
    <ArkSelect.ItemText
      {...props}
      ref={ref}
      data-scope="select"
      data-part="item-text"
    />
  );
}), lkAutomaticSelectStyles);

SelectItemText.displayName = "LoongArkSelectItemText";

/**
 * Select ItemIndicator 组件
 */
export const SelectItemIndicator = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkSelectItemIndicatorProps
>(({ children, ...props }, ref) => {
  return (
    <ArkSelect.ItemIndicator
      {...props}
      ref={ref}
      data-scope="select"
      data-part="item-indicator"
    >
      {children || <LoongArkIcon icon={controlIcons.check} size="sm" />}
    </ArkSelect.ItemIndicator>
  );
}), lkAutomaticSelectStyles);

SelectItemIndicator.displayName = "LoongArkSelectItemIndicator";

/**
 * Select HiddenSelect 组件 (用于表单提交)
 */
export const SelectHiddenSelect = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLSelectElement,
  ArkSelectHiddenSelectProps
>((props, ref) => {
  return (
    <ArkSelect.HiddenSelect
      {...props}
      ref={ref}
      data-scope="select"
      data-part="hidden-select"
    />
  );
}), lkAutomaticSelectStyles);

SelectHiddenSelect.displayName = "LoongArkSelectHiddenSelect";
