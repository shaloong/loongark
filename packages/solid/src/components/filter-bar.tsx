import { type Component, type JSX, splitProps, mergeProps } from "solid-js";
import { boolAttr } from "../utils";

export interface LoongArkFilterBarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  dense?: boolean;
  align?: "start" | "center";
  children?: JSX.Element;
}

export const LoongArkFilterBar: Component<LoongArkFilterBarProps> = (props) => {
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
};

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

export const LoongArkFilterBarSearch = createFilterSection("search");
export const LoongArkFilterBarFilters = createFilterSection("filters");
export const LoongArkFilterBarActions = createFilterSection("actions");

export const LoongArkFilterDivider: Component<
  Omit<JSX.HTMLAttributes<HTMLSpanElement>, "children">
> = (props) => {
  return (
    <span
      {...props}
      role="presentation"
      aria-hidden="true"
      data-scope="filter-bar"
      data-part="divider"
    />
  );
};

export interface LoongArkFilterChipProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  type?: "button" | "submit" | "reset";
  children?: JSX.Element;
}

export const LoongArkFilterChip: Component<LoongArkFilterChipProps> = (
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
};
