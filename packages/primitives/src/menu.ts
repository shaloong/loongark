/**
 * Menu Primitive - menu styles
 * Matches Ark UI Menu data attributes.
 */
import { type LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, type PrimitiveContract, registerPrimitive } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type MenuSize = "sm" | "md" | "lg";

export interface MenuPrimitiveProps {
  size?: MenuSize;
}

interface MenuDesignTokens {
  fontFamily: string;
  fontSize: Record<MenuSize, string>;
  lineHeight: number;
  fontWeight: number;
  paddingY: Record<MenuSize, string>;
  paddingX: Record<MenuSize, string>;
  radius: Record<MenuSize, string>;
  contentPadding: string;
  gap: string;
  arrowSize: string;
  neutral: {
    surface: string;
    surfaceRaised: string;
    border: string;
    text: string;
    textMuted: string;
  };
  brand: {
    primary: string;
    accent: string;
    subtle: string;
  };
  motion: {
    duration: string;
    easing: string;
  };
  shadow: string;
  zIndex: number;
}

const extractMenuTokens = (theme: LoongArkTheme): MenuDesignTokens => {
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

  const shadow = asTokenTree(theme.tokens.shadow);
  const zIndex = asTokenTree(theme.tokens.zIndex);

  return {
    fontFamily: toStringToken(fontFamily.body, "sans-serif"),
    fontSize: {
      sm: toStringToken(fontSize.sm, "14px"),
      md: toStringToken(fontSize.md, "16px"),
      lg: toStringToken(fontSize.lg, "20px"),
    },
    lineHeight: toNumberToken(lineHeight.base, 1.5),
    fontWeight: toNumberToken(fontWeight.regular, 400),
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
      md: toStringToken(radius.md, "6px"),
      lg: toStringToken(radius.lg, "8px"),
    },
    contentPadding: toStringToken(componentSpace.xs, "4px"),
    gap: toStringToken(componentSpace.xs, "4px"),
    arrowSize: toStringToken(componentSpace.sm, "8px"),
    neutral: {
      surface: toStringToken(neutral["50"], "#FFFFFF"),
      surfaceRaised: toStringToken(neutral["100"], "#F2F2F2"),
      border: toStringToken(neutral["100"], "#E5E6EB"),
      text: toStringToken(neutral["700"], "#232325"),
      textMuted: toStringToken(neutral["500"], "#767680"),
    },
    brand: {
      primary: toStringToken(brand.primary, "#006EFF"),
      accent: toStringToken(brand.accent, "#5AC8FA"),
      subtle: toStringToken(brand.subtle, "#EFF6FF"),
    },
    motion: {
      duration: toStringToken(duration.base, "200ms"),
      easing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
    },
    shadow: toStringToken(shadow.popover, "0 12px 48px rgba(0, 0, 0, 0.18)"),
    zIndex: toNumberToken(zIndex.popover, 1100),
  };
};

