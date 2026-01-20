import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import type { KitComponentRegistration } from "../index";
import { mountKitStyles } from "../styleSheet";
import { asTokenTree, toStringToken } from "@loongark/primitives";

interface FilterBarDesignTokens {
  fontFamily: string;
  surface: string;
  border: string;
  text: string;
  subtleText: string;
  chipSurface: string;
  chipBorder: string;
  chipHoverSurface: string;
  chipHoverBorder: string;
  chipText: string;
  chipRadius: string;
  chipGap: string;
  chipPaddingY: string;
  chipPaddingX: string;
  chipFontSize: string;
  chipFontWeight: string;
  chipHeight: string;
  chipBadgeBackground: string;
  chipBadgeText: string;
  chipBadgeRadius: string;
  chipBadgeActiveBackground: string;
  chipBadgeActiveText: string;
  accent: string;
  accentSurface: string;
  accentText: string;
  paddingInline: string;
  paddingBlock: string;
  densePadding: string;
  gap: string;
  denseGap: string;
  itemGap: string;
  sectionGap: string;
  rowGap: string;
  actionGap: string;
  dividerInset: string;
  searchMinWidth: string;
  radius: string;
  shadow: string;
  dividerBackground: string;
  motionDuration: string;
  motionEasing: string;
}

const extractFilterBarTokens = (
  theme: LoongArkTheme
): FilterBarDesignTokens => {
  const color = theme.tokens.color as TokenTree;
  const brand = asTokenTree(color.brand);
  const neutral = asTokenTree(color.neutral);

  const space = theme.tokens.space as TokenTree;
  const componentSpace = asTokenTree(space.component);

  const typography = theme.tokens.typography as TokenTree;
  const fontSize = asTokenTree(typography.fontSize);
  const fontFamily = asTokenTree(typography.fontFamily);
  const fontWeight = asTokenTree(typography.fontWeight);

  const radius = asTokenTree(theme.tokens.radius);

  const motion = theme.tokens.motion as TokenTree;
  const duration = asTokenTree(motion.duration);
  const easing = asTokenTree(motion.easing);

  const isDark = theme.mode === "dark";
  const surface = isDark
    ? toStringToken(neutral["900"], "#121212")
    : toStringToken(neutral["50"], "#F5F6FA");
  const border = isDark
    ? toStringToken(neutral["700"], "#232325")
    : toStringToken(neutral["100"], "#E5E6EB");
  const chipSurface = isDark
    ? toStringToken(neutral["700"], "#232325")
    : toStringToken(neutral["75"] ?? neutral["100"], "#F9FAFC");
  const chipBorder = isDark
    ? toStringToken(neutral["650"] ?? neutral["600"], "#2F2F31")
    : toStringToken(neutral["200"], "#D5D7DE");
  const chipHoverSurface = isDark
    ? toStringToken(neutral["650"] ?? neutral["700"], "#1F1F22")
    : toStringToken(neutral["50"], "#FFFFFF");
  const chipHoverBorder = isDark
    ? toStringToken(neutral["550"] ?? neutral["600"], "#373741")
    : toStringToken(neutral["300"], "#C6C8D2");
  const chipText = isDark
    ? toStringToken(neutral["100"], "#F5F6FA")
    : toStringToken(neutral["500"], "#3A3A3C");

  return {
    fontFamily: toStringToken(fontFamily.body, "sans-serif"),
    surface,
    border,
    text: isDark
      ? toStringToken(neutral["50"], "#F5F6FA")
      : toStringToken(neutral["500"], "#3A3A3C"),
    subtleText: toStringToken(neutral["300"], "#B3B4BD"),
    chipSurface,
    chipBorder,
    chipHoverSurface,
    chipHoverBorder,
    chipText,
    chipRadius: toStringToken(radius.md, "8px"),
    chipGap: toStringToken(componentSpace.xs, "4px"),
    chipPaddingY: toStringToken(componentSpace.xs, "4px"),
    chipPaddingX: toStringToken(componentSpace.sm, "8px"),
    chipFontSize: toStringToken(fontSize.sm, "14px"),
    chipFontWeight: toStringToken(
      fontWeight.medium ?? fontWeight.semibold ?? fontWeight.regular,
      "500"
    ),
    chipHeight: toStringToken(componentSpace.lg, "36px"),
    chipBadgeBackground: isDark
      ? toStringToken(neutral["600"], "#2F2F31")
      : toStringToken(neutral["100"], "#E5E6EB"),
    chipBadgeText: toStringToken(neutral["500"], "#3A3A3C"),
    chipBadgeRadius: toStringToken(radius.pill ?? radius.md, "999px"),
    chipBadgeActiveBackground: toStringToken(brand.primary, "#006EFF"),
    chipBadgeActiveText: surface,
    accent: toStringToken(brand.primary, "#006EFF"),
    accentSurface: isDark
      ? toStringToken(neutral["700"], "#232325")
      : toStringToken(neutral["50"], "#F5F6FA"),
    accentText: isDark
      ? toStringToken(neutral["50"], "#F5F6FA")
      : toStringToken(brand.secondary, "#0A3565"),
    paddingInline: toStringToken(componentSpace.lg, "24px"),
    paddingBlock: toStringToken(componentSpace.md, "16px"),
    densePadding: toStringToken(componentSpace.sm, "8px"),
    gap: toStringToken(componentSpace.lg, "24px"),
    denseGap: toStringToken(componentSpace.sm, "8px"),
    itemGap: toStringToken(componentSpace.sm, "12px"),
    sectionGap: toStringToken(componentSpace.xl ?? componentSpace.lg, "32px"),
    rowGap: toStringToken(componentSpace.md, "16px"),
    actionGap: toStringToken(componentSpace.md, "16px"),
    dividerInset: toStringToken(componentSpace.xs, "8px"),
    searchMinWidth: "280px",
    radius: toStringToken(radius.lg, "16px"),
    shadow: isDark
      ? "0 8px 24px rgba(0, 0, 0, 0.65)"
      : "0 8px 24px rgba(7, 33, 66, 0.08)",
    dividerBackground: isDark
      ? toStringToken(neutral["500"], "#3A3A3C")
      : border,
    motionDuration: toStringToken(duration.base, "200ms"),
    motionEasing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
  };
};

