import { useFieldContext } from "@ark-ui/solid/field";
import { nativeSelectionFieldDescription } from "@loongark/kit";
import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
import type { JSX } from "solid-js";
import { type Component, mergeProps, splitProps } from "solid-js";
import { nativeSelectionRef } from "../native-selection";
import {
  useCheckboxContext,
  type CheckboxHiddenInputProps,
} from "@ark-ui/solid/checkbox";
import { Checkbox } from "@ark-ui/solid/checkbox";
import type { CheckboxSize } from "@loongark/primitives";
import type { CheckboxRootProps as RootProps } from "@ark-ui/solid/checkbox";

// ========== Props 接口 ==========
export interface LoongArkCheckboxRootProps extends RootProps {
  size?: CheckboxSize;
}

export interface LoongArkCheckboxControlProps {
  size?: CheckboxSize;
  children?: JSX.Element;
}

export interface LoongArkCheckboxLabelProps {
  children?: JSX.Element;
}

export interface LoongArkCheckboxIndicatorProps {
  indeterminate?: boolean;
  children?: JSX.Element;
}

// ========== 组件实现 ==========

export const LoongArkCheckboxRoot: Component<LoongArkCheckboxRootProps> = (
  props,
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
  props,
) => {
  return <Checkbox.Label {...props} data-scope="checkbox" data-part="label" />;
};

export const LoongArkCheckboxIndicator: Component<
  LoongArkCheckboxIndicatorProps
> = (props) => {
  return (
    <Checkbox.Indicator {...props} data-scope="checkbox" data-part="indicator">
      {props.children ?? (
        <LoongArkIcon
          icon={props.indeterminate ? controlIcons.minus : controlIcons.check}
          size="sm"
        />
      )}
    </Checkbox.Indicator>
  );
};

export const LoongArkCheckboxHiddenInput: Component<
  CheckboxHiddenInputProps
> = (props) => {
  const field = useFieldContext();
  const api = useCheckboxContext();
  const ref = nativeSelectionRef(
    () => ({
      checked: api().checked,
      indeterminate: api().indeterminate,
    }),
    props.ref,
  );
  return (
    <Checkbox.HiddenInput
      {...props}
      aria-describedby={nativeSelectionFieldDescription(
        props["aria-describedby"],
        field?.(),
        api().getHiddenInputProps()["aria-invalid"],
      )}
      ref={ref}
      data-scope="checkbox"
      data-part="hidden-input"
    />
  );
};
