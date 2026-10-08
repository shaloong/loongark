import { nativeSelectionProps } from "@loongark/kit";
import { dataProps } from "../data-props";
import { useNativeSelection } from "../native-selection";
import {
  useRadioGroupContext,
  useRadioGroupItemContext,
} from "@ark-ui/react/radio-group";
import { RadioGroup } from "@ark-ui/react/radio-group";
import { type ReactNode, forwardRef, createElement } from "react";
import type { ComponentPropsWithoutRef } from "react";
import type {
  RadioGroupSize,
  RadioGroupOrientation,
} from "@loongark/primitives";

// ============ 类型定义 ============

type ArkRadioGroupRootProps = ComponentPropsWithoutRef<typeof RadioGroup.Root>;
type ArkRadioGroupLabelProps = ComponentPropsWithoutRef<
  typeof RadioGroup.Label
>;
type ArkRadioGroupItemProps = ComponentPropsWithoutRef<typeof RadioGroup.Item>;
type ArkRadioGroupItemControlProps = ComponentPropsWithoutRef<
  typeof RadioGroup.ItemControl
>;
type ArkRadioGroupItemTextProps = ComponentPropsWithoutRef<
  typeof RadioGroup.ItemText
>;
type ArkRadioGroupIndicatorProps = ComponentPropsWithoutRef<
  typeof RadioGroup.Indicator
>;
type ArkRadioGroupItemHiddenInputProps = ComponentPropsWithoutRef<
  typeof RadioGroup.ItemHiddenInput
>;

export interface LoongArkRadioGroupRootProps extends Omit<
  ArkRadioGroupRootProps,
  "asChild"
> {
  children?: ReactNode;
  size?: RadioGroupSize;
  orientation?: RadioGroupOrientation;
}

export interface LoongArkRadioGroupLabelProps extends Omit<
  ArkRadioGroupLabelProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkRadioGroupItemProps extends Omit<
  ArkRadioGroupItemProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkRadioGroupItemControlProps extends Omit<
  ArkRadioGroupItemControlProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkRadioGroupItemTextProps extends Omit<
  ArkRadioGroupItemTextProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkRadioGroupIndicatorProps extends Omit<
  ArkRadioGroupIndicatorProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkRadioGroupItemHiddenInputProps extends Omit<
  ArkRadioGroupItemHiddenInputProps,
  "asChild"
> {}

// ============ 组件实现 ============

/**
 * Radio Group Root - 单选按钮组根容器
 */
export const LoongArkRadioGroupRoot = forwardRef<
  HTMLDivElement,
  LoongArkRadioGroupRootProps
>(
  (
    {
      children,
      size = "md",
      orientation = "vertical",
      defaultValue,
      value,
      disabled,
      readOnly,
      name,
      form,
      onValueChange,
      className,
      ...props
    },
    ref,
  ) => {
    return createElement(
      RadioGroup.Root,
      dataProps(
        nativeSelectionProps({
          ref,
          defaultValue,
          value,
          disabled,
          readOnly,
          name,
          form,
          orientation,
          onValueChange,
          className,
          "data-scope": "radio-group",
          "data-part": "root",
          "data-size": size,
          "data-orientation": orientation,
          ...props,
        }),
      ),
      children,
    );
  },
);

LoongArkRadioGroupRoot.displayName = "LoongArkRadioGroupRoot";

/**
 * Radio Group Label - 单选按钮组标签
 */
export const LoongArkRadioGroupLabel = forwardRef<
  HTMLLabelElement,
  LoongArkRadioGroupLabelProps
>(({ children, ...props }, ref) => {
  return createElement(
    RadioGroup.Label,
    dataProps({
      ref,
      "data-scope": "radio-group",
      "data-part": "label",
      ...props,
    }),
    children,
  );
});

LoongArkRadioGroupLabel.displayName = "LoongArkRadioGroupLabel";

/**
 * Radio Group Item - 单选按钮项
 */
