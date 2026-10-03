import type { JSX } from "solid-js";
import { ark } from "@ark-ui/solid";
import type { ButtonPrimitiveProps } from "@loongark/primitives";
import { mergeProps, splitProps } from "solid-js";
import type { Component } from "solid-js";
import { boolAttr } from "../utils";

export type ButtonVariant = NonNullable<ButtonPrimitiveProps["variant"]>;
export type ButtonSize = NonNullable<ButtonPrimitiveProps["size"]>;

export interface LoongArkButtonProps
  extends
    Partial<ButtonPrimitiveProps>,
    JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  children?: JSX.Element;
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
  const [local, rest] = splitProps(merged, [
    "variant",
    "size",
    "block",
    "loading",
    "disabled",
    "type",
  ]);
  return mergeProps(rest, {
    get type() {
      return local.type;
    },
    get disabled() {
      return local.disabled || local.loading;
    },
    "data-scope": "button",
    "data-part": "root",
    get "data-variant"() {
      return local.variant;
    },
    get "data-size"() {
      return local.size;
    },
    get "data-block"() {
      return boolAttr(local.block);
    },
    get "data-loading"() {
      return local.loading || undefined;
    },
    get "aria-disabled"() {
      return local.disabled || local.loading || undefined;
    },
    get "aria-busy"() {
      return boolAttr(local.loading);
    },
  });
};

export const LoongArkButton: Component<LoongArkButtonProps> = (props) =>
  ark.button(buildButtonProps(props));
