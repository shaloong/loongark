<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticIconStyles } from "@shaloong/loongark-primitives/automatic-styles/icon";
  registerAutomaticStyles(lkAutomaticIconStyles);

  import type { SVGAttributes } from "svelte/elements";
  import { iconAttributes, iconStyles, type IconOptions } from "@shaloong/loongark-kit";
  let {
    icon,
    size,
    strokeWidth,
    absoluteStrokeWidth,
    mirrorInRtl,
    label,
    style,
    ref = $bindable(),
    ...attrs
  }: IconOptions &
    SVGAttributes<SVGSVGElement> & { ref?: SVGSVGElement } = $props();
</script>

<svg
  bind:this={ref}
  {...attrs}
  {...iconAttributes({ icon, strokeWidth, mirrorInRtl, label }, attrs)}
  style={`--lk-icon-size:${iconStyles(size)["--lk-icon-size"]};${style ?? ""}`}
>
  {#each icon as [tag, attributes]}<svelte:element
      this={tag}
      xmlns="http://www.w3.org/2000/svg"
      {...{
        ...attributes,
        "vector-effect": absoluteStrokeWidth ? "non-scaling-stroke" : undefined,
      }}
    />{/each}
</svg>
