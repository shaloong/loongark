"use client";
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticRatingGroupStyles } from "@shaloong/loongark-primitives/automatic-styles/rating-group";


/**
 * Rating Group component - React wrapper.
 * Uses Ark UI Rating Group with data attributes for styling.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { RatingGroup } from "@ark-ui/react/rating-group";
import { useRatingGroup } from "./use-rating";
import type { RatingGroupSize } from "@shaloong/loongark-primitives";

type ArkRatingGroupRootProps = ComponentPropsWithoutRef<
  typeof RatingGroup.Root
>;
type ArkRatingGroupLabelProps = ComponentPropsWithoutRef<
  typeof RatingGroup.Label
>;
type ArkRatingGroupControlProps = ComponentPropsWithoutRef<
  typeof RatingGroup.Control
>;
type ArkRatingGroupItemProps = ComponentPropsWithoutRef<
  typeof RatingGroup.Item
>;
type ArkRatingGroupHiddenInputProps = ComponentPropsWithoutRef<
  typeof RatingGroup.HiddenInput
>;

export interface LoongArkRatingGroupRootProps extends Omit<
  ArkRatingGroupRootProps,
  "asChild"
> {
  size?: RatingGroupSize;
  disabled?: boolean;
  children?: ReactNode;
}

export const LoongArkRatingGroupRoot = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkRatingGroupRootProps
>(({ size = "md", disabled = false, children, ...props }, ref) => {
  const {
    allowHalf,
    autoFocus,
    count,
    defaultValue,
    dir,
    form,
    id,
    ids,
    name,
    onHoverChange,
    onValueChange,
    readOnly,
    required,
    translations,
    value,
    ...dom
  } = props;
  const api = useRatingGroup({
    allowHalf,
    autoFocus,
    count,
    defaultValue,
    form,
    id,
    ids,
    name,
    onHoverChange,
    onValueChange,
    readOnly,
    required,
    translations,
    value,
    disabled,
  });
  return (
    <RatingGroup.RootProvider
      {...dom}
      value={api}
      dir={dir}
      ref={ref}
      data-scope="rating-group"
      data-part="root"
      data-size={size}
      data-disabled={disabled ? "true" : undefined}
    >
      {children}
    </RatingGroup.RootProvider>
  );
}), lkAutomaticRatingGroupStyles);

LoongArkRatingGroupRoot.displayName = "LoongArkRatingGroupRoot";

export const LoongArkRatingGroupLabel = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLLabelElement,
  ArkRatingGroupLabelProps
>((props, ref) => {
  return (
    <RatingGroup.Label
      {...props}
      ref={ref}
      data-scope="rating-group"
      data-part="label"
    />
  );
}), lkAutomaticRatingGroupStyles);

LoongArkRatingGroupLabel.displayName = "LoongArkRatingGroupLabel";

export const LoongArkRatingGroupControl = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  ArkRatingGroupControlProps
>((props, ref) => {
  return (
    <RatingGroup.Control
      {...props}
      ref={ref}
      data-scope="rating-group"
      data-part="control"
    />
  );
}), lkAutomaticRatingGroupStyles);

LoongArkRatingGroupControl.displayName = "LoongArkRatingGroupControl";

export const LoongArkRatingGroupItem = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLSpanElement,
  ArkRatingGroupItemProps
>((props, ref) => {
  return (
    <RatingGroup.Item
      {...props}
      ref={ref}
      data-scope="rating-group"
      data-part="item"
    />
  );
}), lkAutomaticRatingGroupStyles);

LoongArkRatingGroupItem.displayName = "LoongArkRatingGroupItem";

export const LoongArkRatingGroupHiddenInput = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLInputElement,
  ArkRatingGroupHiddenInputProps
>((props, ref) => {
  return (
    <RatingGroup.HiddenInput
      {...props}
      ref={ref}
      data-scope="rating-group"
      data-part="hidden-input"
    />
  );
}), lkAutomaticRatingGroupStyles);

LoongArkRatingGroupHiddenInput.displayName = "LoongArkRatingGroupHiddenInput";
