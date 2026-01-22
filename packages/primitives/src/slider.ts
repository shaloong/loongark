/**
 * Slider Primitive - Slider styles
 * Based on Ark UI Slider data attributes
 */
import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type SliderSize = "sm" | "md" | "lg";
export type SliderOrientation = "horizontal" | "vertical";

export interface SliderPrimitiveProps {
  size?: SliderSize;
  orientation?: SliderOrientation;
}

interface SliderDesignTokens {
  fontFamily: string;
  fontSize: Record<SliderSize, string>;
  lineHeight: number;
  fontWeight: number;
  gap: string;
  markerGap: string;
  track: {
    height: Record<SliderSize, string>;
    radius: string;
  };
  thumb: {
    size: Record<SliderSize, string>;
    radius: string;
    shadow: string;
  };
  colors: {
    surface: string;
    surfaceRaised: string;
    text: string;
    textMuted: string;
    track: string;
    border: string;
    range: string;
    thumb: string;
    thumbBorder: string;
    marker: string;
    warning: string;
    focus: string;
  };
  disabled: {
    track: string;
    range: string;
    thumb: string;
    text: string;
    border: string;
  };
  motion: {
    duration: string;
    easing: string;
  };
}

const extractSliderTokens = (theme: LoongArkTheme): SliderDesignTokens => {
  const typography = theme.tokens.typography as TokenTree;
  const fontFamily = asTokenTree(typography.fontFamily);
  const fontSize = asTokenTree(typography.fontSize);
  const lineHeight = asTokenTree(typography.lineHeight);
  const fontWeight = asTokenTree(typography.fontWeight);

  const space = asTokenTree(theme.tokens.space);
  const componentSpace = asTokenTree(space.component);
  const radius = asTokenTree(theme.tokens.radius);
  const shadow = asTokenTree(theme.tokens.shadow);

  const color = theme.tokens.color as TokenTree;
  const brand = asTokenTree(color.brand);
  const neutral = asTokenTree(color.neutral);

  const motion = theme.tokens.motion as TokenTree;
  const duration = asTokenTree(motion.duration);
  const easing = asTokenTree(motion.easing);

  return {
    fontFamily: toStringToken(fontFamily.body, "sans-serif"),
    fontSize: {
      sm: toStringToken(fontSize.sm, "14px"),
      md: toStringToken(fontSize.md, "16px"),
      lg: toStringToken(fontSize.lg, "20px"),
    },
    lineHeight: toNumberToken(lineHeight.base, 1.5),
    fontWeight: toNumberToken(fontWeight.medium, 500),
    gap: toStringToken(componentSpace.sm, "8px"),
    markerGap: toStringToken(componentSpace.xs, "4px"),
    track: {
      height: {
        sm: toStringToken(componentSpace.xs, "4px"),
        md: toStringToken(componentSpace.sm, "8px"),
        lg: toStringToken(componentSpace.md, "12px"),
      },
      radius: toStringToken(radius.pill ?? radius.lg, "999px"),
    },
    thumb: {
      size: {
        sm: "14px",
        md: "18px",
        lg: "22px",
      },
      radius: toStringToken(radius.pill ?? radius.lg, "999px"),
      shadow: toStringToken(
        (shadow as any).sm,
        "0 4px 12px rgba(0, 0, 0, 0.12)"
      ),
    },
    colors: {
      surface: toStringToken(neutral["50"], "#FFFFFF"),
      surfaceRaised: toStringToken(neutral["100"], "#F2F2F2"),
      text: toStringToken(neutral["700"], "#232325"),
      textMuted: toStringToken(neutral["500"], "#767680"),
      track: toStringToken(neutral["100"], "#E5E6EB"),
      border: toStringToken(neutral["200"], "#D5D7DE"),
      range: toStringToken(brand.primary, "#006EFF"),
      thumb: toStringToken(neutral["50"], "#FFFFFF"),
      thumbBorder: toStringToken(neutral["300"], "#B3B4BD"),
      marker: toStringToken(neutral["300"], "#B3B4BD"),
      warning: toStringToken(brand.warning, "#F58220"),
      focus: toStringToken(brand.accent ?? brand.primary, "#5AC8FA"),
    },
    disabled: {
      track: toStringToken(neutral["100"], "#E5E6EB"),
      range: toStringToken(neutral["300"], "#B3B4BD"),
      thumb: toStringToken(neutral["200"], "#D5D7DE"),
      text: toStringToken(neutral["400"], "#A0A0A8"),
      border: toStringToken(neutral["200"], "#D5D7DE"),
    },
    motion: {
      duration: toStringToken(duration.base, "200ms"),
      easing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
    },
  };
};

