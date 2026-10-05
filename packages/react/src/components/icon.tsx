import { createElement, forwardRef, type SVGProps } from "react";
import {
  iconAttributes,
  iconStyles,
  reactSvgAttributes,
  type IconOptions,
} from "@loongark/kit";
export type LoongArkIconProps = Omit<
  SVGProps<SVGSVGElement>,
  "children" | "dangerouslySetInnerHTML" | "size"
> &
  IconOptions;
export const LoongArkIcon = forwardRef<SVGSVGElement, LoongArkIconProps>(
  (
    {
      icon,
      size,
      strokeWidth,
      absoluteStrokeWidth,
      mirrorInRtl,
      label,
      style,
      ...attrs
    },
    ref,
  ) =>
    createElement(
      "svg",
      {
        ...attrs,
        ...reactSvgAttributes(
          iconAttributes({ icon, strokeWidth, mirrorInRtl, label }, attrs),
        ),
        ref,
        style: { ...iconStyles(size), ...style },
      },
      icon.map(([tag, attributes], index) =>
        createElement(tag, {
          ...reactSvgAttributes(attributes),
          key: index,
          ...(absoluteStrokeWidth
            ? { vectorEffect: "non-scaling-stroke" }
            : {}),
        }),
      ),
    ),
);
LoongArkIcon.displayName = "LoongArkIcon";
