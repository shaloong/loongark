
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticCarouselStyles } from "@loongark/primitives/automatic-styles/carousel";
import { renderPart } from "../render-part";
/**
 * Carousel component - Vue wrapper.
 * Uses Ark UI Carousel with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { Carousel as ArkCarousel } from "@ark-ui/vue/carousel";
import type { CarouselSize } from "@loongark/primitives";

export const LoongArkCarouselRoot = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkCarouselRoot",
  props: {
    size: {
      type: String as PropType<CarouselSize>,
      default: "md",
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkCarousel.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "carousel",
          "data-part": "root",
          "data-size": props.size,
        },
        slots,
      );
  },
}), lkAutomaticCarouselStyles);

export const LoongArkCarouselItemGroup = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkCarouselItemGroup",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkCarousel.ItemGroup,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "item-group",
        },
        slots,
      );
  },
}), lkAutomaticCarouselStyles);

export const LoongArkCarouselItem = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkCarouselItem",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkCarousel.Item,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "item",
        },
        slots,
      );
  },
}), lkAutomaticCarouselStyles);

export const LoongArkCarouselControl = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkCarouselControl",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkCarousel.Control,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "control",
        },
        slots,
      );
  },
}), lkAutomaticCarouselStyles);

export const LoongArkCarouselNextTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkCarouselNextTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkCarousel.NextTrigger,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "next-trigger",
        },
        slots,
      );
  },
}), lkAutomaticCarouselStyles);

export const LoongArkCarouselPrevTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkCarouselPrevTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkCarousel.PrevTrigger,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "prev-trigger",
        },
        slots,
      );
  },
}), lkAutomaticCarouselStyles);

export const LoongArkCarouselIndicatorGroup = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkCarouselIndicatorGroup",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkCarousel.IndicatorGroup,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "indicator-group",
        },
        slots,
      );
  },
}), lkAutomaticCarouselStyles);

export const LoongArkCarouselIndicator = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkCarouselIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkCarousel.Indicator,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "indicator",
        },
        slots,
      );
  },
}), lkAutomaticCarouselStyles);

export const LoongArkCarouselAutoplayTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkCarouselAutoplayTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkCarousel.AutoplayTrigger,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "autoplay-trigger",
        },
        slots,
      );
  },
}), lkAutomaticCarouselStyles);

export const LoongArkCarouselProgressText = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkCarouselProgressText",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkCarousel.ProgressText,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "progress-text",
        },
        slots,
      );
  },
}), lkAutomaticCarouselStyles);

export const LoongArkCarouselAutoplayIndicator = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkCarouselAutoplayIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkCarousel.AutoplayIndicator,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "autoplay-indicator",
        },
        slots,
      );
  },
}), lkAutomaticCarouselStyles);
