
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticTooltipStyles } from "@shaloong/loongark-primitives/automatic-styles/tooltip";
import { renderPart } from "../render-part";
import { h, defineComponent } from "vue";
import { Tooltip as ArkTooltip } from "@ark-ui/vue/tooltip";
import { LoongArkPortal as ArkPortal } from "./portal";

export const LoongArkTooltipRoot = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTooltipStyles);

export const LoongArkTooltipTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkTooltipTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkTooltip.Trigger,
        {
          ...attrs,
          asChild: attrs.asChild ?? true,
          "data-scope": "tooltip",
          "data-part": "trigger",
        },
        slots,
      );
  },
}), lkAutomaticTooltipStyles);

export const LoongArkTooltipPositioner = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTooltipStyles);

export const LoongArkTooltipContent = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTooltipStyles);

export const LoongArkTooltipArrow = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTooltipStyles);

export const LoongArkTooltipArrowTip = /*#__PURE__*/ withAutomaticStyles(defineComponent({
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
}), lkAutomaticTooltipStyles);
