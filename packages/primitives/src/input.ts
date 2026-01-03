import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type InputSize = "sm" | "md" | "lg";
export type InputState = "default" | "invalid" | "success";

export interface InputPrimitiveProps {
  size?: InputSize;
  state?: InputState;
  disabled?: boolean;
  readOnly?: boolean;
  multiline?: boolean;
}

interface InputDesignTokens {
  fontFamily: string;
  fontSize: Record<InputSize, string>;
  lineHeight: number;
  fontWeight: number;
  paddingY: Record<InputSize, string>;
  paddingX: Record<InputSize, string>;
  radius: Record<InputSize, string>;
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
  shadow: string;
}

const extractInputTokens = (theme: LoongArkTheme): InputDesignTokens => {
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
    shadow: "0 8px 40px rgba(0, 0, 0, 0.08)",
  };
};

const buildInputStyles = (theme: LoongArkTheme): string => {
  const tokens = extractInputTokens(theme);
  const controlSelector = `[data-lk-input]`;
  const wrapperSelector = `[data-lk-input-wrapper]`;
  const controlInsideWrapperSelector = `${wrapperSelector} ${controlSelector}`;
  const prefixSelector = `[data-lk-input-prefix]`;
  const suffixSelector = `[data-lk-input-suffix]`;
  const labelSelector = `[data-lk-input-label]`;
  const helperSelector = `[data-lk-input-helper]`;
  const invalidSelectors = `${controlSelector}[data-state='invalid'], ${controlSelector}[aria-invalid='true']`;
  const successSelector = `${controlSelector}[data-state='success']`;
  const disabledSelector = `${controlSelector}[disabled], ${controlSelector}[aria-disabled='true']`;
  const readOnlySelector = `${controlSelector}[readonly]`;
  const stateAttributeSelectors = `${controlSelector}[data-state], ${wrapperSelector}[data-state]`;

  return `
${controlSelector} {
  width: 100%;
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.md};
  background: ${tokens.neutral.surface};
  color: ${tokens.neutral.text};
  font-family: ${tokens.fontFamily};
  font-size: ${tokens.fontSize.md};
  font-weight: ${tokens.fontWeight};
  line-height: ${tokens.lineHeight};
  padding: ${tokens.paddingY.md} ${tokens.paddingX.md};
  transition:
    border-color ${tokens.motion.duration} ${tokens.motion.easing},
    box-shadow ${tokens.motion.duration} ${tokens.motion.easing},
    background ${tokens.motion.duration} ${tokens.motion.easing};
}

${controlSelector}:hover {
  border-color: ${tokens.neutral.borderHover};
}

${controlSelector}:focus-visible {
  outline: none;
  border-color: ${tokens.brand.primary};
}

${controlSelector}::placeholder {
  color: ${tokens.neutral.placeholder};
  opacity: 1;
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

${invalidSelectors} {
  border-color: ${tokens.brand.warning};
  box-shadow: 0 0 0 1px ${tokens.brand.warning};
}

${successSelector} {
  border-color: ${tokens.brand.accent};
  box-shadow: 0 0 0 1px ${tokens.brand.accent};
}

${disabledSelector},
${readOnlySelector} {
  background: ${tokens.disabled.bg};
  color: ${tokens.disabled.text};
  cursor: not-allowed;
  opacity: 0.85;
}

textarea[data-lk-input],
${controlSelector}[data-multiline='true'] {
  min-height: 120px;
  resize: vertical;
}

${controlInsideWrapperSelector} {
  border: none;
  box-shadow: none;
  background: transparent;
  border-radius: 0;
  padding: 0;
}

${controlInsideWrapperSelector}:focus-visible {
  box-shadow: none;
  border-color: transparent;
}

${wrapperSelector} {
  width: 100%;
  display: inline-flex;
  align-items: center;
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.md};
  background: ${tokens.neutral.surface};
  color: ${tokens.neutral.text};
  font-family: ${tokens.fontFamily};
  padding: ${tokens.paddingY.md} ${tokens.paddingX.md};
  gap: ${tokens.paddingX.sm};
  box-sizing: border-box;
  transition:
    border-color ${tokens.motion.duration} ${tokens.motion.easing},
    box-shadow ${tokens.motion.duration} ${tokens.motion.easing},
    background ${tokens.motion.duration} ${tokens.motion.easing};
}

${wrapperSelector}:hover {
  border-color: ${tokens.neutral.borderHover};
}

${wrapperSelector}:focus-within {
  border-color: ${tokens.brand.primary};
}

${wrapperSelector}[data-size='sm'] {
  padding: ${tokens.paddingY.sm} ${tokens.paddingX.sm};
  border-radius: ${tokens.radius.sm};
  font-size: ${tokens.fontSize.sm};
}

${wrapperSelector}[data-size='lg'] {
  padding: ${tokens.paddingY.lg} ${tokens.paddingX.lg};
  border-radius: ${tokens.radius.lg};
  font-size: ${tokens.fontSize.lg};
}

${wrapperSelector}[data-state='invalid'] {
  border-color: ${tokens.brand.warning};
}

${wrapperSelector}[data-state='success'] {
  border-color: ${tokens.brand.accent};
}

${wrapperSelector}[data-disabled='true'] {
  background: ${tokens.disabled.bg};
  color: ${tokens.disabled.text};
  cursor: not-allowed;
  opacity: 0.85;
}

${wrapperSelector} input,
${wrapperSelector} textarea {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: ${tokens.lineHeight};
  padding: 0;
}

${wrapperSelector} input::placeholder,
${wrapperSelector} textarea::placeholder {
  color: ${tokens.neutral.placeholder};
}

${prefixSelector},
${suffixSelector} {
  display: inline-block;
  color: ${tokens.neutral.placeholder};
  font-size: inherit;
  line-height: ${tokens.lineHeight};
  flex-shrink: 0;
}

${suffixSelector}[data-action='clear'] {
  color: ${tokens.neutral.placeholder};
  cursor: pointer;
  transition: color ${tokens.motion.duration} ${tokens.motion.easing};
}

${suffixSelector}[data-action='clear']:hover {
  color: ${tokens.neutral.text};
}

${labelSelector} {
  display: inline-block;
  width: fit-content;
  font-family: ${tokens.fontFamily};
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight};
  line-height: ${tokens.lineHeight};
  color: ${tokens.neutral.text};
  margin: 0 0 ${tokens.gap} 0;
  flex-shrink: 0;
}

${wrapperSelector} ${labelSelector} {
  margin: 0;
}

${wrapperSelector}[data-variant='floating'] {
  position: relative;
  align-items: center;
  --lk-input-floating-translate: calc(-100% - ${tokens.paddingY.md});
  --lk-input-floating-scale: calc(${tokens.fontSize.sm} / ${tokens.fontSize.md});
}

${wrapperSelector}[data-variant='floating'] ${labelSelector} {
  position: absolute;
  left: ${tokens.paddingX.md};
  top: 50%;
  transform-origin: top left;
  transform: translateY(-50%) scale(1);
  pointer-events: none;
  transition:
    transform ${tokens.motion.duration} ${tokens.motion.easing},
    color ${tokens.motion.duration} ${tokens.motion.easing};
  will-change: transform;
  margin: 0;
  color: ${tokens.neutral.placeholder};
  font-size: ${tokens.fontSize.md};
  line-height: ${tokens.lineHeight};
  background: ${tokens.neutral.surface};
  padding: 0 4px;
  z-index: 1;
}

${wrapperSelector}[data-variant='floating'][data-size='sm'] ${labelSelector} {
  left: ${tokens.paddingX.sm};
  font-size: ${tokens.fontSize.sm};
}

${wrapperSelector}[data-variant='floating'][data-size='lg'] ${labelSelector} {
  left: ${tokens.paddingX.lg};
  font-size: ${tokens.fontSize.lg};
}

${wrapperSelector}[data-variant='floating'][data-size='sm'] {
  --lk-input-floating-translate: calc(-100% - ${tokens.paddingY.sm});
  --lk-input-floating-scale: calc(${tokens.fontSize.sm} / ${tokens.fontSize.sm});
}

${wrapperSelector}[data-variant='floating'][data-size='lg'] {
  --lk-input-floating-translate: calc(-100% - ${tokens.paddingY.lg});
  --lk-input-floating-scale: calc(${tokens.fontSize.sm} / ${tokens.fontSize.lg});
}

${wrapperSelector}[data-variant='floating']:focus-within ${labelSelector},
${wrapperSelector}[data-variant='floating'][data-has-value='true'] ${labelSelector} {
  transform: translateY(var(--lk-input-floating-translate)) scale(var(--lk-input-floating-scale));
  color: ${tokens.brand.primary};
}

${wrapperSelector}[data-variant='floating'][data-state='invalid']:focus-within ${labelSelector},
${wrapperSelector}[data-variant='floating'][data-state='invalid'][data-has-value='true'] ${labelSelector} {
  transform: translateY(var(--lk-input-floating-translate)) scale(var(--lk-input-floating-scale));
  color: ${tokens.brand.warning};
}

${wrapperSelector}[data-variant='floating'][data-state='success']:focus-within ${labelSelector},
${wrapperSelector}[data-variant='floating'][data-state='success'][data-has-value='true'] ${labelSelector} {
  transform: translateY(var(--lk-input-floating-translate)) scale(var(--lk-input-floating-scale));
  color: ${tokens.brand.accent};
}

${wrapperSelector} ~ ${helperSelector},
${controlSelector} ~ ${helperSelector} {
  display: block;
  font-family: ${tokens.fontFamily};
  font-size: ${tokens.fontSize.sm};
  line-height: ${tokens.lineHeight};
  color: ${tokens.neutral.placeholder};
}

${wrapperSelector} ~ ${helperSelector}[data-variant='error'],
${controlSelector} ~ ${helperSelector}[data-variant='error'] {
  color: ${tokens.brand.warning};
}

${wrapperSelector} ~ ${helperSelector}[data-variant='success'],
${controlSelector} ~ ${helperSelector}[data-variant='success'] {
  color: ${tokens.brand.accent};
}

${stateAttributeSelectors}[data-state='invalid'] ~ ${helperSelector} {
  color: ${tokens.brand.warning};
}

${stateAttributeSelectors}[data-state='success'] + ${helperSelector} {
  color: ${tokens.brand.accent};
}
`;
};

const INPUT_CONTRACT: PrimitiveContract<InputPrimitiveProps> = {
  name: "input",
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
    multiline: false,
  },
};

const inputPrimitive = createPrimitive<InputPrimitiveProps>(
  INPUT_CONTRACT,
  (theme) => {
    const css = buildInputStyles(theme);
    mountPrimitiveStyles(`input-${theme.mode}`, css);
  }
);

registerPrimitive(inputPrimitive);

export { inputPrimitive };
