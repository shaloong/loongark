
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticFilterBarStyles } from "@shaloong/loongark-primitives/automatic-styles/filter-bar";
import { styles as lkAutomaticFilterChipStyles } from "@shaloong/loongark-primitives/automatic-styles/filter-chip";
import { styles as lkAutomaticFilterDividerStyles } from "@shaloong/loongark-primitives/automatic-styles/filter-divider";
import { type Component, type JSX, splitProps, mergeProps } from "solid-js";
import { boolAttr } from "../utils";

export interface LoongArkFilterBarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  dense?: boolean;
  align?: "start" | "center";
  children?: JSX.Element;
}

export const LoongArkFilterBar: Component<LoongArkFilterBarProps> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, rest] = splitProps(
    mergeProps({ align: "start" as const }, props),
    ["dense", "align", "children"],
  );

  return (
    <div
      {...rest}
      data-scope="filter-bar"
      data-part="root"
      data-dense={boolAttr(!!local.dense)}
      data-align={local.align === "center" ? "center" : undefined}
    >
      {local.children}
    </div>
  );
}, lkAutomaticFilterBarStyles);

export type LoongArkFilterSectionProps = JSX.HTMLAttributes<HTMLDivElement>;

const createFilterSection = (
  part: "search" | "filters" | "actions",
): Component<LoongArkFilterSectionProps> => {
  const Section: Component<LoongArkFilterSectionProps> = (props) => {
    const [local, rest] = splitProps(props, ["children"]);
    return (
      <div {...rest} data-scope="filter-bar" data-part={part}>
        {local.children}
      </div>
    );
  };

  return Section;
};

export const LoongArkFilterBarSearch = /*#__PURE__*/ withAutomaticStyles(createFilterSection("search"), lkAutomaticFilterBarStyles);
export const LoongArkFilterBarFilters = /*#__PURE__*/ withAutomaticStyles(createFilterSection("filters"), lkAutomaticFilterBarStyles);
export const LoongArkFilterBarActions = /*#__PURE__*/ withAutomaticStyles(createFilterSection("actions"), lkAutomaticFilterBarStyles);

export const LoongArkFilterDivider: Component<
  Omit<JSX.HTMLAttributes<HTMLSpanElement>, "children">
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <span
      {...props}
      role="presentation"
      aria-hidden="true"
      data-scope="filter-bar"
      data-part="divider"
    />
  );
}, lkAutomaticFilterDividerStyles);

export interface LoongArkFilterChipProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  type?: "button" | "submit" | "reset";
  children?: JSX.Element;
}

export const LoongArkFilterChip: Component<LoongArkFilterChipProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const [local, rest] = splitProps(
    mergeProps({ type: "button" as const }, props),
    ["active", "type", "children"],
  );

  return (
    <button
      {...rest}
      type={local.type}
      data-scope="filter-bar"
      data-part="chip"
      data-active={boolAttr(!!local.active)}
      aria-pressed={local.active ? "true" : "false"}
    >
      {local.children}
    </button>
  );
}, lkAutomaticFilterChipStyles);
