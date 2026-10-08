import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { asTokenTree, toStringToken } from "./tokenUtils";

export type SplitterSize = "sm" | "md" | "lg";

export interface SplitterPrimitiveProps {
  size?: SplitterSize;
}

interface SplitterDesignTokens {
  radius: Record<SplitterSize, string>;
  handleSize: Record<SplitterSize, string>;
  gap: string;
  neutral: {
    surface: string;
    border: string;
    handle: string;
    handleHover: string;
  };
}

const extractSplitterTokens = (theme: LoongArkTheme): SplitterDesignTokens => {
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
    handleSize: {
      sm: toStringToken(componentSpace.xs, "6px"),
      md: toStringToken(componentSpace.sm, "8px"),
      lg: toStringToken(componentSpace.md, "10px"),
    },
    gap: toStringToken(componentSpace.sm, "8px"),
    neutral: {
      surface: toStringToken(neutral["50"], "#FFFFFF"),
      border: toStringToken(neutral["100"], "#E5E6EB"),
      handle: toStringToken(neutral["300"], "#B3B4BD"),
      handleHover: toStringToken(neutral["500"], "#6D6D6D"),
    },
  };
};

const buildSplitterStyles = (theme: LoongArkTheme): string => {
  const tokens = extractSplitterTokens(theme);
  const scopeSelector = `[data-scope="splitter"]`;
  const rootSelector = `${scopeSelector}[data-part="root"]`;
  const panelSelector = `${scopeSelector}[data-part="panel"]`;
  const resizeTriggerSelector = `${scopeSelector}[data-part="resize-trigger"]`;
  const resizeIndicatorSelector = `${scopeSelector}[data-part="resize-trigger-indicator"]`;

  return `
${rootSelector} {
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.md};
  overflow: hidden;
  background: ${tokens.neutral.surface};
}

${rootSelector}[data-orientation='vertical'] {
  flex-direction: column;
}

${panelSelector} {
  flex: 1;
  min-width: 0;
  min-height: 0;
}

${resizeTriggerSelector} {
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${tokens.neutral.border};
  cursor: col-resize;
  position: relative;
}

${rootSelector}[data-orientation='vertical'] ${resizeTriggerSelector} {
  cursor: row-resize;
}

${resizeIndicatorSelector} {
  width: ${tokens.handleSize.md};
  height: ${tokens.handleSize.md};
  border-radius: 999px;
  background: ${tokens.neutral.handle};
}

${resizeTriggerSelector}:hover ${resizeIndicatorSelector} {
  background: ${tokens.neutral.handleHover};
}

${rootSelector}[data-size='sm'] {
  border-radius: ${tokens.radius.sm};
}

${rootSelector}[data-size='sm'] ${resizeIndicatorSelector} {
  width: ${tokens.handleSize.sm};
  height: ${tokens.handleSize.sm};
}

${rootSelector}[data-size='lg'] {
  border-radius: ${tokens.radius.lg};
}

${rootSelector}[data-size='lg'] ${resizeIndicatorSelector} {
  width: ${tokens.handleSize.lg};
  height: ${tokens.handleSize.lg};
}
`;
};

const SPLITTER_CONTRACT: PrimitiveContract<SplitterPrimitiveProps> = {
  name: "splitter",
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

const splitterPrimitive = createPrimitive<SplitterPrimitiveProps>(
  SPLITTER_CONTRACT,
  (theme) => {
    const css = buildSplitterStyles(theme);
    theme.mountStyles(`splitter-${theme.mode}`, css);
  },
);

registerPrimitive(splitterPrimitive);

export { splitterPrimitive };
