/**
 * Toast Primitive - notification styles
 * Matches Ark UI Toast data attributes.
 */
import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type ToastType = "info" | "success" | "warning" | "error" | "loading";

export interface ToastPrimitiveProps {
  type?: ToastType;
}

interface ToastDesignTokens {
  fontFamily: string;
  fontSize: string;
  titleSize: string;
  lineHeight: number;
  fontWeight: number;
  titleWeight: number;
  paddingY: string;
  paddingX: string;
  gap: string;
  actionPaddingY: string;
  actionPaddingX: string;
  radius: string;
  shadow: string;
  zIndex: number;
  motion: {
    duration: string;
    easing: string;
  };
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
    warning: string;
  };
}

const extractToastTokens = (theme: LoongArkTheme): ToastDesignTokens => {
  const typography = theme.styleTokens.typography as TokenTree;
  const fontFamily = asTokenTree(typography.fontFamily);
  const fontSize = asTokenTree(typography.fontSize);
  const lineHeight = asTokenTree(typography.lineHeight);
  const fontWeight = asTokenTree(typography.fontWeight);

  const space = asTokenTree(theme.styleTokens.space);
  const componentSpace = asTokenTree(space.component);
  const radius = asTokenTree(theme.styleTokens.radius);
  const shadow = asTokenTree(theme.styleTokens.shadow);
  const zIndex = asTokenTree(theme.styleTokens.zIndex);

  const motion = theme.styleTokens.motion as TokenTree;
  const duration = asTokenTree(motion.duration);
  const easing = asTokenTree(motion.easing);

  const color = theme.styleTokens.color as TokenTree;
  const neutral = asTokenTree(color.neutral);
  const brand = asTokenTree(color.brand);

  return {
    fontFamily: toStringToken(fontFamily.body, "sans-serif"),
    fontSize: toStringToken(fontSize.sm, "14px"),
    titleSize: toStringToken(fontSize.md, "16px"),
    lineHeight: toNumberToken(lineHeight.base, 1.5),
    fontWeight: toNumberToken(fontWeight.regular, 400),
    titleWeight: toNumberToken(fontWeight.medium, 500),
    paddingY: toStringToken(componentSpace.sm, "8px"),
    paddingX: toStringToken(componentSpace.md, "16px"),
    gap: toStringToken(componentSpace.xs, "4px"),
    actionPaddingY: toStringToken(componentSpace.xs, "4px"),
    actionPaddingX: toStringToken(componentSpace.sm, "8px"),
    radius: toStringToken(radius.md, "8px"),
    shadow: toStringToken(shadow.popover, "0 12px 48px rgba(0,0,0,0.18)"),
    zIndex: toNumberToken(zIndex.toast, 1300),
    motion: {
      duration: toStringToken(duration.base, "200ms"),
      easing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
    },
    neutral: {
      surface: toStringToken(neutral["50"], "#F5F6FA"),
      surfaceRaised: toStringToken(neutral["100"], "#E5E6EB"),
      border: toStringToken(neutral["100"], "#E5E6EB"),
      text: toStringToken(neutral["700"], "#232325"),
      textMuted: toStringToken(neutral["500"], "#3A3A3C"),
    },
    brand: {
      primary: toStringToken(brand.primary, "#006EFF"),
      accent: toStringToken(brand.accent, "#5AC8FA"),
      warning: toStringToken(brand.warning, "#F58220"),
    },
  };
};

