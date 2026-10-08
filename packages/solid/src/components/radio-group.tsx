import { nativeSelectionRef } from "../native-selection";
import {
  useRadioGroupContext,
  useRadioGroupItemContext,
  type RadioGroupItemHiddenInputProps as NativeHiddenInputProps,
} from "@ark-ui/solid/radio-group";
import { RadioGroup as ArkRadioGroup } from "@ark-ui/solid/radio-group";
import { ark } from "@ark-ui/solid";
import type {
  RadioGroupPrimitiveProps,
  RadioGroupSize,
  RadioGroupOrientation,
} from "@loongark/primitives";
import { mergeProps, type Component, type JSX } from "solid-js";

// ============ 类型定义 ============

export type { RadioGroupSize, RadioGroupOrientation };

export interface ValueChangeDetails {
  value: string | null;
}

export interface RadioGroupRootProps {
  size?: RadioGroupSize;
  orientation?: RadioGroupOrientation;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  form?: string;
  onValueChange?: (details: ValueChangeDetails) => void;
  children?: JSX.Element;
  class?: string;
}

export interface RadioGroupLabelProps {
  children?: JSX.Element;
  class?: string;
}

export interface RadioGroupItemProps {
  value: string;
  disabled?: boolean;
  invalid?: boolean;
  children?: JSX.Element;
  class?: string;
}

export interface RadioGroupItemControlProps {
  children?: JSX.Element;
  class?: string;
}

export interface RadioGroupItemTextProps {
  children?: JSX.Element;
  class?: string;
}

export interface RadioGroupIndicatorProps {
  children?: JSX.Element;
  class?: string;
}

export interface RadioGroupItemHiddenInputProps extends NativeHiddenInputProps {
  class?: string;
}

// ============ 组件实现 ============

/**
 * Radio Group Root - 单选按钮组根容器
 */
export const LoongArkRadioGroupRoot: Component<RadioGroupRootProps> = (
  props,
) => {
  return (
    <ArkRadioGroup.Root
      {...mergeProps(props, {
        "data-size": props.size || "md",
        "data-orientation": props.orientation || "vertical",
      })}
    >
      {props.children}
    </ArkRadioGroup.Root>
  );
};

/**
 * Radio Group Label - 单选按钮组标签
 */
export const LoongArkRadioGroupLabel: Component<RadioGroupLabelProps> = (
  props,
) => {
  return <ArkRadioGroup.Label {...props}>{props.children}</ArkRadioGroup.Label>;
};

/**
 * Radio Group Item - 单选按钮项
 */
export const LoongArkRadioGroupItem: Component<RadioGroupItemProps> = (
  props,
) => {
  return <ArkRadioGroup.Item {...props}>{props.children}</ArkRadioGroup.Item>;
};

/**
 * Radio Group Item Control - 单选按钮控件（圆圈）
 */
export const LoongArkRadioGroupItemControl: Component<
  RadioGroupItemControlProps
> = (props) => {
  return (
    <ArkRadioGroup.ItemControl {...props}>
      {props.children}
    </ArkRadioGroup.ItemControl>
  );
};

/**
 * Radio Group Item Text - 单选按钮文本
 */
export const LoongArkRadioGroupItemText: Component<RadioGroupItemTextProps> = (
  props,
) => {
  return (
    <ArkRadioGroup.ItemText {...props}>{props.children}</ArkRadioGroup.ItemText>
  );
};

/**
 * Radio Group Indicator - 单选按钮选中指示器（内部圆点）
 */
export const LoongArkRadioGroupIndicator: Component<
  RadioGroupIndicatorProps
> = (props) => {
  return (
    <ArkRadioGroup.Indicator {...props}>
      {props.children}
    </ArkRadioGroup.Indicator>
  );
};

/**
 * Radio Group Item Hidden Input - 隐藏的原生 radio input
 */
export const LoongArkRadioGroupItemHiddenInput: Component<
  RadioGroupItemHiddenInputProps
> = (props) => {
  const api = useRadioGroupContext();
  const item = useRadioGroupItemContext();
  const ref = nativeSelectionRef(
    () => ({
      radioValue: api().value,
      readOnly: String(api().getRootProps()["aria-readonly"]) === "true",
    }),
    props.ref,
  );
  return (
    <ArkRadioGroup.ItemHiddenInput
      {...props}
      ref={ref}
      disabled={item().disabled || !!props.disabled}
    />
  );
};
