
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticFilterBarStyles } from "@loongark/primitives/automatic-styles/filter-bar";
import { styles as lkAutomaticFilterChipStyles } from "@loongark/primitives/automatic-styles/filter-chip";
import { styles as lkAutomaticFilterDividerStyles } from "@loongark/primitives/automatic-styles/filter-divider";
import { renderPart } from "../render-part";
import { defineComponent, h } from "vue";
import type { PropType } from "vue";
import { ark } from "@ark-ui/vue";

const boolAttr = (value: boolean | undefined) => (value ? "true" : undefined);

export const LoongArkFilterBar = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticFilterBarStyles);

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

export const LoongArkFilterBarSearch = /*#__PURE__*/ withAutomaticStyles(createSection(
  "LoongArkFilterBarSearch",
  "search",
), lkAutomaticFilterBarStyles);
export const LoongArkFilterBarFilters = /*#__PURE__*/ withAutomaticStyles(createSection(
  "LoongArkFilterBarFilters",
  "filters",
), lkAutomaticFilterBarStyles);
export const LoongArkFilterBarActions = /*#__PURE__*/ withAutomaticStyles(createSection(
  "LoongArkFilterBarActions",
  "actions",
), lkAutomaticFilterBarStyles);

export const LoongArkFilterDivider = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticFilterDividerStyles);

export const LoongArkFilterChip = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticFilterChipStyles);
