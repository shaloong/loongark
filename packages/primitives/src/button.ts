import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonPrimitiveProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

interface ButtonDesignTokens {
  fontFamily: string;
  fontWeight: number;
  fontSize: Record<ButtonSize, string>;
  lineHeight: number;
  radius: Record<ButtonSize, string>;
  paddingY: Record<ButtonSize, string>;
  paddingX: Record<ButtonSize, string>;
  gap: string;
  brand: {
    primary: string;
    secondary: string;
    accent: string;
  };
  neutral: {
    surface: string;
    border: string;
    inverse: string;
  };
  disabled: {
    bg: string;
    text: string;
  };
  motion: {
    duration: string;
    easing: string;
  };
}

const extractButtonTokens = (theme: LoongArkTheme): ButtonDesignTokens => {
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
    fontWeight: toNumberToken(fontWeight.medium, 500),
    fontSize: {
      sm: toStringToken(fontSize.sm, "14px"),
      md: toStringToken(fontSize.md, "16px"),
      lg: toStringToken(fontSize.lg, "20px"),
    },
    lineHeight: toNumberToken(lineHeight.base, 1.5),
    radius: {
      sm: toStringToken(radius.sm, "4px"),
      md: toStringToken(radius.md, "8px"),
      lg: toStringToken(radius.lg, "16px"),
    },
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
    gap: toStringToken(componentSpace.xs, "4px"),
    brand: {
      primary: toStringToken(brand.primary, "#006EFF"),
      secondary: toStringToken(brand.secondary, "#0A3565"),
      accent: toStringToken(brand.accent, "#5AC8FA"),
    },
    neutral: {
      surface: toStringToken(neutral["50"], "#F5F6FA"),
      border: toStringToken(neutral["100"], "#E5E6EB"),
      inverse: toStringToken(neutral["50"], "#F5F6FA"),
    },
    disabled: {
      bg: toStringToken(neutral["100"], "#E5E6EB"),
      text: toStringToken(neutral["300"], "#B3B4BD"),
    },
    motion: {
      duration: toStringToken(duration.base, "200ms"),
      easing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
    },
  };
};

