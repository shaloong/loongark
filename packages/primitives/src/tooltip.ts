/**
 * Tooltip Primitive - 工具提示样式
 * 对应 Ark UI Tooltip 数据标记
 */
import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export interface TooltipPrimitiveProps {
  interactive?: boolean;
}

interface TooltipDesignTokens {
  fontFamily: string;
  fontSize: string;
  lineHeight: number;
  radius: string;
  paddingY: string;
  paddingX: string;
  gap: string;
  arrowSize: string;
  shadow: string;
  zIndex: number;
  motionDuration: string;
  motionEasing: string;
  brand: {
    primary: string;
    accent: string;
  };
  neutral: {
    surface: string;
    surfaceRaised: string;
    text: string;
    border: string;
  };
}

const extractTooltipTokens = (theme: LoongArkTheme): TooltipDesignTokens => {
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

  const shadow = asTokenTree(theme.tokens.shadow);
  const zIndex = asTokenTree(theme.tokens.zIndex);

  return {
    fontFamily: toStringToken(fontFamily.body, "sans-serif"),
    fontSize: toStringToken(fontSize.sm, "14px"),
    lineHeight: toNumberToken(lineHeight.base, 1.5),
    radius: toStringToken(radius.sm, "4px"),
    paddingY: toStringToken(componentSpace.xs, "4px"),
    paddingX: toStringToken(componentSpace.sm, "8px"),
    gap: toStringToken(componentSpace.xs, "4px"),
    arrowSize: toStringToken(componentSpace.sm, "8px"),
    shadow: toStringToken(shadow.tooltip, "0 8px 32px rgba(0,0,0,0.16)"),
    zIndex: toNumberToken(zIndex.tooltip, 1200),
    motionDuration: toStringToken(duration.fast, "120ms"),
    motionEasing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
    brand: {
      primary: toStringToken(brand.primary, "#006EFF"),
      accent: toStringToken(brand.accent, "#5AC8FA"),
    },
    neutral: {
      surface: toStringToken(neutral["900"], "#121212"),
      surfaceRaised: toStringToken(neutral["700"], "#232325"),
      text: toStringToken(neutral["50"], "#F5F6FA"),
      border: toStringToken(neutral["700"], "#232325"),
    },
  };
};

const buildTooltipStyles = (theme: LoongArkTheme): string => {
  const tokens = extractTooltipTokens(theme);

  return `
  @media (prefers-reduced-motion: reduce) {
    :root:not([data-lk-motion="force"]) [data-scope="tooltip"] * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  [data-scope="tooltip"][data-part="root"] {
    position: relative;
  }

  [data-scope="tooltip"][data-part="trigger"] {
    position: relative;
  }

  [data-scope="tooltip"][data-part="positioner"] {
    z-index: ${tokens.zIndex};
    position: relative;
  }

  [data-scope="tooltip"][data-part="content"] {
    --arrow-size: ${tokens.arrowSize};
    --arrow-size-half: calc(var(--arrow-size) / 2);
    --arrow-background: ${tokens.neutral.surface};
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: ${tokens.gap};
    padding: ${tokens.paddingY} ${tokens.paddingX};
    border-radius: ${tokens.radius};
    background: ${tokens.neutral.surface};
    color: ${tokens.neutral.text};
    border: 1px solid ${tokens.neutral.border};
    box-shadow: ${tokens.shadow};
    font-family: ${tokens.fontFamily};
    font-size: ${tokens.fontSize};
    line-height: ${tokens.lineHeight};
    pointer-events: none;
    overflow: visible;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-2px) scale(0.98);
    transition:
      opacity ${tokens.motionDuration} ${tokens.motionEasing},
      transform ${tokens.motionDuration} ${tokens.motionEasing},
      visibility ${tokens.motionDuration} ${tokens.motionEasing};
  }

  [data-scope="tooltip"][data-part="content"]::before {
    content: "";
    position: absolute;
    width: var(--arrow-size);
    height: var(--arrow-size);
    background: var(--arrow-background, ${tokens.neutral.surface});
    transform: rotate(45deg);
    border-radius: 2px;
    box-sizing: border-box;
    z-index: -1;
    pointer-events: none;
  }

  [data-scope="tooltip"][data-part="content"][data-state="open"] {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) scale(1);
  }

  [data-scope="tooltip"][data-part="content"][data-state="closed"] {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-2px) scale(0.98);
  }

  [data-scope="tooltip"][data-part="content"][data-interactive="true"] {
    pointer-events: auto;
  }

  [data-scope="tooltip"][data-part="arrow"],
  [data-scope="tooltip"][data-part="arrow-tip"] {
    display: none;
  }

  [data-scope="tooltip"][data-part="content"][data-placement^="top"]::before {
    bottom: calc(var(--arrow-size-half) * -1);
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
  }

  [data-scope="tooltip"][data-part="content"][data-placement^="bottom"]::before {
    top: calc(var(--arrow-size-half) * -1);
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
  }

  [data-scope="tooltip"][data-part="content"][data-placement^="left"]::before {
    right: calc(var(--arrow-size-half) * -1);
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }

  [data-scope="tooltip"][data-part="content"][data-placement^="right"]::before {
    left: calc(var(--arrow-size-half) * -1);
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }

  [data-scope="tooltip"][data-part="content"]:focus-visible {
    outline: none;
    box-shadow: 0 0 0 1px ${tokens.neutral.surface}, 0 0 0 4px ${tokens.brand.accent};
  }

  [data-scope="tooltip"][data-part="trigger"]:focus-visible {
    outline: none;
  }

  [data-scope="tooltip"][data-part="trigger"][aria-disabled="true"] {
    cursor: not-allowed;
  }
  `;
};

const tooltipContract: PrimitiveContract<TooltipPrimitiveProps> = {
  name: "tooltip",
  tokens: [
    "typography.fontFamily.body",
    "typography.fontSize.sm",
    "typography.lineHeight.base",
    "space.component.xs",
    "space.component.sm",
    "radius.sm",
    "color.neutral.900",
    "color.neutral.700",
    "color.neutral.50",
    "color.brand.primary",
    "color.brand.accent",
    "motion.duration.fast",
    "motion.easing.standard",
    "shadow.tooltip",
    "zIndex.tooltip",
  ],
  defaults: {
    interactive: false,
  },
};

const TooltipPrimitive = createPrimitive(tooltipContract, (theme) => {
  const css = buildTooltipStyles(theme);
  mountPrimitiveStyles(`tooltip-${theme.mode}`, css);
});

registerPrimitive(TooltipPrimitive);

export { TooltipPrimitive };
