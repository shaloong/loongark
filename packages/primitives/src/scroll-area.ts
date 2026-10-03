import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { asTokenTree, toStringToken } from "./tokenUtils";

export type ScrollAreaSize = "sm" | "md" | "lg";

export interface ScrollAreaPrimitiveProps {
  size?: ScrollAreaSize;
}

interface ScrollAreaDesignTokens {
  radius: Record<ScrollAreaSize, string>;
  scrollbarSize: Record<ScrollAreaSize, string>;
  gap: string;
  neutral: {
    surface: string;
    border: string;
    thumb: string;
    thumbHover: string;
  };
}

const extractScrollAreaTokens = (
  theme: LoongArkTheme,
): ScrollAreaDesignTokens => {
  const space = asTokenTree(theme.styleTokens.space);
  const componentSpace = asTokenTree(space.component);
  const radius = asTokenTree(theme.styleTokens.radius);
  const color = theme.styleTokens.color as TokenTree;
  const neutral = asTokenTree(color.neutral);

  return {
    radius: {
      sm: toStringToken(radius.sm, "4px"),
      md: toStringToken(radius.md, "6px"),
      lg: toStringToken(radius.lg, "8px"),
    },
    scrollbarSize: {
      sm: toStringToken(componentSpace.xs, "6px"),
      md: toStringToken(componentSpace.sm, "8px"),
      lg: toStringToken(componentSpace.md, "10px"),
    },
    gap: toStringToken(componentSpace.sm, "8px"),
    neutral: {
      surface: toStringToken(neutral["50"], "#FFFFFF"),
      border: toStringToken(neutral["100"], "#E5E6EB"),
      thumb: toStringToken(neutral["300"], "#B3B4BD"),
      thumbHover: toStringToken(neutral["500"], "#6D6D6D"),
    },
  };
};

const buildScrollAreaStyles = (theme: LoongArkTheme): string => {
  const tokens = extractScrollAreaTokens(theme);
  const scopeSelector = `[data-scope="scroll-area"]`;
  const rootSelector = `${scopeSelector}[data-part="root"]`;
  const viewportSelector = `${scopeSelector}[data-part="viewport"]`;
  const contentSelector = `${scopeSelector}[data-part="content"]`;
  const scrollbarSelector = `${scopeSelector}[data-part="scrollbar"]`;
  const thumbSelector = `${scopeSelector}[data-part="thumb"]`;
  const cornerSelector = `${scopeSelector}[data-part="corner"]`;

  return `
${rootSelector} {
  position: relative;
  width: 100%;
  height: 100%;
  background: ${tokens.neutral.surface};
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.md};
  overflow: hidden;
}

${viewportSelector} {
  width: 100%;
  height: 100%;
  overflow: auto;
}

${contentSelector} {
  padding: ${tokens.gap};
}

${scrollbarSelector} {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  transition: background 150ms ease;
}

${scrollbarSelector}[data-orientation='vertical'] {
  width: ${tokens.scrollbarSize.md};
}

${scrollbarSelector}[data-orientation='horizontal'] {
  height: ${tokens.scrollbarSize.md};
}

${thumbSelector} {
  flex: 1;
  background: ${tokens.neutral.thumb};
  border-radius: 999px;
  min-width: 24px;
  min-height: 24px;
}

${thumbSelector}:hover {
  background: ${tokens.neutral.thumbHover};
}

${cornerSelector} {
  background: ${tokens.neutral.border};
}

${rootSelector}[data-size='sm'] {
  border-radius: ${tokens.radius.sm};
}

${rootSelector}[data-size='lg'] {
  border-radius: ${tokens.radius.lg};
}

${rootSelector}[data-size='sm'] ${scrollbarSelector}[data-orientation='vertical'] {
  width: ${tokens.scrollbarSize.sm};
}

${rootSelector}[data-size='sm'] ${scrollbarSelector}[data-orientation='horizontal'] {
  height: ${tokens.scrollbarSize.sm};
}

${rootSelector}[data-size='lg'] ${scrollbarSelector}[data-orientation='vertical'] {
  width: ${tokens.scrollbarSize.lg};
}

${rootSelector}[data-size='lg'] ${scrollbarSelector}[data-orientation='horizontal'] {
  height: ${tokens.scrollbarSize.lg};
}
`;
};

const SCROLL_AREA_CONTRACT: PrimitiveContract<ScrollAreaPrimitiveProps> = {
  name: "scroll-area",
  tokens: [
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.300",
    "color.neutral.500",
    "space.component.xs",
    "space.component.sm",
    "space.component.md",
    "radius.sm",
    "radius.md",
    "radius.lg",
  ],
  defaults: {
    size: "md",
  },
};

const scrollAreaPrimitive = createPrimitive<ScrollAreaPrimitiveProps>(
  SCROLL_AREA_CONTRACT,
  (theme) => {
    const css = buildScrollAreaStyles(theme);
    theme.mountStyles(`scroll-area-${theme.mode}`, css);
  },
);

registerPrimitive(scrollAreaPrimitive);

export { scrollAreaPrimitive };