const buildMenuStyles = (theme: LoongArkTheme): string => {
  const tokens = extractMenuTokens(theme);

  return `
  @keyframes menuFadeIn {
    from { opacity: 0; transform: translateY(-4px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes menuFadeOut {
    from { opacity: 1; transform: translateY(0) scale(1); }
    to { opacity: 0; transform: translateY(-4px) scale(0.98); }
  }

  @media (prefers-reduced-motion: reduce) {
    :root:not([data-lk-motion="force"]) [data-scope="menu"] * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  [data-scope="menu"][data-part="positioner"] {
    z-index: ${tokens.zIndex};
  }

  [data-scope="menu"][data-part="content"] {
    --menu-arrow-size: ${tokens.arrowSize};
    --menu-arrow-bg: ${tokens.neutral.surface};
    --menu-arrow-border: ${tokens.neutral.border};
    min-width: 200px;
    padding: ${tokens.contentPadding};
    border: 1px solid ${tokens.neutral.border};
    border-radius: ${tokens.radius.md};
    background: ${tokens.neutral.surface};
    box-shadow: ${tokens.shadow};
    color: ${tokens.neutral.text};
    font-family: ${tokens.fontFamily};
    font-size: ${tokens.fontSize.md};
    line-height: ${tokens.lineHeight};
    outline: none;
    animation-duration: ${tokens.motion.duration};
    animation-timing-function: ${tokens.motion.easing};
  }

  [data-scope="menu"][data-part="content"][data-state="open"] {
    animation-name: menuFadeIn;
  }

  [data-scope="menu"][data-part="content"][data-state="closed"] {
    animation-name: menuFadeOut;
  }

  [data-scope="menu"][data-part="item"],
  [data-scope="menu"][data-part="trigger-item"] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${tokens.gap};
    padding: ${tokens.paddingY.md} ${tokens.paddingX.md};
    border-radius: ${tokens.radius.sm};
    font-family: ${tokens.fontFamily};
    font-size: ${tokens.fontSize.md};
    font-weight: ${tokens.fontWeight};
    color: ${tokens.neutral.text};
    cursor: pointer;
    transition: background-color 120ms ease, color 120ms ease;
    outline: none;
  }

  [data-scope="menu"][data-part="item"]:hover,
  [data-scope="menu"][data-part="item"][data-highlighted],
  [data-scope="menu"][data-part="trigger-item"]:hover,
  [data-scope="menu"][data-part="trigger-item"][data-highlighted] {
    background-color: ${tokens.neutral.surfaceRaised};
  }

  [data-scope="menu"][data-part="item"][data-state="checked"],
  [data-scope="menu"][data-part="trigger-item"][data-state="checked"] {
    background-color: ${tokens.brand.subtle};
    color: ${tokens.brand.primary};
    font-weight: 500;
  }

  [data-scope="menu"][data-part="item"][data-disabled],
  [data-scope="menu"][data-part="trigger-item"][data-disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  [data-scope="menu"][data-part="item-text"] {
    flex: 1;
    min-width: 0;
  }

  [data-scope="menu"][data-part="item-text"][data-disabled] {
    color: ${tokens.neutral.textMuted};
  }

  [data-scope="menu"][data-part="item-indicator"] {
    display: inline-flex;
    align-items: center;
    color: ${tokens.brand.primary};
  }

  [data-scope="menu"][data-part="item-indicator"][data-state] {
    opacity: 0;
  }

  [data-scope="menu"][data-part="item-indicator"][data-state="checked"] {
    opacity: 1;
  }

  [data-scope="menu"][data-part="indicator"] {
    display: inline-flex;
    align-items: center;
    color: ${tokens.neutral.textMuted};
    transition: transform ${tokens.motion.duration} ${tokens.motion.easing};
  }

  [data-scope="menu"][data-part="indicator"][data-state="open"] {
    transform: rotate(180deg);
  }

  [data-scope="menu"][data-part="separator"] {
    height: 1px;
    margin: ${tokens.gap} 0;
    background: ${tokens.neutral.border};
  }

  [data-scope="menu"][data-part="item-group"] {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  [data-scope="menu"][data-part="item-group-label"] {
    padding: ${tokens.paddingY.sm} ${tokens.paddingX.md};
    font-size: ${tokens.fontSize.sm};
    color: ${tokens.neutral.textMuted};
  }

  [data-scope="menu"][data-part="arrow"] {
    width: var(--menu-arrow-size);
    height: var(--menu-arrow-size);
  }

  [data-scope="menu"][data-part="arrow-tip"] {
    width: var(--menu-arrow-size);
    height: var(--menu-arrow-size);
    background: var(--menu-arrow-bg);
    border: 1px solid var(--menu-arrow-border);
    transform: rotate(45deg);
  }

  [data-scope="menu"][data-part="content"][data-size="sm"] {
    font-size: ${tokens.fontSize.sm};
  }

  [data-scope="menu"][data-part="content"][data-size="lg"] {
    font-size: ${tokens.fontSize.lg};
  }

  [data-scope="menu"][data-part="content"][data-size="sm"] [data-scope="menu"][data-part="item"],
  [data-scope="menu"][data-part="content"][data-size="sm"] [data-scope="menu"][data-part="trigger-item"] {
    padding: ${tokens.paddingY.sm} ${tokens.paddingX.sm};
    font-size: ${tokens.fontSize.sm};
    border-radius: ${tokens.radius.sm};
  }

  [data-scope="menu"][data-part="content"][data-size="lg"] [data-scope="menu"][data-part="item"],
  [data-scope="menu"][data-part="content"][data-size="lg"] [data-scope="menu"][data-part="trigger-item"] {
    padding: ${tokens.paddingY.lg} ${tokens.paddingX.lg};
    font-size: ${tokens.fontSize.lg};
    border-radius: ${tokens.radius.lg};
  }

  [data-scope="menu"][data-part="content"][data-size="sm"] [data-scope="menu"][data-part="item-group-label"] {
    padding: ${tokens.paddingY.sm} ${tokens.paddingX.sm};
    font-size: ${tokens.fontSize.sm};
  }

  [data-scope="menu"][data-part="content"][data-size="lg"] [data-scope="menu"][data-part="item-group-label"] {
    padding: ${tokens.paddingY.lg} ${tokens.paddingX.lg};
    font-size: ${tokens.fontSize.lg};
  }

  [data-scope="menu"][data-part="content"]:focus-visible {
    box-shadow: 0 0 0 1px ${tokens.neutral.surface}, 0 0 0 4px ${tokens.brand.accent};
  }
  `;
};

const menuContract: PrimitiveContract<MenuPrimitiveProps> = {
  name: "menu",
  tokens: [
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.500",
    "color.neutral.700",
    "color.brand.primary",
    "color.brand.accent",
    "color.brand.subtle",
    "typography.fontFamily.body",
    "typography.fontSize.sm",
    "typography.fontSize.md",
    "typography.fontSize.lg",
    "typography.lineHeight.base",
    "typography.fontWeight.regular",
    "space.component.xs",
    "space.component.sm",
    "space.component.md",
    "space.component.lg",
    "radius.sm",
    "radius.md",
    "radius.lg",
    "motion.duration.base",
    "motion.easing.standard",
    "shadow.popover",
    "zIndex.popover",
  ],
  defaults: {
    size: "md",
  },
};

const MenuPrimitive = createPrimitive(menuContract, (theme) => {
  const css = buildMenuStyles(theme);
  mountPrimitiveStyles(`menu-${theme.mode}`, css);
});

registerPrimitive(MenuPrimitive);

export { MenuPrimitive };
