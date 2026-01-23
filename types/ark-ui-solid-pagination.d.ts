declare module "@ark-ui/solid/pagination" {
  import type { Component, JSX } from "solid-js";

  export interface PaginationRootProps {
    count?: number;
    pageSize?: number;
    siblingCount?: number;
    boundaryCount?: number;
    page?: number;
    defaultPage?: number;
    disabled?: boolean;
    id?: string;
    onPageChange?: (details: { page: number }) => void;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface PaginationItemProps
    extends JSX.HTMLAttributes<HTMLButtonElement> {
    page?: number;
    value?: number;
    index?: number;
    disabled?: boolean;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface PaginationPrevTriggerProps
    extends JSX.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface PaginationNextTriggerProps
    extends JSX.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface PaginationEllipsisProps {
    index?: number;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface PaginationContextProps {
    children?: (details: Record<string, any>) => JSX.Element;
  }

  export const Pagination: {
    Root: Component<PaginationRootProps>;
    Item: Component<PaginationItemProps>;
    PrevTrigger: Component<PaginationPrevTriggerProps>;
    NextTrigger: Component<PaginationNextTriggerProps>;
    Ellipsis: Component<PaginationEllipsisProps>;
    Context: Component<PaginationContextProps>;
  };
}
