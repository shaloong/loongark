import React, { forwardRef } from "react";
import { Checkbox } from "@ark-ui/react/checkbox";
import type { CheckboxSize } from "@loongark/primitives";
import type {
  RootProps,
  ControlProps,
  LabelProps,
  IndicatorProps,
  HiddenInputProps,
} from "@ark-ui/react/checkbox";

// ========== Props 接口 ==========
export interface LoongArkCheckboxRootProps extends Omit<RootProps, "asChild"> {
  size?: CheckboxSize;
}

export interface LoongArkCheckboxControlProps
  extends Omit<ControlProps, "asChild"> {
  size?: CheckboxSize;
}

export interface LoongArkCheckboxLabelProps
  extends Omit<LabelProps, "asChild"> {}

export interface LoongArkCheckboxIndicatorProps
  extends Omit<IndicatorProps, "asChild"> {}

export interface LoongArkCheckboxHiddenInputProps
  extends Omit<HiddenInputProps, "asChild"> {}

// ========== 组件实现 ==========

export const LoongArkCheckboxRoot = forwardRef<
  HTMLLabelElement,
  LoongArkCheckboxRootProps
>(({ size = "md", ...props }, ref) => {
  return (
    <Checkbox.Root
      ref={ref}
      {...props}
      data-scope="checkbox"
      data-part="root"
      data-size={size}
    />
  );
});

LoongArkCheckboxRoot.displayName = "LoongArkCheckboxRoot";

export const LoongArkCheckboxControl = forwardRef<
  HTMLDivElement,
  LoongArkCheckboxControlProps
>(({ size = "md", ...props }, ref) => {
  return (
    <Checkbox.Control
      ref={ref}
      {...props}
      data-scope="checkbox"
      data-part="control"
      data-size={size}
    />
  );
});

LoongArkCheckboxControl.displayName = "LoongArkCheckboxControl";

export const LoongArkCheckboxLabel = forwardRef<
  HTMLSpanElement,
  LoongArkCheckboxLabelProps
>((props, ref) => {
  return (
    <Checkbox.Label
      ref={ref}
      {...props}
      data-scope="checkbox"
      data-part="label"
    />
  );
});

LoongArkCheckboxLabel.displayName = "LoongArkCheckboxLabel";

export const LoongArkCheckboxIndicator = forwardRef<
  HTMLDivElement,
  LoongArkCheckboxIndicatorProps
>(({ children, ...props }, ref) => {
  return (
    <Checkbox.Indicator
      ref={ref}
      {...props}
      data-scope="checkbox"
      data-part="indicator"
    >
      {children || (
        <svg
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Checkbox.Indicator>
  );
});

LoongArkCheckboxIndicator.displayName = "LoongArkCheckboxIndicator";

export const LoongArkCheckboxHiddenInput = forwardRef<
  HTMLInputElement,
  LoongArkCheckboxHiddenInputProps
>((props, ref) => {
  return (
    <Checkbox.HiddenInput
      ref={ref}
      {...props}
      data-scope="checkbox"
      data-part="hidden-input"
    />
  );
});

LoongArkCheckboxHiddenInput.displayName = "LoongArkCheckboxHiddenInput";
