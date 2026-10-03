/**
 * Combobox Primitive - searchable input + list styles.
 * Matches Ark UI Combobox data attributes.
 */
import { type LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import {
  createPrimitive,
  type PrimitiveContract,
  registerPrimitive,
} from "./core";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type ComboboxSize = "sm" | "md" | "lg";

export interface ComboboxPrimitiveProps {
  size?: ComboboxSize;
}

interface ComboboxDesignTokens {
  fontFamily: string;
  fontSize: Record<ComboboxSize, string>;
  lineHeight: number;
  fontWeight: number;
  paddingY: Record<ComboboxSize, string>;
  paddingX: Record<ComboboxSize, string>;
  radius: Record<ComboboxSize, string>;
  gap: string;
  neutral: {
    surface: string;
    surfaceRaised: string;
    border: string;
    borderHover: string;
    text: string;
    textMuted: string;
    placeholder: string;
  };
  disabled: {
    bg: string;
    text: string;
    border: string;
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
}

const extractComboboxTokens = (theme: LoongArkTheme): ComboboxDesignTokens => {
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
    gap: toStringToken(componentSpace.xs, "4px"),
    neutral: {
      surface: toStringToken(neutral["50"], "#FFFFFF"),
      surfaceRaised: toStringToken(neutral["100"], "#F2F2F2"),
      border: toStringToken(neutral["100"], "#E5E6EB"),
      borderHover: toStringToken(neutral["300"], "#B3B4BD"),
      text: toStringToken(neutral["700"], "#232325"),
      textMuted: toStringToken(neutral["500"], "#767680"),
      placeholder: toStringToken(neutral["300"], "#B3B4BD"),
    },
    disabled: {
      bg: toStringToken(neutral["100"], "#E5E6EB"),
      text: toStringToken(neutral["300"], "#B3B4BD"),
      border: toStringToken(neutral["200"], "#D5D7DE"),
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
    shadow: "0 8px 40px rgba(0, 0, 0, 0.08)",
  };
};

const buildComboboxStyles = (theme: LoongArkTheme): string => {
  const tokens = extractComboboxTokens(theme);
  const zIndex = (theme.styleTokens as any).zIndex || {};

  return `
    @keyframes comboboxSlideDown {
      from { opacity: 0; transform: translateY(-2px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes comboboxSlideUp {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-2px); }
    }


    [data-scope="combobox"][data-part="root"] {
      display: flex;
      flex-direction: column;
      gap: ${tokens.gap};
      width: 100%;
    }

    [data-scope="combobox"][data-part="label"] {
      color: ${tokens.neutral.text};
      font-family: ${tokens.fontFamily};
      font-size: ${tokens.fontSize.sm};
      font-weight: 500;
      cursor: pointer;
    }

    [data-scope="combobox"][data-part="control"] {
      display: flex;
      align-items: center;
      width: 100%;
      min-height: 40px;
      padding: ${tokens.paddingY.md} ${tokens.paddingX.md};
      gap: ${tokens.gap};
      border: 1px solid ${tokens.neutral.border};
      border-radius: ${tokens.radius.md};
      background-color: ${tokens.neutral.surface};
      color: ${tokens.neutral.text};
      font-family: ${tokens.fontFamily};
      font-size: ${tokens.fontSize.md};
      line-height: ${tokens.lineHeight};
      transition: background-color ${tokens.motion.duration} ${tokens.motion.easing}, border-color ${tokens.motion.duration} ${tokens.motion.easing}, box-shadow ${tokens.motion.duration} ${tokens.motion.easing};
      outline: none;
      cursor: text;
    }

    [data-scope="combobox"][data-part="control"]:hover {
      background-color: ${tokens.neutral.surfaceRaised};
      border-color: ${tokens.neutral.borderHover};
    }

    [data-scope="combobox"][data-part="control"]:focus-within,
    [data-scope="combobox"][data-part="control"][data-state="open"] {
      border-color: ${tokens.brand.primary};
    }

    [data-scope="combobox"][data-part="control"][data-disabled],
    [data-scope="combobox"][data-part="root"][data-disabled]
      [data-scope="combobox"][data-part="control"] {
      cursor: not-allowed;
      opacity: 0.85;
      background-color: ${tokens.disabled.bg};
      border-color: ${tokens.disabled.border};
      color: ${tokens.disabled.text};
    }

    [data-scope="combobox"][data-part="input"] {
      flex: 1;
      min-width: 0;
      border: none;
      background: transparent;
      outline: none;
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      line-height: ${tokens.lineHeight};
      padding: 0;
    }

    [data-scope="combobox"][data-part="input"]::placeholder {
      color: var(--lk-color-semantic-mutedforeground);
    }

    [data-scope="combobox"][data-part="trigger"],
    [data-scope="combobox"][data-part="clear-trigger"] {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      padding: 0;
      color: var(--lk-color-semantic-mutedforeground);
      cursor: pointer;
      transition: color ${tokens.motion.duration} ${tokens.motion.easing};
    }

    [data-scope="combobox"][data-part="trigger"]:hover,
    [data-scope="combobox"][data-part="clear-trigger"]:hover {
      color: ${tokens.neutral.text};
    }

    [data-scope="combobox"][data-part="positioner"] {
      z-index: ${zIndex?.popover || 1000};
    }

    [data-scope="combobox"][data-part="content"] {
      background-color: ${tokens.neutral.surface};
      border-radius: ${tokens.radius.md};
      border: 1px solid ${tokens.neutral.border};
      box-shadow: ${tokens.shadow};
      padding: 4px;
      min-width: 220px;
      outline: none;
      animation-duration: ${tokens.motion.duration};
      animation-timing-function: ${tokens.motion.easing};
      pointer-events: auto;
    }

    [data-scope="combobox"][data-part="content"][data-state="open"] {
      animation-name: comboboxSlideDown;
    }

    [data-scope="combobox"][data-part="content"][data-state="closed"] {
      animation-name: comboboxSlideUp;
    }

    [data-scope="combobox"][data-part="list"] {
      display: flex;
      flex-direction: column;
    }

    [data-scope="combobox"][data-part="item"] {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: ${tokens.paddingY.md} ${tokens.paddingX.md};
      border-radius: ${tokens.radius.sm};
      cursor: pointer;
      font-family: ${tokens.fontFamily};
      font-size: ${tokens.fontSize.md};
      color: ${tokens.neutral.text};
      transition: background-color 0.1s ease;
      outline: none;
      margin-bottom: 1px;
    }

    [data-scope="combobox"][data-part="item"]:hover,
    [data-scope="combobox"][data-part="item"][data-highlighted] {
      background-color: ${tokens.neutral.surfaceRaised};
      color: ${tokens.neutral.text};
    }

    [data-scope="combobox"][data-part="item"][data-state="checked"],
    [data-scope="combobox"][data-part="item"][data-state="selected"],
    [data-scope="combobox"][data-part="item"][aria-selected="true"],
    [data-scope="combobox"][data-part="item"][data-selected="true"] {
      background-color: ${tokens.brand.subtle};
      color: ${tokens.brand.primary};
      font-weight: 500;
    }

    [data-scope="combobox"][data-part="item"][data-disabled],
    [data-scope="combobox"][data-part="item"][data-disabled="true"] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    [data-scope="combobox"][data-part="item-text"] {
      flex: 1;
      min-width: 0;
    }

    [data-scope="combobox"][data-part="item-indicator"] {
      display: inline-flex;
      align-items: center;
      color: ${tokens.brand.primary};
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    [data-scope="combobox"][data-part="item"][data-state="checked"]
      [data-scope="combobox"][data-part="item-indicator"],
    [data-scope="combobox"][data-part="item"][data-state="selected"]
      [data-scope="combobox"][data-part="item-indicator"],
    [data-scope="combobox"][data-part="item"][aria-selected="true"]
      [data-scope="combobox"][data-part="item-indicator"],
    [data-scope="combobox"][data-part="item"][data-selected="true"]
      [data-scope="combobox"][data-part="item-indicator"] {
      opacity: 1;
    }

    [data-scope="combobox"][data-part="item-group"] {
      display: flex;
      flex-direction: column;
      gap: ${tokens.gap};
    }

    [data-scope="combobox"][data-part="item-group-label"] {
      color: var(--lk-color-semantic-mutedforeground);
      font-family: ${tokens.fontFamily};
      font-size: ${tokens.fontSize.sm};
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    [data-scope="combobox"][data-part="root"][data-size="sm"]
      [data-scope="combobox"][data-part="control"] {
      height: var(--lk-control-height-sm);
      min-height: 0;
      padding: 0 var(--lk-space-component-compact);
      font-size: var(--lk-typography-fontsize-md);
      border-radius: var(--lk-radius-md);
    }

    [data-scope="combobox"][data-part="root"][data-size="lg"]
      [data-scope="combobox"][data-part="control"] {
      height: var(--lk-control-height-lg);
      min-height: 0;
      padding: 0 var(--lk-space-component-compact);
      font-size: var(--lk-typography-fontsize-md);
      border-radius: var(--lk-radius-md);
    }

    [data-scope="combobox"][data-part="content"][data-size="sm"]
      [data-scope="combobox"][data-part="item"] {
      padding: var(--lk-control-fieldgap) var(--lk-space-component-sm);
      font-size: var(--lk-typography-fontsize-md);
    }

    [data-scope="combobox"][data-part="content"][data-size="lg"]
      [data-scope="combobox"][data-part="item"] {
      padding: var(--lk-control-fieldgap) var(--lk-space-component-sm);
      font-size: var(--lk-typography-fontsize-md);
    }
  `;
};

const comboboxContract: PrimitiveContract<ComboboxPrimitiveProps> = {
  name: "combobox",
  tokens: [
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.300",
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
  ],
  defaults: {
    size: "md",
  },
};

const ComboboxPrimitive = createPrimitive(comboboxContract, (theme) => {
  const css = buildComboboxStyles(theme);
  theme.mountStyles(`combobox-${theme.mode}`, css);
});

registerPrimitive(ComboboxPrimitive);

export { ComboboxPrimitive };
