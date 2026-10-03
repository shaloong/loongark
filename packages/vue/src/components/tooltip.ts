import { renderPart } from "../render-part";
import { h, defineComponent } from "vue";
import { Tooltip as ArkTooltip } from "@ark-ui/vue/tooltip";
import { LoongArkPortal as ArkPortal } from "./portal";

export const LoongArkTooltipRoot = defineComponent({
  name: "LoongArkTooltipRoot",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTooltip.Root,
        {
          ...attrs,
          "data-scope": "tooltip",
          "data-part": "root",
        },
        slots,
      );
  },
});

export const LoongArkTooltipTrigger = defineComponent({
  name: "LoongArkTooltipTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTooltip.Trigger,
        {
          ...attrs,
          asChild: true,
          "data-scope": "tooltip",
          "data-part": "trigger",
        },
        slots,
      );
  },
});

export const LoongArkTooltipPositioner = defineComponent({
  name: "LoongArkTooltipPositioner",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkPortal,
        {},
        {
          default: () =>
            renderPart(
              ArkTooltip.Positioner,
              {
                ...attrs,
                "data-scope": "tooltip",
                "data-part": "positioner",
              },
              slots,
            ),
        },
      );
  },
});

export const LoongArkTooltipContent = defineComponent({
  name: "LoongArkTooltipContent",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTooltip.Content,
        {
          ...attrs,
          "data-scope": "tooltip",
          "data-part": "content",
          "data-interactive": attrs.interactive ? "true" : undefined,
        },
        slots,
      );
  },
});

export const LoongArkTooltipArrow = defineComponent({
  name: "LoongArkTooltipArrow",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTooltip.Arrow,
        {
          ...attrs,
          "data-scope": "tooltip",
          "data-part": "arrow",
        },
        slots,
      );
  },
});

export const LoongArkTooltipArrowTip = defineComponent({
  name: "LoongArkTooltipArrowTip",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTooltip.ArrowTip,
        {
          ...attrs,
          "data-scope": "tooltip",
          "data-part": "arrow-tip",
        },
        slots,
      );
  },
});
