import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type TagsInputSize = "sm" | "md" | "lg";
export type TagsInputState = "default" | "invalid" | "success";

export interface TagsInputPrimitiveProps {
  size?: TagsInputSize;
  state?: TagsInputState;
  disabled?: boolean;
  readOnly?: boolean;
}

interface TagsInputDesignTokens {
  fontFamily: string;
  fontSize: Record<TagsInputSize, string>;
  lineHeight: number;
  fontWeight: number;
  paddingY: Record<TagsInputSize, string>;
  paddingX: Record<TagsInputSize, string>;
  radius: Record<TagsInputSize, string>;
  gap: string;
  chipGap: string;
  neutral: {
    surface: string;
    surfaceRaised: string;
    border: string;
    borderHover: string;
    text: string;
    placeholder: string;
  };
  disabled: {
    bg: string;
    text: string;
  };
  brand: {
    primary: string;
    accent: string;
    warning: string;
  };
  motion: {
    duration: string;
    easing: string;
  };
}

const extractTagsInputTokens = (theme: LoongArkTheme): TagsInputDesignTokens => {
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
      lg: toStringToken(radius.md, "8px"),
    },
    gap: toStringToken(componentSpace.xs, "4px"),
    chipGap: toStringToken(componentSpace.xs, "6px"),
    neutral: {
      surface: toStringToken(neutral["50"], "#FFFFFF"),
      surfaceRaised: toStringToken(neutral["100"], "#F2F2F2"),
      border: toStringToken(neutral["100"], "#E5E6EB"),
      borderHover: toStringToken(neutral["300"], "#B3B4BD"),
      text: toStringToken(neutral["700"], "#232325"),
      placeholder: toStringToken(neutral["300"], "#B3B4BD"),
    },
    disabled: {
      bg: toStringToken(neutral["100"], "#E5E6EB"),
      text: toStringToken(neutral["300"], "#B3B4BD"),
    },
    brand: {
      primary: toStringToken(brand.primary, "#006EFF"),
      accent: toStringToken(brand.accent, "#5AC8FA"),
      warning: toStringToken(brand.warning, "#F58220"),
    },
    motion: {
      duration: toStringToken(duration.base, "200ms"),
      easing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
    },
  };
};

