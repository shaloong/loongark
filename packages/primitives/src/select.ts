/**
 * Select Primitive - 下拉选择器原语样式
 * 支持单选和多选模式
 */

import { type LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import {
  createPrimitive,
  type PrimitiveContract,
  registerPrimitive,
} from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

/**
 * Select 尺寸类型
 */
export type SelectSize = "sm" | "md" | "lg";

/**
 * Select Primitive Props
 */
export interface SelectPrimitiveProps {
  size?: SelectSize;
}

interface SelectDesignTokens {
  fontFamily: string;
  fontSize: Record<SelectSize, string>;
  lineHeight: number;
  fontWeight: number;
  paddingY: Record<SelectSize, string>;
  paddingX: Record<SelectSize, string>;
  radius: Record<SelectSize, string>;
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

const extractSelectTokens = (theme: LoongArkTheme): SelectDesignTokens => {
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

const buildSelectStyles = (theme: LoongArkTheme): string => {
  const tokens = extractSelectTokens(theme);
  const zIndex = (theme.tokens as any).zIndex || {};

  return `
    @keyframes slideDownAndFade {
      from { opacity: 0; transform: translateY(-2px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideUpAndFade {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-2px); }
    }

    @media (prefers-reduced-motion: reduce) {
      :root:not([data-lk-motion="force"]) [data-scope="select"] * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    /* Select Root */
    [data-scope="select"][data-part="root"] {
      display: flex;
      flex-direction: column;
      gap: ${tokens.gap};
      width: 100%;
    }

    /* Select Label */
    [data-scope="select"][data-part="label"] {
      color: ${tokens.neutral.text};
      font-family: ${tokens.fontFamily};
      font-size: ${tokens.fontSize.sm};
      font-weight: 500;
      cursor: pointer;
    }

    /* Select Trigger (可点击的触发按钮) */
    [data-scope="select"][data-part="trigger"] {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      min-height: 40px;
      padding: ${tokens.paddingY.md} ${tokens.paddingX.md};
      border: 1px solid ${tokens.neutral.border};
      border-radius: ${tokens.radius.md};
      background-color: ${tokens.neutral.surface};
      color: ${tokens.neutral.text};
      font-family: ${tokens.fontFamily};
      font-size: ${tokens.fontSize.md};
      line-height: ${tokens.lineHeight};
      cursor: pointer;
      transition: all ${tokens.motion.duration} ${tokens.motion.easing};
      outline: none;
    }

    [data-scope="select"][data-part="trigger"]:hover {
      background-color: ${tokens.neutral.surfaceRaised};
      border-color: ${tokens.neutral.borderHover};
    }

    [data-scope="select"][data-part="trigger"]:focus-visible,
    [data-scope="select"][data-part="trigger"][data-state="open"] {
      border-color: ${tokens.brand.primary};
    }

    [data-scope="select"][data-part="trigger"][data-disabled] {
      cursor: not-allowed;
      opacity: 0.85;
      background-color: ${tokens.disabled.bg};
      border-color: ${tokens.disabled.border};
      color: ${tokens.disabled.text};
    }

    /* Select ValueText (选中的值) */
    [data-scope="select"][data-part="value-text"] {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [data-scope="select"][data-part="trigger"][data-placeholder-shown] [data-scope="select"][data-part="value-text"] {
      color: ${tokens.neutral.placeholder};
    }

    /* Select Indicator (箭头图标) */
    [data-scope="select"][data-part="indicator"] {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: ${tokens.neutral.textMuted};
      margin-left: ${tokens.gap};
      transition: transform ${tokens.motion.duration} ${tokens.motion.easing};
    }

    [data-scope="select"][data-part="trigger"][data-state="open"] [data-scope="select"][data-part="indicator"] {
      transform: rotate(180deg);
    }

    /* Select Positioner (定位容器) */
    [data-scope="select"][data-part="positioner"] {
      z-index: ${zIndex?.popover || 1000};
    }

    /* Select Content (下拉内容容器) */
    [data-scope="select"][data-part="content"] {
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

    [data-scope="select"][data-part="content"][data-state="open"] {
      animation-name: slideDownAndFade;
    }

    [data-scope="select"][data-part="content"][data-state="closed"] {
      animation-name: slideUpAndFade;
    }

    /* Select Item (单个选项) */
    [data-scope="select"][data-part="item"] {
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

    [data-scope="select"][data-part="content"][data-size="sm"] [data-scope="select"][data-part="item"] {
      padding: ${tokens.paddingY.sm} ${tokens.paddingX.sm};
      font-size: ${tokens.fontSize.sm};
    }

    [data-scope="select"][data-part="content"][data-size="lg"] [data-scope="select"][data-part="item"] {
      padding: ${tokens.paddingY.lg} ${tokens.paddingX.lg};
      font-size: ${tokens.fontSize.lg};
    }

    [data-scope="select"][data-part="item"]:hover,
    [data-scope="select"][data-part="item"][data-highlighted] {
      background-color: ${tokens.neutral.surfaceRaised};
      color: ${tokens.neutral.text};
    }

    [data-scope="select"][data-part="item"][data-state="checked"] {
      background-color: ${tokens.brand.subtle};
      color: ${tokens.brand.primary};
      font-weight: 500;
    }

    [data-scope="select"][data-part="item"][data-disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Select ItemIndicator (选中标记) */
    [data-scope="select"][data-part="item-indicator"] {
      display: inline-flex;
      align-items: center;
      color: ${tokens.brand.primary};
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    [data-scope="select"][data-part="item"][data-state="checked"] [data-scope="select"][data-part="item-indicator"] {
      opacity: 1;
    }

    /* Select HiddenSelect (隐藏的原生 select 元素，用于表单提交) */
    [data-scope="select"][data-part="hidden-select"] {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    /* 尺寸变体 - Small */
    [data-scope="select"][data-part="root"][data-size="sm"] [data-scope="select"][data-part="trigger"] {
      min-height: 32px;
      padding: ${tokens.paddingY.sm} ${tokens.paddingX.sm};
      font-size: ${tokens.fontSize.sm};
      border-radius: ${tokens.radius.sm};
    }

    /* 尺寸变体 - Large */
    [data-scope="select"][data-part="root"][data-size="lg"] [data-scope="select"][data-part="trigger"] {
      min-height: 48px;
      padding: ${tokens.paddingY.lg} ${tokens.paddingX.lg};
      font-size: ${tokens.fontSize.lg};
      border-radius: ${tokens.radius.lg};
    }
  `;
};

const selectContract: PrimitiveContract<SelectPrimitiveProps> = {
  name: "select",
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

const SelectPrimitive = createPrimitive(selectContract, (theme) => {
  const css = buildSelectStyles(theme);
  mountPrimitiveStyles(`select-${theme.mode}`, css);
});

registerPrimitive(SelectPrimitive);

export { SelectPrimitive };
