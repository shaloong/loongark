declare module "@ark-ui/vue/pagination" {
  import type { DefineComponent } from "vue";

  export const PaginationRoot: DefineComponent<any>;
  export const PaginationItem: DefineComponent<any>;
  export const PaginationPrevTrigger: DefineComponent<any>;
  export const PaginationNextTrigger: DefineComponent<any>;
  export const PaginationEllipsis: DefineComponent<any>;
  export const Pagination: {
    Root: typeof PaginationRoot;
    Item: typeof PaginationItem;
    PrevTrigger: typeof PaginationPrevTrigger;
    NextTrigger: typeof PaginationNextTrigger;
    Ellipsis: typeof PaginationEllipsis;
  };
}
