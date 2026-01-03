import { createPrimitive, registerPrimitive } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import type { LoongArkTheme } from "@loongark/theme";

// Checkbox 尺寸定义
export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps {
  size?: CheckboxSize;
}

const checkboxContract = {
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
    const color = theme.tokens.color as any;
    const space = theme.tokens.space as any;
    const radius = theme.tokens.radius as any;
    const typography = theme.tokens.typography as any;
    const shadow = (theme.tokens as any).shadow || {};

    // Checkbox Control 样式
    const controlBaseStyles = `
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: 1px solid ${color.neutral?.border || "#d1d5db"};
      background: ${color.white || "#ffffff"};
      box-shadow: ${shadow?.xs || "0 1px 2px 0 rgba(0, 0, 0, 0.05)"};
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      user-select: none;
    `;

    const controlCheckedStyles = `
      background: ${color.brand?.primary || "#3b82f6"};
      border-color: ${color.brand?.primary || "#3b82f6"};
      color: ${color.white || "#ffffff"};
    `;

    const controlHoverStyles = `
      border-color: ${color.neutral?.borderHover || "#9ca3af"};
      background: ${color.neutral?.bgHover || "#f9fafb"};
    `;

    const controlFocusStyles = `
      outline: none;
      border-color: ${color.brand?.primary || "#3b82f6"};
      box-shadow: 0 0 0 1px ${color.brand?.primary || "#3b82f6"}, 0 0 0 4px ${
      color.brand?.accent || "rgba(59, 130, 246, 0.15)"
    };
    `;

    const controlDisabledStyles = `
      cursor: not-allowed;
      opacity: 0.6;
      background: ${color.neutral?.bg || "#f3f4f6"};
      border-color: ${color.neutral?.border || "#e5e7eb"};
      box-shadow: none;
    `;

    const controlInvalidStyles = `
      border-color: ${color.error?.solid || "#ef4444"};
    `;

    // 尺寸样式
    const sizeStyles = {
      sm: `
        width: 16px;
        height: 16px;
        border-radius: ${radius?.sm || "4px"};
      `,
      md: `
        width: 20px;
        height: 20px;
        border-radius: ${radius?.md || "6px"};
      `,
      lg: `
        width: 24px;
        height: 24px;
        border-radius: ${radius?.md || "6px"};
      `,
    };

    // Label 样式
    const labelBaseStyles = `
      cursor: pointer;
      user-select: none;
      color: ${color.neutral?.text || "#111827"};
      font-size: ${typography?.fontSize?.md || "14px"};
      line-height: 1.5;
      font-weight: 500;
      margin-left: ${space?.component?.sm || "8px"};
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
        background: ${color.brand?.solidHover || "#2563eb"};
        border-color: ${color.brand?.solidHover || "#2563eb"};
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

    mountPrimitiveStyles(`checkbox-${theme.mode}`, css);
  }
);

registerPrimitive(checkboxPrimitive);

export { checkboxPrimitive };
