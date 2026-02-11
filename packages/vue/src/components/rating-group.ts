/**
 * Rating Group component - Vue wrapper.
 * Uses Ark UI Rating Group with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { RatingGroup as ArkRatingGroup } from "@ark-ui/vue/rating-group";
import type { RatingGroupSize } from "@loongark/primitives";

export const LoongArkRatingGroupRoot = defineComponent({
  name: "LoongArkRatingGroupRoot",
  props: {
    size: {
      type: String as PropType<RatingGroupSize>,
      default: "md",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkRatingGroup.Root,
        {
          ...attrs,
          ...props,
          disabled: props.disabled,
          "data-scope": "rating-group",
          "data-part": "root",
          "data-size": props.size,
          "data-disabled": props.disabled ? "true" : undefined,
        },
        slots
      );
  },
});

export const LoongArkRatingGroupLabel = defineComponent({
  name: "LoongArkRatingGroupLabel",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkRatingGroup.Label,
        {
          ...attrs,
          "data-scope": "rating-group",
          "data-part": "label",
        },
        slots
      );
  },
});

export const LoongArkRatingGroupControl = defineComponent({
  name: "LoongArkRatingGroupControl",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkRatingGroup.Control,
        {
          ...attrs,
          "data-scope": "rating-group",
          "data-part": "control",
        },
        slots
      );
  },
});

export const LoongArkRatingGroupItem = defineComponent({
  name: "LoongArkRatingGroupItem",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkRatingGroup.Item,
        {
          ...attrs,
          "data-scope": "rating-group",
          "data-part": "item",
        },
        slots
      );
  },
});

export const LoongArkRatingGroupHiddenInput = defineComponent({
  name: "LoongArkRatingGroupHiddenInput",
  setup(_, { attrs }) {
    return () =>
      h(ArkRatingGroup.HiddenInput, {
        ...attrs,
        "data-scope": "rating-group",
        "data-part": "hidden-input",
      });
  },
});
