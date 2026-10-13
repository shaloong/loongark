
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticPaginationStyles } from "@loongark/primitives/automatic-styles/pagination";
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

export const LoongArkPaginationRoot: Component<LoongArkPaginationRootProps> = /*#__PURE__*/ withAutomaticStyles((
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
}, lkAutomaticPaginationStyles);

export const LoongArkPaginationList: Component<
  JSX.HTMLAttributes<HTMLDivElement>
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <div {...props} data-scope="pagination" data-part="list">
      {props.children}
    </div>
  );
}, lkAutomaticPaginationStyles);

export const LoongArkPaginationItem: Component<
  ArkPaginationItemProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkPagination.Item {...props} data-scope="pagination" data-part="item">
      {props.children}
    </ArkPagination.Item>
  );
}, lkAutomaticPaginationStyles);

export const LoongArkPaginationPrevTrigger: Component<
  ArkPaginationPrevTriggerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkPagination.PrevTrigger
      {...props}
      data-scope="pagination"
      data-part="prev-trigger"
    >
      {props.children}
    </ArkPagination.PrevTrigger>
  );
}, lkAutomaticPaginationStyles);

export const LoongArkPaginationNextTrigger: Component<
  ArkPaginationNextTriggerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkPagination.NextTrigger
      {...props}
      data-scope="pagination"
      data-part="next-trigger"
    >
      {props.children}
    </ArkPagination.NextTrigger>
  );
}, lkAutomaticPaginationStyles);

export const LoongArkPaginationEllipsis: Component<
  ArkPaginationEllipsisProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkPagination.Ellipsis
      {...props}
      data-scope="pagination"
      data-part="ellipsis"
    >
      {props.children}
    </ArkPagination.Ellipsis>
  );
}, lkAutomaticPaginationStyles);
