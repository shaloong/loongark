import { h, defineComponent } from "vue";
import { Tooltip as ArkTooltip } from "@ark-ui/vue/tooltip";
import { Portal as ArkPortal } from "@ark-ui/vue/portal";

export const LoongArkTooltipRoot = defineComponent({
  name: "LoongArkTooltipRoot",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkTooltip.Root,
        {
          ...attrs,
          "data-scope": "tooltip",
          "data-part": "root",
        },
        slots
      );
  },
});

export const LoongArkTooltipTrigger = defineComponent({
  name: "LoongArkTooltipTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkTooltip.Trigger,
        {
          ...attrs,
          asChild: true,
          "data-scope": "tooltip",
          "data-part": "trigger",
        },
        slots
      );
  },
});

export const LoongArkTooltipPositioner = defineComponent({
  name: "LoongArkTooltipPositioner",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkPortal,
        {},
        {
          default: () =>
            h(
              ArkTooltip.Positioner,
              {
                ...attrs,
                "data-scope": "tooltip",
                "data-part": "positioner",
              },
              slots
            ),
        }
      );
  },
});

export const LoongArkTooltipContent = defineComponent({
  name: "LoongArkTooltipContent",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkTooltip.Content,
        {
          ...attrs,
          "data-scope": "tooltip",
          "data-part": "content",
          "data-interactive": attrs.interactive ? "true" : undefined,
        },
        slots
      );
  },
});

export const LoongArkTooltipArrow = defineComponent({
  name: "LoongArkTooltipArrow",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkTooltip.Arrow,
        {
          ...attrs,
          "data-scope": "tooltip",
          "data-part": "arrow",
        },
        slots
      );
  },
});

export const LoongArkTooltipArrowTip = defineComponent({
  name: "LoongArkTooltipArrowTip",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        ArkTooltip.ArrowTip,
        {
          ...attrs,
          "data-scope": "tooltip",
          "data-part": "arrow-tip",
        },
        slots
      );
  },
});

