/**
 * Rating Group component - Solid wrapper.
 * Uses Ark UI Rating Group with data attributes for styling.
 */
import { type Component, type JSX, mergeProps, splitProps } from "solid-js";
import {
  RatingGroup as ArkRatingGroup,
  type RatingGroupRootProps as ArkRatingGroupRootProps,
  type RatingGroupLabelProps as ArkRatingGroupLabelProps,
  type RatingGroupControlProps as ArkRatingGroupControlProps,
  type RatingGroupItemProps as ArkRatingGroupItemProps,
  type RatingGroupHiddenInputProps as ArkRatingGroupHiddenInputProps,
} from "@ark-ui/solid/rating-group";
import { useRatingGroup } from "./use-rating";
import type { RatingGroupSize } from "@loongark/primitives";

export interface LoongArkRatingGroupRootProps extends Omit<
  ArkRatingGroupRootProps,
  "asChild"
> {
  size?: RatingGroupSize;
  disabled?: boolean;
  children?: JSX.Element;
}

export const LoongArkRatingGroupRoot: Component<
  LoongArkRatingGroupRootProps
> = (props) => {
  const merged = mergeProps(
    { size: "md" as RatingGroupSize, disabled: false },
    props,
  );
  const [local, others] = splitProps(merged, ["children", "size", "disabled"]);

  const [controls, dom] = splitProps(others, [
    "allowHalf",
    "autoFocus",
    "count",
    "defaultValue",
    "form",
    "id",
    "ids",
    "name",
    "onHoverChange",
    "onValueChange",
    "readOnly",
    "required",
    "translations",
    "value",
  ]);
  const api = useRatingGroup(
    mergeProps(controls, {
      get disabled() {
        return local.disabled;
      },
    }),
  );
  return (
    <ArkRatingGroup.RootProvider
      {...dom}
      value={api}
      data-scope="rating-group"
      data-part="root"
      data-size={local.size}
      data-disabled={local.disabled ? "true" : undefined}
    >
      {local.children}
    </ArkRatingGroup.RootProvider>
  );
};

export interface LoongArkRatingGroupLabelProps extends Omit<
  ArkRatingGroupLabelProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkRatingGroupLabel: Component<
  LoongArkRatingGroupLabelProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkRatingGroup.Label
      {...others}
      data-scope="rating-group"
      data-part="label"
    >
      {local.children}
    </ArkRatingGroup.Label>
  );
};

export interface LoongArkRatingGroupControlProps extends Omit<
  ArkRatingGroupControlProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkRatingGroupControl: Component<
  LoongArkRatingGroupControlProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkRatingGroup.Control
      {...others}
      data-scope="rating-group"
      data-part="control"
    >
      {local.children}
    </ArkRatingGroup.Control>
  );
};

export interface LoongArkRatingGroupItemProps extends Omit<
  ArkRatingGroupItemProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkRatingGroupItem: Component<
  LoongArkRatingGroupItemProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkRatingGroup.Item {...others} data-scope="rating-group" data-part="item">
      {local.children}
    </ArkRatingGroup.Item>
  );
};

export interface LoongArkRatingGroupHiddenInputProps extends Omit<
  ArkRatingGroupHiddenInputProps,
  "asChild"
> {}

export const LoongArkRatingGroupHiddenInput: Component<
  LoongArkRatingGroupHiddenInputProps
> = (props) => {
  return (
    <ArkRatingGroup.HiddenInput
      {...props}
      data-scope="rating-group"
      data-part="hidden-input"
    />
  );
};
