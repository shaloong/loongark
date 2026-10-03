/**
 * Segment Group primitive styles.
 * Uses Ark UI Toggle Group data attributes with segmented styling.
 */
import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type SegmentGroupSize = "sm" | "md" | "lg";
export type SegmentGroupOrientation = "horizontal" | "vertical";

export interface SegmentGroupPrimitiveProps {
  size?: SegmentGroupSize;
  orientation?: SegmentGroupOrientation;
}

interface SegmentGroupDesignTokens {
  fontFamily: string;
  fontSize: Record<SegmentGroupSize, string>;
  lineHeight: number;
  fontWeight: number;
  paddingY: Record<SegmentGroupSize, string>;
  paddingX: Record<SegmentGroupSize, string>;
  radius: Record<SegmentGroupSize, string>;
  gap: string;
  brand: {
    primary: string;
    accent: string;
    subtle: string;
  };
  neutral: {
    surface: string;
    surfaceRaised: string;
    border: string;
    text: string;
    textMuted: string;
    disabled: string;
  };
  motion: {
    duration: string;
    easing: string;
  };
}

const extractSegmentGroupTokens = (
  theme: LoongArkTheme,
): SegmentGroupDesignTokens => {
  const typography = theme.styleTokens.typography as TokenTree;
  const fontFamily = asTokenTree(typography.fontFamily);
  const fontSize = asTokenTree(typography.fontSize);
  const lineHeight = asTokenTree(typography.lineHeight);
  const fontWeight = asTokenTree(typography.fontWeight);

  const space = asTokenTree(theme.styleTokens.space);
  const componentSpace = asTokenTree(space.component);
  const radius = asTokenTree(theme.styleTokens.radius);

  const color = theme.styleTokens.color as TokenTree;
  const brand = asTokenTree(color.brand);
  const neutral = asTokenTree(color.neutral);

  const motion = theme.styleTokens.motion as TokenTree;
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
    paddingY: {
      sm: toStringToken(componentSpace.xs, "4px"),
      md: toStringToken(componentSpace.sm, "8px"),
      lg: toStringToken(componentSpace.md, "12px"),
    },
    paddingX: {
      sm: toStringToken(componentSpace.sm, "12px"),
      md: toStringToken(componentSpace.md, "16px"),
      lg: toStringToken(componentSpace.lg, "20px"),
    },
    radius: {
      sm: toStringToken(radius.sm, "4px"),
      md: toStringToken(radius.md, "8px"),
      lg: toStringToken(radius.lg, "16px"),
    },
    gap: toStringToken(componentSpace.xs, "4px"),
    brand: {
      primary: toStringToken(brand.primary, "#006EFF"),
      accent: toStringToken(brand.accent, "#5AC8FA"),
      subtle: toStringToken(brand.subtle, "#EFF6FF"),
    },
    neutral: {
      surface: toStringToken(neutral["50"], "#F5F6FA"),
      surfaceRaised: toStringToken(neutral["100"], "#E5E6EB"),
      border: toStringToken(neutral["100"], "#E5E6EB"),
      text: toStringToken(neutral["700"], "#232325"),
      textMuted: toStringToken(neutral["500"], "#3A3A3C"),
      disabled: toStringToken(neutral["300"], "#B3B4BD"),
    },
    motion: {
      duration: toStringToken(duration.base, "200ms"),
      easing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
    },
  };
};

const buildSegmentGroupStyles = (theme: LoongArkTheme): string => {
  const tokens = extractSegmentGroupTokens(theme);
  const root = `[data-scope="segment-group"][data-part="root"]`;
  const item = `[data-scope="segment-group"][data-part="item"]`;
  const interactiveItem = `${item}:not([disabled]):not([data-disabled='true'])`;

  return `

  ${root} {
    display: inline-flex;
    align-items: center;
    gap: ${tokens.gap};
    padding: ${tokens.gap};
    background: ${tokens.neutral.surfaceRaised};
    border: 1px solid ${tokens.neutral.border};
    border-radius: ${tokens.radius.md};
  }

  ${root}[data-orientation="vertical"] {
    flex-direction: column;
    align-items: stretch;
  }

  ${item} {
    appearance: none;
    border: none;
    background: transparent;
    color: var(--lk-color-semantic-mutedforeground);
    font-family: ${tokens.fontFamily};
    font-weight: ${tokens.fontWeight};
    font-size: ${tokens.fontSize.md};
    line-height: ${tokens.lineHeight};
    padding: ${tokens.paddingY.md} ${tokens.paddingX.md};
    border-radius: ${tokens.radius.md};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${tokens.gap};
    min-height: calc(${tokens.paddingY.md} * 2 + ${tokens.fontSize.md});
    cursor: pointer;
    transition:
      background ${tokens.motion.duration} ${tokens.motion.easing},
      color ${tokens.motion.duration} ${tokens.motion.easing},
      box-shadow ${tokens.motion.duration} ${tokens.motion.easing};
  }

  ${interactiveItem}:hover {
    background: ${tokens.neutral.surface};
    color: ${tokens.neutral.text};
  }

  ${item}[data-state="on"] {
    background: ${tokens.brand.subtle};
    color: ${tokens.brand.primary};
  }

  ${item}[data-disabled="true"],
  ${item}[disabled] {
    background: transparent;
    color: ${tokens.neutral.disabled};
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none;
  }

  ${item}:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${tokens.brand.accent};
  }

  ${root}[data-size="sm"] {
    border-radius: ${tokens.radius.sm};
  }

  ${root}[data-size="lg"] {
    border-radius: ${tokens.radius.lg};
  }

  ${root}[data-size="sm"] ${item} {
    font-size: ${tokens.fontSize.sm};
    padding: ${tokens.paddingY.sm} ${tokens.paddingX.sm};
    border-radius: ${tokens.radius.sm};
  }

  ${root}[data-size="lg"] ${item} {
    font-size: ${tokens.fontSize.lg};
    padding: ${tokens.paddingY.lg} ${tokens.paddingX.lg};
    border-radius: ${tokens.radius.lg};
  }
  `;
};

const segmentGroupContract: PrimitiveContract<SegmentGroupPrimitiveProps> = {
  name: "segment-group",
  tokens: [
    "color.brand.primary",
    "color.brand.accent",
    "color.brand.subtle",
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.300",
    "color.neutral.500",
    "color.neutral.700",
    "typography.fontFamily.body",
    "typography.fontWeight.medium",
    "typography.fontSize.sm",
    "typography.fontSize.md",
    "typography.fontSize.lg",
    "typography.lineHeight.base",
    "space.component.xs",
    "space.component.sm",
    "space.component.md",
    "space.component.lg",
    "radius.sm",
    "radius.md",
    "radius.lg",
    "motion.duration.base",
    "motion.easing.standard",
  ],
  defaults: {
    size: "md",
    orientation: "horizontal",
  },
};

const SegmentGroupPrimitive = createPrimitive(segmentGroupContract, (theme) => {
  const css = buildSegmentGroupStyles(theme);
  theme.mountStyles(`segment-group-${theme.mode}`, css);
});

registerPrimitive(SegmentGroupPrimitive);

export { SegmentGroupPrimitive };
