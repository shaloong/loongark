import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type FileUploadSize = "sm" | "md" | "lg";

export interface FileUploadPrimitiveProps {
  size?: FileUploadSize;
  disabled?: boolean;
}

interface FileUploadDesignTokens {
  fontFamily: string;
  fontSize: Record<FileUploadSize, string>;
  lineHeight: number;
  fontWeight: number;
  paddingY: Record<FileUploadSize, string>;
  paddingX: Record<FileUploadSize, string>;
  radius: Record<FileUploadSize, string>;
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

const extractFileUploadTokens = (theme: LoongArkTheme): FileUploadDesignTokens => {
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

const buildFileUploadStyles = (theme: LoongArkTheme): string => {
  const tokens = extractFileUploadTokens(theme);
  const scopeSelector = `[data-scope="file-upload"]`;
  const rootSelector = `${scopeSelector}[data-part="root"]`;
  const labelSelector = `${scopeSelector}[data-part="label"]`;
  const dropzoneSelector = `${scopeSelector}[data-part="dropzone"]`;
  const triggerSelector = `${scopeSelector}[data-part="trigger"]`;
  const hiddenInputSelector = `${scopeSelector}[data-part="hidden-input"]`;
  const itemGroupSelector = `${scopeSelector}[data-part="item-group"]`;
  const itemSelector = `${scopeSelector}[data-part="item"]`;
  const itemPreviewSelector = `${scopeSelector}[data-part="item-preview"]`;
  const itemPreviewImageSelector = `${scopeSelector}[data-part="item-preview-image"]`;
  const itemNameSelector = `${scopeSelector}[data-part="item-name"]`;
  const itemSizeSelector = `${scopeSelector}[data-part="item-size-text"]`;
  const itemDeleteSelector = `${scopeSelector}[data-part="item-delete-trigger"]`;
  const clearTriggerSelector = `${scopeSelector}[data-part="clear-trigger"]`;
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
  color: ${tokens.neutral.text};
}

${dropzoneSelector} {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${tokens.gap};
  padding: ${tokens.paddingY.lg} ${tokens.paddingX.lg};
  border: 2px dashed ${tokens.neutral.border};
  border-radius: ${tokens.radius.md};
  background: ${tokens.neutral.surface};
  color: ${tokens.neutral.placeholder};
  text-align: center;
  transition:
    border-color ${tokens.motion.duration} ${tokens.motion.easing},
    background ${tokens.motion.duration} ${tokens.motion.easing};
}

${dropzoneSelector}:hover {
  border-color: ${tokens.neutral.borderHover};
  background: ${tokens.neutral.surfaceRaised};
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

${itemGroupSelector} {
  display: flex;
  flex-direction: column;
  gap: ${tokens.gap};
}

${itemSelector} {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: ${tokens.gap};
  align-items: center;
  padding: ${tokens.paddingY.sm} ${tokens.paddingX.sm};
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.sm};
  background: ${tokens.neutral.surface};
}

${itemPreviewSelector} {
  width: 40px;
  height: 40px;
  border-radius: ${tokens.radius.sm};
  background: ${tokens.neutral.surfaceRaised};
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

${itemPreviewImageSelector} {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

${itemNameSelector} {
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight};
  color: ${tokens.neutral.text};
}

${itemSizeSelector} {
  font-size: ${tokens.fontSize.sm};
  color: ${tokens.neutral.placeholder};
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
  font: inherit;
  padding: 0;
  transition: color ${tokens.motion.duration} ${tokens.motion.easing};
}

${itemDeleteSelector}:hover,
${clearTriggerSelector}:hover {
  color: ${tokens.neutral.text};
}

${hiddenInputSelector} {
  display: none;
}

${disabledSelector} {
  opacity: 0.8;
  cursor: not-allowed;
}

${disabledSelector} ${dropzoneSelector},
${disabledSelector} ${triggerSelector} {
  border-color: ${tokens.disabled.bg};
  background: ${tokens.disabled.bg};
  color: ${tokens.disabled.text};
  cursor: not-allowed;
}

${disabledSelector} ${itemDeleteSelector},
${disabledSelector} ${clearTriggerSelector} {
  cursor: not-allowed;
  color: ${tokens.disabled.text};
}
`;
};

const FILE_UPLOAD_CONTRACT: PrimitiveContract<FileUploadPrimitiveProps> = {
  name: "file-upload",
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
    "motion.duration.base",
    "motion.easing.standard",
  ],
  defaults: {
    size: "md",
    disabled: false,
  },
};

const fileUploadPrimitive = createPrimitive<FileUploadPrimitiveProps>(
  FILE_UPLOAD_CONTRACT,
  (theme) => {
    const css = buildFileUploadStyles(theme);
    mountPrimitiveStyles(`file-upload-${theme.mode}`, css);
  }
);

registerPrimitive(fileUploadPrimitive);

export { fileUploadPrimitive };
