import { type Component, mergeProps, splitProps } from "solid-js";
import { Checkbox } from "@ark-ui/solid/checkbox";
import type { CheckboxSize } from "@loongark/primitives";
import type { RootProps } from "@ark-ui/solid/checkbox";

// ========== Props 接口 ==========
export interface LoongArkCheckboxRootProps extends RootProps {
  size?: CheckboxSize;
}

export interface LoongArkCheckboxControlProps {
  size?: CheckboxSize;
  children?: any;
}

export interface LoongArkCheckboxLabelProps {
  children?: any;
}

export interface LoongArkCheckboxIndicatorProps {
  indeterminate?: boolean;
  children?: any;
}

// ========== 组件实现 ==========

export const LoongArkCheckboxRoot: Component<LoongArkCheckboxRootProps> = (
  props
) => {
  const merged = mergeProps({ size: "md" as CheckboxSize }, props);
  const [local, others] = splitProps(merged, ["size"]);

  return (
    <Checkbox.Root
      {...others}
      data-scope="checkbox"
      data-part="root"
      data-size={local.size}
    />
  );
};

export const LoongArkCheckboxControl: Component<
  LoongArkCheckboxControlProps
> = (props) => {
  const merged = mergeProps({ size: "md" as CheckboxSize }, props);
  const [local, others] = splitProps(merged, ["size"]);

  return (
    <Checkbox.Control
      {...others}
      data-scope="checkbox"
      data-part="control"
      data-size={local.size}
    />
  );
};

export const LoongArkCheckboxLabel: Component<LoongArkCheckboxLabelProps> = (
  props
) => {
  return <Checkbox.Label {...props} data-scope="checkbox" data-part="label" />;
};

export const LoongArkCheckboxIndicator: Component<
  LoongArkCheckboxIndicatorProps
> = (props) => {
  return (
    <Checkbox.Indicator
      {...props}
      data-scope="checkbox"
      data-part="indicator"
    />
  );
};

export const LoongArkCheckboxHiddenInput: Component = (props) => {
  return (
    <Checkbox.HiddenInput
      {...props}
      data-scope="checkbox"
      data-part="hidden-input"
    />
  );
};
