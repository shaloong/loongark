import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type HoverCardSize = "sm" | "md" | "lg";

export interface HoverCardPrimitiveProps {
  size?: HoverCardSize;
}

interface HoverCardDesignTokens {
  fontFamily: string;
  fontSize: Record<HoverCardSize, string>;
  lineHeight: number;
  padding: Record<HoverCardSize, string>;
  radius: Record<HoverCardSize, string>;
  gap: string;
  neutral: {
    surface: string;
    border: string;
    text: string;
    shadow: string;
  };
}

const extractHoverCardTokens = (theme: LoongArkTheme): HoverCardDesignTokens => {
  const typography = theme.tokens.typography as TokenTree;
  const fontFamily = asTokenTree(typography.fontFamily);
  const fontSize = asTokenTree(typography.fontSize);
  const lineHeight = asTokenTree(typography.lineHeight);

  const space = asTokenTree(theme.tokens.space);
  const componentSpace = asTokenTree(space.component);
  const radius = asTokenTree(theme.tokens.radius);

  const color = theme.tokens.color as TokenTree;
  const neutral = asTokenTree(color.neutral);

  return {
    fontFamily: toStringToken(fontFamily.body, "sans-serif"),
    fontSize: {
      sm: toStringToken(fontSize.sm, "14px"),
      md: toStringToken(fontSize.md, "16px"),
      lg: toStringToken(fontSize.lg, "18px"),
    },
    lineHeight: toNumberToken(lineHeight.base, 1.5),
    padding: {
      sm: toStringToken(componentSpace.sm, "8px"),
      md: toStringToken(componentSpace.md, "12px"),
      lg: toStringToken(componentSpace.lg, "16px"),
    },
    radius: {
      sm: toStringToken(radius.sm, "4px"),
      md: toStringToken(radius.md, "6px"),
      lg: toStringToken(radius.lg, "8px"),
    },
    gap: toStringToken(componentSpace.sm, "8px"),
    neutral: {
      surface: toStringToken(neutral["50"], "#FFFFFF"),
      border: toStringToken(neutral["100"], "#E5E6EB"),
      text: toStringToken(neutral["700"], "#232325"),
      shadow: "0 12px 32px rgba(15, 23, 42, 0.16)",
    },
  };
};

const buildHoverCardStyles = (theme: LoongArkTheme): string => {
  const tokens = extractHoverCardTokens(theme);
  const scopeSelector = `[data-scope="hover-card"]`;
  const rootSelector = `${scopeSelector}[data-part="root"]`;
  const triggerSelector = `${scopeSelector}[data-part="trigger"]`;
  const positionerSelector = `${scopeSelector}[data-part="positioner"]`;
  const contentSelector = `${scopeSelector}[data-part="content"]`;
  const arrowSelector = `${scopeSelector}[data-part="arrow"]`;
  const arrowTipSelector = `${scopeSelector}[data-part="arrow-tip"]`;

  return `
${rootSelector} {
  font-family: ${tokens.fontFamily};
  color: ${tokens.neutral.text};
}

${triggerSelector} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

${positionerSelector} {
  z-index: 20;
}

${contentSelector} {
  background: ${tokens.neutral.surface};
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.md};
  padding: ${tokens.padding.md};
  box-shadow: ${tokens.neutral.shadow};
  font-size: ${tokens.fontSize.md};
  line-height: ${tokens.lineHeight};
  display: grid;
  gap: ${tokens.gap};
}

${rootSelector}[data-size='sm'] ${contentSelector} {
  padding: ${tokens.padding.sm};
  border-radius: ${tokens.radius.sm};
  font-size: ${tokens.fontSize.sm};
}

${rootSelector}[data-size='lg'] ${contentSelector} {
  padding: ${tokens.padding.lg};
  border-radius: ${tokens.radius.lg};
  font-size: ${tokens.fontSize.lg};
}

${arrowSelector} {
  fill: ${tokens.neutral.surface};
  stroke: ${tokens.neutral.border};
}

${arrowTipSelector} {
  fill: ${tokens.neutral.surface};
}
`;
};

const HOVER_CARD_CONTRACT: PrimitiveContract<HoverCardPrimitiveProps> = {
  name: "hover-card",
  tokens: [
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.700",
    "typography.fontFamily.body",
    "typography.fontSize.sm",
    "typography.fontSize.md",
    "typography.fontSize.lg",
    "typography.lineHeight.base",
    "space.component.sm",
    "space.component.md",
    "space.component.lg",
    "radius.sm",
    "radius.md",
    "radius.lg",
  ],
  defaults: {
    size: "md",
  },
};

const hoverCardPrimitive = createPrimitive<HoverCardPrimitiveProps>(
  HOVER_CARD_CONTRACT,
  (theme) => {
    const css = buildHoverCardStyles(theme);
    mountPrimitiveStyles(`hover-card-${theme.mode}`, css);
  }
);

registerPrimitive(hoverCardPrimitive);

export { hoverCardPrimitive };