const buildSliderStyles = (theme: LoongArkTheme): string => {
  const tokens = extractSliderTokens(theme);
  const scope = `[data-scope="slider"]`;
  const root = `${scope}[data-part="root"]`;
  const label = `${scope}[data-part="label"]`;
  const valueText = `${scope}[data-part="value-text"]`;
  const control = `${scope}[data-part="control"]`;
  const track = `${scope}[data-part="track"]`;
  const range = `${scope}[data-part="range"]`;
  const thumb = `${scope}[data-part="thumb"]`;
  const markerGroup = `${scope}[data-part="marker-group"]`;
  const marker = `${scope}[data-part="marker"]`;
  const draggingIndicator = `${scope}[data-part="dragging-indicator"]`;

  const sizeStyles = (size: SliderSize) => `
${root}[data-size="${size}"] ${label},
${root}[data-size="${size}"] ${valueText} {
  font-size: ${tokens.fontSize[size]};
}

${root}[data-size="${size}"] ${track}[data-orientation="horizontal"] {
  height: ${tokens.track.height[size]};
}

${root}[data-size="${size}"] ${track}[data-orientation="vertical"] {
  width: ${tokens.track.height[size]};
}

${root}[data-size="${size}"] ${thumb} {
  width: ${tokens.thumb.size[size]};
  height: ${tokens.thumb.size[size]};
}

${root}[data-size="${size}"] ${draggingIndicator} {
  min-width: ${tokens.thumb.size[size]};
  min-height: ${tokens.thumb.size[size]};
}

${root}[data-size="${size}"] ${control}[data-orientation="horizontal"] {
  height: ${tokens.thumb.size[size]};
}

${root}[data-size="${size}"] ${control}[data-orientation="vertical"] {
  width: ${tokens.thumb.size[size]};
}
`;

  return `
@media (prefers-reduced-motion: reduce) {
  :root:not([data-lk-motion="force"]) [data-scope="slider"] * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

${root} {
  display: flex;
  flex-direction: column;
  gap: ${tokens.gap};
  width: 100%;
}

${label} {
  font-family: ${tokens.fontFamily};
  font-size: ${tokens.fontSize.md};
  font-weight: ${tokens.fontWeight};
  line-height: ${tokens.lineHeight};
  color: ${tokens.colors.text};
  user-select: none;
}

${valueText} {
  font-family: ${tokens.fontFamily};
  font-size: ${tokens.fontSize.md};
  line-height: ${tokens.lineHeight};
  color: ${tokens.colors.textMuted};
  align-self: flex-end;
}

${control} {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

${control}[data-orientation="vertical"] {
  height: 160px;
  justify-content: center;
}

${track} {
  position: relative;
  flex: 1;
  background: ${tokens.colors.track};
  border-radius: ${tokens.track.radius};
  border: 1px solid ${tokens.colors.border};
  transition:
    background ${tokens.motion.duration} ${tokens.motion.easing},
    border-color ${tokens.motion.duration} ${tokens.motion.easing};
}

${track}[data-orientation="horizontal"] {
  height: ${tokens.track.height.md};
}

${track}[data-orientation="vertical"] {
  width: ${tokens.track.height.md};
  height: 100%;
}

${range} {
  background: ${tokens.colors.range};
  border-radius: ${tokens.track.radius};
}

${range}[data-orientation="horizontal"] {
  height: 100%;
}

${range}[data-orientation="vertical"] {
  width: 100%;
}

${thumb} {
  width: ${tokens.thumb.size.md};
  height: ${tokens.thumb.size.md};
  background: ${tokens.colors.thumb};
  border: 1px solid ${tokens.colors.thumbBorder};
  border-radius: ${tokens.thumb.radius};
  box-shadow: ${tokens.thumb.shadow};
  transition:
    border-color ${tokens.motion.duration} ${tokens.motion.easing},
    box-shadow ${tokens.motion.duration} ${tokens.motion.easing};
  cursor: pointer;
}

${thumb}[data-focus],
${thumb}:focus-visible {
  outline: none;
  border-color: ${tokens.colors.range};
  box-shadow: 0 0 0 3px ${tokens.colors.focus};
}

${thumb}[data-dragging] {
  border-color: ${tokens.colors.range};
}

${markerGroup} {
  margin-top: ${tokens.markerGap};
}

${markerGroup}[data-orientation="vertical"] {
  margin-top: 0;
  margin-left: ${tokens.markerGap};
}

${marker} {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: ${tokens.markerGap};
  font-family: ${tokens.fontFamily};
  font-size: ${tokens.fontSize.sm};
  line-height: ${tokens.lineHeight};
  color: ${tokens.colors.textMuted};
  white-space: nowrap;
}

${marker}::before {
  content: "";
  width: ${tokens.markerGap};
  height: ${tokens.markerGap};
  border-radius: 999px;
  background: ${tokens.colors.marker};
}

${marker}[data-state="at-value"]::before,
${marker}[data-state="under-value"]::before {
  background: ${tokens.colors.range};
}

${draggingIndicator} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${tokens.colors.surface};
  color: ${tokens.colors.text};
  border: 1px solid ${tokens.colors.border};
  border-radius: ${tokens.thumb.radius};
  box-shadow: ${tokens.thumb.shadow};
  font-family: ${tokens.fontFamily};
  font-size: ${tokens.fontSize.sm};
  line-height: 1;
  padding: 2px 6px;
  min-width: ${tokens.thumb.size.md};
  min-height: ${tokens.thumb.size.md};
  pointer-events: none;
  opacity: 0;
  transition: opacity ${tokens.motion.duration} ${tokens.motion.easing};
}

${draggingIndicator}[data-state="open"] {
  opacity: 1;
}

${root}[data-disabled="true"] ${track},
${track}[data-disabled="true"] {
  background: ${tokens.disabled.track};
  border-color: ${tokens.disabled.border};
}

${root}[data-disabled="true"] ${range},
${range}[data-disabled="true"] {
  background: ${tokens.disabled.range};
}

${root}[data-disabled="true"] ${thumb},
${thumb}[data-disabled="true"] {
  background: ${tokens.disabled.thumb};
  border-color: ${tokens.disabled.border};
  box-shadow: none;
  cursor: not-allowed;
}

${root}[data-disabled="true"] ${label},
${root}[data-disabled="true"] ${valueText} {
  color: ${tokens.disabled.text};
}

${root}[data-invalid="true"] ${track},
${track}[data-invalid="true"] {
  border-color: ${tokens.colors.warning};
}

${root}[data-invalid="true"] ${range},
${range}[data-invalid="true"] {
  background: ${tokens.colors.warning};
}

${root}[data-invalid="true"] ${thumb},
${thumb}[data-invalid="true"] {
  border-color: ${tokens.colors.warning};
}

${sizeStyles("sm")}
${sizeStyles("md")}
${sizeStyles("lg")}
`;
};

const sliderContract: PrimitiveContract<SliderPrimitiveProps> = {
  name: "slider",
  tokens: [
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.200",
    "color.neutral.300",
    "color.neutral.400",
    "color.neutral.500",
    "color.neutral.700",
    "color.brand.primary",
    "color.brand.accent",
    "color.brand.warning",
    "typography.fontFamily.body",
    "typography.fontSize.sm",
    "typography.fontSize.md",
    "typography.fontSize.lg",
    "typography.lineHeight.base",
    "typography.fontWeight.medium",
    "space.component.xs",
    "space.component.sm",
    "space.component.md",
    "radius.lg",
    "radius.pill",
    "shadow.sm",
    "motion.duration.base",
    "motion.easing.standard",
  ],
  defaults: {
    size: "md",
    orientation: "horizontal",
  },
};

const SliderPrimitive = createPrimitive(sliderContract, (theme) => {
  const css = buildSliderStyles(theme);
  mountPrimitiveStyles(`slider-${theme.mode}`, css);
});

registerPrimitive(SliderPrimitive);

export { SliderPrimitive };