const buildToastStyles = (theme: LoongArkTheme): string => {
  const tokens = extractToastTokens(theme);

  return `

  [data-scope="toast"][data-part="group"] {
    z-index: ${tokens.zIndex};
    display: flex;
    flex-direction: column;
    gap: var(--gap, ${tokens.gap});
  }

  [data-scope="toast"][data-part="root"] {
    --toast-accent: ${tokens.brand.primary};
    width: min(420px, calc(100vw - 2 * ${tokens.paddingX}));
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: start;
    row-gap: ${tokens.gap};
    column-gap: ${tokens.gap};
    padding: ${tokens.paddingY} ${tokens.paddingX};
    border-radius: ${tokens.radius};
    background: ${tokens.neutral.surface};
    border: 1px solid ${tokens.neutral.border};
    border-left: 3px solid var(--toast-accent);
    box-shadow: ${tokens.shadow};
    z-index: var(--z-index, ${tokens.zIndex});
    color: ${tokens.neutral.text};
    font-family: ${tokens.fontFamily};
    font-size: ${tokens.fontSize};
    font-weight: ${tokens.fontWeight};
    line-height: ${tokens.lineHeight};
    transform: translate3d(0, var(--y, 0), 0);
    opacity: var(--opacity, 0);
    height: var(--height, auto);
    transition:
      transform ${tokens.motion.duration} ${tokens.motion.easing},
      opacity ${tokens.motion.duration} ${tokens.motion.easing};
  }

  [data-scope="toast"][data-part="root"][data-type="info"],
  [data-scope="toast"][data-part="root"][data-type="loading"] {
    --toast-accent: ${tokens.brand.primary};
  }

  [data-scope="toast"][data-part="root"][data-type="success"] {
    --toast-accent: ${tokens.brand.accent};
  }

  [data-scope="toast"][data-part="root"][data-type="warning"],
  [data-scope="toast"][data-part="root"][data-type="error"] {
    --toast-accent: ${tokens.brand.warning};
  }

  [data-scope="toast"][data-part="title"] {
    grid-column: 1;
    font-size: ${tokens.titleSize};
    font-weight: ${tokens.titleWeight};
  }

  [data-scope="toast"][data-part="description"] {
    grid-column: 1;
    color: var(--lk-color-semantic-mutedforeground);
  }

  [data-scope="toast"][data-part="action-trigger"],
  [data-scope="toast"][data-part="close-trigger"] {
    display: inline-flex;
    align-items: center;
    gap: ${tokens.gap};
    padding: ${tokens.actionPaddingY} ${tokens.actionPaddingX};
    border-radius: ${tokens.radius};
    border: none;
    background: transparent;
    color: ${tokens.neutral.text};
    cursor: pointer;
    font: inherit;
    line-height: ${tokens.lineHeight};
    transition:
      background-color ${tokens.motion.duration} ${tokens.motion.easing},
      color ${tokens.motion.duration} ${tokens.motion.easing},
      box-shadow ${tokens.motion.duration} ${tokens.motion.easing};
  }

  [data-scope="toast"][data-part="action-trigger"] {
    grid-column: 1;
    justify-self: start;
  }

  [data-scope="toast"][data-part="close-trigger"] {
    grid-column: 2;
    grid-row: 1;
    justify-self: end;
    align-self: start;
  }

  [data-scope="toast"][data-part="action-trigger"]:hover,
  [data-scope="toast"][data-part="close-trigger"]:hover {
    background: ${tokens.neutral.surfaceRaised};
  }

  [data-scope="toast"][data-part="action-trigger"]:focus-visible,
  [data-scope="toast"][data-part="close-trigger"]:focus-visible {
    outline: none;
    box-shadow: 0 0 0 1px ${tokens.neutral.surface}, 0 0 0 3px ${tokens.brand.accent};
  }

  [data-scope="toast"][data-part="root"]:focus-visible {
    outline: none;
    box-shadow: 0 0 0 1px ${tokens.neutral.surface}, 0 0 0 4px ${tokens.brand.accent};
  }
  `;
};

const toastContract: PrimitiveContract<ToastPrimitiveProps> = {
  name: "toast",
  tokens: [
    "typography.fontFamily.body",
    "typography.fontSize.sm",
    "typography.fontSize.md",
    "typography.lineHeight.base",
    "typography.fontWeight.regular",
    "typography.fontWeight.medium",
    "space.component.xs",
    "space.component.sm",
    "space.component.md",
    "radius.md",
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.500",
    "color.neutral.700",
    "color.brand.primary",
    "color.brand.accent",
    "color.brand.warning",
    "motion.duration.base",
    "motion.easing.standard",
    "shadow.popover",
    "zIndex.toast",
  ],
  defaults: {},
};

const ToastPrimitive = createPrimitive(toastContract, (theme) => {
  const css = buildToastStyles(theme);
  theme.mountStyles(`toast-${theme.mode}`, css);
});

registerPrimitive(ToastPrimitive);

export { ToastPrimitive };
