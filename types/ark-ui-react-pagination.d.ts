declare module "@ark-ui/react/pagination" {
  import React, { type ReactNode } from "react";

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
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface PaginationItemProps
    extends React.HTMLAttributes<HTMLButtonElement> {
    page?: number;
    value?: number;
    index?: number;
    disabled?: boolean;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface PaginationPrevTriggerProps
    extends React.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface PaginationNextTriggerProps
    extends React.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface PaginationEllipsisProps {
    index?: number;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface PaginationContextProps {
    children?: (details: Record<string, any>) => ReactNode;
  }

  export namespace Pagination {
    export const Root: React.FC<PaginationRootProps>;
    export const Item: React.FC<PaginationItemProps>;
    export const PrevTrigger: React.FC<PaginationPrevTriggerProps>;
    export const NextTrigger: React.FC<PaginationNextTriggerProps>;
    export const Ellipsis: React.FC<PaginationEllipsisProps>;
    export const Context: React.FC<PaginationContextProps>;
  }
}
