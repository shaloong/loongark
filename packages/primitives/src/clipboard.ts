import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type ClipboardSize = "sm" | "md" | "lg";

export interface ClipboardPrimitiveProps {
  size?: ClipboardSize;
  disabled?: boolean;
}

interface ClipboardDesignTokens {
  fontFamily: string;
  fontSize: Record<ClipboardSize, string>;
  lineHeight: number;
  fontWeight: number;
  paddingY: Record<ClipboardSize, string>;
  paddingX: Record<ClipboardSize, string>;
  radius: Record<ClipboardSize, string>;
  gap: string;
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
  };
  motion: {
    duration: string;
    easing: string;
  };
}

const extractClipboardTokens = (theme: LoongArkTheme): ClipboardDesignTokens => {
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
    gap: toStringToken(componentSpace.sm, "8px"),
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
    },
    motion: {
      duration: toStringToken(duration.base, "200ms"),
      easing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
    },
  };
};

const buildClipboardStyles = (theme: LoongArkTheme): string => {
  const tokens = extractClipboardTokens(theme);
  const scopeSelector = `[data-scope="clipboard"]`;
  const rootSelector = `${scopeSelector}[data-part="root"]`;
  const labelSelector = `${scopeSelector}[data-part="label"]`;
  const controlSelector = `${scopeSelector}[data-part="control"]`;
  const inputSelector = `${scopeSelector}[data-part="input"]`;
  const triggerSelector = `${scopeSelector}[data-part="trigger"]`;
  const indicatorSelector = `${scopeSelector}[data-part="indicator"]`;
  const valueTextSelector = `${scopeSelector}[data-part="value-text"]`;
  const disabledSelector = `${rootSelector}[data-disabled='true']`;

  return `
@media (prefers-reduced-motion: reduce) {
  :root:not([data-lk-motion="force"]) * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

${rootSelector} {
  display: flex;
  flex-direction: column;
  gap: ${tokens.gap};
  font-family: ${tokens.fontFamily};
  color: ${tokens.neutral.text};
}

${labelSelector} {
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight};
  line-height: ${tokens.lineHeight};
}

${controlSelector} {
  display: flex;
  align-items: center;
  gap: ${tokens.gap};
}

${inputSelector} {
  flex: 1;
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.md};
  padding: ${tokens.paddingY.md} ${tokens.paddingX.md};
  font: inherit;
  color: inherit;
  background: ${tokens.neutral.surface};
  transition:
    border-color ${tokens.motion.duration} ${tokens.motion.easing},
    box-shadow ${tokens.motion.duration} ${tokens.motion.easing};
}

${inputSelector}:focus {
  outline: none;
  border-color: ${tokens.brand.primary};
  box-shadow: 0 0 0 1px ${tokens.brand.primary};
}

${triggerSelector} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${tokens.gap};
  border: 1px solid ${tokens.neutral.border};
  background: ${tokens.neutral.surfaceRaised};
  color: ${tokens.neutral.text};
  border-radius: ${tokens.radius.sm};
  padding: ${tokens.paddingY.sm} ${tokens.paddingX.md};
  font: inherit;
  cursor: pointer;
  transition:
    border-color ${tokens.motion.duration} ${tokens.motion.easing},
    background ${tokens.motion.duration} ${tokens.motion.easing};
}

${triggerSelector}:hover {
  border-color: ${tokens.neutral.borderHover};
  background: ${tokens.neutral.surface};
}

${indicatorSelector},
${valueTextSelector} {
  font-size: ${tokens.fontSize.sm};
  color: ${tokens.neutral.placeholder};
}

${rootSelector}[data-size='sm'] ${inputSelector} {
  padding: ${tokens.paddingY.sm} ${tokens.paddingX.sm};
  border-radius: ${tokens.radius.sm};
  font-size: ${tokens.fontSize.sm};
}

${rootSelector}[data-size='lg'] ${inputSelector} {
  padding: ${tokens.paddingY.lg} ${tokens.paddingX.lg};
  border-radius: ${tokens.radius.lg};
  font-size: ${tokens.fontSize.lg};
}

${disabledSelector} {
  opacity: 0.85;
  cursor: not-allowed;
}

${disabledSelector} ${inputSelector},
${disabledSelector} ${triggerSelector} {
  background: ${tokens.disabled.bg};
  border-color: ${tokens.disabled.bg};
  color: ${tokens.disabled.text};
  cursor: not-allowed;
}
`;
};

const CLIPBOARD_CONTRACT: PrimitiveContract<ClipboardPrimitiveProps> = {
  name: "clipboard",
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
    disabled: false,
  },
};

const clipboardPrimitive = createPrimitive<ClipboardPrimitiveProps>(
  CLIPBOARD_CONTRACT,
  (theme) => {
    const css = buildClipboardStyles(theme);
    mountPrimitiveStyles(`clipboard-${theme.mode}`, css);
  }
);

registerPrimitive(clipboardPrimitive);

export { clipboardPrimitive };