const buildFilterBarStyles = (theme: LoongArkTheme): string => {
  const tokens = extractFilterBarTokens(theme);
  const scope = `[data-scope="filter-bar"]`;
  const root = `${scope}[data-part="root"]`;
  const dense = `${root}[data-dense='true']`;
  const search = `${scope}[data-part="search"]`;
  const filters = `${scope}[data-part="filters"]`;
  const actions = `${scope}[data-part="actions"]`;
  const divider = `${scope}[data-part="divider"]`;
  const chip = `${scope}[data-part="chip"]`;
  const chipBadge = `${chip} [data-part="chip-badge"]`;
  const elevated = `${root}[data-elevated='true']`;

  return `
${root} {
  display: grid;
  grid-template-columns: minmax(${tokens.searchMinWidth}, 1.15fr) auto minmax(0, 1fr) auto;
  column-gap: ${tokens.sectionGap};
  row-gap: ${tokens.rowGap};
  padding: ${tokens.paddingBlock} ${tokens.paddingInline};
  border-radius: ${tokens.radius};
  border: 1px solid ${tokens.border};
  background: ${tokens.surface};
  color: ${tokens.text};
  box-shadow: none;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
}

${root} > * {
  min-width: 0;
}

${elevated} {
  box-shadow: ${tokens.shadow};
}

${dense} {
  column-gap: ${tokens.denseGap};
  row-gap: ${tokens.denseGap};
  padding: ${tokens.densePadding};
}

${root}[data-align='center'] {
  align-items: center;
}

${root}[data-align='start'] {
  align-items: flex-start;
}

${search} {
  display: flex;
  flex-direction: column;
  gap: ${tokens.itemGap};
  min-width: ${tokens.searchMinWidth};
}

${filters},
${actions} {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${tokens.itemGap};
}

${filters} {
  justify-content: flex-start;
}

${actions} {
  gap: ${tokens.actionGap};
  justify-content: flex-end;
  justify-self: end;
}

${divider} {
  width: 1px;
  min-height: 32px;
  background: ${tokens.dividerBackground};
  opacity: 0.8;
  align-self: stretch;
  margin: ${tokens.dividerInset} 0;
}

${chip} {
  display: inline-flex;
  align-items: center;
  gap: ${tokens.chipGap};
  min-height: ${tokens.chipHeight};
  padding: ${tokens.chipPaddingY} ${tokens.chipPaddingX};
  border-radius: ${tokens.chipRadius};
  border: 1px solid ${tokens.chipBorder};
  background: ${tokens.chipSurface};
  color: ${tokens.chipText};
  font-size: ${tokens.chipFontSize};
  font-family: ${tokens.fontFamily};
  font-weight: ${tokens.chipFontWeight};
  line-height: 1.2;
  cursor: pointer;
  transition:
    background ${tokens.motionDuration} ${tokens.motionEasing},
    color ${tokens.motionDuration} ${tokens.motionEasing},
    border-color ${tokens.motionDuration} ${tokens.motionEasing},
    box-shadow ${tokens.motionDuration} ${tokens.motionEasing};
}

${chip}:hover {
  border-color: ${tokens.chipHoverBorder};
  background: ${tokens.chipHoverSurface};
  color: ${tokens.text};
}

${chip}[data-active='true'] {
  color: ${tokens.accentText};
  background: ${tokens.accentSurface};
  border-color: ${tokens.accent};
}

${chip}:focus-visible {
  outline: none;
  box-shadow: 0 0 0 1px ${tokens.surface}, 0 0 0 4px ${tokens.accent};
}

${chipBadge} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.75em;
  height: 1.75em;
  padding: 0 ${tokens.chipGap};
  font-size: 12px;
  border-radius: ${tokens.chipBadgeRadius};
  background: ${tokens.chipBadgeBackground};
  color: ${tokens.chipBadgeText};
}

${chip}[data-active='true'] ${chipBadge} {
  background: ${tokens.chipBadgeActiveBackground};
  color: ${tokens.chipBadgeActiveText};
}

@media (max-width: 960px) {
  ${root} {
    grid-template-columns: 1fr;
  }

  ${divider} {
    display: none;
  }

  ${actions} {
    justify-content: flex-start;
    justify-self: stretch;
    width: 100%;
  }
}
`;
};

export const filterBarKitComponent: KitComponentRegistration = {
  name: "filter-bar",
  mount(theme) {
    const css = buildFilterBarStyles(theme);
    mountKitStyles(`filter-bar-${theme.mode}`, css);
  },
};
