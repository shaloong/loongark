/**
 * Tabs Primitive - 标签页样式
 * 基于 Ark UI Tabs 数据标记
 */
import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type TabsSize = "sm" | "md" | "lg";
export type TabsOrientation = "horizontal" | "vertical";

export interface TabsPrimitiveProps {
  size?: TabsSize;
  orientation?: TabsOrientation;
}

interface TabsDesignTokens {
  fontFamily: string;
  fontSize: Record<TabsSize, string>;
  lineHeight: number;
  fontWeight: number;
  paddingY: Record<TabsSize, string>;
  paddingX: Record<TabsSize, string>;
  radius: Record<TabsSize, string>;
  gap: string;
  listGap: string;
  indicatorSize: string;
  contentPadding: string;
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
    textMuted: string;
  };
  disabled: {
    text: string;
  };
  motion: {
    duration: string;
    easing: string;
  };
}

const extractTabsTokens = (theme: LoongArkTheme): TabsDesignTokens => {
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
    radius: {
      sm: toStringToken(radius.sm, "4px"),
      md: toStringToken(radius.md, "8px"),
      lg: toStringToken(radius.lg, "16px"),
    },
    gap: toStringToken(componentSpace.sm, "8px"),
    listGap: toStringToken(componentSpace.xs, "4px"),
    indicatorSize: toStringToken(componentSpace.xs, "4px"),
    contentPadding: toStringToken(componentSpace.sm, "8px"),
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
      textMuted: toStringToken(neutral["500"], "#3A3A3C"),
    },
    disabled: {
      text: toStringToken(neutral["300"], "#B3B4BD"),
    },
    motion: {
      duration: toStringToken(duration.base, "200ms"),
      easing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
    },
  };
};

const buildTabsStyles = (theme: LoongArkTheme): string => {
  const tokens = extractTabsTokens(theme);
  const scope = `[data-scope="tabs"]`;
  const root = `${scope}[data-part="root"]`;
  const list = `${scope}[data-part="list"]`;
  const trigger = `${scope}[data-part="trigger"]`;
  const content = `${scope}[data-part="content"]`;
  const indicator = `${scope}[data-part="indicator"]`;
  const indicatorThickness = `calc(${tokens.indicatorSize} / 2)`;
  const interactiveTrigger = `${trigger}:not([data-disabled='true']):not([disabled])`;

  return `

  ${root} {
    display: flex;
    flex-direction: column;
    gap: ${tokens.gap};
    width: 100%;
  }

  ${root}[data-orientation="vertical"] {
    flex-direction: row;
    align-items: flex-start;
  }

  ${list} {
    display: inline-flex;
    align-items: center;
    gap: ${tokens.listGap};
    position: relative;
    border-bottom: 1px solid ${tokens.neutral.border};
    padding: 0;
    margin: 0;
  }

  ${list}[data-orientation="vertical"] {
    flex-direction: column;
    align-items: stretch;
    border-bottom: none;
    border-right: 1px solid ${tokens.neutral.border};
    padding-right: ${tokens.paddingX.sm};
  }

  ${trigger} {
    appearance: none;
    border: none;
    background: transparent;
    color: var(--lk-color-semantic-mutedforeground);
    font-family: ${tokens.fontFamily};
    font-size: ${tokens.fontSize.md};
    font-weight: ${tokens.fontWeight};
    line-height: ${tokens.lineHeight};
    padding: ${tokens.paddingY.md} ${tokens.paddingX.md};
    border-radius: ${tokens.radius.md};
    cursor: pointer;
    transition:
      color ${tokens.motion.duration} ${tokens.motion.easing},
      background ${tokens.motion.duration} ${tokens.motion.easing},
      box-shadow ${tokens.motion.duration} ${tokens.motion.easing};
  }

  ${interactiveTrigger}:hover {
    color: ${tokens.neutral.text};
    background: ${tokens.neutral.surfaceRaised};
  }

  ${trigger}[data-selected="true"] {
    color: ${tokens.brand.primary};
  }

  ${interactiveTrigger}[data-selected="true"]:hover {
    color: ${tokens.brand.secondary};
  }

  ${trigger}[data-disabled="true"],
  ${trigger}[disabled] {
    color: ${tokens.disabled.text};
    cursor: not-allowed;
  }

  ${trigger}:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${tokens.brand.accent};
  }

  ${content} {
    color: ${tokens.neutral.text};
    font-family: ${tokens.fontFamily};
    font-size: ${tokens.fontSize.md};
    line-height: ${tokens.lineHeight};
    padding: ${tokens.contentPadding};
  }

  ${indicator} {
    --transition-duration: ${tokens.motion.duration};
    --transition-timing-function: ${tokens.motion.easing};
    background: ${tokens.brand.primary};
    border-radius: ${tokens.radius.lg};
    position: absolute;
  }

  ${indicator}[data-orientation="horizontal"] {
    height: ${indicatorThickness};
    width: var(--width);
    bottom: 0;
  }

  ${indicator}[data-orientation="vertical"] {
    width: ${indicatorThickness};
    height: var(--height);
    right: 0;
  }

  ${root}[data-size="sm"] ${trigger} {
    font-size: ${tokens.fontSize.sm};
    padding: ${tokens.paddingY.sm} ${tokens.paddingX.sm};
    border-radius: ${tokens.radius.sm};
  }

  ${root}[data-size="lg"] ${trigger} {
    font-size: ${tokens.fontSize.lg};
    padding: ${tokens.paddingY.lg} ${tokens.paddingX.lg};
    border-radius: ${tokens.radius.lg};
  }

  ${root}[data-size="sm"] ${content} {
    font-size: ${tokens.fontSize.sm};
  }

  ${root}[data-size="lg"] ${content} {
    font-size: ${tokens.fontSize.lg};
  }
  `;
};

const tabsContract: PrimitiveContract<TabsPrimitiveProps> = {
  name: "tabs",
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
    orientation: "horizontal",
  },
};

const TabsPrimitive = createPrimitive(tabsContract, (theme) => {
  const css = buildTabsStyles(theme);
  theme.mountStyles(`tabs-${theme.mode}`, css);
});

registerPrimitive(TabsPrimitive);

export { TabsPrimitive };
