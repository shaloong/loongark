/**
 * Listbox primitive styles.
 * Uses Ark UI Listbox data attributes.
 */
import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type ListboxSize = "sm" | "md" | "lg";
export type ListboxOrientation = "horizontal" | "vertical";

export interface ListboxPrimitiveProps {
  size?: ListboxSize;
  orientation?: ListboxOrientation;
}

interface ListboxDesignTokens {
  fontFamily: string;
  fontSize: Record<ListboxSize, string>;
  lineHeight: number;
  fontWeight: number;
  paddingY: Record<ListboxSize, string>;
  paddingX: Record<ListboxSize, string>;
  radius: Record<ListboxSize, string>;
  gap: string;
  brand: {
    primary: string;
    accent: string;
    subtle: string;
  };
  neutral: {
    surface: string;
    surfaceRaised: string;
    border: string;
    text: string;
    textMuted: string;
    disabled: string;
  };
  motion: {
    duration: string;
    easing: string;
  };
  shadow: string;
}

const extractListboxTokens = (theme: LoongArkTheme): ListboxDesignTokens => {
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
    fontWeight: toNumberToken(fontWeight.medium, 500),
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
      md: toStringToken(radius.md, "8px"),
      lg: toStringToken(radius.lg, "16px"),
    },
    gap: toStringToken(componentSpace.xs, "4px"),
    brand: {
      primary: toStringToken(brand.primary, "#006EFF"),
      accent: toStringToken(brand.accent, "#5AC8FA"),
      subtle: toStringToken(brand.subtle, "#EFF6FF"),
    },
    neutral: {
      surface: toStringToken(neutral["50"], "#FFFFFF"),
      surfaceRaised: toStringToken(neutral["100"], "#F2F2F2"),
      border: toStringToken(neutral["100"], "#E5E6EB"),
      text: toStringToken(neutral["700"], "#232325"),
      textMuted: toStringToken(neutral["500"], "#767680"),
      disabled: toStringToken(neutral["300"], "#B3B4BD"),
    },
    motion: {
      duration: toStringToken(duration.base, "200ms"),
      easing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
    },
    shadow: "0 8px 40px rgba(0, 0, 0, 0.08)",
  };
};

const buildListboxStyles = (theme: LoongArkTheme): string => {
  const tokens = extractListboxTokens(theme);
  const scope = `[data-scope="listbox"]`;
  const root = `${scope}[data-part="root"]`;
  const label = `${scope}[data-part="label"]`;
  const list = `${scope}[data-part="list"]`;
  const item = `${scope}[data-part="item"]`;
  const itemText = `${scope}[data-part="item-text"]`;
  const itemIndicator = `${scope}[data-part="item-indicator"]`;
  const itemGroup = `${scope}[data-part="item-group"]`;
  const itemGroupLabel = `${scope}[data-part="item-group-label"]`;
  const interactiveItem = `${item}:not([data-disabled='true']):not([disabled])`;

  return `

  ${root} {
    display: flex;
    flex-direction: column;
    gap: ${tokens.gap};
    width: 100%;
  }

  ${root}[data-orientation="horizontal"] {
    align-items: center;
  }

  ${label} {
    color: ${tokens.neutral.text};
    font-family: ${tokens.fontFamily};
    font-size: ${tokens.fontSize.sm};
    font-weight: 500;
  }

  ${list} {
    display: flex;
    flex-direction: column;
    gap: ${tokens.gap};
    padding: ${tokens.gap};
    background: ${tokens.neutral.surface};
    border: 1px solid ${tokens.neutral.border};
    border-radius: ${tokens.radius.md};
    box-shadow: ${tokens.shadow};
    min-width: 240px;
  }

  ${root}[data-orientation="horizontal"] ${list} {
    flex-direction: row;
    align-items: center;
  }

  ${item} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${tokens.gap};
    padding: ${tokens.paddingY.md} ${tokens.paddingX.md};
    border-radius: ${tokens.radius.sm};
    font-family: ${tokens.fontFamily};
    font-size: ${tokens.fontSize.md};
    line-height: ${tokens.lineHeight};
    color: ${tokens.neutral.text};
    cursor: pointer;
    transition:
      background ${tokens.motion.duration} ${tokens.motion.easing},
      color ${tokens.motion.duration} ${tokens.motion.easing};
  }

  ${interactiveItem}:hover,
  ${item}[data-highlighted] {
    background: ${tokens.neutral.surfaceRaised};
  }

  ${item}[data-state="checked"],
  ${item}[data-state="selected"],
  ${item}[aria-selected="true"],
  ${item}[data-selected="true"] {
    background: ${tokens.brand.subtle};
    color: ${tokens.brand.primary};
    font-weight: 500;
  }

  ${item}[data-disabled="true"],
  ${item}[disabled] {
    color: ${tokens.neutral.disabled};
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${itemText} {
    flex: 1;
  }

  ${itemIndicator} {
    display: inline-flex;
    align-items: center;
    color: ${tokens.brand.primary};
    opacity: 0;
    transition: opacity ${tokens.motion.duration} ${tokens.motion.easing};
  }

  ${item}[data-state="checked"] ${itemIndicator},
  ${item}[data-state="selected"] ${itemIndicator},
  ${item}[aria-selected="true"] ${itemIndicator},
  ${item}[data-selected="true"] ${itemIndicator} {
    opacity: 1;
  }

  ${itemGroup} {
    display: flex;
    flex-direction: column;
    gap: ${tokens.gap};
  }

  ${itemGroupLabel} {
    color: var(--lk-color-semantic-mutedforeground);
    font-family: ${tokens.fontFamily};
    font-size: ${tokens.fontSize.sm};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  ${root}[data-size="sm"] ${item} {
    font-size: ${tokens.fontSize.sm};
    padding: ${tokens.paddingY.sm} ${tokens.paddingX.sm};
    border-radius: ${tokens.radius.sm};
  }

  ${root}[data-size="lg"] ${item} {
    font-size: ${tokens.fontSize.lg};
    padding: ${tokens.paddingY.lg} ${tokens.paddingX.lg};
    border-radius: ${tokens.radius.lg};
  }

  ${root}[data-size="sm"] ${list} {
    border-radius: ${tokens.radius.sm};
  }

  ${root}[data-size="lg"] ${list} {
    border-radius: ${tokens.radius.lg};
  }
  `;
};

const listboxContract: PrimitiveContract<ListboxPrimitiveProps> = {
  name: "listbox",
  tokens: [
    "color.brand.primary",
    "color.brand.accent",
    "color.brand.subtle",
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.300",
    "color.neutral.500",
    "color.neutral.700",
    "typography.fontFamily.body",
    "typography.fontWeight.medium",
    "typography.fontSize.sm",
    "typography.fontSize.md",
    "typography.fontSize.lg",
    "typography.lineHeight.base",
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
    orientation: "vertical",
  },
};

const ListboxPrimitive = createPrimitive(listboxContract, (theme) => {
  const css = buildListboxStyles(theme);
  theme.mountStyles(`listbox-${theme.mode}`, css);
});

registerPrimitive(ListboxPrimitive);

export { ListboxPrimitive };
