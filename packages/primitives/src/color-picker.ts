import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type ColorPickerSize = "sm" | "md" | "lg";

export interface ColorPickerPrimitiveProps {
  size?: ColorPickerSize;
}

interface ColorPickerDesignTokens {
  fontFamily: string;
  fontSize: Record<ColorPickerSize, string>;
  lineHeight: number;
  radius: Record<ColorPickerSize, string>;
  padding: Record<ColorPickerSize, string>;
  gap: string;
  neutral: {
    surface: string;
    surfaceRaised: string;
    border: string;
    text: string;
    muted: string;
  };
  brand: {
    primary: string;
  };
}

const extractColorPickerTokens = (
  theme: LoongArkTheme,
): ColorPickerDesignTokens => {
  const typography = theme.styleTokens.typography as TokenTree;
  const fontFamily = asTokenTree(typography.fontFamily);
  const fontSize = asTokenTree(typography.fontSize);
  const lineHeight = asTokenTree(typography.lineHeight);

  const space = asTokenTree(theme.styleTokens.space);
  const componentSpace = asTokenTree(space.component);
  const radius = asTokenTree(theme.styleTokens.radius);

  const color = theme.styleTokens.color as TokenTree;
  const neutral = asTokenTree(color.neutral);
  const brand = asTokenTree(color.brand);

  return {
    fontFamily: toStringToken(fontFamily.body, "sans-serif"),
    fontSize: {
      sm: toStringToken(fontSize.sm, "14px"),
      md: toStringToken(fontSize.md, "16px"),
      lg: toStringToken(fontSize.lg, "18px"),
    },
    lineHeight: toNumberToken(lineHeight.base, 1.5),
    radius: {
      sm: toStringToken(radius.sm, "4px"),
      md: toStringToken(radius.md, "6px"),
      lg: toStringToken(radius.lg, "8px"),
    },
    padding: {
      sm: toStringToken(componentSpace.sm, "8px"),
      md: toStringToken(componentSpace.md, "12px"),
      lg: toStringToken(componentSpace.lg, "16px"),
    },
    gap: toStringToken(componentSpace.sm, "8px"),
    neutral: {
      surface: toStringToken(neutral["50"], "#FFFFFF"),
      surfaceRaised: toStringToken(neutral["100"], "#F2F2F2"),
      border: toStringToken(neutral["100"], "#E5E6EB"),
      text: toStringToken(neutral["700"], "#232325"),
      muted: toStringToken(neutral["300"], "#B3B4BD"),
    },
    brand: {
      primary: toStringToken(brand.primary, "#006EFF"),
    },
  };
};

