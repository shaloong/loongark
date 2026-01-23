/**
 * Pagination component - React wrapper.
 * Uses Ark UI Pagination with data attributes for styling.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Pagination } from "@ark-ui/react/pagination";
import type {
  PaginationOrientation,
  PaginationSize,
} from "@loongark/primitives";

type ArkPaginationRootProps = ComponentPropsWithoutRef<typeof Pagination.Root>;
type ArkPaginationItemProps = ComponentPropsWithoutRef<typeof Pagination.Item>;
type ArkPaginationPrevTriggerProps = ComponentPropsWithoutRef<
  typeof Pagination.PrevTrigger
>;
type ArkPaginationNextTriggerProps = ComponentPropsWithoutRef<
  typeof Pagination.NextTrigger
>;
type ArkPaginationEllipsisProps = ComponentPropsWithoutRef<
  typeof Pagination.Ellipsis
>;

export interface LoongArkPaginationRootProps
  extends Omit<ArkPaginationRootProps, "asChild"> {
  size?: PaginationSize;
  orientation?: PaginationOrientation;
  children?: ReactNode;
}

export interface LoongArkPaginationListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface LoongArkPaginationItemProps
  extends Omit<ArkPaginationItemProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkPaginationPrevTriggerProps
  extends Omit<ArkPaginationPrevTriggerProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkPaginationNextTriggerProps
  extends Omit<ArkPaginationNextTriggerProps, "asChild"> {
  children?: ReactNode;
}

export interface LoongArkPaginationEllipsisProps
  extends Omit<ArkPaginationEllipsisProps, "asChild"> {
  children?: ReactNode;
}

export const LoongArkPaginationRoot = forwardRef<
  HTMLDivElement,
  LoongArkPaginationRootProps
>(({ children, size = "md", orientation = "horizontal", ...props }, ref) => {
  return (
    <Pagination.Root
      {...props}
      ref={ref}
      data-scope="pagination"
      data-part="root"
      data-size={size}
      data-orientation={orientation}
    >
      {children}
    </Pagination.Root>
  );
});

LoongArkPaginationRoot.displayName = "LoongArkPaginationRoot";

export const LoongArkPaginationList = forwardRef<
  HTMLDivElement,
  LoongArkPaginationListProps
>(({ children, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      data-scope="pagination"
      data-part="list"
    >
      {children}
    </div>
  );
});

LoongArkPaginationList.displayName = "LoongArkPaginationList";

export const LoongArkPaginationItem = forwardRef<
  HTMLButtonElement,
  LoongArkPaginationItemProps
>(({ children, ...props }, ref) => {
  return (
    <Pagination.Item
      {...props}
      ref={ref}
      data-scope="pagination"
      data-part="item"
    >
      {children}
    </Pagination.Item>
  );
});

LoongArkPaginationItem.displayName = "LoongArkPaginationItem";

export const LoongArkPaginationPrevTrigger = forwardRef<
  HTMLButtonElement,
  LoongArkPaginationPrevTriggerProps
>(({ children, ...props }, ref) => {
  return (
    <Pagination.PrevTrigger
      {...props}
      ref={ref}
      data-scope="pagination"
      data-part="prev-trigger"
    >
      {children}
    </Pagination.PrevTrigger>
  );
});

LoongArkPaginationPrevTrigger.displayName = "LoongArkPaginationPrevTrigger";

export const LoongArkPaginationNextTrigger = forwardRef<
  HTMLButtonElement,
  LoongArkPaginationNextTriggerProps
>(({ children, ...props }, ref) => {
  return (
    <Pagination.NextTrigger
      {...props}
      ref={ref}
      data-scope="pagination"
      data-part="next-trigger"
    >
      {children}
    </Pagination.NextTrigger>
  );
});

LoongArkPaginationNextTrigger.displayName = "LoongArkPaginationNextTrigger";

export const LoongArkPaginationEllipsis = forwardRef<
  HTMLSpanElement,
  LoongArkPaginationEllipsisProps
>(({ children, ...props }, ref) => {
  return (
    <Pagination.Ellipsis
      {...props}
      ref={ref}
      data-scope="pagination"
      data-part="ellipsis"
    >
      {children}
    </Pagination.Ellipsis>
  );
});

LoongArkPaginationEllipsis.displayName = "LoongArkPaginationEllipsis";
