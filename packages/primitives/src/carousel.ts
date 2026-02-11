import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type CarouselSize = "sm" | "md" | "lg";

export interface CarouselPrimitiveProps {
  size?: CarouselSize;
}

interface CarouselDesignTokens {
  fontFamily: string;
  fontSize: Record<CarouselSize, string>;
  lineHeight: number;
  padding: Record<CarouselSize, string>;
  radius: Record<CarouselSize, string>;
  gap: string;
  neutral: {
    surface: string;
    surfaceRaised: string;
    border: string;
    text: string;
  };
  brand: {
    primary: string;
  };
  motion: {
    duration: string;
    easing: string;
  };
}

const extractCarouselTokens = (theme: LoongArkTheme): CarouselDesignTokens => {
  const typography = theme.tokens.typography as TokenTree;
  const fontFamily = asTokenTree(typography.fontFamily);
  const fontSize = asTokenTree(typography.fontSize);
  const lineHeight = asTokenTree(typography.lineHeight);

  const space = asTokenTree(theme.tokens.space);
  const componentSpace = asTokenTree(space.component);
  const radius = asTokenTree(theme.tokens.radius);

  const color = theme.tokens.color as TokenTree;
  const neutral = asTokenTree(color.neutral);
  const brand = asTokenTree(color.brand);

  const motion = theme.tokens.motion as TokenTree;
  const duration = asTokenTree(motion.duration);
  const easing = asTokenTree(motion.easing);

  return {
    fontFamily: toStringToken(fontFamily.body, "sans-serif"),
    fontSize: {
      sm: toStringToken(fontSize.sm, "14px"),
      md: toStringToken(fontSize.md, "16px"),
      lg: toStringToken(fontSize.lg, "18px"),
    },
    lineHeight: toNumberToken(lineHeight.base, 1.5),
    padding: {
      sm: toStringToken(componentSpace.sm, "8px"),
      md: toStringToken(componentSpace.md, "12px"),
      lg: toStringToken(componentSpace.lg, "16px"),
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
      text: toStringToken(neutral["700"], "#232325"),
    },
    brand: {
      primary: toStringToken(brand.primary, "#006EFF"),
    },
    motion: {
      duration: toStringToken(duration.base, "200ms"),
      easing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
    },
  };
};

const buildCarouselStyles = (theme: LoongArkTheme): string => {
  const tokens = extractCarouselTokens(theme);
  const scopeSelector = `[data-scope="carousel"]`;
  const rootSelector = `${scopeSelector}[data-part="root"]`;
  const itemGroupSelector = `${scopeSelector}[data-part="item-group"]`;
  const itemSelector = `${scopeSelector}[data-part="item"]`;
  const controlSelector = `${scopeSelector}[data-part="control"]`;
  const nextTriggerSelector = `${scopeSelector}[data-part="next-trigger"]`;
  const prevTriggerSelector = `${scopeSelector}[data-part="prev-trigger"]`;
  const indicatorGroupSelector = `${scopeSelector}[data-part="indicator-group"]`;
  const indicatorSelector = `${scopeSelector}[data-part="indicator"]`;
  const autoplayTriggerSelector = `${scopeSelector}[data-part="autoplay-trigger"]`;
  const progressTextSelector = `${scopeSelector}[data-part="progress-text"]`;
  const autoplayIndicatorSelector = `${scopeSelector}[data-part="autoplay-indicator"]`;

  return `
${rootSelector} {
  display: grid;
  gap: ${tokens.gap};
  font-family: ${tokens.fontFamily};
  color: ${tokens.neutral.text};
}

${itemGroupSelector} {
  display: flex;
  overflow: hidden;
  border-radius: ${tokens.radius.md};
  border: 1px solid ${tokens.neutral.border};
  background: ${tokens.neutral.surface};
}

${itemSelector} {
  flex: 0 0 100%;
  padding: ${tokens.padding.md};
  background: ${tokens.neutral.surfaceRaised};
}

${controlSelector} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${tokens.gap};
}

${nextTriggerSelector},
${prevTriggerSelector},
${autoplayTriggerSelector} {
  border: 1px solid ${tokens.neutral.border};
  background: ${tokens.neutral.surfaceRaised};
  color: ${tokens.neutral.text};
  border-radius: ${tokens.radius.sm};
  padding: ${tokens.padding.sm};
  font: inherit;
  cursor: pointer;
  transition: background ${tokens.motion.duration} ${tokens.motion.easing};
}

${nextTriggerSelector}:hover,
${prevTriggerSelector}:hover,
${autoplayTriggerSelector}:hover {
  background: ${tokens.neutral.surface};
}

${indicatorGroupSelector} {
  display: inline-flex;
  align-items: center;
  gap: ${tokens.gap};
}

${indicatorSelector} {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  border: 1px solid ${tokens.neutral.border};
  background: ${tokens.neutral.surface};
}

${indicatorSelector}[data-current='true'] {
  background: ${tokens.brand.primary};
  border-color: ${tokens.brand.primary};
}

${progressTextSelector} {
  font-size: ${tokens.fontSize.sm};
}

${autoplayIndicatorSelector} {
  width: 24px;
  height: 4px;
  border-radius: 999px;
  background: ${tokens.neutral.border};
  overflow: hidden;
}

${rootSelector}[data-size='sm'] ${itemSelector} {
  padding: ${tokens.padding.sm};
  font-size: ${tokens.fontSize.sm};
}

${rootSelector}[data-size='lg'] ${itemSelector} {
  padding: ${tokens.padding.lg};
  font-size: ${tokens.fontSize.lg};
}
`;
};

const CAROUSEL_CONTRACT: PrimitiveContract<CarouselPrimitiveProps> = {
  name: "carousel",
  tokens: [
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.700",
    "color.brand.primary",
    "typography.fontFamily.body",
    "typography.fontSize.sm",
    "typography.fontSize.md",
    "typography.fontSize.lg",
    "typography.lineHeight.base",
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
  },
};

const carouselPrimitive = createPrimitive<CarouselPrimitiveProps>(
  CAROUSEL_CONTRACT,
  (theme) => {
    const css = buildCarouselStyles(theme);
    mountPrimitiveStyles(`carousel-${theme.mode}`, css);
  }
);

registerPrimitive(carouselPrimitive);

export { carouselPrimitive };
