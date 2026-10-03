/**
 * Avatar primitive styles.
 * Matches Ark UI Avatar data attributes.
 */
import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarPrimitiveProps {
  size?: AvatarSize;
}

interface AvatarDesignTokens {
  fontFamily: string;
  fontSize: Record<AvatarSize, string>;
  lineHeight: number;
  fontWeight: number;
  size: Record<AvatarSize, string>;
  radius: string;
  neutral: {
    surface: string;
    surfaceRaised: string;
    border: string;
    text: string;
  };
  brand: {
    accent: string;
  };
  motion: {
    duration: string;
    easing: string;
  };
}

const extractAvatarTokens = (theme: LoongArkTheme): AvatarDesignTokens => {
  const typography = theme.styleTokens.typography as TokenTree;
  const fontFamily = asTokenTree(typography.fontFamily);
  const fontSize = asTokenTree(typography.fontSize);
  const lineHeight = asTokenTree(typography.lineHeight);
  const fontWeight = asTokenTree(typography.fontWeight);

  const space = asTokenTree(theme.styleTokens.space);
  const componentSpace = asTokenTree(space.component);
  const radius = asTokenTree(theme.styleTokens.radius);

  const color = theme.styleTokens.color as TokenTree;
  const neutral = asTokenTree(color.neutral);
  const brand = asTokenTree(color.brand);

  const motion = theme.styleTokens.motion as TokenTree;
  const duration = asTokenTree(motion.duration);
  const easing = asTokenTree(motion.easing);

  return {
    fontFamily: toStringToken(fontFamily.body, "sans-serif"),
    fontSize: {
      sm: toStringToken(fontSize.xs, "12px"),
      md: toStringToken(fontSize.sm, "14px"),
      lg: toStringToken(fontSize.md, "16px"),
    },
    lineHeight: toNumberToken(lineHeight.base, 1.5),
    fontWeight: toNumberToken(fontWeight.medium, 500),
    size: {
      sm: `calc(${toStringToken(componentSpace.md, "16px")} * 2)`,
      md: `calc(${toStringToken(componentSpace.md, "16px")} * 2 + ${toStringToken(
        componentSpace.sm,
        "8px",
      )})`,
      lg: `calc(${toStringToken(componentSpace.lg, "24px")} * 2 + ${toStringToken(
        componentSpace.sm,
        "8px",
      )})`,
    },
    radius: toStringToken(radius.pill, "999px"),
    neutral: {
      surface: toStringToken(neutral["50"], "#F5F6FA"),
      surfaceRaised: toStringToken(neutral["100"], "#E5E6EB"),
      border: toStringToken(neutral["100"], "#E5E6EB"),
      text: toStringToken(neutral["700"], "#232325"),
    },
    brand: {
      accent: toStringToken(brand.accent, "#5AC8FA"),
    },
    motion: {
      duration: toStringToken(duration.base, "200ms"),
      easing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
    },
  };
};

const buildAvatarStyles = (theme: LoongArkTheme): string => {
  const tokens = extractAvatarTokens(theme);
  const root = `[data-scope="avatar"][data-part="root"]`;
  const image = `[data-scope="avatar"][data-part="image"]`;
  const fallback = `[data-scope="avatar"][data-part="fallback"]`;

  return `

  ${root} {
    width: ${tokens.size.md};
    height: ${tokens.size.md};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: ${tokens.radius};
    border: 1px solid ${tokens.neutral.border};
    background: ${tokens.neutral.surface};
    color: ${tokens.neutral.text};
    font-family: ${tokens.fontFamily};
    font-size: ${tokens.fontSize.md};
    font-weight: ${tokens.fontWeight};
    line-height: ${tokens.lineHeight};
    box-sizing: border-box;
    overflow: hidden;
    transition:
      border-color ${tokens.motion.duration} ${tokens.motion.easing},
      box-shadow ${tokens.motion.duration} ${tokens.motion.easing};
  }

  ${root}[data-size="sm"] {
    width: ${tokens.size.sm};
    height: ${tokens.size.sm};
    font-size: ${tokens.fontSize.sm};
  }

  ${root}[data-size="lg"] {
    width: ${tokens.size.lg};
    height: ${tokens.size.lg};
    font-size: ${tokens.fontSize.lg};
  }

  ${root}:focus-visible {
    outline: none;
    box-shadow: 0 0 0 1px ${tokens.neutral.surface}, 0 0 0 4px ${tokens.brand.accent};
  }

  ${image} {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: inherit;
  }

  ${fallback} {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${tokens.neutral.surfaceRaised};
    color: ${tokens.neutral.text};
    font-size: inherit;
    font-family: ${tokens.fontFamily};
    font-weight: ${tokens.fontWeight};
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }
  `;
};

const avatarContract: PrimitiveContract<AvatarPrimitiveProps> = {
  name: "avatar",
  tokens: [
    "typography.fontFamily.body",
    "typography.fontSize.xs",
    "typography.fontSize.sm",
    "typography.fontSize.md",
    "typography.lineHeight.base",
    "typography.fontWeight.medium",
    "space.component.sm",
    "space.component.md",
    "space.component.lg",
    "radius.pill",
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.700",
    "color.brand.accent",
    "motion.duration.base",
    "motion.easing.standard",
  ],
  defaults: {
    size: "md",
  },
};

const AvatarPrimitive = createPrimitive(avatarContract, (theme) => {
  const css = buildAvatarStyles(theme);
  theme.mountStyles(`avatar-${theme.mode}`, css);
});

registerPrimitive(AvatarPrimitive);

export { AvatarPrimitive };
