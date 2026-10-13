"use client";
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticFilterBarStyles } from "@loongark/primitives/automatic-styles/filter-bar";
import { styles as lkAutomaticFilterChipStyles } from "@loongark/primitives/automatic-styles/filter-chip";
import { styles as lkAutomaticFilterDividerStyles } from "@loongark/primitives/automatic-styles/filter-divider";


import type {
  HTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";
import { ark } from "@ark-ui/react";
import { forwardRef, ReactNode } from "react";

export interface LoongArkFilterBarProps extends HTMLAttributes<HTMLDivElement> {
  dense?: boolean;
  align?: "start" | "center";
  children?: ReactNode;
}

export const LoongArkFilterBar = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkFilterBarProps
>(({ dense, align = "start", ...rest }, ref) => {
  return (
    <ark.div
      {...rest}
      ref={ref}
      data-scope="filter-bar"
      data-part="root"
      data-dense={dense ? "true" : undefined}
      data-align={align === "center" ? "center" : undefined}
    />
  );
}), lkAutomaticFilterBarStyles);

LoongArkFilterBar.displayName = "LoongArkFilterBar";

export interface LoongArkFilterSectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const LoongArkFilterBarSearch = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkFilterSectionProps
>(({ children, ...rest }, ref) => (
  <ark.div {...rest} ref={ref} data-scope="filter-bar" data-part="search">
    {children}
  </ark.div>
)), lkAutomaticFilterBarStyles);

LoongArkFilterBarSearch.displayName = "LoongArkFilterBarSearch";

export const LoongArkFilterBarFilters = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkFilterSectionProps
>(({ children, ...rest }, ref) => (
  <ark.div {...rest} ref={ref} data-scope="filter-bar" data-part="filters">
    {children}
  </ark.div>
)), lkAutomaticFilterBarStyles);

LoongArkFilterBarFilters.displayName = "LoongArkFilterBarFilters";

export const LoongArkFilterBarActions = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLDivElement,
  LoongArkFilterSectionProps
>(({ children, ...rest }, ref) => (
  <ark.div {...rest} ref={ref} data-scope="filter-bar" data-part="actions">
    {children}
  </ark.div>
)), lkAutomaticFilterBarStyles);

LoongArkFilterBarActions.displayName = "LoongArkFilterBarActions";

export const LoongArkFilterDivider = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>((props, ref) => (
  <ark.span
    {...props}
    ref={ref}
    role="presentation"
    aria-hidden="true"
    data-scope="filter-bar"
    data-part="divider"
  />
)), lkAutomaticFilterDividerStyles);

LoongArkFilterDivider.displayName = "LoongArkFilterDivider";

export interface LoongArkFilterChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
}

export const LoongArkFilterChip = /*#__PURE__*/ withAutomaticStyles(forwardRef<
  HTMLButtonElement,
  LoongArkFilterChipProps
>(({ active = false, type = "button", ...rest }, ref) => (
  <ark.button
    {...rest}
    ref={ref}
    type={type}
    data-scope="filter-bar"
    data-part="chip"
    data-active={active ? "true" : undefined}
    aria-pressed={active ? "true" : "false"}
  />
)), lkAutomaticFilterChipStyles);

LoongArkFilterChip.displayName = "LoongArkFilterChip";
