type TokenValue = string | number;

export type TokenTree = {
  [key: string]: TokenValue | TokenTree;
};

export interface TokenRegistry {
  color: TokenTree;
  typography: TokenTree;
  space: TokenTree;
  radius: TokenTree;
  motion: TokenTree;
  shadow: TokenTree;
  zIndex: TokenTree;
  control: TokenTree;
}

export const viPalette = {
  skyBlue: "#006EFF",
  deepBlue: "#0A3565",
  dawnBlue: "#5AC8FA",
  coral: "#F58220",
  cloudWhite: "#F2F2F2",
  leadGray: "#767680",
  stoneGray: "#3A3A3C",
  inkNight: "#121212",
} as const;

/** Shaloong neutral ramps: fixed VI anchors, with explicit sRGB tints/shades. */
const mixNeutral = (from: string, to: string, weight: number): string =>
  "#" +
  [0, 2, 4]
    .map((offset) => {
      const a = parseInt(from.slice(offset + 1, offset + 3), 16);
      const b = parseInt(to.slice(offset + 1, offset + 3), 16);
      return Math.round(a * (1 - weight) + b * weight)
        .toString(16)
        .padStart(2, "0");
    })
    .join("")
    .toUpperCase();

export const neutralPalette = {
  white: mixNeutral(viPalette.cloudWhite, "#FFFFFF", 1),
  paper: mixNeutral(viPalette.cloudWhite, "#FFFFFF", 0.5),
  cloud: viPalette.cloudWhite,
  border: mixNeutral(viPalette.cloudWhite, viPalette.leadGray, 0.2),
  input: mixNeutral(viPalette.cloudWhite, viPalette.leadGray, 0.85),
  textMuted: mixNeutral(viPalette.leadGray, viPalette.inkNight, 0.08),
  lead: viPalette.leadGray,
  stone: viPalette.stoneGray,
  stone90: mixNeutral(viPalette.stoneGray, viPalette.inkNight, 0.1),
  stone80: mixNeutral(viPalette.stoneGray, viPalette.inkNight, 0.2),
  stone60: mixNeutral(viPalette.stoneGray, viPalette.inkNight, 0.4),
  stone40: mixNeutral(viPalette.stoneGray, viPalette.inkNight, 0.6),
  ink: viPalette.inkNight,
  darkCard: mixNeutral(viPalette.inkNight, viPalette.cloudWhite, 0.04),
  darkMuted: mixNeutral(viPalette.inkNight, viPalette.cloudWhite, 0.08),
  darkTextMuted: mixNeutral(viPalette.leadGray, viPalette.cloudWhite, 0.35),
} as const;

