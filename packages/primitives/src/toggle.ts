/**
 * Toggle primitive styles.
 * Uses Ark UI Toggle data attributes.
 */
import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type ToggleSize = "sm" | "md" | "lg";

export interface TogglePrimitiveProps {
  size?: ToggleSize;
}

interface ToggleDesignTokens {
  fontFamily: string;
  fontSize: Record<ToggleSize, string>;
  lineHeight: number;
  fontWeight: number;
  paddingY: Record<ToggleSize, string>;
  paddingX: Record<ToggleSize, string>;
  radius: Record<ToggleSize, string>;
  gap: string;
  brand: {
    primary: string;
    secondary: string;
    accent: string;
  };
  neutral: {
    surface: string;
    surfaceRaised: string;
    border: string;
    text: string;
    inverse: string;
    disabled: string;
  };
  motion: {
    duration: string;
    easing: string;
  };
}

const extractToggleTokens = (theme: LoongArkTheme): ToggleDesignTokens => {
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
      lg: toStringToken(componentSpace.lg, "24px"),
    },
    radius: {
      sm: toStringToken(radius.sm, "4px"),
      md: toStringToken(radius.md, "8px"),
      lg: toStringToken(radius.lg, "16px"),
    },
    gap: toStringToken(componentSpace.xs, "4px"),
    brand: {
      primary: toStringToken(brand.primary, "#006EFF"),
      secondary: toStringToken(brand.secondary, "#0A3565"),
      accent: toStringToken(brand.accent, "#5AC8FA"),
    },
    neutral: {
      surface: toStringToken(neutral["50"], "#F5F6FA"),
      surfaceRaised: toStringToken(neutral["100"], "#E5E6EB"),
      border: toStringToken(neutral["100"], "#E5E6EB"),
      text: toStringToken(neutral["700"], "#232325"),
      inverse: toStringToken(neutral["50"], "#F5F6FA"),
      disabled: toStringToken(neutral["300"], "#B3B4BD"),
    },
    motion: {
      duration: toStringToken(duration.base, "200ms"),
      easing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
    },
  };
};

const buildToggleStyles = (theme: LoongArkTheme): string => {
  const tokens = extractToggleTokens(theme);
  const root = `[data-scope="toggle"][data-part="root"]`;
  const indicator = `[data-scope="toggle"][data-part="indicator"]`;
  const interactiveRoot =
    `${root}:not([disabled]):not([data-disabled='true'])`;

  return `
  @media (prefers-reduced-motion: reduce) {
    :root:not([data-lk-motion="force"]) [data-scope="toggle"] * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  ${root} {
    appearance: none;
    border: 1px solid ${tokens.neutral.border};
    border-radius: ${tokens.radius.md};
    background: ${tokens.neutral.surface};
    color: ${tokens.neutral.text};
    font-family: ${tokens.fontFamily};
    font-weight: ${tokens.fontWeight};
    font-size: ${tokens.fontSize.md};
    line-height: ${tokens.lineHeight};
    padding: ${tokens.paddingY.md} ${tokens.paddingX.md};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${tokens.gap};
    min-height: calc(${tokens.paddingY.md} * 2 + ${tokens.fontSize.md});
    cursor: pointer;
    transition:
      background ${tokens.motion.duration} ${tokens.motion.easing},
      color ${tokens.motion.duration} ${tokens.motion.easing},
      border-color ${tokens.motion.duration} ${tokens.motion.easing},
      box-shadow ${tokens.motion.duration} ${tokens.motion.easing};
  }

  ${interactiveRoot}:hover {
    background: ${tokens.neutral.surfaceRaised};
  }

  ${root}[data-state="on"] {
    background: ${tokens.brand.primary};
    border-color: ${tokens.brand.primary};
    color: ${tokens.neutral.inverse};
  }

  ${interactiveRoot}[data-state="on"]:hover {
    background: ${tokens.brand.secondary};
    border-color: ${tokens.brand.secondary};
  }

  ${root}[data-disabled="true"],
  ${root}[disabled] {
    background: ${tokens.neutral.surface};
    color: ${tokens.neutral.disabled};
    border-color: ${tokens.neutral.border};
    cursor: not-allowed;
    opacity: 0.7;
    box-shadow: none;
  }

  ${root}:focus-visible {
    outline: none;
    box-shadow: 0 0 0 1px ${tokens.neutral.inverse}, 0 0 0 4px ${tokens.brand.accent};
  }

  ${indicator} {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: currentColor;
  }

  ${root}[data-size="sm"] {
    font-size: ${tokens.fontSize.sm};
    padding: ${tokens.paddingY.sm} ${tokens.paddingX.sm};
    border-radius: ${tokens.radius.sm};
  }

  ${root}[data-size="lg"] {
    font-size: ${tokens.fontSize.lg};
    padding: ${tokens.paddingY.lg} ${tokens.paddingX.lg};
    border-radius: ${tokens.radius.lg};
  }
  `;
};

const toggleContract: PrimitiveContract<TogglePrimitiveProps> = {
  name: "toggle",
  tokens: [
    "color.brand.primary",
    "color.brand.secondary",
    "color.brand.accent",
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.300",
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
  },
};

const TogglePrimitive = createPrimitive(toggleContract, (theme) => {
  const css = buildToggleStyles(theme);
  mountPrimitiveStyles(`toggle-${theme.mode}`, css);
});

registerPrimitive(TogglePrimitive);

export { TogglePrimitive };
