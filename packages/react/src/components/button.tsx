import { dataProps } from "../data-props";
import { ark } from "@ark-ui/react/factory";
import type { ButtonPrimitiveProps } from "@loongark/primitives";
import { createElement, forwardRef } from "react";
import type { ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonVariant = NonNullable<ButtonPrimitiveProps["variant"]>;
export type ButtonSize = NonNullable<ButtonPrimitiveProps["size"]>;

export interface LoongArkButtonProps
  extends
    Partial<ButtonPrimitiveProps>,
    ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const LoongArkButton = forwardRef<
  HTMLButtonElement,
  LoongArkButtonProps
>(
  (
    {
      children,
      variant = "solid",
      size = "md",
      block = false,
      loading = false,
      disabled = false,
      type = "button",
      ...rest
    },
    ref,
  ) => {
    const isInteractiveDisabled = disabled || loading;

    return createElement(
      ark.button,
      dataProps({
        ...rest,
        ref,
        type,
        disabled: isInteractiveDisabled,
        "data-scope": "button",
        "data-part": "root",
        "data-variant": variant,
        "data-size": size,
        "data-block": block ? "true" : undefined,
        "data-loading": loading ? "true" : undefined,
        "aria-disabled": isInteractiveDisabled || undefined,
        "aria-busy": loading || rest["aria-busy"],
      }),
      children,
    );
  },
);

LoongArkButton.displayName = "LoongArkButton";
