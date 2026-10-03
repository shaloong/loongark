/**
 * Pagination component - Solid wrapper.
 * Uses Ark UI Pagination with data attributes for styling.
 */
import { type Component, type JSX, mergeProps } from "solid-js";
import {
  Pagination as ArkPagination,
  type PaginationRootProps as ArkPaginationRootProps,
  type PaginationItemProps as ArkPaginationItemProps,
  type PaginationPrevTriggerProps as ArkPaginationPrevTriggerProps,
  type PaginationNextTriggerProps as ArkPaginationNextTriggerProps,
  type PaginationEllipsisProps as ArkPaginationEllipsisProps,
} from "@ark-ui/solid/pagination";
import type {
  PaginationOrientation,
  PaginationSize,
} from "@loongark/primitives";

export interface LoongArkPaginationRootProps extends Omit<
  ArkPaginationRootProps,
  "asChild"
> {
  size?: PaginationSize;
  orientation?: PaginationOrientation;
  children?: JSX.Element;
}

export const LoongArkPaginationRoot: Component<LoongArkPaginationRootProps> = (
  props,
) => {
  const merged = mergeProps(
    {
      size: "md" as PaginationSize,
      orientation: "horizontal" as PaginationOrientation,
    },
    props,
  );

  return (
    <ArkPagination.Root
      {...props}
      data-scope="pagination"
      data-part="root"
      data-size={merged.size}
      data-orientation={merged.orientation}
    >
      {props.children}
    </ArkPagination.Root>
  );
};

export const LoongArkPaginationList: Component<
  JSX.HTMLAttributes<HTMLDivElement>
> = (props) => {
  return (
    <div {...props} data-scope="pagination" data-part="list">
      {props.children}
    </div>
  );
};

export const LoongArkPaginationItem: Component<
  ArkPaginationItemProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkPagination.Item {...props} data-scope="pagination" data-part="item">
      {props.children}
    </ArkPagination.Item>
  );
};

export const LoongArkPaginationPrevTrigger: Component<
  ArkPaginationPrevTriggerProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkPagination.PrevTrigger
      {...props}
      data-scope="pagination"
      data-part="prev-trigger"
    >
      {props.children}
    </ArkPagination.PrevTrigger>
  );
};

export const LoongArkPaginationNextTrigger: Component<
  ArkPaginationNextTriggerProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkPagination.NextTrigger
      {...props}
      data-scope="pagination"
      data-part="next-trigger"
    >
      {props.children}
    </ArkPagination.NextTrigger>
  );
};

export const LoongArkPaginationEllipsis: Component<
  ArkPaginationEllipsisProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkPagination.Ellipsis
      {...props}
      data-scope="pagination"
      data-part="ellipsis"
    >
      {props.children}
    </ArkPagination.Ellipsis>
  );
};