const buildTagsInputStyles = (theme: LoongArkTheme): string => {
  const tokens = extractTagsInputTokens(theme);
  const scopeSelector = `[data-scope="tags-input"]`;
  const rootSelector = `${scopeSelector}[data-part="root"]`;
  const labelSelector = `${scopeSelector}[data-part="label"]`;
  const controlSelector = `${scopeSelector}[data-part="control"]`;
  const inputSelector = `${scopeSelector}[data-part="input"]`;
  const itemSelector = `${scopeSelector}[data-part="item"]`;
  const itemTextSelector = `${scopeSelector}[data-part="item-text"]`;
  const itemPreviewSelector = `${scopeSelector}[data-part="item-preview"]`;
  const itemInputSelector = `${scopeSelector}[data-part="item-input"]`;
  const itemDeleteSelector = `${scopeSelector}[data-part="item-delete-trigger"]`;
  const clearTriggerSelector = `${scopeSelector}[data-part="clear-trigger"]`;
  const hiddenInputSelector = `${scopeSelector}[data-part="hidden-input"]`;
  const invalidSelector = `${controlSelector}[data-state='invalid']`;
  const successSelector = `${controlSelector}[data-state='success']`;
  const disabledSelector = `${controlSelector}[data-disabled='true']`;

  return `
@media (prefers-reduced-motion: reduce) {
  :root:not([data-lk-motion="force"]) * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

${rootSelector} {
  display: inline-flex;
  flex-direction: column;
  gap: ${tokens.gap};
  font-family: ${tokens.fontFamily};
}

${labelSelector} {
  display: inline-block;
  width: fit-content;
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight};
  line-height: ${tokens.lineHeight};
  color: ${tokens.neutral.text};
}

${controlSelector} {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${tokens.chipGap};
  width: 100%;
  min-height: calc(${tokens.fontSize.md} * 2);
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.md};
  background: ${tokens.neutral.surface};
  color: ${tokens.neutral.text};
  font-size: ${tokens.fontSize.md};
  padding: ${tokens.paddingY.md} ${tokens.paddingX.md};
  transition:
    border-color ${tokens.motion.duration} ${tokens.motion.easing},
    box-shadow ${tokens.motion.duration} ${tokens.motion.easing},
    background ${tokens.motion.duration} ${tokens.motion.easing};
}

${controlSelector}:hover {
  border-color: ${tokens.neutral.borderHover};
}

${controlSelector}:focus-within {
  border-color: ${tokens.brand.primary};
  box-shadow: 0 0 0 1px ${tokens.brand.primary};
}

${inputSelector},
${itemInputSelector} {
  flex: 1;
  min-width: 120px;
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
  font: inherit;
  padding: 0;
}

${inputSelector}::placeholder {
  color: ${tokens.neutral.placeholder};
}

${itemSelector} {
  display: inline-flex;
  align-items: center;
  gap: ${tokens.gap};
  padding: 2px ${tokens.paddingX.sm};
  border-radius: ${tokens.radius.sm};
  background: ${tokens.neutral.surfaceRaised};
  color: ${tokens.neutral.text};
  border: 1px solid ${tokens.neutral.border};
}

${itemPreviewSelector} {
  display: inline-flex;
  align-items: center;
  gap: ${tokens.gap};
}

${itemTextSelector} {
  font-size: ${tokens.fontSize.sm};
  line-height: ${tokens.lineHeight};
}

${itemDeleteSelector},
${clearTriggerSelector} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  color: ${tokens.neutral.placeholder};
  cursor: pointer;
  padding: 0;
  font: inherit;
  transition: color ${tokens.motion.duration} ${tokens.motion.easing};
}

${itemDeleteSelector}:hover,
${clearTriggerSelector}:hover {
  color: ${tokens.neutral.text};
}

${controlSelector}[data-size='sm'] {
  font-size: ${tokens.fontSize.sm};
  padding: ${tokens.paddingY.sm} ${tokens.paddingX.sm};
  border-radius: ${tokens.radius.sm};
}

${controlSelector}[data-size='lg'] {
  font-size: ${tokens.fontSize.lg};
  padding: ${tokens.paddingY.lg} ${tokens.paddingX.lg};
  border-radius: ${tokens.radius.lg};
}

${invalidSelector} {
  border-color: ${tokens.brand.warning};
  box-shadow: 0 0 0 1px ${tokens.brand.warning};
}

${successSelector} {
  border-color: ${tokens.brand.accent};
  box-shadow: 0 0 0 1px ${tokens.brand.accent};
}

${disabledSelector} {
  background: ${tokens.disabled.bg};
  color: ${tokens.disabled.text};
  cursor: not-allowed;
  opacity: 0.85;
}

${disabledSelector} ${itemSelector} {
  background: ${tokens.disabled.bg};
  color: ${tokens.disabled.text};
}

${disabledSelector} ${itemDeleteSelector},
${disabledSelector} ${clearTriggerSelector} {
  cursor: not-allowed;
  color: ${tokens.disabled.text};
}

${hiddenInputSelector} {
  display: none;
}
`;
};

const TAGS_INPUT_CONTRACT: PrimitiveContract<TagsInputPrimitiveProps> = {
  name: "tags-input",
  tokens: [
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.300",
    "color.neutral.700",
    "color.brand.primary",
    "color.brand.accent",
    "color.brand.warning",
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
    state: "default",
    disabled: false,
    readOnly: false,
  },
};

const tagsInputPrimitive = createPrimitive<TagsInputPrimitiveProps>(
  TAGS_INPUT_CONTRACT,
  (theme) => {
    const css = buildTagsInputStyles(theme);
    mountPrimitiveStyles(`tags-input-${theme.mode}`, css);
  }
);

registerPrimitive(tagsInputPrimitive);

export { tagsInputPrimitive };
