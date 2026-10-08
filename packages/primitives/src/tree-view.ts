import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type TreeViewSize = "sm" | "md" | "lg";

export interface TreeViewPrimitiveProps {
  size?: TreeViewSize;
}

interface TreeViewDesignTokens {
  fontFamily: string;
  fontSize: Record<TreeViewSize, string>;
  lineHeight: number;
  padding: Record<TreeViewSize, string>;
  radius: Record<TreeViewSize, string>;
  gap: string;
  neutral: {
    surface: string;
    border: string;
    text: string;
    muted: string;
    accent: string;
  };
}

const extractTreeViewTokens = (theme: LoongArkTheme): TreeViewDesignTokens => {
  const typography = theme.styleTokens.typography as TokenTree;
  const fontFamily = asTokenTree(typography.fontFamily);
  const fontSize = asTokenTree(typography.fontSize);
  const lineHeight = asTokenTree(typography.lineHeight);

  const space = asTokenTree(theme.styleTokens.space);
  const componentSpace = asTokenTree(space.component);
  const radius = asTokenTree(theme.styleTokens.radius);

  const color = theme.styleTokens.color as TokenTree;
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
      sm: toStringToken(componentSpace.xs, "4px"),
      md: toStringToken(componentSpace.sm, "8px"),
      lg: toStringToken(componentSpace.md, "12px"),
    },
    radius: {
      sm: toStringToken(radius.sm, "4px"),
      md: toStringToken(radius.md, "6px"),
      lg: toStringToken(radius.lg, "8px"),
    },
    gap: toStringToken(componentSpace.xs, "4px"),
    neutral: {
      surface: toStringToken(neutral["50"], "#FFFFFF"),
      border: toStringToken(neutral["100"], "#E5E6EB"),
      text: toStringToken(neutral["700"], "#232325"),
      muted: toStringToken(neutral["300"], "#B3B4BD"),
      accent: toStringToken(neutral["200"], "#D7D8DD"),
    },
  };
};

const buildTreeViewStyles = (theme: LoongArkTheme): string => {
  const tokens = extractTreeViewTokens(theme);
  const scopeSelector = `[data-scope="tree-view"]`;
  const rootSelector = `${scopeSelector}[data-part="root"]`;
  const labelSelector = `${scopeSelector}[data-part="label"]`;
  const treeSelector = `${scopeSelector}[data-part="tree"]`;
  const itemSelector = `${scopeSelector}[data-part="item"]`;
  const branchSelector = `${scopeSelector}[data-part="branch"]`;
  const branchControlSelector = `${scopeSelector}[data-part="branch-control"]`;
  const branchContentSelector = `${scopeSelector}[data-part="branch-content"]`;
  const branchTriggerSelector = `${scopeSelector}[data-part="branch-trigger"]`;
  const branchIndicatorSelector = `${scopeSelector}[data-part="branch-indicator"]`;
  const branchTextSelector = `${scopeSelector}[data-part="branch-text"]`;
  const branchIndentSelector = `${scopeSelector}[data-part="branch-indent-guide"]`;
  const itemTextSelector = `${scopeSelector}[data-part="item-text"]`;
  const itemIndicatorSelector = `${scopeSelector}[data-part="item-indicator"]`;
  const nodeCheckboxSelector = `${scopeSelector}[data-part="node-checkbox"]`;
  const nodeCheckboxIndicatorSelector = `${scopeSelector}[data-part="node-checkbox-indicator"]`;
  const nodeRenameInputSelector = `${scopeSelector}[data-part="node-rename-input"]`;

  return `
${rootSelector} {
  display: flex;
  flex-direction: column;
  gap: ${tokens.gap};
  font-family: ${tokens.fontFamily};
  color: ${tokens.neutral.text};
}

${labelSelector} {
  font-size: ${tokens.fontSize.sm};
  line-height: ${tokens.lineHeight};
}

${treeSelector} {
  display: flex;
  flex-direction: column;
  gap: ${tokens.gap};
  padding: ${tokens.padding.md};
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.md};
  background: ${tokens.neutral.surface};
}

${itemSelector},
${branchSelector} {
  display: flex;
  flex-direction: column;
  gap: ${tokens.gap};
}

${branchControlSelector},
${branchContentSelector} {
  display: flex;
  align-items: center;
  gap: ${tokens.gap};
}

${branchTriggerSelector},
${itemTextSelector},
${branchTextSelector} {
  display: inline-flex;
  align-items: center;
  gap: ${tokens.gap};
  padding: ${tokens.padding.sm};
  border-radius: ${tokens.radius.sm};
}

${branchTriggerSelector}:hover,
${itemTextSelector}:hover {
  background: ${tokens.neutral.accent};
}

${branchIndicatorSelector},
${itemIndicatorSelector} {
  color: var(--lk-color-semantic-mutedforeground);
  font-size: ${tokens.fontSize.sm};
}

${branchIndentSelector} {
  border-left: 1px dashed ${tokens.neutral.border};
  margin-left: ${tokens.padding.sm};
  padding-left: ${tokens.padding.sm};
}

${nodeCheckboxSelector} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: 1px solid ${tokens.neutral.border};
  border-radius: 3px;
  background: ${tokens.neutral.surface};
}

${nodeCheckboxIndicatorSelector} {
  width: 8px;
  height: 8px;
  background: ${tokens.neutral.text};
  border-radius: 2px;
}

${nodeRenameInputSelector} {
  flex: 1;
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.sm};
  padding: ${tokens.padding.sm};
  font: inherit;
  color: inherit;
}

${rootSelector}[data-size='sm'] ${treeSelector} {
  padding: ${tokens.padding.sm};
  border-radius: ${tokens.radius.sm};
  font-size: ${tokens.fontSize.sm};
}

${rootSelector}[data-size='lg'] ${treeSelector} {
  padding: ${tokens.padding.lg};
  border-radius: ${tokens.radius.lg};
  font-size: ${tokens.fontSize.lg};
}
`;
};

const TREE_VIEW_CONTRACT: PrimitiveContract<TreeViewPrimitiveProps> = {
  name: "tree-view",
  tokens: [
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.200",
    "color.neutral.300",
    "color.neutral.700",
    "typography.fontFamily.body",
    "typography.fontSize.sm",
    "typography.fontSize.md",
    "typography.fontSize.lg",
    "typography.lineHeight.base",
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

const treeViewPrimitive = createPrimitive<TreeViewPrimitiveProps>(
  TREE_VIEW_CONTRACT,
  (theme) => {
    const css = buildTreeViewStyles(theme);
    theme.mountStyles(`tree-view-${theme.mode}`, css);
  },
);

registerPrimitive(treeViewPrimitive);

export { treeViewPrimitive };
