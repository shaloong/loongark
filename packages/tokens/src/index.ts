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
}

export const baseTokens: TokenRegistry = {
  color: {
    brand: {
      primary: "#006EFF",
      secondary: "#0A3565",
      accent: "#5AC8FA",
      warning: "#F58220",
    },
    neutral: {
      50: "#F5F6FA",
      100: "#E5E6EB",
      300: "#B3B4BD",
      500: "#3A3A3C",
      700: "#232325",
      900: "#121212",
    },
  },
  typography: {
    fontFamily: {
      heading: "'DingTalk JinBuTi', sans-serif",
      body: "'Alibaba PuHuiTi 3.0', sans-serif",
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "20px",
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
    },
  },
  space: {
    component: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
    },
    layout: {
      gutter: "32px",
      section: "64px",
    },
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "16px",
    pill: "999px",
  },
  motion: {
    duration: {
      fast: "120ms",
      base: "200ms",
      slow: "320ms",
    },
    easing: {
      standard: "cubic-bezier(0.2, 0, 0, 1)",
      emphasized: "cubic-bezier(0.2, 0, 0, 1)",
      entrance: "cubic-bezier(0.4, 0, 0.2, 1)",
      exit: "cubic-bezier(0.2, 0, 0.6, 1)",
    },
  },
  shadow: {
    tooltip: "0 8px 32px rgba(0,0,0,0.16)",
    popover: "0 12px 48px rgba(0,0,0,0.18)",
  },
  zIndex: {
    tooltip: 1200,
    popover: 1100,
    toast: 1300,
    dialog: 1400,
  },
};

/**
 * 导出 baseTokens 作为默认降级值供组件使用
 */
export const DEFAULT_TOKENS = baseTokens;

export type TokenOverrides = Partial<TokenRegistry>;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const mergeTokens = (
  base: TokenRegistry,
  overrides?: TokenOverrides
): TokenRegistry => {
  if (!overrides) {
    return JSON.parse(JSON.stringify(base));
  }

  const deepMerge = (
    target: TokenTree,
    source: TokenTree | undefined
  ): TokenTree => {
    if (!source) {
      return target;
    }

    return Object.keys({ ...target, ...source }).reduce<TokenTree>(
      (acc, key) => {
        const targetValue = target[key];
        const sourceValue = source[key];

        if (isPlainObject(targetValue) || isPlainObject(sourceValue)) {
          acc[key] = deepMerge(
            (isPlainObject(targetValue) ? targetValue : {}) as TokenTree,
            (isPlainObject(sourceValue) ? sourceValue : undefined) as
              | TokenTree
              | undefined
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
      {} as TokenTree
    );
  };

  return {
    color: deepMerge(base.color, overrides.color as TokenTree | undefined),
    typography: deepMerge(
      base.typography,
      overrides.typography as TokenTree | undefined
    ),
    space: deepMerge(base.space, overrides.space as TokenTree | undefined),
    radius: deepMerge(base.radius, overrides.radius as TokenTree | undefined),
    motion: deepMerge(base.motion, overrides.motion as TokenTree | undefined),
    shadow: deepMerge(base.shadow, overrides.shadow as TokenTree | undefined),
    zIndex: deepMerge(base.zIndex, overrides.zIndex as TokenTree | undefined),
  };
};

interface FlattenOptions {
  prefix?: string;
}

const flattenTokens = (
  tree: TokenTree,
  path: string[] = [],
  options: FlattenOptions = {}
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
  prefix = "--lk"
): string => {
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
  };

  return Object.values(merged)
    .flatMap((record) =>
      Object.entries(record).map(([name, value]) => `  ${name}: ${value};`)
    )
    .join("\n");
};

export const buildTokenArtifacts = (tokens: TokenRegistry = baseTokens) => {
  const css = `:root {\n${tokensToCssVariables(tokens)}\n}`;
  const json = `${JSON.stringify(tokens, null, 2)}\n`;
  return { css, json };
};
