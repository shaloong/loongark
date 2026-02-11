import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type RatingGroupSize = "sm" | "md" | "lg";

export interface RatingGroupPrimitiveProps {
  size?: RatingGroupSize;
  disabled?: boolean;
}

interface RatingGroupDesignTokens {
  fontFamily: string;
  fontSize: Record<RatingGroupSize, string>;
  lineHeight: number;
  gap: string;
  neutral: {
    text: string;
    muted: string;
  };
  brand: {
    primary: string;
    warning: string;
  };
}

const extractRatingGroupTokens = (theme: LoongArkTheme): RatingGroupDesignTokens => {
  const typography = theme.tokens.typography as TokenTree;
  const fontFamily = asTokenTree(typography.fontFamily);
  const fontSize = asTokenTree(typography.fontSize);
  const lineHeight = asTokenTree(typography.lineHeight);
  const space = asTokenTree(theme.tokens.space);
  const componentSpace = asTokenTree(space.component);
  const color = theme.tokens.color as TokenTree;
  const brand = asTokenTree(color.brand);
  const neutral = asTokenTree(color.neutral);

  return {
    fontFamily: toStringToken(fontFamily.body, "sans-serif"),
    fontSize: {
      sm: toStringToken(fontSize.sm, "14px"),
      md: toStringToken(fontSize.md, "18px"),
      lg: toStringToken(fontSize.lg, "22px"),
    },
    lineHeight: toNumberToken(lineHeight.base, 1.5),
    gap: toStringToken(componentSpace.xs, "4px"),
    neutral: {
      text: toStringToken(neutral["700"], "#232325"),
      muted: toStringToken(neutral["300"], "#B3B4BD"),
    },
    brand: {
      primary: toStringToken(brand.primary, "#006EFF"),
      warning: toStringToken(brand.warning, "#F58220"),
    },
  };
};

const buildRatingGroupStyles = (theme: LoongArkTheme): string => {
  const tokens = extractRatingGroupTokens(theme);
  const scopeSelector = `[data-scope="rating-group"]`;
  const rootSelector = `${scopeSelector}[data-part="root"]`;
  const labelSelector = `${scopeSelector}[data-part="label"]`;
  const controlSelector = `${scopeSelector}[data-part="control"]`;
  const itemSelector = `${scopeSelector}[data-part="item"]`;
  const hiddenInputSelector = `${scopeSelector}[data-part="hidden-input"]`;
  const disabledSelector = `${rootSelector}[data-disabled='true']`;

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

${controlSelector} {
  display: inline-flex;
  align-items: center;
  gap: ${tokens.gap};
}

${itemSelector} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${tokens.fontSize.md};
  color: ${tokens.neutral.muted};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

${itemSelector}[data-highlighted='true'],
${itemSelector}[data-checked='true'] {
  color: ${tokens.brand.warning};
}

${rootSelector}[data-size='sm'] ${itemSelector} {
  font-size: ${tokens.fontSize.sm};
}

${rootSelector}[data-size='lg'] ${itemSelector} {
  font-size: ${tokens.fontSize.lg};
}

${hiddenInputSelector} {
  display: none;
}

${disabledSelector} ${itemSelector} {
  cursor: not-allowed;
  color: ${tokens.neutral.muted};
  opacity: 0.6;
}
`;
};

const RATING_GROUP_CONTRACT: PrimitiveContract<RatingGroupPrimitiveProps> = {
  name: "rating-group",
  tokens: [
    "color.neutral.300",
    "color.neutral.700",
    "color.brand.primary",
    "color.brand.warning",
    "typography.fontFamily.body",
    "typography.fontSize.sm",
    "typography.fontSize.md",
    "typography.fontSize.lg",
    "typography.lineHeight.base",
    "space.component.xs",
  ],
  defaults: {
    size: "md",
    disabled: false,
  },
};

const ratingGroupPrimitive = createPrimitive<RatingGroupPrimitiveProps>(
  RATING_GROUP_CONTRACT,
  (theme) => {
    const css = buildRatingGroupStyles(theme);
    mountPrimitiveStyles(`rating-group-${theme.mode}`, css);
  }
);

registerPrimitive(ratingGroupPrimitive);

export { ratingGroupPrimitive };