const buildButtonStyles = (theme: LoongArkTheme): string => {
  const tokens = extractButtonTokens(theme);
  const selector = `[data-scope="button"][data-part="root"]`;
  const defaultVariantSelector = `${selector}:not([data-variant])`;
  const solidVariantSelector = `${selector}[data-variant='solid']`;
  const outlineSelector = `${selector}[data-variant='outline']`;
  const ghostSelector = `${selector}[data-variant='ghost']`;
  const interactiveGuard = `:not([disabled]):not([aria-disabled='true']):not([data-loading='true'])`;
  const disabledAttrSelector = `${selector}[disabled]`;
  const ariaDisabledSelector = `${selector}[aria-disabled='true']`;
  const disabledSelector = `${disabledAttrSelector}, ${ariaDisabledSelector}`;
  const solidBaseSelectors = `${defaultVariantSelector}, ${solidVariantSelector}`;
  const solidHoverSelectors = `${defaultVariantSelector}${interactiveGuard}:hover, ${solidVariantSelector}${interactiveGuard}:hover`;
  const solidActiveSelectors = `${defaultVariantSelector}${interactiveGuard}:active, ${solidVariantSelector}${interactiveGuard}:active`;
  const outlineHoverSelectors = `${outlineSelector}${interactiveGuard}:hover`;
  const outlineActiveSelectors = `${outlineSelector}${interactiveGuard}:active`;
  const ghostHoverSelectors = `${ghostSelector}${interactiveGuard}:hover`;
  const ghostActiveSelectors = `${ghostSelector}${interactiveGuard}:active`;
  const disabledOutlineSelectors = `${disabledAttrSelector}[data-variant='outline'], ${ariaDisabledSelector}[data-variant='outline']`;
  const disabledGhostSelectors = `${disabledAttrSelector}[data-variant='ghost'], ${ariaDisabledSelector}[data-variant='ghost']`;

  return `
@media (prefers-reduced-motion: reduce) {
  :root:not([data-lk-motion="force"]) * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

${selector} {
  appearance: none;
  border: 1px solid transparent;
  border-radius: ${tokens.radius.md};
  background: ${tokens.brand.primary};
  color: ${tokens.neutral.inverse};
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
  text-decoration: none;
  white-space: nowrap;
  transition:
    background ${tokens.motion.duration} ${tokens.motion.easing},
    color ${tokens.motion.duration} ${tokens.motion.easing},
    border-color ${tokens.motion.duration} ${tokens.motion.easing},
    box-shadow ${tokens.motion.duration} ${tokens.motion.easing};
}

${selector}[data-block='true'] {
  width: 100%;
}

${selector}[data-size='sm'] {
  font-size: ${tokens.fontSize.sm};
  padding: ${tokens.paddingY.sm} ${tokens.paddingX.sm};
  border-radius: ${tokens.radius.sm};
}

${selector}[data-size='lg'] {
  font-size: ${tokens.fontSize.lg};
  padding: ${tokens.paddingY.lg} ${tokens.paddingX.lg};
  border-radius: ${tokens.radius.lg};
}

${selector}:focus-visible {
  outline: none;
  box-shadow: 0 0 0 1px ${tokens.neutral.inverse}, 0 0 0 4px ${tokens.brand.accent};
}

${selector}[data-loading='true'] {
  cursor: progress;
  opacity: 0.85;
}

${disabledSelector} {
  background: ${tokens.disabled.bg};
  color: ${tokens.disabled.text};
  border-color: ${tokens.disabled.bg};
  cursor: not-allowed;
  opacity: 0.7;
  box-shadow: none;
}

${disabledOutlineSelectors},
${disabledGhostSelectors} {
  background: transparent;
  border-color: ${tokens.disabled.text};
}

${solidBaseSelectors} {
  background: ${tokens.brand.primary};
  border-color: ${tokens.brand.primary};
  color: ${tokens.neutral.inverse};
}

${solidHoverSelectors} {
  background: ${tokens.brand.primary};
  border-color: ${tokens.brand.primary};
  background: color-mix(in srgb, ${tokens.brand.primary} 75%, ${tokens.neutral.surface});
  border-color: color-mix(in srgb, ${tokens.brand.primary} 75%, ${tokens.neutral.surface});
}

${solidActiveSelectors} {
  background: ${tokens.brand.primary};
  border-color: ${tokens.brand.primary};
  background: color-mix(in srgb, ${tokens.brand.primary} 70%, ${tokens.brand.secondary});
  border-color: color-mix(in srgb, ${tokens.brand.primary} 70%, ${tokens.brand.secondary});
}

${outlineSelector} {
  background: transparent;
  border-color: ${tokens.brand.primary};
  color: ${tokens.brand.primary};
}

${outlineHoverSelectors} {
  background: ${tokens.neutral.surface};
}

${outlineActiveSelectors} {
  background: ${tokens.neutral.border};
  border-color: ${tokens.brand.secondary};
}

${ghostSelector} {
  background: transparent;
  border-color: transparent;
  color: ${tokens.brand.primary};
}

${ghostHoverSelectors} {
  background: ${tokens.neutral.surface};
  color: ${tokens.brand.secondary};
}

${ghostActiveSelectors} {
  background: ${tokens.neutral.border};
  color: ${tokens.brand.secondary};
}
`;
};

const BUTTON_CONTRACT: PrimitiveContract<ButtonPrimitiveProps> = {
  name: "button",
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
    variant: "solid",
    size: "md",
    block: false,
    loading: false,
    disabled: false,
  },
};

const buttonPrimitive = createPrimitive<ButtonPrimitiveProps>(
  BUTTON_CONTRACT,
  (theme) => {
    const css = buildButtonStyles(theme);
    mountPrimitiveStyles(`button-${theme.mode}`, css);
  }
);

registerPrimitive(buttonPrimitive);

export { buttonPrimitive };
