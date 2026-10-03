import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type EditableSize = "sm" | "md" | "lg";
export type EditableState = "default" | "invalid" | "success";

export interface EditablePrimitiveProps {
  size?: EditableSize;
  state?: EditableState;
  disabled?: boolean;
}

interface EditableDesignTokens {
  fontFamily: string;
  fontSize: Record<EditableSize, string>;
  lineHeight: number;
  fontWeight: number;
  paddingY: Record<EditableSize, string>;
  paddingX: Record<EditableSize, string>;
  radius: Record<EditableSize, string>;
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

const extractEditableTokens = (theme: LoongArkTheme): EditableDesignTokens => {
  const typography = theme.styleTokens.typography as TokenTree;
  const fontFamily = asTokenTree(typography.fontFamily);
  const fontSize = asTokenTree(typography.fontSize);
  const lineHeight = asTokenTree(typography.lineHeight);
  const fontWeight = asTokenTree(typography.fontWeight);

  const space = asTokenTree(theme.styleTokens.space);
  const componentSpace = asTokenTree(space.component);
  const radius = asTokenTree(theme.styleTokens.radius);

  const color = theme.styleTokens.color as TokenTree;
  const brand = asTokenTree(color.brand);
  const neutral = asTokenTree(color.neutral);

  const motion = theme.styleTokens.motion as TokenTree;
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
      warning: toStringToken(brand.warning, "#F58220"),
    },
    motion: {
      duration: toStringToken(duration.base, "200ms"),
      easing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
    },
  };
};

const buildEditableStyles = (theme: LoongArkTheme): string => {
  const tokens = extractEditableTokens(theme);
  const scopeSelector = `[data-scope="editable"]`;
  const rootSelector = `${scopeSelector}[data-part="root"]`;
  const labelSelector = `${scopeSelector}[data-part="label"]`;
  const areaSelector = `${scopeSelector}[data-part="area"]`;
  const controlSelector = `${scopeSelector}[data-part="control"]`;
  const inputSelector = `${scopeSelector}[data-part="input"]`;
  const previewSelector = `${scopeSelector}[data-part="preview"]`;
  const editTriggerSelector = `${scopeSelector}[data-part="edit-trigger"]`;
  const submitTriggerSelector = `${scopeSelector}[data-part="submit-trigger"]`;
  const cancelTriggerSelector = `${scopeSelector}[data-part="cancel-trigger"]`;
  const invalidSelector = `${controlSelector}[data-state='invalid']`;
  const successSelector = `${controlSelector}[data-state='success']`;
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
  font-weight: ${tokens.fontWeight};
  line-height: ${tokens.lineHeight};
}

${areaSelector} {
  display: flex;
  flex-direction: column;
  gap: ${tokens.gap};
}

${controlSelector} {
  display: flex;
  align-items: center;
  gap: ${tokens.gap};
}

${inputSelector},
${previewSelector} {
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

${previewSelector} {
  background: ${tokens.neutral.surfaceRaised};
}

${inputSelector}:focus {
  outline: none;
  border-color: ${tokens.brand.primary};
  box-shadow: 0 0 0 1px ${tokens.brand.primary};
}

${editTriggerSelector},
${submitTriggerSelector},
${cancelTriggerSelector} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
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

${editTriggerSelector}:hover,
${submitTriggerSelector}:hover,
${cancelTriggerSelector}:hover {
  border-color: ${tokens.neutral.borderHover};
  background: ${tokens.neutral.surface};
}

${rootSelector}[data-size='sm'] ${inputSelector},
${rootSelector}[data-size='sm'] ${previewSelector} {
  padding: ${tokens.paddingY.sm} ${tokens.paddingX.sm};
  border-radius: ${tokens.radius.sm};
  font-size: ${tokens.fontSize.sm};
}

${rootSelector}[data-size='lg'] ${inputSelector},
${rootSelector}[data-size='lg'] ${previewSelector} {
  padding: ${tokens.paddingY.lg} ${tokens.paddingX.lg};
  border-radius: ${tokens.radius.lg};
  font-size: ${tokens.fontSize.lg};
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
  opacity: 0.85;
  cursor: not-allowed;
}

${disabledSelector} ${inputSelector},
${disabledSelector} ${previewSelector},
${disabledSelector} ${editTriggerSelector},
${disabledSelector} ${submitTriggerSelector},
${disabledSelector} ${cancelTriggerSelector} {
  background: ${tokens.disabled.bg};
  border-color: ${tokens.disabled.bg};
  color: ${tokens.disabled.text};
  cursor: not-allowed;
}
`;
};

const EDITABLE_CONTRACT: PrimitiveContract<EditablePrimitiveProps> = {
  name: "editable",
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
  },
};

const editablePrimitive = createPrimitive<EditablePrimitiveProps>(
  EDITABLE_CONTRACT,
  (theme) => {
    const css = buildEditableStyles(theme);
    theme.mountStyles(`editable-${theme.mode}`, css);
  },
);

registerPrimitive(editablePrimitive);

export { editablePrimitive };
