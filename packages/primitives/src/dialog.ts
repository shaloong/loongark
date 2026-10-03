import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type DialogSize = "sm" | "md" | "lg";
export type DialogPlacement = "center" | "top";
export type DialogMotion = "scale" | "slide";

export interface DialogPrimitiveProps {
  size?: DialogSize;
  placement?: DialogPlacement;
  motion?: DialogMotion;
  overlayBlur?: boolean;
}

interface DialogDesignTokens {
  fontFamily: {
    heading: string;
    body: string;
  };
  fontSize: {
    title: string;
    body: string;
  };
  lineHeight: {
    title: number;
    body: number;
  };
  fontWeight: {
    title: number;
    body: number;
  };
  space: {
    gap: string;
    padding: string;
    paddingLg: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
  };
  colors: {
    surface: string;
    surfaceMuted: string;
    text: string;
    subtle: string;
    border: string;
    overlay: string;
  };
  shadow: string;
  motion: {
    durationIn: string;
    durationOut: string;
    easing: string;
  };
}

const extractDialogTokens = (theme: LoongArkTheme): DialogDesignTokens => {
  const typography = theme.styleTokens.typography as TokenTree;
  const fontFamily = asTokenTree(typography.fontFamily);
  const fontSize = asTokenTree(typography.fontSize);
  const lineHeight = asTokenTree(typography.lineHeight);
  const fontWeight = asTokenTree(typography.fontWeight);

  const space = asTokenTree(theme.styleTokens.space);
  const componentSpace = asTokenTree(space.component);
  const layoutSpace = asTokenTree(space.layout);
  const radius = asTokenTree(theme.styleTokens.radius);

  const color = theme.styleTokens.color as TokenTree;
  const neutral = asTokenTree(color.neutral);

  const motion = theme.styleTokens.motion as TokenTree;
  const duration = asTokenTree(motion.duration);
  const easing = asTokenTree(motion.easing);

  return {
    fontFamily: {
      heading: toStringToken(
        fontFamily.heading,
        "'DingTalk JinBuTi', sans-serif",
      ),
      body: toStringToken(fontFamily.body, "'Alibaba PuHuiTi 3.0', sans-serif"),
    },
    fontSize: {
      title: toStringToken(fontSize.lg, "20px"),
      body: toStringToken(fontSize.md, "16px"),
    },
    lineHeight: {
      title: toNumberToken(lineHeight.relaxed, 1.6),
      body: toNumberToken(lineHeight.base, 1.5),
    },
    fontWeight: {
      title: toNumberToken(fontWeight.medium, 500),
      body: toNumberToken(fontWeight.regular, 400),
    },
    space: {
      gap: toStringToken(componentSpace.sm, "8px"),
      padding: toStringToken(componentSpace.lg, "24px"),
      paddingLg: toStringToken(layoutSpace.section, "64px"),
    },
    radius: {
      sm: toStringToken(radius.sm, "8px"),
      md: toStringToken(radius.md, "12px"),
      lg: toStringToken(radius.lg, "16px"),
    },
    colors: {
      surface: toStringToken(neutral["50"], "#FFFFFF"),
      surfaceMuted: toStringToken(neutral["100"], "#F5F6FA"),
      text: toStringToken(neutral["900"], "#121212"),
      subtle: toStringToken(neutral["500"], "#3A3A3C"),
      border: toStringToken(neutral["100"], "#E5E6EB"),
      overlay: toStringToken(
        asTokenTree(color.semantic).overlay,
        "rgba(0,0,0,0.5)",
      ),
    },
    shadow: toStringToken(
      theme.styleTokens.shadow.xl,
      "0 20px 60px rgba(0, 0, 0, 0.18)",
    ),
    motion: {
      durationIn: toStringToken(duration.base, "200ms"),
      durationOut: toStringToken(duration.exit, "150ms"),
      easing: toStringToken(easing.emphasized, "cubic-bezier(0.2, 0, 0, 1)"),
    },
  };
};

