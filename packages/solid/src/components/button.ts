import { ark } from "@ark-ui/solid";
import type { ButtonPrimitiveProps } from "@loongark/primitives";
import { mergeProps } from "solid-js";
import type { Component } from "solid-js";
import { boolAttr } from "../utils";

export type ButtonVariant = NonNullable<ButtonPrimitiveProps["variant"]>;
export type ButtonSize = NonNullable<ButtonPrimitiveProps["size"]>;

export interface LoongArkButtonProps extends Partial<ButtonPrimitiveProps> {
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  children?: unknown;
  [key: string]: unknown;
}

const buttonDefaults: Required<
  Pick<
    LoongArkButtonProps,
    "variant" | "size" | "block" | "loading" | "disabled" | "type"
  >
> = {
  variant: "solid",
  size: "md",
  block: false,
  loading: false,
  disabled: false,
  type: "button",
};

const buildButtonProps = (props: LoongArkButtonProps) => {
  const merged = mergeProps(buttonDefaults, props);
  const { variant, size, block, loading, disabled, type, children, ...rest } =
    merged;
  const isInteractiveDisabled = disabled || loading;

  return {
    ...rest,
    type,
    disabled: isInteractiveDisabled,
    children,
    "data-scope": "button",
    "data-part": "root",
    "data-variant": variant,
    "data-size": size,
    "data-block": boolAttr(block),
    "data-loading": boolAttr(loading),
    "aria-disabled": isInteractiveDisabled ? "true" : undefined,
    "aria-busy": loading ? "true" : undefined,
  };
};

export const LoongArkButton: Component<LoongArkButtonProps> = (props) =>
  ark.button(buildButtonProps(props));
