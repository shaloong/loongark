/**
 * Popover Primitive - 弹出层样式
 * 复用 tooltip 的弹层 tokens
 */
import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export interface PopoverPrimitiveProps {
  modal?: boolean;
}

interface PopoverDesignTokens {
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
  surface: string;
  surfaceRaised: string;
  border: string;
  text: string;
  textMuted: string;
  motionDuration: string;
  motionEasing: string;
}

const extractPopoverTokens = (theme: LoongArkTheme): PopoverDesignTokens => {
  const typography = theme.styleTokens.typography as TokenTree;
  const fontFamily = asTokenTree(typography.fontFamily);
  const fontSize = asTokenTree(typography.fontSize);
  const lineHeight = asTokenTree(typography.lineHeight);

  const space = asTokenTree(theme.styleTokens.space);
  const componentSpace = asTokenTree(space.component);
  const radius = asTokenTree(theme.styleTokens.radius);
  const shadow = asTokenTree(theme.styleTokens.shadow);
  const zIndex = asTokenTree(theme.styleTokens.zIndex);

  const color = theme.styleTokens.color as TokenTree;
  const neutral = asTokenTree(color.neutral);

  const motion = theme.styleTokens.motion as TokenTree;
  const duration = asTokenTree(motion.duration);
  const easing = asTokenTree(motion.easing);

  return {
    fontFamily: toStringToken(fontFamily.body, "sans-serif"),
    fontSize: toStringToken(fontSize.sm, "14px"),
    lineHeight: toNumberToken(lineHeight.base, 1.5),
    radius: toStringToken(radius.md, "8px"),
    paddingY: toStringToken(componentSpace.sm, "8px"),
    paddingX: toStringToken(componentSpace.md, "16px"),
    gap: toStringToken(componentSpace.sm, "8px"),
    arrowSize: toStringToken(componentSpace.sm, "8px"),
    shadow: toStringToken(shadow.popover, "0 12px 48px rgba(0,0,0,0.18)"),
    zIndex: toNumberToken(zIndex.popover, 1100),
    surface: toStringToken(neutral["50"], "#F5F6FA"),
    surfaceRaised: toStringToken(neutral["100"], "#E5E6EB"),
    border: toStringToken(neutral["100"], "#E5E6EB"),
    text: toStringToken(neutral["700"], "#232325"),
    textMuted: toStringToken(neutral["600"], "#2F3033"),
    motionDuration: toStringToken(duration.base, "200ms"),
    motionEasing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
  };
};

const buildPopoverStyles = (theme: LoongArkTheme): string => {
  const tokens = extractPopoverTokens(theme);
  return `

  [data-scope="popover"][data-part="positioner"] {
    z-index: ${tokens.zIndex};
    position: relative;
  }

  [data-scope="popover"][data-part="content"] {
    --arrow-size: ${tokens.arrowSize};
    --arrow-size-half: calc(var(--arrow-size) / 2);
    --arrow-background: ${tokens.surface};
    --arrow-border: ${tokens.border};
    display: flex;
    flex-direction: column;
    gap: ${tokens.gap};
    padding: ${tokens.paddingY} ${tokens.paddingX};
    border-radius: ${tokens.radius};
    background: ${tokens.surface};
    border: 1px solid ${tokens.border};
    box-shadow: ${tokens.shadow};
    color: ${tokens.text};
    font-family: ${tokens.fontFamily};
    font-size: ${tokens.fontSize};
    line-height: ${tokens.lineHeight};
    outline: none;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-2px) scale(0.98);
    transition:
      opacity ${tokens.motionDuration} ${tokens.motionEasing},
      transform ${tokens.motionDuration} ${tokens.motionEasing},
      visibility ${tokens.motionDuration} ${tokens.motionEasing};
  }

  [data-scope="popover"][data-part="content"][data-state="open"] {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) scale(1);
  }

  [data-scope="popover"][data-part="content"][data-state="closed"] {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-2px) scale(0.98);
  }
  
  /* 箭头内容层：仅当显式开启时（data-arrow="true"）渲染 */
  [data-scope="popover"][data-part="content"][data-arrow="true"]::before {
    content: "";
    position: absolute;
    width: var(--arrow-size);
    height: var(--arrow-size);
    background: var(--arrow-background);
    transform: rotate(45deg);
    border-radius: 2px;
    box-sizing: border-box;
    z-index: -1;
    pointer-events: none;
  }

  /* 箭头边框层：仅当显式开启时（data-arrow="true"）渲染 */
  [data-scope="popover"][data-part="content"][data-arrow="true"]::after {
    content: "";
    position: absolute;
    width: var(--arrow-size);
    height: var(--arrow-size);
    transform: rotate(45deg);
    box-sizing: border-box;
    border: 1px solid var(--arrow-border);
    border-radius: 2px;
    z-index: -2;
    pointer-events: none;
    background: transparent;
  }
  
  /* 定位：使用半尺寸，确保与内容边框对齐 */
  [data-scope="popover"][data-part="content"][data-placement^="top"]::before,
  [data-scope="popover"][data-part="content"][data-placement^="top"]::after {
    bottom: calc(var(--arrow-size-half) * -1);
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
  }
  
  [data-scope="popover"][data-part="content"][data-placement^="bottom"]::before,
  [data-scope="popover"][data-part="content"][data-placement^="bottom"]::after {
    top: calc(var(--arrow-size-half) * -1);
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
  }
  
  [data-scope="popover"][data-part="content"][data-placement^="left"]::before,
  [data-scope="popover"][data-part="content"][data-placement^="left"]::after {
    right: calc(var(--arrow-size-half) * -1);
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }
  
  [data-scope="popover"][data-part="content"][data-placement^="right"]::before,
  [data-scope="popover"][data-part="content"][data-placement^="right"]::after {
    left: calc(var(--arrow-size-half) * -1);
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }

  [data-scope="popover"][data-part="close-trigger"] {
    cursor: pointer;
  }

  [data-scope="popover"][data-part="title"] {
    font-weight: 600;
  }

  [data-scope="popover"][data-part="description"] {
    color: ${tokens.textMuted};
  }

  [data-scope="popover"][data-part="content"]:focus-visible {
    box-shadow: 0 0 0 1px ${tokens.surface}, 0 0 0 4px ${tokens.surfaceRaised};
  }
  `;
};

const popoverContract: PrimitiveContract<PopoverPrimitiveProps> = {
  name: "popover",
  tokens: [
    "typography.fontFamily.body",
    "typography.fontSize.sm",
    "typography.lineHeight.base",
    "space.component.sm",
    "space.component.md",
    "radius.md",
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.600",
    "color.neutral.700",
    "motion.duration.base",
    "motion.easing.standard",
    "shadow.popover",
    "zIndex.popover",
  ],
  defaults: {
    modal: false,
  },
};

const PopoverPrimitive = createPrimitive(popoverContract, (theme) => {
  const css = buildPopoverStyles(theme);
  theme.mountStyles(`popover-${theme.mode}`, css);
});

registerPrimitive(PopoverPrimitive);

export { PopoverPrimitive };
