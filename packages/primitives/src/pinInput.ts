import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type PinInputSize = "sm" | "md" | "lg";
export type PinInputState = "default" | "invalid" | "success";

export interface PinInputPrimitiveProps {
  size?: PinInputSize;
  state?: PinInputState;
  disabled?: boolean;
}

interface PinInputDesignTokens {
  fontFamily: string;
  fontSize: Record<PinInputSize, string>;
  lineHeight: number;
  fontWeight: number;
  width: Record<PinInputSize, string>;
  height: Record<PinInputSize, string>;
  radius: Record<PinInputSize, string>;
  gap: Record<PinInputSize, string>;
  neutral: {
    surface: string;
    border: string;
    borderHover: string;
    text: string;
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

const extractPinInputTokens = (theme: LoongArkTheme): PinInputDesignTokens => {
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
      sm: toStringToken(fontSize.md, "16px"),
      md: toStringToken(fontSize.lg, "20px"),
      lg: toStringToken(fontSize.xl, "24px"),
    },
    lineHeight: toNumberToken(lineHeight.base, 1.5),
    fontWeight: toNumberToken(fontWeight.medium, 500),
    width: {
      sm: "40px",
      md: "48px",
      lg: "56px",
    },
    height: {
      sm: "40px",
      md: "48px",
      lg: "56px",
    },
    radius: {
      sm: "6px",
      md: toStringToken(radius.md, "8px"),
      lg: "10px",
    },
    gap: {
      sm: toStringToken(componentSpace.xs, "4px"),
      md: toStringToken(componentSpace.sm, "8px"),
      lg: toStringToken(componentSpace.md, "12px"),
    },
    neutral: {
      surface: toStringToken(neutral["50"], "#FFFFFF"),
      border: toStringToken(neutral["100"], "#E5E6EB"),
      borderHover: toStringToken(neutral["300"], "#B3B4BD"),
      text: toStringToken(neutral["700"], "#232325"),
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

const buildPinInputStyles = (theme: LoongArkTheme): string => {
  const tokens = extractPinInputTokens(theme);
  const scopeSelector = `[data-scope="pin-input"]`;
  const rootSelector = `${scopeSelector}[data-part="root"]`;
  const controlSelector = `${scopeSelector}[data-part="control"]`;
  const inputSelector = `${scopeSelector}[data-part="input"]`;
  const labelSelector = `${scopeSelector}[data-part="label"]`;

  return `
@media (prefers-reduced-motion: reduce) {
  :root:not([data-lk-motion="force"]) ${rootSelector} * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

${rootSelector} {
  display: inline-flex;
  flex-direction: column;
  gap: ${tokens.gap.md};
}

${labelSelector} {
  display: inline-block;
  font-family: ${tokens.fontFamily};
  font-size: 14px;
  font-weight: ${tokens.fontWeight};
  line-height: ${tokens.lineHeight};
  color: ${tokens.neutral.text};
  margin: 0;
}

${controlSelector} {
  display: inline-flex;
  align-items: center;
  gap: ${tokens.gap.md};
}

${controlSelector}[data-size='sm'] {
  gap: ${tokens.gap.sm};
}

${controlSelector}[data-size='lg'] {
  gap: ${tokens.gap.lg};
}

${inputSelector} {
  width: ${tokens.width.md};
  height: ${tokens.height.md};
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.md};
  background: ${tokens.neutral.surface};
  color: ${tokens.neutral.text};
  font-family: ${tokens.fontFamily};
  font-size: ${tokens.fontSize.md};
  font-weight: ${tokens.fontWeight};
  line-height: ${tokens.lineHeight};
  text-align: center;
  transition:
    border-color ${tokens.motion.duration} ${tokens.motion.easing},
    box-shadow ${tokens.motion.duration} ${tokens.motion.easing};
  caret-color: ${tokens.brand.primary};
}

${inputSelector}[data-size='sm'] {
  width: ${tokens.width.sm};
  height: ${tokens.height.sm};
  font-size: ${tokens.fontSize.sm};
  border-radius: ${tokens.radius.sm};
}

${inputSelector}[data-size='lg'] {
  width: ${tokens.width.lg};
  height: ${tokens.height.lg};
  font-size: ${tokens.fontSize.lg};
  border-radius: ${tokens.radius.lg};
}

${inputSelector}:hover {
  border-color: ${tokens.neutral.borderHover};
}

${inputSelector}:focus {
  outline: none;
  border-color: ${tokens.brand.primary};
}

${inputSelector}::placeholder {
  color: transparent;
}

${inputSelector}[data-state='invalid'] {
  border-color: ${tokens.brand.warning};
}

${inputSelector}[data-state='invalid']:focus {
  box-shadow: 0 0 0 1px ${tokens.brand.warning}, 0 0 0 4px rgba(245, 130, 32, 0.2);
}

${inputSelector}[data-state='success'] {
  border-color: ${tokens.brand.accent};
}

${inputSelector}[data-state='success']:focus {
  box-shadow: 0 0 0 1px ${tokens.brand.accent}, 0 0 0 4px rgba(90, 200, 250, 0.2);
}

${inputSelector}[disabled] {
  background: ${tokens.disabled.bg};
  color: ${tokens.disabled.text};
  cursor: not-allowed;
  opacity: 0.85;
}

${inputSelector}[data-complete='true'] {
  border-color: ${tokens.brand.accent};
}
`;
};

const PININPUT_CONTRACT: PrimitiveContract<PinInputPrimitiveProps> = {
  name: "pin-input",
  tokens: [
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.300",
    "color.neutral.700",
    "color.brand.primary",
    "color.brand.accent",
    "color.brand.warning",
    "typography.fontFamily.body",
    "typography.fontSize.md",
    "typography.fontSize.lg",
    "typography.fontSize.xl",
    "typography.lineHeight.base",
    "typography.fontWeight.medium",
    "space.component.xs",
    "space.component.sm",
    "space.component.md",
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
  },
};

const pinInputPrimitive = createPrimitive<PinInputPrimitiveProps>(
  PININPUT_CONTRACT,
  (theme) => {
    const css = buildPinInputStyles(theme);
    mountPrimitiveStyles(`pin-input-${theme.mode}`, css);
  }
);

registerPrimitive(pinInputPrimitive);

export { pinInputPrimitive };
