import { type Component, type JSX } from "solid-js";
import { boolAttr } from "../utils";

export interface LoongArkFilterBarProps
  extends JSX.HTMLAttributes<HTMLDivElement> {
  dense?: boolean;
  align?: "start" | "center";
  children?: JSX.Element;
}

export const LoongArkFilterBar: Component<LoongArkFilterBarProps> = (props) => {
  const { dense, align = "start", children, ...rest } = props;

  return (
    <div
      {...rest}
      data-scope="filter-bar"
      data-part="root"
      data-dense={boolAttr(!!dense)}
      data-align={align === "center" ? "center" : undefined}
    >
      {children}
    </div>
  );
};

export type LoongArkFilterSectionProps = JSX.HTMLAttributes<HTMLDivElement>;

const createFilterSection = (
  part: "search" | "filters" | "actions"
): Component<LoongArkFilterSectionProps> => {
  const Section: Component<LoongArkFilterSectionProps> = (props) => {
    const { children, ...rest } = props;
    return (
      <div {...rest} data-scope="filter-bar" data-part={part}>
        {children}
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

export interface LoongArkFilterChipProps
  extends JSX.HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  type?: "button" | "submit" | "reset";
  children?: JSX.Element;
}

export const LoongArkFilterChip: Component<LoongArkFilterChipProps> = (
  props
) => {
  const { active, type = "button", children, ...rest } = props;

  return (
    <button
      {...rest}
      type={type}
      data-scope="filter-bar"
      data-part="chip"
      data-active={boolAttr(!!active)}
      aria-pressed={active ? "true" : "false"}
    >
      {children}
    </button>
  );
};
