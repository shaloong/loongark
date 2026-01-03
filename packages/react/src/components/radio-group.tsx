import { RadioGroup } from "@ark-ui/react/radio-group";
import { type ReactNode, forwardRef, createElement } from "react";
import type { RadioGroupSize, RadioGroupOrientation } from "@loongark/primitives";

// ============ 类型定义 ============

export interface LoongArkRadioGroupRootProps {
  children?: ReactNode;
  size?: RadioGroupSize;
  orientation?: RadioGroupOrientation;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  form?: string;
  onValueChange?: (details: { value: string }) => void;
  className?: string;
}

export interface LoongArkRadioGroupLabelProps {
  children?: ReactNode;
  className?: string;
  style?: any;
  [key: string]: any;
}

export interface LoongArkRadioGroupItemProps {
  children?: ReactNode;
  value: string;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  key?: string | number;
  [key: string]: any;
}

export interface LoongArkRadioGroupItemControlProps {
  children?: ReactNode;
  className?: string;
}

export interface LoongArkRadioGroupItemTextProps {
  children?: ReactNode;
  className?: string;
}

export interface LoongArkRadioGroupIndicatorProps {
  children?: ReactNode;
  className?: string;
}

export interface LoongArkRadioGroupItemHiddenInputProps {
  className?: string;
}

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
    ref
  ) => {
    return createElement(
      RadioGroup.Root,
      {
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
      },
      children
    );
  }
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
    {
      ref,
      "data-scope": "radio-group",
      "data-part": "label",
      ...props,
    },
    children
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
    {
      ref,
      value,
      disabled,
      invalid,
      "data-scope": "radio-group",
      "data-part": "item",
      ...props,
    },
    children
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
    {
      ref,
      className,
      "data-scope": "radio-group",
      "data-part": "item-control",
      ...props,
    },
    children
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
    {
      ref,
      className,
      "data-scope": "radio-group",
      "data-part": "item-text",
      ...props,
    },
    children
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
    {
      ref,
      className,
      "data-scope": "radio-group",
      "data-part": "indicator",
      ...props,
    },
    children
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
  return createElement(RadioGroup.ItemHiddenInput, {
    ref,
    className,
    "data-scope": "radio-group",
    "data-part": "item-hidden-input",
    ...props,
  });
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

