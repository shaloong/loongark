/**
 * Pagination component - Vue wrapper.
 * Uses Ark UI Pagination with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { Pagination as ArkPagination } from "@ark-ui/vue/pagination";
import type {
  PaginationOrientation,
  PaginationSize,
} from "@loongark/primitives";

export const LoongArkPaginationRoot = defineComponent({
  name: "LoongArkPaginationRoot",
  props: {
    size: {
      type: String as PropType<PaginationSize>,
      default: "md",
    },
    orientation: {
      type: String as PropType<PaginationOrientation>,
      default: "horizontal",
    },
    count: {
      type: Number as PropType<number>,
    },
    pageSize: {
      type: Number as PropType<number>,
    },
    siblingCount: {
      type: Number as PropType<number>,
    },
    boundaryCount: {
      type: Number as PropType<number>,
    },
    page: {
      type: Number as PropType<number>,
    },
    defaultPage: {
      type: Number as PropType<number>,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
    },
    id: {
      type: String as PropType<string>,
    },
    onPageChange: {
      type: Function as PropType<(details: { page: number }) => void>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkPagination.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "pagination",
          "data-part": "root",
          "data-size": props.size,
          "data-orientation": props.orientation,
        },
        slots
      );
  },
});

export const LoongArkPaginationList = defineComponent({
  name: "LoongArkPaginationList",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          "data-scope": "pagination",
          "data-part": "list",
        },
        slots
      );
  },
});

export const LoongArkPaginationItem = defineComponent({
  name: "LoongArkPaginationItem",
  props: {
    page: {
      type: Number as PropType<number>,
    },
    value: {
      type: Number as PropType<number>,
    },
    index: {
      type: Number as PropType<number>,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkPagination.Item,
        {
          ...attrs,
          ...props,
          "data-scope": "pagination",
          "data-part": "item",
        },
        slots
      );
  },
});

export const LoongArkPaginationPrevTrigger = defineComponent({
  name: "LoongArkPaginationPrevTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkPagination.PrevTrigger,
        {
          ...attrs,
          "data-scope": "pagination",
          "data-part": "prev-trigger",
        },
        slots
      );
  },
});

export const LoongArkPaginationNextTrigger = defineComponent({
  name: "LoongArkPaginationNextTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkPagination.NextTrigger,
        {
          ...attrs,
          "data-scope": "pagination",
          "data-part": "next-trigger",
        },
        slots
      );
  },
});

export const LoongArkPaginationEllipsis = defineComponent({
  name: "LoongArkPaginationEllipsis",
  props: {
    index: {
      type: Number as PropType<number>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkPagination.Ellipsis,
        {
          ...attrs,
          ...props,
          "data-scope": "pagination",
          "data-part": "ellipsis",
        },
        slots
      );
  },
});
