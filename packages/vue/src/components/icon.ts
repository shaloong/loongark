
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticIconStyles } from "@shaloong/loongark-primitives/automatic-styles/icon";
import { defineComponent, h, type PropType, type SVGAttributes } from "vue";
import {
  iconAttributes,
  iconStyles,
  type IconOptions,
  type IconNode,
} from "@shaloong/loongark-kit";
export type LoongArkIconProps = Omit<SVGAttributes, "innerHTML"> & IconOptions;
export const LoongArkIcon = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkIcon",
  inheritAttrs: false,
  props: {
    icon: { type: Array as PropType<IconNode>, required: true },
    size: {
      type: [String, Number] as PropType<IconOptions["size"]>,
      default: "md",
    },
    strokeWidth: Number,
    absoluteStrokeWidth: Boolean,
    mirrorInRtl: Boolean,
    label: String,
  },
  setup(props, { attrs }) {
    return () =>
      h(
        "svg",
        {
          ...attrs,
          ...iconAttributes(props, {
            "aria-label":
              typeof attrs["aria-label"] === "string"
                ? attrs["aria-label"]
                : undefined,
            "aria-labelledby":
              typeof attrs["aria-labelledby"] === "string"
                ? attrs["aria-labelledby"]
                : undefined,
          }),
          style: [iconStyles(props.size), attrs.style],
        },
        props.icon.map(([tag, attributes], key) =>
          h(tag, {
            ...attributes,
            key,
            ...(props.absoluteStrokeWidth
              ? { "vector-effect": "non-scaling-stroke" }
              : {}),
          }),
        ),
      );
  },
}), lkAutomaticIconStyles);
