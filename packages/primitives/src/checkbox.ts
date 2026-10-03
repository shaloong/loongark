import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import type { LoongArkTheme } from "@loongark/theme";
import { DEFAULT_TOKENS, TokenTree } from "@loongark/tokens";
import { asTokenTree, toStringToken } from "./tokenUtils";

// Checkbox 尺寸定义
export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps {
  size?: CheckboxSize;
}

const checkboxContract: PrimitiveContract<CheckboxProps> = {
  name: "checkbox",
  tokens: [
    "color.brand.primary",
    "color.brand.primaryHover",
    "color.neutral.border",
    "color.neutral.borderStrong",
    "color.neutral.bg",
    "color.neutral.text",
    "color.white",
    "space.component.xs",
    "space.component.sm",
    "space.component.md",
    "radius.sm",
    "radius.md",
    "typography.fontSize.sm",
    "typography.fontSize.md",
  ],
  defaults: {
    size: "md" as CheckboxSize,
  },
};

const checkboxPrimitive = createPrimitive(
  checkboxContract,
  (theme: LoongArkTheme) => {
    const color =
      (theme.styleTokens.color as TokenTree) ?? DEFAULT_TOKENS.color;
    const brand = asTokenTree(color.brand);
    const neutral = asTokenTree(color.neutral);
    const colorError = asTokenTree(color.error ?? {}, "color.error");

    const space =
      (theme.styleTokens.space as TokenTree) ?? DEFAULT_TOKENS.space;
    const componentSpace = asTokenTree(space.component);

    const radius =
      (theme.styleTokens.radius as TokenTree) ?? DEFAULT_TOKENS.radius;
    const radiusTokens = asTokenTree(radius);

    const typography =
      (theme.styleTokens.typography as TokenTree) ?? DEFAULT_TOKENS.typography;
    const fontSize = asTokenTree(typography.fontSize);

    const shadow = asTokenTree(
      theme.styleTokens.shadow ?? DEFAULT_TOKENS.shadow,
    );

    // Checkbox Control 样式
    const controlBaseStyles = `
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: 1px solid ${toStringToken(neutral.border, "#d1d5db")};
      background: ${toStringToken(color.white, "#ffffff")};
      box-shadow: ${toStringToken(
        shadow.xs,
        "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      )};
      transition: background-color var(--lk-motion-duration-fast) var(--lk-motion-easing-standard), border-color var(--lk-motion-duration-fast) var(--lk-motion-easing-standard), box-shadow var(--lk-motion-duration-fast) var(--lk-motion-easing-standard);
      cursor: pointer;
      user-select: none;
    `;

    const controlCheckedStyles = `
      background: ${toStringToken(brand.primary, "#3b82f6")};
      border-color: ${toStringToken(brand.primary, "#3b82f6")};
      color: ${toStringToken(color.white, "#ffffff")};
    `;

    const controlHoverStyles = `
      border-color: ${toStringToken(neutral.borderHover, "#9ca3af")};
      background: ${toStringToken(neutral.bgHover, "#f9fafb")};
    `;

    const controlFocusStyles = `
      outline: none;
      border-color: ${toStringToken(brand.primary, "#3b82f6")};
      box-shadow: 0 0 0 1px ${toStringToken(
        brand.primary,
        "#3b82f6",
      )}, 0 0 0 4px ${toStringToken(brand.accent, "rgba(59, 130, 246, 0.15)")};
    `;

    const controlDisabledStyles = `
      cursor: not-allowed;
      opacity: 0.6;
      background: ${toStringToken(neutral.bg, "#f3f4f6")};
      border-color: ${toStringToken(neutral.border, "#e5e7eb")};
      box-shadow: none;
    `;

    const controlInvalidStyles = `
      border-color: ${toStringToken(colorError.solid, "#ef4444")};
    `;

    // 尺寸样式
    const sizeStyles = {
      sm: `
        width: 16px;
        height: 16px;
        border-radius: ${toStringToken(radiusTokens.sm, "4px")};
      `,
      md: `
        width: 20px;
        height: 20px;
        border-radius: ${toStringToken(radiusTokens.md, "6px")};
      `,
      lg: `
        width: 24px;
        height: 24px;
        border-radius: ${toStringToken(radiusTokens.md, "6px")};
      `,
    };

    // Label 样式
    const labelBaseStyles = `
      cursor: pointer;
      user-select: none;
      color: ${toStringToken(neutral.text, "#111827")};
      font-size: ${toStringToken(fontSize.md, "14px")};
      line-height: 1.5;
      font-weight: 500;
      margin-left: ${toStringToken(componentSpace.sm, "8px")};
    `;

    const labelDisabledStyles = `
      cursor: not-allowed;
      opacity: 0.6;
    `;

    // Indicator 样式
    const indicatorStyles = `
      display: flex;
      align-items: center;
      justify-content: center;
      color: currentColor;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    [data-scope="checkbox"][data-part="indicator"] svg {
      width: 80%;
      height: 80%;
    }

    [data-scope="checkbox"][data-part="indicator"] svg path {
      stroke-width: 2;
    }
    `;

    // Root 样式
    const rootStyles = `
      display: inline-flex;
      align-items: center;
      position: relative;
    `;

    const css = `
      /* Checkbox Root */
      [data-scope="checkbox"][data-part="root"] {
        ${rootStyles}
      }

      /* Checkbox Control */
      [data-scope="checkbox"][data-part="control"] {
        ${controlBaseStyles}
      }

      [data-scope="checkbox"][data-part="control"]:focus-visible {
        ${controlFocusStyles}
      }

      [data-scope="checkbox"][data-part="control"][data-size="sm"] {
        ${sizeStyles.sm}
      }

      [data-scope="checkbox"][data-part="control"][data-size="md"] {
        ${sizeStyles.md}
      }

      [data-scope="checkbox"][data-part="control"][data-size="lg"] {
        ${sizeStyles.lg}
      }

      [data-scope="checkbox"][data-part="control"][data-state="checked"],
      [data-scope="checkbox"][data-part="control"][data-state="indeterminate"] {
        ${controlCheckedStyles}
      }

      [data-scope="checkbox"][data-part="control"][data-state="checked"] [data-scope="checkbox"][data-part="indicator"],
      [data-scope="checkbox"][data-part="control"][data-state="indeterminate"] [data-scope="checkbox"][data-part="indicator"] {
        opacity: 1;
      }

      [data-scope="checkbox"][data-part="control"][data-state="checked"]:hover,
      [data-scope="checkbox"][data-part="control"][data-state="indeterminate"]:hover {
        background: ${toStringToken(brand.solidHover, "#2563eb")};
        border-color: ${toStringToken(brand.solidHover, "#2563eb")};
      }

      [data-scope="checkbox"][data-part="control"]:not([data-disabled]):not([data-state="checked"]):not([data-state="indeterminate"]):hover {
        ${controlHoverStyles}
      }

      [data-scope="checkbox"][data-part="control"][data-disabled] {
        ${controlDisabledStyles}
      }

      [data-scope="checkbox"][data-part="control"][data-invalid] {
        ${controlInvalidStyles}
      }

      /* Checkbox Label */
      [data-scope="checkbox"][data-part="label"] {
        ${labelBaseStyles}
      }

      [data-scope="checkbox"][data-part="label"][data-disabled] {
        ${labelDisabledStyles}
      }

      /* Checkbox Indicator */
      [data-scope="checkbox"][data-part="indicator"] {
        ${indicatorStyles}
      }

      [data-scope="checkbox"][data-part="indicator"] svg {
        width: 60%;
        height: 60%;
      }

      [data-scope="checkbox"][data-part="indicator"] svg path {
        stroke-width: 1.6;
      }

      /* Hidden Input */
      [data-scope="checkbox"][data-part="hidden-input"] {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
    `;

    theme.mountStyles(`checkbox-${theme.mode}`, css);
  },
);

registerPrimitive(checkboxPrimitive);

export { checkboxPrimitive };
