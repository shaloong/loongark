import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type ProgressSize = "sm" | "md" | "lg";
export type ProgressOrientation = "horizontal" | "vertical";

export interface ProgressPrimitiveProps {
  size?: ProgressSize;
  orientation?: ProgressOrientation;
}

interface ProgressDesignTokens {
  fontFamily: string;
  fontSize: string;
  lineHeight: number;
  radius: string;
  gap: string;
  trackSize: Record<ProgressSize, string>;
  circleSize: Record<ProgressSize, string>;
  strokeWidth: Record<ProgressSize, string>;
  neutral: {
    track: string;
    text: string;
  };
  brand: {
    primary: string;
  };
  motion: {
    duration: string;
    easing: string;
  };
}

const extractProgressTokens = (theme: LoongArkTheme): ProgressDesignTokens => {
  const typography = theme.tokens.typography as TokenTree;
  const fontFamily = asTokenTree(typography.fontFamily);
  const fontSize = asTokenTree(typography.fontSize);
  const lineHeight = asTokenTree(typography.lineHeight);

  const space = asTokenTree(theme.tokens.space);
  const componentSpace = asTokenTree(space.component);
  const radius = asTokenTree(theme.tokens.radius);

  const color = theme.tokens.color as TokenTree;
  const brand = asTokenTree(color.brand);
  const neutral = asTokenTree(color.neutral);

  const motion = theme.tokens.motion as TokenTree;
  const duration = asTokenTree(motion.duration);
  const easing = asTokenTree(motion.easing);

  return {
    fontFamily: toStringToken(fontFamily.body, "sans-serif"),
    fontSize: toStringToken(fontSize.sm, "14px"),
    lineHeight: toNumberToken(lineHeight.base, 1.5),
    radius: toStringToken(radius.sm, "4px"),
    gap: toStringToken(componentSpace.xs, "4px"),
    trackSize: {
      sm: toStringToken(componentSpace.xs, "4px"),
      md: toStringToken(componentSpace.sm, "8px"),
      lg: toStringToken(componentSpace.md, "12px"),
    },
    circleSize: {
      sm: toStringToken(componentSpace.xl, "56px"),
      md: toStringToken(componentSpace.xl, "72px"),
      lg: toStringToken(componentSpace.xl, "88px"),
    },
    strokeWidth: {
      sm: "4",
      md: "6",
      lg: "8",
    },
    neutral: {
      track: toStringToken(neutral["100"], "#E5E6EB"),
      text: toStringToken(neutral["700"], "#232325"),
    },
    brand: {
      primary: toStringToken(brand.primary, "#006EFF"),
    },
    motion: {
      duration: toStringToken(duration.base, "200ms"),
      easing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
    },
  };
};

const buildProgressStyles = (theme: LoongArkTheme): string => {
  const tokens = extractProgressTokens(theme);
  const scopeSelector = `[data-scope="progress"]`;
  const rootSelector = `${scopeSelector}[data-part="root"]`;
  const labelSelector = `${scopeSelector}[data-part="label"]`;
  const valueSelector = `${scopeSelector}[data-part="value-text"]`;
  const trackSelector = `${scopeSelector}[data-part="track"]`;
  const rangeSelector = `${scopeSelector}[data-part="range"]`;
  const viewSelector = `${scopeSelector}[data-part="view"]`;
  const circleSelector = `${scopeSelector}[data-part="circle"]`;
  const circleTrackSelector = `${scopeSelector}[data-part="circle-track"]`;
  const circleRangeSelector = `${scopeSelector}[data-part="circle-range"]`;

  return `
@media (prefers-reduced-motion: reduce) {
  :root:not([data-lk-motion="force"]) * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

${rootSelector} {
  display: inline-flex;
  flex-direction: column;
  gap: ${tokens.gap};
  color: ${tokens.neutral.text};
  font-family: ${tokens.fontFamily};
  font-size: ${tokens.fontSize};
  line-height: ${tokens.lineHeight};
  --lk-progress-track-size: ${tokens.trackSize.md};
  --lk-progress-circle-size: ${tokens.circleSize.md};
  --lk-progress-stroke-width: ${tokens.strokeWidth.md};
}

${rootSelector}[data-size="sm"] {
  --lk-progress-track-size: ${tokens.trackSize.sm};
  --lk-progress-circle-size: ${tokens.circleSize.sm};
  --lk-progress-stroke-width: ${tokens.strokeWidth.sm};
}

${rootSelector}[data-size="lg"] {
  --lk-progress-track-size: ${tokens.trackSize.lg};
  --lk-progress-circle-size: ${tokens.circleSize.lg};
  --lk-progress-stroke-width: ${tokens.strokeWidth.lg};
}

${labelSelector},
${valueSelector} {
  font-family: ${tokens.fontFamily};
  font-size: ${tokens.fontSize};
  line-height: ${tokens.lineHeight};
  color: ${tokens.neutral.text};
}

${trackSelector} {
  width: 100%;
  height: var(--lk-progress-track-size);
  background: ${tokens.neutral.track};
  border-radius: ${tokens.radius};
  overflow: hidden;
  position: relative;
}

${rangeSelector} {
  height: 100%;
  background: ${tokens.brand.primary};
  border-radius: inherit;
  transition: width ${tokens.motion.duration} ${tokens.motion.easing},
    height ${tokens.motion.duration} ${tokens.motion.easing};
}

${rootSelector}[data-orientation="vertical"] ${trackSelector} {
  width: var(--lk-progress-track-size);
  height: 140px;
}

${rootSelector}[data-orientation="vertical"] ${rangeSelector} {
  width: 100%;
  height: auto;
}

${viewSelector} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

${circleSelector} {
  width: var(--lk-progress-circle-size);
  height: var(--lk-progress-circle-size);
  transform: rotate(-90deg);
}

${circleTrackSelector},
${circleRangeSelector} {
  fill: none;
  stroke-width: var(--lk-progress-stroke-width);
  transition: stroke-dashoffset ${tokens.motion.duration} ${tokens.motion.easing};
}

${circleTrackSelector} {
  stroke: ${tokens.neutral.track};
}

${circleRangeSelector} {
  stroke: ${tokens.brand.primary};
  stroke-linecap: round;
}
`;
};

const PROGRESS_CONTRACT: PrimitiveContract<ProgressPrimitiveProps> = {
  name: "progress",
  tokens: [
    "color.neutral.100",
    "color.neutral.700",
    "color.brand.primary",
    "typography.fontFamily.body",
    "typography.fontSize.sm",
    "typography.lineHeight.base",
    "space.component.xs",
    "space.component.sm",
    "space.component.md",
    "space.component.xl",
    "radius.sm",
    "motion.duration.base",
    "motion.easing.standard",
  ],
  defaults: {
    size: "md",
    orientation: "horizontal",
  },
};

const progressPrimitive = createPrimitive<ProgressPrimitiveProps>(
  PROGRESS_CONTRACT,
  (theme) => {
    const css = buildProgressStyles(theme);
    mountPrimitiveStyles(`progress-${theme.mode}`, css);
  }
);

registerPrimitive(progressPrimitive);

export { progressPrimitive };