export const LoongArkRadioGroupItem = forwardRef<
  HTMLLabelElement,
  LoongArkRadioGroupItemProps
>(({ children, value, disabled, invalid, ...props }, ref) => {
  return createElement(
    RadioGroup.Item,
    dataProps({
      ref,
      value,
      disabled,
      invalid,
      "data-scope": "radio-group",
      "data-part": "item",
      ...props,
    }),
    children,
  );
});

LoongArkRadioGroupItem.displayName = "LoongArkRadioGroupItem";

/**
 * Radio Group Item Control - 单选按钮控件（圆圈）
 */
export const LoongArkRadioGroupItemControl = forwardRef<
  HTMLDivElement,
  LoongArkRadioGroupItemControlProps
>(({ children, className, ...props }, ref) => {
  return createElement(
    RadioGroup.ItemControl,
    dataProps({
      ref,
      className,
      "data-scope": "radio-group",
      "data-part": "item-control",
      ...props,
    }),
    children,
  );
});

LoongArkRadioGroupItemControl.displayName = "LoongArkRadioGroupItemControl";

/**
 * Radio Group Item Text - 单选按钮文本
 */
export const LoongArkRadioGroupItemText = forwardRef<
  HTMLSpanElement,
  LoongArkRadioGroupItemTextProps
>(({ children, className, ...props }, ref) => {
  return createElement(
    RadioGroup.ItemText,
    dataProps({
      ref,
      className,
      "data-scope": "radio-group",
      "data-part": "item-text",
      ...props,
    }),
    children,
  );
});

LoongArkRadioGroupItemText.displayName = "LoongArkRadioGroupItemText";

/**
 * Radio Group Indicator - 单选按钮选中指示器（内部圆点）
 */
export const LoongArkRadioGroupIndicator = forwardRef<
  HTMLDivElement,
  LoongArkRadioGroupIndicatorProps
>(({ children, className, ...props }, ref) => {
  return createElement(
    RadioGroup.Indicator,
    dataProps({
      ref,
      className,
      "data-scope": "radio-group",
      "data-part": "indicator",
      ...props,
    }),
    children,
  );
});

LoongArkRadioGroupIndicator.displayName = "LoongArkRadioGroupIndicator";

/**
 * Radio Group Item Hidden Input - 隐藏的原生 radio input
 */
export const LoongArkRadioGroupItemHiddenInput = forwardRef<
  HTMLInputElement,
  LoongArkRadioGroupItemHiddenInputProps
>(({ className, ...props }, ref) => {
  const item = useRadioGroupItemContext();
  const input = useNativeSelection(useRadioGroupContext(), "radio", ref);
  return createElement(
    RadioGroup.ItemHiddenInput,
    dataProps({
      ref: input,
      className,
      "data-scope": "radio-group",
      "data-part": "item-hidden-input",
      ...props,
      disabled: item.disabled || !!props.disabled,
    }),
  );
});

LoongArkRadioGroupItemHiddenInput.displayName =
  "LoongArkRadioGroupItemHiddenInput";

export const LoongArkRadioGroup: {
  Root: typeof LoongArkRadioGroupRoot;
  Label: typeof LoongArkRadioGroupLabel;
  Item: typeof LoongArkRadioGroupItem;
  ItemControl: typeof LoongArkRadioGroupItemControl;
  ItemText: typeof LoongArkRadioGroupItemText;
  Indicator: typeof LoongArkRadioGroupIndicator;
  ItemHiddenInput: typeof LoongArkRadioGroupItemHiddenInput;
} = {
  Root: LoongArkRadioGroupRoot,
  Label: LoongArkRadioGroupLabel,
  Item: LoongArkRadioGroupItem,
  ItemControl: LoongArkRadioGroupItemControl,
  ItemText: LoongArkRadioGroupItemText,
  Indicator: LoongArkRadioGroupIndicator,
  ItemHiddenInput: LoongArkRadioGroupItemHiddenInput,
};
