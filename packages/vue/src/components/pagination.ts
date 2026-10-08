import { renderPart } from "../render-part";
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
      default: undefined,
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
      renderPart(
        ArkPagination.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "pagination",
          "data-part": "root",
          "data-size": props.size,
          "data-orientation": props.orientation,
        },
        slots,
      );
  },
});

export const LoongArkPaginationList = defineComponent({
  name: "LoongArkPaginationList",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        "div",
        {
          ...attrs,
          "data-scope": "pagination",
          "data-part": "list",
        },
        slots,
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
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkPagination.Item,
        {
          ...attrs,
          ...props,
          "data-scope": "pagination",
          "data-part": "item",
        },
        slots,
      );
  },
});

export const LoongArkPaginationPrevTrigger = defineComponent({
  name: "LoongArkPaginationPrevTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkPagination.PrevTrigger,
        {
          ...attrs,
          "data-scope": "pagination",
          "data-part": "prev-trigger",
        },
        slots,
      );
  },
});

export const LoongArkPaginationNextTrigger = defineComponent({
  name: "LoongArkPaginationNextTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkPagination.NextTrigger,
        {
          ...attrs,
          "data-scope": "pagination",
          "data-part": "next-trigger",
        },
        slots,
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
      renderPart(
        ArkPagination.Ellipsis,
        {
          ...attrs,
          ...props,
          "data-scope": "pagination",
          "data-part": "ellipsis",
        },
        slots,
      );
  },
});
