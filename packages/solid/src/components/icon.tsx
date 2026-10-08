import { For, splitProps, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { iconAttributes, iconStyles, type IconOptions } from "@loongark/kit";
export type LoongArkIconProps = Omit<
  JSX.SvgSVGAttributes<SVGSVGElement>,
  "children" | "innerHTML"
> &
  IconOptions;
export function LoongArkIcon(props: LoongArkIconProps) {
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
