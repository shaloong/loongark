import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type PasswordInputSize = "sm" | "md" | "lg";
export type PasswordInputState = "default" | "invalid" | "success";

export interface PasswordInputPrimitiveProps {
  size?: PasswordInputSize;
  state?: PasswordInputState;
  disabled?: boolean;
  readOnly?: boolean;
}

interface PasswordInputDesignTokens {
  fontFamily: string;
  fontSize: Record<PasswordInputSize, string>;
  lineHeight: number;
  fontWeight: number;
  paddingY: Record<PasswordInputSize, string>;
  paddingX: Record<PasswordInputSize, string>;
  radius: Record<PasswordInputSize, string>;
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
    warning: string;
  };
  motion: {
    duration: string;
    easing: string;
  };
}

const extractPasswordInputTokens = (
  theme: LoongArkTheme
): PasswordInputDesignTokens => {
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

const buildPasswordInputStyles = (theme: LoongArkTheme): string => {
  const tokens = extractPasswordInputTokens(theme);
  const scopeSelector = `[data-scope="password-input"]`;
  const rootSelector = `${scopeSelector}[data-part="root"]`;
  const labelSelector = `${scopeSelector}[data-part="label"]`;
  const controlSelector = `${scopeSelector}[data-part="control"]`;
  const inputSelector = `${scopeSelector}[data-part="input"]`;
  const indicatorSelector = `${scopeSelector}[data-part="indicator"]`;
  const visibilityTriggerSelector = `${scopeSelector}[data-part="visibility-trigger"]`;
  const invalidSelector = `${controlSelector}[data-state='invalid']`;
  const successSelector = `${controlSelector}[data-state='success']`;
  const disabledSelector = `${controlSelector}[data-disabled='true']`;
  const inputDisabledSelector = `${inputSelector}[disabled], ${inputSelector}[aria-disabled='true']`;
  const readOnlySelector = `${inputSelector}[readonly]`;

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
  align-items: center;
  gap: ${tokens.gap};
  width: 100%;
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.md};
  background: ${tokens.neutral.surface};
  color: ${tokens.neutral.text};
  font-size: ${tokens.fontSize.md};
  font-weight: ${tokens.fontWeight};
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

${inputSelector} {
  flex: 1;
  min-width: 0;
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

${visibilityTriggerSelector} {
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

${visibilityTriggerSelector}:hover {
  color: ${tokens.neutral.text};
}

${indicatorSelector} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
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

${disabledSelector},
${inputDisabledSelector},
${readOnlySelector} {
  background: ${tokens.disabled.bg};
  color: ${tokens.disabled.text};
  cursor: not-allowed;
  opacity: 0.85;
}

${disabledSelector} ${visibilityTriggerSelector} {
  cursor: not-allowed;
  color: ${tokens.disabled.text};
}
`;
};

const PASSWORD_INPUT_CONTRACT: PrimitiveContract<PasswordInputPrimitiveProps> = {
  name: "password-input",
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

const passwordInputPrimitive = createPrimitive<PasswordInputPrimitiveProps>(
  PASSWORD_INPUT_CONTRACT,
  (theme) => {
    const css = buildPasswordInputStyles(theme);
    mountPrimitiveStyles(`password-input-${theme.mode}`, css);
  }
);

registerPrimitive(passwordInputPrimitive);

export { passwordInputPrimitive };
