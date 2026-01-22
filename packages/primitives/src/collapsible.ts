/**
 * Collapsible primitive styles.
 * Uses Ark UI Collapsible data attributes.
 */
import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type CollapsibleSize = "sm" | "md" | "lg";

export interface CollapsiblePrimitiveProps {
  size?: CollapsibleSize;
}

interface CollapsibleDesignTokens {
  fontFamily: string;
  fontSize: Record<CollapsibleSize, string>;
  lineHeight: number;
  fontWeight: number;
  paddingY: Record<CollapsibleSize, string>;
  paddingX: Record<CollapsibleSize, string>;
  contentPadding: Record<CollapsibleSize, string>;
  radius: Record<CollapsibleSize, string>;
  gap: string;
  border: string;
  surface: string;
  surfaceRaised: string;
  text: string;
  textMuted: string;
  disabledText: string;
  brand: {
    primary: string;
    secondary: string;
    accent: string;
  };
  motion: {
    duration: string;
    easing: string;
  };
}

const extractCollapsibleTokens = (
  theme: LoongArkTheme
): CollapsibleDesignTokens => {
  const typography = theme.tokens.typography as TokenTree;
  const fontFamily = asTokenTree(typography.fontFamily);
  const fontSize = asTokenTree(typography.fontSize);
  const lineHeight = asTokenTree(typography.lineHeight);
  const fontWeight = asTokenTree(typography.fontWeight);

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
    contentPadding: {
      sm: toStringToken(componentSpace.sm, "8px"),
      md: toStringToken(componentSpace.md, "16px"),
      lg: toStringToken(componentSpace.lg, "24px"),
    },
    radius: {
      sm: toStringToken(radius.sm, "4px"),
      md: toStringToken(radius.md, "8px"),
      lg: toStringToken(radius.lg, "16px"),
    },
    gap: toStringToken(componentSpace.sm, "8px"),
    border: toStringToken(neutral["100"], "#E5E6EB"),
    surface: toStringToken(neutral["50"], "#F5F6FA"),
    surfaceRaised: toStringToken(neutral["100"], "#E5E6EB"),
    text: toStringToken(neutral["700"], "#232325"),
    textMuted: toStringToken(neutral["500"], "#3A3A3C"),
    disabledText: toStringToken(neutral["300"], "#B3B4BD"),
    brand: {
      primary: toStringToken(brand.primary, "#006EFF"),
      secondary: toStringToken(brand.secondary, "#0A3565"),
      accent: toStringToken(brand.accent, "#5AC8FA"),
    },
    motion: {
      duration: toStringToken(duration.base, "200ms"),
      easing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
    },
  };
};

const buildCollapsibleStyles = (theme: LoongArkTheme): string => {
  const tokens = extractCollapsibleTokens(theme);
  const scope = `[data-scope="collapsible"]`;
  const root = `${scope}[data-part="root"]`;
  const trigger = `${scope}[data-part="trigger"]`;
  const content = `${scope}[data-part="content"]`;
  const indicator = `${scope}[data-part="indicator"]`;
  const interactiveTrigger = `${trigger}:not([disabled]):not([data-disabled='true'])`;

  return `
  @media (prefers-reduced-motion: reduce) {
    :root:not([data-lk-motion="force"]) [data-scope="collapsible"] * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  ${root} {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid ${tokens.border};
    border-radius: ${tokens.radius.md};
    background: ${tokens.surface};
    transition: border-color ${tokens.motion.duration} ${tokens.motion.easing};
  }

  ${root}[data-state="open"] {
    border-color: ${tokens.brand.primary};
  }

  ${trigger} {
    appearance: none;
    border: none;
    background: transparent;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${tokens.gap};
    padding: ${tokens.paddingY.md} ${tokens.paddingX.md};
    font-family: ${tokens.fontFamily};
    font-size: ${tokens.fontSize.md};
    font-weight: ${tokens.fontWeight};
    line-height: ${tokens.lineHeight};
    color: ${tokens.text};
    cursor: pointer;
    border-radius: inherit;
    transition:
      color ${tokens.motion.duration} ${tokens.motion.easing},
      background ${tokens.motion.duration} ${tokens.motion.easing};
  }

  ${interactiveTrigger}:hover {
    background: ${tokens.surfaceRaised};
    color: ${tokens.text};
  }

  ${trigger}[data-state="open"] {
    color: ${tokens.brand.primary};
  }

  ${interactiveTrigger}[data-state="open"]:hover {
    color: ${tokens.brand.secondary};
  }

  ${trigger}[data-disabled="true"],
  ${trigger}[disabled] {
    color: ${tokens.disabledText};
    cursor: not-allowed;
    background: transparent;
  }

  ${trigger}:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${tokens.brand.accent};
  }

  ${content} {
    border-top: 1px solid ${tokens.border};
    padding: ${tokens.contentPadding.md};
    font-family: ${tokens.fontFamily};
    font-size: ${tokens.fontSize.md};
    line-height: ${tokens.lineHeight};
    color: ${tokens.textMuted};
    overflow: hidden;
    height: var(--height);
    opacity: 1;
    transition:
      height ${tokens.motion.duration} ${tokens.motion.easing},
      opacity ${tokens.motion.duration} ${tokens.motion.easing},
      padding ${tokens.motion.duration} ${tokens.motion.easing};
  }

  ${content}[data-state="closed"] {
    height: var(--collapsed-height, 0px);
    opacity: 0;
    padding-top: 0;
    padding-bottom: 0;
    border-top-color: transparent;
  }

  ${content}[data-disabled="true"] {
    color: ${tokens.disabledText};
  }

  ${indicator} {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${tokens.textMuted};
    transition: transform ${tokens.motion.duration} ${tokens.motion.easing};
  }

  ${indicator}[data-state="open"] {
    transform: rotate(90deg);
    color: ${tokens.brand.primary};
  }

  ${root}[data-size="sm"] {
    border-radius: ${tokens.radius.sm};
  }

  ${root}[data-size="lg"] {
    border-radius: ${tokens.radius.lg};
  }

  ${root}[data-size="sm"] ${trigger} {
    font-size: ${tokens.fontSize.sm};
    padding: ${tokens.paddingY.sm} ${tokens.paddingX.sm};
  }

  ${root}[data-size="lg"] ${trigger} {
    font-size: ${tokens.fontSize.lg};
    padding: ${tokens.paddingY.lg} ${tokens.paddingX.lg};
  }

  ${root}[data-size="sm"] ${content} {
    font-size: ${tokens.fontSize.sm};
    padding: ${tokens.contentPadding.sm};
  }

  ${root}[data-size="lg"] ${content} {
    font-size: ${tokens.fontSize.lg};
    padding: ${tokens.contentPadding.lg};
  }
  `;
};

const collapsibleContract: PrimitiveContract<CollapsiblePrimitiveProps> = {
  name: "collapsible",
  tokens: [
    "color.brand.primary",
    "color.brand.secondary",
    "color.brand.accent",
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.300",
    "color.neutral.500",
    "color.neutral.700",
    "typography.fontFamily.body",
    "typography.fontSize.sm",
    "typography.fontSize.md",
    "typography.fontSize.lg",
    "typography.lineHeight.base",
    "typography.fontWeight.medium",
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
  },
};

const CollapsiblePrimitive = createPrimitive(
  collapsibleContract,
  (theme) => {
    const css = buildCollapsibleStyles(theme);
    mountPrimitiveStyles(`collapsible-${theme.mode}`, css);
  }
);

registerPrimitive(CollapsiblePrimitive);

export { CollapsiblePrimitive };
