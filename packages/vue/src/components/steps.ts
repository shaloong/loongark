/**
 * Steps component - Vue wrapper.
 * Uses Ark UI Steps with data attributes for styling.
 */
import { defineComponent, h, type PropType } from "vue";
import { Steps as ArkSteps } from "@ark-ui/vue/steps";
import type { StepsOrientation, StepsSize } from "@loongark/primitives";

export interface StepsChangeDetails {
  value: number | string;
}

export const LoongArkStepsRoot = defineComponent({
  name: "LoongArkStepsRoot",
  props: {
    size: {
      type: String as PropType<StepsSize>,
      default: "md",
    },
    orientation: {
      type: String as PropType<StepsOrientation>,
      default: "horizontal",
    },
    value: {
      type: [String, Number] as PropType<string | number>,
    },
    defaultValue: {
      type: [String, Number] as PropType<string | number>,
    },
    count: {
      type: Number as PropType<number>,
    },
    linear: {
      type: Boolean as PropType<boolean>,
    },
    onValueChange: {
      type: Function as PropType<(details: StepsChangeDetails) => void>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkSteps.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "steps",
          "data-part": "root",
          "data-size": props.size,
          "data-orientation": props.orientation,
        },
        slots
      );
  },
});

export const LoongArkStepsList = defineComponent({
  name: "LoongArkStepsList",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSteps.List,
        {
          ...attrs,
          "data-scope": "steps",
          "data-part": "list",
        },
        slots
      );
  },
});

export const LoongArkStepsItem = defineComponent({
  name: "LoongArkStepsItem",
  props: {
    value: {
      type: [String, Number] as PropType<string | number>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ArkSteps.Item,
        {
          ...attrs,
          ...props,
          "data-scope": "steps",
          "data-part": "item",
        },
        slots
      );
  },
});

export const LoongArkStepsIndicator = defineComponent({
  name: "LoongArkStepsIndicator",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSteps.Indicator,
        {
          ...attrs,
          "data-scope": "steps",
          "data-part": "indicator",
        },
        slots
      );
  },
});

export const LoongArkStepsSeparator = defineComponent({
  name: "LoongArkStepsSeparator",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSteps.Separator,
        {
          ...attrs,
          "data-scope": "steps",
          "data-part": "separator",
        },
        slots
      );
  },
});

export const LoongArkStepsTrigger = defineComponent({
  name: "LoongArkStepsTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSteps.Trigger,
        {
          ...attrs,
          "data-scope": "steps",
          "data-part": "trigger",
        },
        slots
      );
  },
});

export const LoongArkStepsContent = defineComponent({
  name: "LoongArkStepsContent",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSteps.Content,
        {
          ...attrs,
          "data-scope": "steps",
          "data-part": "content",
        },
        slots
      );
  },
});

export const LoongArkStepsCompletedContent = defineComponent({
  name: "LoongArkStepsCompletedContent",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSteps.CompletedContent,
        {
          ...attrs,
          "data-scope": "steps",
          "data-part": "completed-content",
        },
        slots
      );
  },
});

export const LoongArkStepsProgress = defineComponent({
  name: "LoongArkStepsProgress",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSteps.Progress,
        {
          ...attrs,
          "data-scope": "steps",
          "data-part": "progress",
        },
        slots
      );
  },
});

export const LoongArkStepsNextTrigger = defineComponent({
  name: "LoongArkStepsNextTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSteps.NextTrigger,
        {
          ...attrs,
          "data-scope": "steps",
          "data-part": "next-trigger",
        },
        slots
      );
  },
});

export const LoongArkStepsPrevTrigger = defineComponent({
  name: "LoongArkStepsPrevTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkSteps.PrevTrigger,
        {
          ...attrs,
          "data-scope": "steps",
          "data-part": "prev-trigger",
        },
        slots
      );
  },
});
