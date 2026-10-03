import { renderPart } from "../render-part";
import { defineComponent, h } from "vue";
import type { PropType } from "vue";
import { ark } from "@ark-ui/vue";

const boolAttr = (value: boolean | undefined) => (value ? "true" : undefined);

export const LoongArkFilterBar = defineComponent({
  name: "LoongArkFilterBar",
  props: {
    dense: {
      type: {} as PropType<boolean>,
      default: false,
    },
    align: {
      type: {} as PropType<"start" | "center">,
      default: "start" as const,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ark.div,
        {
          ...attrs,
          "data-scope": "filter-bar",
          "data-part": "root",
          "data-dense": boolAttr(props.dense),
          "data-align": props.align === "center" ? "center" : undefined,
        },
        slots.default ? slots.default() : undefined,
      );
  },
});

const createSection = (name: string, part: string) =>
  defineComponent({
    name,
    setup(_, { slots, attrs }) {
      return () =>
        renderPart(
          ark.div,
          {
            ...attrs,
            "data-scope": "filter-bar",
            "data-part": part,
          },
          slots.default ? slots.default() : undefined,
        );
    },
  });

export const LoongArkFilterBarSearch = createSection(
  "LoongArkFilterBarSearch",
  "search",
);
export const LoongArkFilterBarFilters = createSection(
  "LoongArkFilterBarFilters",
  "filters",
);
export const LoongArkFilterBarActions = createSection(
  "LoongArkFilterBarActions",
  "actions",
);

export const LoongArkFilterDivider = defineComponent({
  name: "LoongArkFilterDivider",
  setup(_, { attrs }) {
    return () =>
      renderPart(ark.span, {
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
      type: {} as PropType<boolean>,
      default: false,
    },
    type: {
      type: {} as PropType<"button" | "submit" | "reset">,
      default: "button" as const,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ark.button,
        {
          ...attrs,
          type: props.type,
          "data-scope": "filter-bar",
          "data-part": "chip",
          "data-active": boolAttr(props.active),
          "aria-pressed": props.active ? "true" : "false",
        },
        slots.default ? slots.default() : undefined,
      );
  },
});
