import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type StepsSize = "sm" | "md" | "lg";
export type StepsOrientation = "horizontal" | "vertical";

export interface StepsPrimitiveProps {
  size?: StepsSize;
  orientation?: StepsOrientation;
}

interface StepsDesignTokens {
  fontFamily: string;
  fontSize: Record<StepsSize, string>;
  lineHeight: number;
  fontWeight: number;
  gap: string;
  indicatorSize: Record<StepsSize, string>;
  indicatorBorder: string;
  radius: string;
  neutral: {
    surface: string;
    border: string;
    text: string;
    placeholder: string;
  };
  brand: {
    primary: string;
    accent: string;
  };
}

const extractStepsTokens = (theme: LoongArkTheme): StepsDesignTokens => {
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

  return {
    fontFamily: toStringToken(fontFamily.body, "sans-serif"),
    fontSize: {
      sm: toStringToken(fontSize.sm, "14px"),
      md: toStringToken(fontSize.md, "16px"),
      lg: toStringToken(fontSize.lg, "20px"),
    },
    lineHeight: toNumberToken(lineHeight.base, 1.5),
    fontWeight: toNumberToken(fontWeight.regular, 400),
    gap: toStringToken(componentSpace.md, "16px"),
    indicatorSize: {
      sm: toStringToken(componentSpace.md, "24px"),
      md: toStringToken(componentSpace.lg, "32px"),
      lg: toStringToken(componentSpace.xl, "40px"),
    },
    indicatorBorder: toStringToken(componentSpace.xs, "2px"),
    radius: toStringToken(radius.md, "6px"),
    neutral: {
      surface: toStringToken(neutral["50"], "#FFFFFF"),
      border: toStringToken(neutral["100"], "#E5E6EB"),
      text: toStringToken(neutral["700"], "#232325"),
      placeholder: toStringToken(neutral["300"], "#B3B4BD"),
    },
    brand: {
      primary: toStringToken(brand.primary, "#006EFF"),
      accent: toStringToken(brand.accent, "#5AC8FA"),
    },
  };
};

const buildStepsStyles = (theme: LoongArkTheme): string => {
  const tokens = extractStepsTokens(theme);
  const scopeSelector = `[data-scope="steps"]`;
  const rootSelector = `${scopeSelector}[data-part="root"]`;
  const listSelector = `${scopeSelector}[data-part="list"]`;
  const itemSelector = `${scopeSelector}[data-part="item"]`;
  const indicatorSelector = `${scopeSelector}[data-part="indicator"]`;
  const separatorSelector = `${scopeSelector}[data-part="separator"]`;
  const triggerSelector = `${scopeSelector}[data-part="trigger"]`;
  const contentSelector = `${scopeSelector}[data-part="content"]`;
  const completedContentSelector = `${scopeSelector}[data-part="completed-content"]`;
  const progressSelector = `${scopeSelector}[data-part="progress"]`;
  const nextTriggerSelector = `${scopeSelector}[data-part="next-trigger"]`;
  const prevTriggerSelector = `${scopeSelector}[data-part="prev-trigger"]`;

  return `
${rootSelector} {
  display: flex;
  flex-direction: column;
  gap: ${tokens.gap};
  font-family: ${tokens.fontFamily};
  color: ${tokens.neutral.text};
}

${listSelector} {
  display: flex;
  align-items: center;
  gap: ${tokens.gap};
}

${rootSelector}[data-orientation="vertical"] ${listSelector} {
  flex-direction: column;
  align-items: flex-start;
}

${itemSelector} {
  display: inline-flex;
  align-items: center;
  gap: ${tokens.gap};
}

${rootSelector}[data-orientation="vertical"] ${itemSelector} {
  align-items: flex-start;
}

${indicatorSelector} {
  width: ${tokens.indicatorSize.md};
  height: ${tokens.indicatorSize.md};
  border-radius: 999px;
  border: ${tokens.indicatorBorder} solid ${tokens.neutral.border};
  background: ${tokens.neutral.surface};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${tokens.fontSize.sm};
  color: ${tokens.neutral.text};
  flex-shrink: 0;
}

${rootSelector}[data-size="sm"] ${indicatorSelector} {
  width: ${tokens.indicatorSize.sm};
  height: ${tokens.indicatorSize.sm};
  font-size: ${tokens.fontSize.sm};
}

${rootSelector}[data-size="lg"] ${indicatorSelector} {
  width: ${tokens.indicatorSize.lg};
  height: ${tokens.indicatorSize.lg};
  font-size: ${tokens.fontSize.md};
}

${itemSelector}[data-current="true"] ${indicatorSelector} {
  border-color: ${tokens.brand.primary};
  color: ${tokens.brand.primary};
}

${itemSelector}[data-complete="true"] ${indicatorSelector} {
  border-color: ${tokens.brand.primary};
  background: ${tokens.brand.primary};
  color: ${tokens.neutral.surface};
}

${separatorSelector} {
  flex: 1;
  height: 2px;
  background: ${tokens.neutral.border};
  border-radius: ${tokens.radius};
}

${rootSelector}[data-orientation="vertical"] ${separatorSelector} {
  width: 2px;
  height: 32px;
}

${itemSelector}[data-complete="true"] + ${separatorSelector} {
  background: ${tokens.brand.primary};
}

${triggerSelector} {
  border: none;
  background: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  text-align: left;
}

${contentSelector},
${completedContentSelector} {
  font-size: ${tokens.fontSize.sm};
  line-height: ${tokens.lineHeight};
  color: ${tokens.neutral.text};
}

${progressSelector} {
  height: 2px;
  background: ${tokens.brand.primary};
  border-radius: ${tokens.radius};
}

${nextTriggerSelector},
${prevTriggerSelector} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${tokens.neutral.border};
  background: ${tokens.neutral.surface};
  color: ${tokens.neutral.text};
  border-radius: ${tokens.radius};
  padding: 4px 12px;
  cursor: pointer;
  font: inherit;
}

${nextTriggerSelector}:hover,
${prevTriggerSelector}:hover {
  border-color: ${tokens.brand.primary};
  color: ${tokens.brand.primary};
}
`;
};

const STEPS_CONTRACT: PrimitiveContract<StepsPrimitiveProps> = {
  name: "steps",
  tokens: [
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.300",
    "color.neutral.700",
    "color.brand.primary",
    "color.brand.accent",
    "typography.fontFamily.body",
    "typography.fontSize.sm",
    "typography.fontSize.md",
    "typography.lineHeight.base",
    "typography.fontWeight.regular",
    "space.component.xs",
    "space.component.md",
    "space.component.lg",
    "space.component.xl",
    "radius.md",
  ],
  defaults: {
    size: "md",
    orientation: "horizontal",
  },
};

const stepsPrimitive = createPrimitive<StepsPrimitiveProps>(
  STEPS_CONTRACT,
  (theme) => {
    const css = buildStepsStyles(theme);
    mountPrimitiveStyles(`steps-${theme.mode}`, css);
  }
);

registerPrimitive(stepsPrimitive);

export { stepsPrimitive };
