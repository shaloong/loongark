import { ark } from "@ark-ui/react";
import type { ButtonPrimitiveProps } from "@loongark/primitives";
import { createElement, forwardRef } from "react";
import type { ReactNode } from "react";

export type ButtonVariant = NonNullable<ButtonPrimitiveProps["variant"]>;
export type ButtonSize = NonNullable<ButtonPrimitiveProps["size"]>;

export interface LoongArkButtonProps extends Partial<ButtonPrimitiveProps> {
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  [key: string]: unknown;
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
    ref
  ) => {
    const isInteractiveDisabled = disabled || loading;

    return createElement(
      ark.button,
      {
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
        "aria-busy": loading || undefined,
      },
      children
    );
  }
);

LoongArkButton.displayName = "LoongArkButton";