export const baseTokens = {
  color: {
    vi: viPalette,
    brand: {
      primary: viPalette.inkNight,
      primaryHover: viPalette.stoneGray,
      secondary: viPalette.stoneGray,
      accent: viPalette.leadGray,
      warning: viPalette.coral,
      subtle: viPalette.cloudWhite,
    },
    neutral: {
      50: neutralPalette.white,
      75: neutralPalette.paper,
      100: viPalette.cloudWhite,
      200: neutralPalette.border,
      300: mixNeutral(viPalette.cloudWhite, viPalette.leadGray, 0.35),
      400: mixNeutral(viPalette.cloudWhite, viPalette.leadGray, 0.65),
      500: viPalette.leadGray,
      550: neutralPalette.stone90,
      600: neutralPalette.stone80,
      650: neutralPalette.stone60,
      700: neutralPalette.stone40,
      900: viPalette.inkNight,
      border: neutralPalette.border,
      borderStrong: neutralPalette.input,
      bg: neutralPalette.white,
      text: viPalette.inkNight,
    },
    white: neutralPalette.white,
    border: {
      default: neutralPalette.border,
      hover: neutralPalette.darkTextMuted,
    },
    bg: { default: neutralPalette.white },
    text: { primary: viPalette.inkNight },
    semantic: {
      background: neutralPalette.white,
      foreground: viPalette.inkNight,
      card: neutralPalette.white,
      cardForeground: viPalette.inkNight,
      popover: neutralPalette.white,
      popoverForeground: viPalette.inkNight,
      primary: viPalette.inkNight,
      primaryForeground: neutralPalette.white,
      secondary: viPalette.cloudWhite,
      secondaryForeground: viPalette.inkNight,
      muted: viPalette.cloudWhite,
      mutedForeground: neutralPalette.textMuted,
      accent: viPalette.cloudWhite,
      accentForeground: viPalette.inkNight,
      destructive: "#B91C1C",
      destructiveForeground: neutralPalette.white,
      success: "#15803D",
      successForeground: neutralPalette.white,
      border: neutralPalette.border,
      input: neutralPalette.input,
      ring: viPalette.leadGray,
      overlay: "rgba(18, 18, 18, 0.5)",
    },
  },
  typography: {
    fontFamily: {
      heading:
        "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', 'Microsoft YaHei', sans-serif",
      body: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', 'Microsoft YaHei', sans-serif",
      mono: "monospace",
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      md: "14px",
      lg: "16px",
      xl: "24px",
      display: "40px",
    },
    lineHeight: {
      tight: 1.3,
      base: 1.5,
      relaxed: 1.7,
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 600,
      semibold: 600,
    },
  },
  space: {
    component: {
      xs: "4px",
      sm: "8px",
      compact: "12px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      xxl: "40px",
      spacious: "48px",
    },
    layout: {
      gutter: "32px",
      section: "64px",
    },
  },
  radius: {
    sm: "4px",
    md: "6px",
    lg: "8px",
    pill: "999px",
  },
  motion: {
    duration: {
      fast: "120ms",
      base: "200ms",
      slow: "300ms",
      exit: "150ms",
      spin: "800ms",
      pulse: "2000ms",
    },
    easing: {
      standard: "cubic-bezier(0.2, 0, 0, 1)",
      emphasized: "cubic-bezier(0.2, 0, 0, 1)",
      entrance: "cubic-bezier(0.4, 0, 0.2, 1)",
      exit: "cubic-bezier(0.2, 0, 0.6, 1)",
    },
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    tooltip: "0 2px 6px rgba(0,0,0,0.10)",
    popover: "0 4px 12px rgba(0,0,0,0.10)",
    xl: "0 12px 32px rgba(0,0,0,0.16)",
  },
  zIndex: {
    tooltip: 1500,
    popover: 1400,
    toast: 1600,
    dialog: 1300,
  },
  control: {
    containerWidth: "1200px",
    height: { xs: "28px", sm: "32px", md: "36px", lg: "40px" },
    icon: { sm: "14px", md: "16px", lg: "18px" },
    fieldGap: "6px",
    calendarWidth: "280px",
    dialogWidth: { sm: "400px", md: "512px", lg: "768px" },
    searchMinWidth: "240px",
    stroke: "1.5px",
    borderWidth: "1px",
    focusWidth: "2px",
  },
} satisfies TokenRegistry;

type TokenPaths<T> = {
  [K in keyof T & (string | number)]: T[K] extends TokenValue
    ? `${K}`
    : `${K}.${TokenPaths<T[K]>}`;
}[keyof T & (string | number)];
export type TokenPath = TokenPaths<typeof baseTokens>;

