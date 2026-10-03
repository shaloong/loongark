/**
 * Accordion primitive styles.
 * Uses Ark UI Accordion data attributes.
 */
import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type AccordionSize = "sm" | "md" | "lg";
export type AccordionOrientation = "horizontal" | "vertical";

export interface AccordionPrimitiveProps {
  size?: AccordionSize;
  orientation?: AccordionOrientation;
}

interface AccordionDesignTokens {
  fontFamily: string;
  fontSize: Record<AccordionSize, string>;
  lineHeight: number;
  fontWeight: number;
  paddingY: Record<AccordionSize, string>;
  paddingX: Record<AccordionSize, string>;
  contentPadding: Record<AccordionSize, string>;
  radius: Record<AccordionSize, string>;
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

const extractAccordionTokens = (
  theme: LoongArkTheme,
): AccordionDesignTokens => {
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

const buildAccordionStyles = (theme: LoongArkTheme): string => {
  const tokens = extractAccordionTokens(theme);
  const scope = `[data-scope="accordion"]`;
  const root = `${scope}[data-part="root"]`;
  const item = `${scope}[data-part="item"]`;
  const trigger = `${scope}[data-part="item-trigger"]`;
  const content = `${scope}[data-part="item-content"]`;
  const indicator = `${scope}[data-part="item-indicator"]`;
  const interactiveTrigger = `${trigger}:not([disabled]):not([data-disabled='true'])`;

  return `

  ${root} {
    display: flex;
    flex-direction: column;
    gap: ${tokens.gap};
    width: 100%;
  }

  ${root}[data-orientation="horizontal"] {
    flex-direction: row;
  }

  ${item} {
    border: 1px solid ${tokens.border};
    border-radius: ${tokens.radius.md};
    background: ${tokens.surface};
    transition: border-color ${tokens.motion.duration} ${tokens.motion.easing};
  }

  ${item}[data-state="open"] {
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
    padding: ${tokens.contentPadding.md};
    font-family: ${tokens.fontFamily};
    font-size: ${tokens.fontSize.md};
    line-height: ${tokens.lineHeight};
    color: ${tokens.textMuted};
    transition:
      opacity ${tokens.motion.duration} ${tokens.motion.easing},
      transform ${tokens.motion.duration} ${tokens.motion.easing};
  }

  ${content}[data-state="closed"] {
    opacity: 0;
    transform: translateY(-4px);
  }

  ${content}[data-state="open"] {
    opacity: 1;
    transform: translateY(0);
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

  ${root}[data-size="sm"] ${item} {
    border-radius: ${tokens.radius.sm};
  }

  ${root}[data-size="lg"] ${item} {
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

const accordionContract: PrimitiveContract<AccordionPrimitiveProps> = {
  name: "accordion",
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
    orientation: "vertical",
  },
};

const AccordionPrimitive = createPrimitive(accordionContract, (theme) => {
  const css = buildAccordionStyles(theme);
  theme.mountStyles(`accordion-${theme.mode}`, css);
});

registerPrimitive(AccordionPrimitive);

export { AccordionPrimitive };
