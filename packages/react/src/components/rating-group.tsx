/**
 * Rating Group component - React wrapper.
 * Uses Ark UI Rating Group with data attributes for styling.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { RatingGroup } from "@ark-ui/react/rating-group";
import type { RatingGroupSize } from "@loongark/primitives";

type ArkRatingGroupRootProps = ComponentPropsWithoutRef<typeof RatingGroup.Root>;
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

export interface LoongArkRatingGroupRootProps
  extends Omit<ArkRatingGroupRootProps, "asChild"> {
  size?: RatingGroupSize;
  disabled?: boolean;
  children?: ReactNode;
}

export const LoongArkRatingGroupRoot = forwardRef<
  HTMLDivElement,
  LoongArkRatingGroupRootProps
>(({ size = "md", disabled = false, children, ...props }, ref) => {
  return (
    <RatingGroup.Root
      {...props}
      ref={ref}
      disabled={disabled}
      data-scope="rating-group"
      data-part="root"
      data-size={size}
      data-disabled={disabled ? "true" : undefined}
    >
      {children}
    </RatingGroup.Root>
  );
});

LoongArkRatingGroupRoot.displayName = "LoongArkRatingGroupRoot";

export const LoongArkRatingGroupLabel = forwardRef<
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
});

LoongArkRatingGroupLabel.displayName = "LoongArkRatingGroupLabel";

export const LoongArkRatingGroupControl = forwardRef<
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
});

LoongArkRatingGroupControl.displayName = "LoongArkRatingGroupControl";

export const LoongArkRatingGroupItem = forwardRef<
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
});

LoongArkRatingGroupItem.displayName = "LoongArkRatingGroupItem";

export const LoongArkRatingGroupHiddenInput = forwardRef<
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
});

LoongArkRatingGroupHiddenInput.displayName = "LoongArkRatingGroupHiddenInput";
