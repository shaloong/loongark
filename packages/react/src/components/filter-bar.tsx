import { ark } from "@ark-ui/react";
import { forwardRef, ReactNode } from "react";

export interface LoongArkFilterBarProps extends Record<string, unknown> {
  dense?: boolean;
  align?: "start" | "center";
  children?: ReactNode;
}

export const LoongArkFilterBar = forwardRef<
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
});

LoongArkFilterBar.displayName = "LoongArkFilterBar";

export interface LoongArkFilterSectionProps extends Record<string, unknown> {
  children?: ReactNode;
}

export const LoongArkFilterBarSearch = forwardRef<
  HTMLDivElement,
  LoongArkFilterSectionProps
>(({ children, ...rest }, ref) => (
  <ark.div {...rest} ref={ref} data-scope="filter-bar" data-part="search">
    {children}
  </ark.div>
));

LoongArkFilterBarSearch.displayName = "LoongArkFilterBarSearch";

export const LoongArkFilterBarFilters = forwardRef<
  HTMLDivElement,
  LoongArkFilterSectionProps
>(({ children, ...rest }, ref) => (
  <ark.div {...rest} ref={ref} data-scope="filter-bar" data-part="filters">
    {children}
  </ark.div>
));

LoongArkFilterBarFilters.displayName = "LoongArkFilterBarFilters";

export const LoongArkFilterBarActions = forwardRef<
  HTMLDivElement,
  LoongArkFilterSectionProps
>(({ children, ...rest }, ref) => (
  <ark.div {...rest} ref={ref} data-scope="filter-bar" data-part="actions">
    {children}
  </ark.div>
));

LoongArkFilterBarActions.displayName = "LoongArkFilterBarActions";

export const LoongArkFilterDivider = forwardRef<
  HTMLSpanElement,
  Record<string, unknown>
>((props, ref) => (
  <ark.span
    {...props}
    ref={ref}
    role="presentation"
    aria-hidden="true"
    data-scope="filter-bar"
    data-part="divider"
  />
));

LoongArkFilterDivider.displayName = "LoongArkFilterDivider";

export interface LoongArkFilterChipProps extends Record<string, unknown> {
  active?: boolean;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
}

export const LoongArkFilterChip = forwardRef<
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
));

LoongArkFilterChip.displayName = "LoongArkFilterChip";