export const tokensForMode = (
  mode: "light" | "dark" | "high-contrast",
): TokenRegistry => {
  if (mode === "light") return mergeTokens(baseTokens);
  const dark = mode === "dark";
  return mergeTokens(baseTokens, {
    color: {
      brand: {
        primary: dark ? viPalette.cloudWhite : "#000000",
        primaryHover: dark ? viPalette.cloudWhite : "#000000",
        secondary: dark ? viPalette.cloudWhite : "#000000",
        accent: dark ? neutralPalette.darkTextMuted : "#000000",
        subtle: dark ? neutralPalette.darkMuted : neutralPalette.white,
      },
      neutral: dark
        ? {
            50: viPalette.inkNight,
            75: neutralPalette.darkCard,
            100: neutralPalette.darkMuted,
            200: neutralPalette.stone80,
            300: viPalette.leadGray,
            400: neutralPalette.darkTextMuted,
            500: mixNeutral(viPalette.cloudWhite, viPalette.leadGray, 0.35),
            550: neutralPalette.border,
            600: mixNeutral(viPalette.cloudWhite, viPalette.leadGray, 0.15),
            650: viPalette.cloudWhite,
            700: neutralPalette.paper,
            900: neutralPalette.white,
            border: neutralPalette.stone80,
            borderStrong: mixNeutral(
              viPalette.stoneGray,
              viPalette.leadGray,
              0.5,
            ),
            bg: viPalette.inkNight,
            text: neutralPalette.paper,
          }
        : {
            50: neutralPalette.white,
            100: neutralPalette.white,
            200: "#000000",
            300: viPalette.stoneGray,
            500: "#000000",
            700: "#000000",
            900: "#000000",
            border: "#000000",
            borderStrong: "#000000",
            bg: neutralPalette.white,
            text: "#000000",
          },
      border: {
        default: dark ? neutralPalette.stone80 : "#000000",
        hover: dark ? viPalette.leadGray : "#000000",
      },
      bg: { default: dark ? viPalette.inkNight : neutralPalette.white },
      text: { primary: dark ? viPalette.cloudWhite : "#000000" },
      semantic: {
        background: dark ? viPalette.inkNight : neutralPalette.white,
        foreground: dark ? viPalette.cloudWhite : "#000000",
        card: dark ? neutralPalette.darkCard : neutralPalette.white,
        cardForeground: dark ? viPalette.cloudWhite : "#000000",
        popover: dark ? neutralPalette.darkCard : neutralPalette.white,
        popoverForeground: dark ? viPalette.cloudWhite : "#000000",
        primary: dark ? viPalette.cloudWhite : "#000000",
        primaryForeground: dark ? viPalette.inkNight : neutralPalette.white,
        secondary: dark ? neutralPalette.darkMuted : neutralPalette.white,
        secondaryForeground: dark ? viPalette.cloudWhite : "#000000",
        muted: dark ? neutralPalette.darkMuted : neutralPalette.white,
        mutedForeground: dark
          ? neutralPalette.darkTextMuted
          : viPalette.stoneGray,
        accent: dark ? neutralPalette.darkMuted : neutralPalette.white,
        accentForeground: dark ? viPalette.cloudWhite : "#000000",
        destructive: dark ? "#F87171" : "#B91C1C",
        destructiveForeground: dark ? viPalette.inkNight : neutralPalette.white,
        success: dark ? "#4ADE80" : "#15803D",
        successForeground: dark ? viPalette.inkNight : neutralPalette.white,
        border: dark ? neutralPalette.stone80 : "#000000",
        input: dark
          ? mixNeutral(viPalette.stoneGray, viPalette.leadGray, 0.5)
          : "#000000",
        ring: dark ? neutralPalette.darkTextMuted : "#000000",
      },
    },
  });
};

/**
 * 导出 baseTokens 作为默认降级值供组件使用
 */
export const DEFAULT_TOKENS = baseTokens;

export type TokenOverrides = Partial<TokenRegistry>;

