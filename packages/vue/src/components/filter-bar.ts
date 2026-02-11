import { defineComponent, h, type PropType } from "vue";
import { ark } from "@ark-ui/vue";

const alignProp = {
  type: String as PropType<"start" | "center">,
  default: "start" as const,
};

export const LoongArkFilterBar = defineComponent({
  name: "LoongArkFilterBar",
  props: {
    dense: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    align: alignProp,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ark.div,
        {
          ...attrs,
          "data-scope": "filter-bar",
          "data-part": "root",
          "data-dense": props.dense ? "true" : undefined,
          "data-align": props.align === "center" ? "center" : undefined,
        },
        slots.default ? slots.default() : undefined
      );
  },
});

export const LoongArkFilterBarSearch = defineComponent({
  name: "LoongArkFilterBarSearch",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ark.div,
        {
          ...attrs,
          "data-scope": "filter-bar",
          "data-part": "search",
        },
        slots.default ? slots.default() : undefined
      );
  },
});

export const LoongArkFilterBarFilters = defineComponent({
  name: "LoongArkFilterBarFilters",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ark.div,
        {
          ...attrs,
          "data-scope": "filter-bar",
          "data-part": "filters",
        },
        slots.default ? slots.default() : undefined
      );
  },
});

export const LoongArkFilterBarActions = defineComponent({
  name: "LoongArkFilterBarActions",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ark.div,
        {
          ...attrs,
          "data-scope": "filter-bar",
          "data-part": "actions",
        },
        slots.default ? slots.default() : undefined
      );
  },
});

export const LoongArkFilterDivider = defineComponent({
  name: "LoongArkFilterDivider",
  setup(_, { attrs }) {
    return () =>
      h(ark.span, {
        ...attrs,
        role: "presentation",
        "aria-hidden": "true",
        "data-scope": "filter-bar",
        "data-part": "divider",
      });
  },
});

export const LoongArkFilterChip = defineComponent({
  name: "LoongArkFilterChip",
  props: {
    active: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    type: {
      type: String as PropType<"button" | "submit" | "reset">,
      default: "button",
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ark.button,
        {
          ...attrs,
          type: props.type,
          "data-scope": "filter-bar",
          "data-part": "chip",
          "data-active": props.active ? "true" : undefined,
          "aria-pressed": props.active ? "true" : "false",
        },
        slots.default ? slots.default() : undefined
      );
  },
});
