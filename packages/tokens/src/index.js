"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTokenArtifacts = exports.tokensToCssVariables = exports.mergeTokens = exports.baseTokens = void 0;
exports.baseTokens = {
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
};
const isPlainObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
const mergeTokens = (base, overrides) => {
    if (!overrides) {
        return JSON.parse(JSON.stringify(base));
    }
    const deepMerge = (target, source) => {
        if (!source) {
            return target;
        }
        return Object.keys({ ...target, ...source }).reduce((acc, key) => {
            const targetValue = target[key];
            const sourceValue = source[key];
            if (isPlainObject(targetValue) || isPlainObject(sourceValue)) {
                acc[key] = deepMerge((isPlainObject(targetValue) ? targetValue : {}), (isPlainObject(sourceValue) ? sourceValue : undefined));
                return acc;
            }
            if (sourceValue !== undefined) {
                acc[key] = sourceValue;
                return acc;
            }
            acc[key] = targetValue;
            return acc;
        }, {});
    };
    return {
        color: deepMerge(base.color, overrides.color),
        typography: deepMerge(base.typography, overrides.typography),
        space: deepMerge(base.space, overrides.space),
        radius: deepMerge(base.radius, overrides.radius),
        motion: deepMerge(base.motion, overrides.motion),
    };
};
exports.mergeTokens = mergeTokens;
const flattenTokens = (tree, path = [], options = {}) => {
    return Object.keys(tree).reduce((acc, key) => {
        const value = tree[key];
        const nextPath = [...path, key];
        if (isPlainObject(value)) {
            Object.assign(acc, flattenTokens(value, nextPath, options));
            return acc;
        }
        const varName = `${options.prefix ?? ""}${nextPath
            .join("-")
            .toLowerCase()}`;
        acc[varName] = value;
        return acc;
    }, {});
};
const tokensToCssVariables = (tokens, prefix = "--lk") => {
    const merged = {
        color: flattenTokens(tokens.color, ["color"], { prefix: `${prefix}-` }),
        typography: flattenTokens(tokens.typography, ["typography"], {
            prefix: `${prefix}-`,
        }),
        space: flattenTokens(tokens.space, ["space"], { prefix: `${prefix}-` }),
        radius: flattenTokens(tokens.radius, ["radius"], { prefix: `${prefix}-` }),
        motion: flattenTokens(tokens.motion, ["motion"], { prefix: `${prefix}-` }),
    };
    return Object.values(merged)
        .flatMap((record) => Object.entries(record).map(([name, value]) => `  ${name}: ${value};`))
        .join("\n");
};
exports.tokensToCssVariables = tokensToCssVariables;
const buildTokenArtifacts = (tokens = exports.baseTokens) => {
    const css = `:root {\n${(0, exports.tokensToCssVariables)(tokens)}\n}`;
    const json = `${JSON.stringify(tokens, null, 2)}\n`;
    return { css, json };
};
exports.buildTokenArtifacts = buildTokenArtifacts;
