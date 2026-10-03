import { renderPart } from "../render-part";
/**
 * Steps component - Vue wrapper.
 * Uses Ark UI Steps with data attributes for styling.
 */
import { defineComponent, h, computed, type PropType } from "vue";
import { Steps as ArkSteps, useSteps } from "@ark-ui/vue/steps";
import type { StepsOrientation, StepsSize } from "@loongark/primitives";

export interface StepsChangeDetails {
  step: number;
}

export const LoongArkStepsRoot = defineComponent({
  name: "LoongArkStepsRoot",
  inheritAttrs: false,
  emits: ["stepChange", "update:step", "stepComplete", "stepInvalid"],
  props: {
    size: {
      type: String as PropType<StepsSize>,
      default: "md",
    },
    orientation: {
      type: String as PropType<StepsOrientation>,
      default: "horizontal",
    },
    step: {
      type: Number,
    },
    defaultStep: {
      type: Number,
    },
    count: {
      type: Number as PropType<number>,
    },
    linear: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    onStepChange: {
      type: Function as PropType<(details: StepsChangeDetails) => void>,
    },
  },
  setup(props, { slots, attrs, emit }) {
    const steps = useSteps(
      computed(() => {
        const { onStepChange, size, ...nativeProps } = props;
        return { ...attrs, ...nativeProps };
      }),
      emit,
    );
    return () =>
      renderPart(
        ArkSteps.RootProvider,
        {
          ...attrs,
          value: steps.value,
          "data-scope": "steps",
          "data-part": "root",
          "data-size": props.size,
          "data-orientation": props.orientation,
        },
        slots,
      );
  },
});

export const LoongArkStepsList = defineComponent({
  name: "LoongArkStepsList",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkSteps.List,
        {
          ...attrs,
          "data-scope": "steps",
          "data-part": "list",
        },
        slots,
      );
  },
});

export const LoongArkStepsItem = defineComponent({
  name: "LoongArkStepsItem",
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkSteps.Item,
        {
          role: "presentation",
          "aria-current": null,
          ...attrs,
          ...props,
          "data-scope": "steps",
          "data-part": "item",
        },
        slots,
      );
  },
});

export const LoongArkStepsIndicator = defineComponent({
  name: "LoongArkStepsIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkSteps.Indicator,
        {
          ...attrs,
          "data-scope": "steps",
          "data-part": "indicator",
        },
        slots,
      );
  },
});

export const LoongArkStepsSeparator = defineComponent({
  name: "LoongArkStepsSeparator",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkSteps.Separator,
        {
          ...attrs,
          "data-scope": "steps",
          "data-part": "separator",
        },
        slots,
      );
  },
});

export const LoongArkStepsTrigger = defineComponent({
  name: "LoongArkStepsTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkSteps.Trigger,
        {
          ...attrs,
          "data-scope": "steps",
          "data-part": "trigger",
        },
        slots,
      );
  },
});

export const LoongArkStepsContent = defineComponent({
  name: "LoongArkStepsContent",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkSteps.Content,
        {
          ...attrs,
          "data-scope": "steps",
          "data-part": "content",
        },
        slots,
      );
  },
});

export const LoongArkStepsCompletedContent = defineComponent({
  name: "LoongArkStepsCompletedContent",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkSteps.CompletedContent,
        {
          ...attrs,
          "data-scope": "steps",
          "data-part": "completed-content",
        },
        slots,
      );
  },
});

export const LoongArkStepsProgress = defineComponent({
  name: "LoongArkStepsProgress",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkSteps.Progress,
        {
          ...attrs,
          "data-scope": "steps",
          "data-part": "progress",
        },
        slots,
      );
  },
});

export const LoongArkStepsNextTrigger = defineComponent({
  name: "LoongArkStepsNextTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkSteps.NextTrigger,
        {
          ...attrs,
          "data-scope": "steps",
          "data-part": "next-trigger",
        },
        slots,
      );
  },
});

export const LoongArkStepsPrevTrigger = defineComponent({
  name: "LoongArkStepsPrevTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkSteps.PrevTrigger,
        {
          ...attrs,
          "data-scope": "steps",
          "data-part": "prev-trigger",
        },
        slots,
      );
  },
});