// Token 可以用于 SSR 的 style 标签；不允许数据逃逸为 HTML 或额外 CSS 规则。
const validateTokenTree = (
  tree: TokenTree,
  depth = 0,
  seen = new Set<object>(),
): void => {
  if (depth > 32 || seen.has(tree))
    throw new TypeError("Invalid token tree depth or cycle");
  seen.add(tree);
  for (const [key, value] of Object.entries(tree)) {
    if (
      !/^[a-zA-Z0-9_-]+$/.test(key) ||
      ["__proto__", "constructor", "prototype"].includes(key)
    )
      throw new TypeError("Invalid token key");
    if (typeof value === "object" && value !== null && !Array.isArray(value))
      validateTokenTree(value, depth + 1, seen);
    else if (
      typeof value === "number"
        ? !Number.isFinite(value)
        : typeof value !== "string" || /[;{}<>\u0000]/u.test(value)
    )
      throw new TypeError("Invalid token value");
  }
  seen.delete(tree);
};

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const mergeTokens = (
  base: TokenRegistry,
  overrides?: TokenOverrides,
): TokenRegistry => {
  for (const tree of Object.values(base)) validateTokenTree(tree);
  if (overrides)
    for (const tree of Object.values(overrides))
      if (tree !== undefined) validateTokenTree(tree);
  if (!overrides) {
    return JSON.parse(JSON.stringify(base));
  }

  const deepMerge = (
    target: TokenTree,
    source: TokenTree | undefined,
  ): TokenTree => {
    // 未覆盖分支也复制，防止结果修改污染基础 Token 或另一请求的主题。
    source ??= {};

    return Object.keys({ ...target, ...source }).reduce<TokenTree>(
      (acc, key) => {
        const targetValue = Object.prototype.hasOwnProperty.call(target, key)
          ? target[key]
          : undefined;
        const sourceValue = Object.prototype.hasOwnProperty.call(source, key)
          ? source[key]
          : undefined;

        if (isPlainObject(targetValue) || isPlainObject(sourceValue)) {
          acc[key] = deepMerge(
            (isPlainObject(targetValue) ? targetValue : {}) as TokenTree,
            (isPlainObject(sourceValue) ? sourceValue : undefined) as
              TokenTree | undefined,
          );
          return acc;
        }

        if (sourceValue !== undefined) {
          acc[key] = sourceValue as TokenValue;
          return acc;
        }

        acc[key] = targetValue as TokenValue;
        return acc;
      },
      {} as TokenTree,
    );
  };

  return {
    color: deepMerge(base.color, overrides.color as TokenTree | undefined),
    typography: deepMerge(
      base.typography,
      overrides.typography as TokenTree | undefined,
    ),
    space: deepMerge(base.space, overrides.space as TokenTree | undefined),
    radius: deepMerge(base.radius, overrides.radius as TokenTree | undefined),
    motion: deepMerge(base.motion, overrides.motion as TokenTree | undefined),
    shadow: deepMerge(base.shadow, overrides.shadow as TokenTree | undefined),
    zIndex: deepMerge(base.zIndex, overrides.zIndex as TokenTree | undefined),
    control: deepMerge(
      base.control,
      overrides.control as TokenTree | undefined,
    ),
  };
};

interface FlattenOptions {
  prefix?: string;
}

const flattenTokens = (
  tree: TokenTree,
  path: string[] = [],
  options: FlattenOptions = {},
): Record<string, TokenValue> => {
  return Object.keys(tree).reduce<Record<string, TokenValue>>((acc, key) => {
    const value = tree[key];
    const nextPath = [...path, key];

    if (isPlainObject(value)) {
      Object.assign(acc, flattenTokens(value as TokenTree, nextPath, options));
      return acc;
    }

    const varName = `${options.prefix ?? ""}${nextPath
      .join("-")
      .toLowerCase()}`;
    acc[varName] = value as TokenValue;
    return acc;
  }, {});
};

export const tokensToCssVariables = (
  tokens: TokenRegistry,
  prefix = "--lk",
): string => {
  if (!/^--[a-zA-Z0-9_-]+$/.test(prefix))
    throw new TypeError("Invalid token prefix");
  for (const tree of Object.values(tokens)) validateTokenTree(tree);
  const merged = {
    color: flattenTokens(tokens.color, ["color"], { prefix: `${prefix}-` }),
    typography: flattenTokens(tokens.typography, ["typography"], {
      prefix: `${prefix}-`,
    }),
    space: flattenTokens(tokens.space, ["space"], { prefix: `${prefix}-` }),
    radius: flattenTokens(tokens.radius, ["radius"], { prefix: `${prefix}-` }),
    motion: flattenTokens(tokens.motion, ["motion"], { prefix: `${prefix}-` }),
    shadow: flattenTokens(tokens.shadow, ["shadow"], { prefix: `${prefix}-` }),
    zIndex: flattenTokens(tokens.zIndex, ["z-index"], { prefix: `${prefix}-` }),
    control: flattenTokens(tokens.control, ["control"], {
      prefix: `${prefix}-`,
    }),
  };

  return Object.values(merged)
    .flatMap((record) =>
      Object.entries(record).map(([name, value]) => `  ${name}: ${value};`),
    )
    .join("\n");
};

export const buildTokenArtifacts = (tokens: TokenRegistry = baseTokens) => {
  const css = `:root {\n${tokensToCssVariables(tokens)}\n}`;
  const json = `${JSON.stringify(tokens, null, 2)}\n`;
  return { css, json };
};
