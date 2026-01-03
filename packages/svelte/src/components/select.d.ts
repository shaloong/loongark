import type { Component } from "svelte";
import type { SelectSize } from "@loongark/primitives";

export interface SelectRootProps {
  size?: SelectSize;
  collection: any;
  closeOnSelect?: boolean;
  composite?: boolean;
  defaultHighlightedValue?: string;
  defaultOpen?: boolean;
  defaultValue?: string[];
  deselectable?: boolean;
  disabled?: boolean;
  form?: string;
  highlightedValue?: string;
  id?: string;
  ids?: any;
  immediate?: boolean;
  invalid?: boolean;
  lazyMount?: boolean;
  loopFocus?: boolean;
  multiple?: boolean;
  name?: string;
  open?: boolean;
  positioning?: any;
  present?: boolean;
  readOnly?: boolean;
  required?: boolean;
  scrollToIndexFn?: any;
  skipAnimationOnMount?: boolean;
  unmountOnExit?: boolean;
  value?: string[];
}

export interface SelectValueTextProps {
  placeholder?: string;
}

export interface SelectItemProps {
  item?: any;
  persistFocus?: boolean;
}

export type {
  SelectRootProps,
  SelectValueTextProps,
  SelectItemProps,
};
