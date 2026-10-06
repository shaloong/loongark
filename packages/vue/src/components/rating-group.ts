import { renderPart } from "../render-part";
/**
 * Rating Group component - Vue wrapper.
 * Uses Ark UI Rating Group with data attributes for styling.
 */
import { defineComponent, h, computed, type PropType } from "vue";
import { RatingGroup as ArkRatingGroup } from "@ark-ui/vue/rating-group";
import { useRatingGroup } from "./use-rating";
import type { UseRatingGroupProps } from "@ark-ui/vue/rating-group";
import type { RatingGroupSize } from "@loongark/primitives";

export const LoongArkRatingGroupRoot = defineComponent({
  name: "LoongArkRatingGroupRoot",
  inheritAttrs: false,
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
    const controls = computed<UseRatingGroupProps>(() => ({
      ...attrs,
      disabled: props.disabled,
    }));
    const api = useRatingGroup(controls, (event, ...args) => {
      const handler =
        attrs[
          event === "update:modelValue"
            ? "onUpdate:modelValue"
            : event === "valueChange"
              ? "onValueChange"
              : "onHoverChange"
        ];
      if (event === "update:modelValue" && typeof handler === "function")
        handler(...args);
    });
    return () =>
      renderPart(
        ArkRatingGroup.RootProvider,
        {
          ...Object.fromEntries(
            Object.entries(attrs).filter(
              ([key]) =>
                ![
                  "allowHalf",
                  "autoFocus",
                  "count",
                  "defaultValue",
                  "dir",
                  "form",
                  "getRootNode",
                  "id",
                  "ids",
                  "name",
                  "onHoverChange",
                  "onValueChange",
                  "readOnly",
                  "required",
                  "translations",
                  "value",
                  "modelValue",
                  "onUpdate:modelValue",
                ].includes(key),
            ),
          ),
          value: api.value,
          "data-scope": "rating-group",
          "data-part": "root",
          "data-size": props.size,
          "data-disabled": props.disabled ? "true" : undefined,
        },
        slots,
      );
  },
});

export const LoongArkRatingGroupLabel = defineComponent({
  name: "LoongArkRatingGroupLabel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkRatingGroup.Label,
        {
          ...attrs,
          "data-scope": "rating-group",
          "data-part": "label",
        },
        slots,
      );
  },
});

export const LoongArkRatingGroupControl = defineComponent({
  name: "LoongArkRatingGroupControl",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkRatingGroup.Control,
        {
          ...attrs,
          "data-scope": "rating-group",
          "data-part": "control",
        },
        slots,
      );
  },
});

export const LoongArkRatingGroupItem = defineComponent({
  name: "LoongArkRatingGroupItem",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkRatingGroup.Item,
        {
          ...attrs,
          "data-scope": "rating-group",
          "data-part": "item",
        },
        slots,
      );
  },
});

export const LoongArkRatingGroupHiddenInput = defineComponent({
  name: "LoongArkRatingGroupHiddenInput",
  setup(_, { attrs }) {
    return () =>
      renderPart(ArkRatingGroup.HiddenInput, {
        ...attrs,
        "data-scope": "rating-group",
        "data-part": "hidden-input",
      });
  },
});
