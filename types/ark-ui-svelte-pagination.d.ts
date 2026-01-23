declare module "@ark-ui/svelte/pagination" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

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
    asChild?: boolean;
  }

  export interface PaginationItemProps {
    page?: number;
    value?: number;
    index?: number;
    disabled?: boolean;
    asChild?: boolean;
  }

  export interface PaginationPrevTriggerProps {
    disabled?: boolean;
    asChild?: boolean;
  }

  export interface PaginationNextTriggerProps {
    disabled?: boolean;
    asChild?: boolean;
  }

  export interface PaginationEllipsisProps {
    index?: number;
    asChild?: boolean;
  }

  export const Pagination: {
    Root: SvelteComponent<PaginationRootProps>;
    Item: SvelteComponent<PaginationItemProps>;
    PrevTrigger: SvelteComponent<PaginationPrevTriggerProps>;
    NextTrigger: SvelteComponent<PaginationNextTriggerProps>;
    Ellipsis: SvelteComponent<PaginationEllipsisProps>;
  };
}