const buildColorPickerStyles = (theme: LoongArkTheme): string => {
  const tokens = extractColorPickerTokens(theme);
  const scopeSelector = `[data-scope="color-picker"]`;
  const rootSelector = `${scopeSelector}[data-part="root"]`;
  const controlSelector = `${scopeSelector}[data-part="control"]`;
  const labelSelector = `${scopeSelector}[data-part="label"]`;
  const contentSelector = `${scopeSelector}[data-part="content"]`;
  const areaSelector = `${scopeSelector}[data-part="area"]`;
  const areaThumbSelector = `${scopeSelector}[data-part="area-thumb"]`;
  const areaBackgroundSelector = `${scopeSelector}[data-part="area-background"]`;
  const channelSliderSelector = `${scopeSelector}[data-part="channel-slider"]`;
  const channelSliderTrackSelector = `${scopeSelector}[data-part="channel-slider-track"]`;
  const channelSliderThumbSelector = `${scopeSelector}[data-part="channel-slider-thumb"]`;
  const channelInputSelector = `${scopeSelector}[data-part="channel-input"]`;
  const swatchGroupSelector = `${scopeSelector}[data-part="swatch-group"]`;
  const swatchTriggerSelector = `${scopeSelector}[data-part="swatch-trigger"]`;
  const swatchIndicatorSelector = `${scopeSelector}[data-part="swatch-indicator"]`;
  const swatchSelector = `${scopeSelector}[data-part="swatch"]`;
  const valueTextSelector = `${scopeSelector}[data-part="value-text"]`;
  const triggerSelector = `${scopeSelector}[data-part="trigger"]`;
  const positionerSelector = `${scopeSelector}[data-part="positioner"]`;
  const viewSelector = `${scopeSelector}[data-part="view"]`;
  const transparencyGridSelector = `${scopeSelector}[data-part="transparency-grid"]`;
  const eyeDropperTriggerSelector = `${scopeSelector}[data-part="eye-dropper-trigger"]`;
  const formatTriggerSelector = `${scopeSelector}[data-part="format-trigger"]`;
  const formatSelectSelector = `${scopeSelector}[data-part="format-select"]`;

  return `
${rootSelector} {
  display: grid;
  gap: ${tokens.gap};
  font-family: ${tokens.fontFamily};
  color: ${tokens.neutral.text};
}

${labelSelector} {
  font-size: ${tokens.fontSize.sm};
  line-height: ${tokens.lineHeight};
}

${controlSelector} {
  display: flex;
  align-items: center;
  gap: ${tokens.gap};
}

${triggerSelector} {
  width: 32px;
  height: 32px;
  border-radius: ${tokens.radius.sm};
  border: 1px solid ${tokens.neutral.border};
  background: ${tokens.neutral.surfaceRaised};
}

${contentSelector} {
  display: grid;
  gap: ${tokens.gap};
  padding: ${tokens.padding.md};
  background: ${tokens.neutral.surface};
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.md};
}

${positionerSelector} {
  z-index: 20;
}

${viewSelector} {
  display: grid;
  gap: ${tokens.gap};
}

${areaSelector} {
  position: relative;
  width: 220px;
  height: 140px;
  border-radius: ${tokens.radius.sm};
  overflow: hidden;
}

${areaBackgroundSelector},
${transparencyGridSelector} {
  position: absolute;
  inset: 0;
}

${areaThumbSelector} {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 999px;
  border: 2px solid ${tokens.neutral.surface};
  box-shadow: 0 0 0 1px ${tokens.neutral.border};
}

${channelSliderSelector} {
  display: grid;
  gap: ${tokens.gap};
}

${channelSliderTrackSelector} {
  position: relative;
  height: 8px;
  border-radius: 999px;
  background: ${tokens.neutral.surfaceRaised};
}

${channelSliderThumbSelector} {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 999px;
  border: 2px solid ${tokens.neutral.surface};
  box-shadow: 0 0 0 1px ${tokens.neutral.border};
}

${channelInputSelector},
${formatSelectSelector} {
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.sm};
  padding: 4px 8px;
  font: inherit;
  background: ${tokens.neutral.surface};
  color: inherit;
}

${swatchGroupSelector} {
  display: flex;
  align-items: center;
  gap: ${tokens.gap};
  flex-wrap: wrap;
}

${swatchTriggerSelector},
${swatchSelector} {
  width: 20px;
  height: 20px;
  border-radius: ${tokens.radius.sm};
  border: 1px solid ${tokens.neutral.border};
  background: ${tokens.neutral.surfaceRaised};
  position: relative;
}

${swatchIndicatorSelector} {
  position: absolute;
  inset: 3px;
  border-radius: inherit;
  border: 2px solid ${tokens.neutral.surface};
}

${valueTextSelector} {
  font-size: ${tokens.fontSize.sm};
  color: var(--lk-color-semantic-mutedforeground);
}

${eyeDropperTriggerSelector},
${formatTriggerSelector} {
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.sm};
  background: ${tokens.neutral.surfaceRaised};
  padding: 4px 8px;
  font: inherit;
}

${rootSelector}[data-size='sm'] ${contentSelector} {
  padding: ${tokens.padding.sm};
  border-radius: ${tokens.radius.sm};
}

${rootSelector}[data-size='lg'] ${contentSelector} {
  padding: ${tokens.padding.lg};
  border-radius: ${tokens.radius.lg};
}
`;
};

const COLOR_PICKER_CONTRACT: PrimitiveContract<ColorPickerPrimitiveProps> = {
  name: "color-picker",
  tokens: [
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.300",
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
  ],
  defaults: {
    size: "md",
  },
};

const colorPickerPrimitive = createPrimitive<ColorPickerPrimitiveProps>(
  COLOR_PICKER_CONTRACT,
  (theme) => {
    const css = buildColorPickerStyles(theme);
    theme.mountStyles(`color-picker-${theme.mode}`, css);
  },
);

registerPrimitive(colorPickerPrimitive);

export { colorPickerPrimitive };
