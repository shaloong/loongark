
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticIconStyles } from "@shaloong/loongark-primitives/automatic-styles/icon";
import { For, splitProps, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { iconAttributes, iconStyles, type IconOptions } from "@shaloong/loongark-kit";
export type LoongArkIconProps = Omit<
  JSX.SvgSVGAttributes<SVGSVGElement>,
  "children" | "innerHTML"
> &
  IconOptions;
function LoongArkIcon(props: LoongArkIconProps) {
  const [local, attrs] = splitProps(props, [
    "icon",
    "size",
    "strokeWidth",
    "absoluteStrokeWidth",
    "mirrorInRtl",
    "label",
    "style",
  ]);
  return (
    <svg
      {...attrs}
      {...iconAttributes(local, attrs)}
      style={
        typeof local.style === "string"
          ? `--lk-icon-size:${iconStyles(local.size)["--lk-icon-size"]};${local.style}`
          : { ...iconStyles(local.size), ...local.style }
      }
    >
      <For each={local.icon}>
        {([tag, attributes]) => (
          <Dynamic
            component={tag}
            {...attributes}
            vector-effect={
              local.absoluteStrokeWidth ? "non-scaling-stroke" : undefined
            }
          />
        )}
      </For>
    </svg>
  );
}

const lkStyledLoongArkIcon = /*#__PURE__*/ withAutomaticStyles(LoongArkIcon, lkAutomaticIconStyles);
export { lkStyledLoongArkIcon as LoongArkIcon };