const buildDialogStyles = (theme: LoongArkTheme): string => {
  const tokens = extractDialogTokens(theme);
  const scopeSelector = `[data-scope="dialog"]`;
  const overlaySelector = `${scopeSelector}[data-part="backdrop"]`;
  const contentSelector = `${scopeSelector}[data-part="content"]`;
  const titleSelector = `${scopeSelector}[data-part="title"]`;
  const descriptionSelector = `${scopeSelector}[data-part="description"]`;
  const footerSelector = `${scopeSelector}[data-part="footer"]`;
  const closeSelector = `${scopeSelector}[data-part="close-trigger"]`;
  const motionScaleSelector = `${contentSelector}:is(:not([data-motion]), [data-motion='scale'])`;
  const motionSlideSelector = `${contentSelector}[data-motion='slide']`;

  return `
@keyframes lk-dialog-overlay-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes lk-dialog-overlay-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes lk-dialog-content-scale-in {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes lk-dialog-content-scale-out {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
}

@keyframes lk-dialog-content-slide-in {
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

@keyframes lk-dialog-content-slide-out {
  from {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
}

${overlaySelector} {
  position: fixed;
  inset: 0;
  background: ${tokens.colors.overlay};
  backdrop-filter: blur(0px);
  z-index: ${theme.tokens.zIndex.dialog};
  opacity: 0;
}


${overlaySelector}[data-blur='true'] {
  backdrop-filter: blur(var(--lk-space-component-xs));
}

${overlaySelector}[data-state='open'] {
  animation: lk-dialog-overlay-in ${tokens.motion.durationIn} ${tokens.motion.easing} forwards;
}

${overlaySelector}[data-state='closed'] {
  animation: lk-dialog-overlay-out ${tokens.motion.durationOut} ${tokens.motion.easing} forwards;
}

${contentSelector} {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${tokens.colors.surface};
  color: ${tokens.colors.text};
  border: 1px solid ${tokens.colors.border};
  border-radius: ${tokens.radius.md};
  box-shadow: ${tokens.shadow};
  width: min(calc(100% - ${tokens.space.paddingLg}), var(--lk-control-dialogwidth-md));
  max-height: calc(100% - ${tokens.space.paddingLg});
  padding: ${tokens.space.padding};
  display: flex;
  flex-direction: column;
  gap: ${tokens.space.gap};
  z-index: calc(${theme.tokens.zIndex.dialog} + 1);
}

${contentSelector}[data-size='sm'] {
  width: min(calc(100% - ${tokens.space.paddingLg}), var(--lk-control-dialogwidth-sm));
  border-radius: ${tokens.radius.sm};
}

${contentSelector}[data-size='lg'] {
  width: min(calc(100% - ${tokens.space.paddingLg}), var(--lk-control-dialogwidth-lg));
  padding: ${tokens.space.padding};
  border-radius: ${tokens.radius.lg};
}

${contentSelector}[data-placement='top'] {
  top: 10%;
  transform: translate(-50%, 0);
}

${motionScaleSelector}[data-state='open'] {
  animation: lk-dialog-content-scale-in ${tokens.motion.durationIn} ${tokens.motion.easing} forwards;
}

${motionScaleSelector}[data-state='closed'] {
  animation: lk-dialog-content-scale-out ${tokens.motion.durationOut} ${tokens.motion.easing} forwards;
}

${motionSlideSelector}[data-state='open'] {
  animation: lk-dialog-content-slide-in ${tokens.motion.durationIn} ${tokens.motion.easing} forwards;
}

${motionSlideSelector}[data-state='closed'] {
  animation: lk-dialog-content-slide-out ${tokens.motion.durationOut} ${tokens.motion.easing} forwards;
}

${contentSelector}[data-state='closed'], ${overlaySelector}[data-state='closed'] { pointer-events: none; }

${titleSelector} {
  text-wrap: balance;
  font-family: ${tokens.fontFamily.heading};
  font-size: ${tokens.fontSize.title};
  line-height: ${tokens.lineHeight.title};
  font-weight: ${tokens.fontWeight.title};
  margin: 0;
}

${descriptionSelector} {
  text-wrap: pretty;
  font-family: ${tokens.fontFamily.body};
  font-size: ${tokens.fontSize.body};
  line-height: ${tokens.lineHeight.body};
  color: ${tokens.colors.subtle};
  margin: 0;
}

${footerSelector} {
  display: flex;
  justify-content: flex-end;
  gap: ${tokens.space.gap};
  margin-top: ${tokens.space.gap};
}

${closeSelector} {
  position: absolute;
  top: calc(${tokens.space.padding} / 2);
  right: calc(${tokens.space.padding} / 2);
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 1px solid transparent;
  background: ${tokens.colors.surfaceMuted};
  color: ${tokens.colors.subtle};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background ${tokens.motion.durationIn} ${tokens.motion.easing},
    border-color ${tokens.motion.durationIn} ${tokens.motion.easing};
}

${closeSelector}:hover {
  background: ${tokens.colors.surface};
  border-color: ${tokens.colors.border};
}

${closeSelector}:empty::before {
  content: "\\00d7";
  font-size: 20px;
  line-height: 1;
}

`;
};

const DIALOG_CONTRACT: PrimitiveContract<DialogPrimitiveProps> = {
  name: "dialog",
  tokens: [
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.500",
    "color.neutral.900",
    "typography.fontFamily.heading",
    "typography.fontFamily.body",
    "typography.fontSize.lg",
    "typography.fontSize.md",
    "typography.lineHeight.relaxed",
    "typography.lineHeight.base",
    "typography.fontWeight.medium",
    "typography.fontWeight.regular",
    "space.component.sm",
    "space.component.lg",
    "space.layout.section",
    "radius.sm",
    "radius.md",
    "radius.lg",
    "shadow.xl",
    "motion.duration.base",
    "motion.duration.fast",
    "motion.easing.emphasized",
  ],
  defaults: {
    size: "md",
    placement: "center",
    motion: "scale",
    overlayBlur: true,
  },
};

const dialogPrimitive = createPrimitive<DialogPrimitiveProps>(
  DIALOG_CONTRACT,
  (theme) => {
    const css = buildDialogStyles(theme);
    theme.mountStyles(`dialog`, css);
  },
);

registerPrimitive(dialogPrimitive);

export { dialogPrimitive };
