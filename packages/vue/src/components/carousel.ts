/**
 * Carousel component - Vue wrapper.
 * Uses Ark UI Carousel with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { Carousel as ArkCarousel } from "@ark-ui/vue/carousel";
import type { CarouselSize } from "@loongark/primitives";

export const LoongArkCarouselRoot = defineComponent({
  name: "LoongArkCarouselRoot",
  props: {
    size: {
      type: String as PropType<CarouselSize>,
      default: "md",
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkCarousel.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "carousel",
          "data-part": "root",
          "data-size": props.size,
        },
        slots
      );
  },
});

export const LoongArkCarouselItemGroup = defineComponent({
  name: "LoongArkCarouselItemGroup",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkCarousel.ItemGroup,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "item-group",
        },
        slots
      );
  },
});

export const LoongArkCarouselItem = defineComponent({
  name: "LoongArkCarouselItem",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkCarousel.Item,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "item",
        },
        slots
      );
  },
});

export const LoongArkCarouselControl = defineComponent({
  name: "LoongArkCarouselControl",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkCarousel.Control,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "control",
        },
        slots
      );
  },
});

export const LoongArkCarouselNextTrigger = defineComponent({
  name: "LoongArkCarouselNextTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkCarousel.NextTrigger,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "next-trigger",
        },
        slots
      );
  },
});

export const LoongArkCarouselPrevTrigger = defineComponent({
  name: "LoongArkCarouselPrevTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkCarousel.PrevTrigger,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "prev-trigger",
        },
        slots
      );
  },
});

export const LoongArkCarouselIndicatorGroup = defineComponent({
  name: "LoongArkCarouselIndicatorGroup",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkCarousel.IndicatorGroup,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "indicator-group",
        },
        slots
      );
  },
});

export const LoongArkCarouselIndicator = defineComponent({
  name: "LoongArkCarouselIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkCarousel.Indicator,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "indicator",
        },
        slots
      );
  },
});

export const LoongArkCarouselAutoplayTrigger = defineComponent({
  name: "LoongArkCarouselAutoplayTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkCarousel.AutoplayTrigger,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "autoplay-trigger",
        },
        slots
      );
  },
});

export const LoongArkCarouselProgressText = defineComponent({
  name: "LoongArkCarouselProgressText",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkCarousel.ProgressText,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "progress-text",
        },
        slots
      );
  },
});

export const LoongArkCarouselAutoplayIndicator = defineComponent({
  name: "LoongArkCarouselAutoplayIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkCarousel.AutoplayIndicator,
        {
          ...attrs,
          "data-scope": "carousel",
          "data-part": "autoplay-indicator",
        },
        slots
      );
  },
});
