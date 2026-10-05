import type { Component } from "svelte";
import type { SVGAttributes } from "svelte/elements";
import type { IconOptions } from "@loongark/kit";
export type LoongArkIconProps = IconOptions &
  SVGAttributes<SVGSVGElement> & { ref?: SVGSVGElement };
declare const Icon: Component<LoongArkIconProps, {}, "ref">;
export default Icon;
