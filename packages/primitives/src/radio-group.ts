import { createPrimitive, registerPrimitive } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import type { LoongArkTheme } from "@loongark/theme";

// Radio Group 尺寸类型
export type RadioGroupSize = "sm" | "md" | "lg";

// Radio Group 方向类型
export type RadioGroupOrientation = "horizontal" | "vertical";

// Radio Group Primitive Props
export interface RadioGroupPrimitiveProps {
  size?: RadioGroupSize;
  orientation?: RadioGroupOrientation;
}

// Radio Group 样式 contract（标记 token 依赖）
const radioGroupContract = {
  name: "radio-group",
  tokens: [
    "color.brand.primary",
    "color.brand.primaryHover",
    "color.border.default",
    "color.border.hover",
    "color.bg.default",
    "color.text.primary",
    "space.component.sm",
    "space.component.md",
    "space.component.lg",
    "radius.sm",
    "radius.md",
    "radius.lg",
  ],
  defaults: {
    size: "md" as RadioGroupSize,
    orientation: "vertical" as RadioGroupOrientation,
  },
};

// 创建 Radio Group Primitive
const radioGroupPrimitive = createPrimitive(
  radioGroupContract,
  (theme: LoongArkTheme) => {
    const color = theme.tokens.color as any;
    const space = theme.tokens.space as any;
    const radius = theme.tokens.radius as any;
    const shadow = (theme.tokens as any).shadow || {};

    // Radio Group Control 基础样式
    const controlBaseStyles = `
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-sizing: border-box;
      border-radius: 50%;
      border: 1px solid ${color.neutral?.border || "#d1d5db"};
      background-color: ${color.white || "#ffffff"};
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      position: relative;
    `;

    // 尺寸样式
    const sizeStyles = {
      sm: {
        control: `
          width: 16px;
          height: 16px;
        `,
        text: `
          font-size: 14px;
        `,
        item: `
          gap: 8px;
        `,
      },
      md: {
        control: `
          width: 20px;
          height: 20px;
        `,
        text: `
          font-size: 16px;
        `,
        item: `
          gap: 10px;
        `,
      },
      lg: {
        control: `
          width: 24px;
          height: 24px;
        `,
        text: `
          font-size: 18px;
        `,
        item: `
          gap: 12px;
        `,
      },
    };

    const controlCheckedStyles = `
      border-color: ${color.brand?.primary || "#3b82f6"};
      background-color: ${color.brand?.primary || "#3b82f6"};
    `;

    const controlFocusStyles = `
      outline: none;
      border-color: ${color.brand?.primary || "#3b82f6"};
    `;

    const controlHoverStyles = `
      border-color: ${color.neutral?.borderHover || "#9ca3af"};
      background-color: ${color.neutral?.bgHover || "#f9fafb"};
    `;

    const controlDisabledStyles = `
      cursor: not-allowed;
      opacity: 0.6;
      background: ${color.neutral?.bg || "#f3f4f6"};
      border-color: ${color.neutral?.border || "#e5e7eb"};
      box-shadow: none;
    `;

    // Radio Group Indicator 样式（焦点指示器，通常隐藏）
    const indicatorStyles = `
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      position: relative;
    `;

    const indicatorCheckedStyles = `
      /* 焦点指示器的选中样式 */
    `;

    // Radio Group Text 样式
    const textBaseStyles = `
      color: ${color.neutral?.text || "#111827"};
      cursor: pointer;
      user-select: none;
      font-weight: 500;
      line-height: 1.5;
    `;

    const textDisabledStyles = `
      opacity: 0.6;
      cursor: not-allowed;
    `;

    // 方向样式
    const orientationStyles = {
      horizontal: `
        flex-direction: row;
        gap: 16px;
      `,
      vertical: `
        flex-direction: column;
        gap: 12px;
      `,
    };

    const css = `
      /* Radio Group Root */
      [data-scope="radio-group"][data-part="root"] {
        display: flex;
      }

      [data-scope="radio-group"][data-part="root"][data-orientation="horizontal"] {
        ${orientationStyles.horizontal}
      }

      [data-scope="radio-group"][data-part="root"][data-orientation="vertical"] {
        ${orientationStyles.vertical}
      }

      /* Radio Group Item */
      [data-scope="radio-group"][data-part="item"] {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      [data-scope="radio-group"][data-part="root"][data-size="sm"] [data-scope="radio-group"][data-part="item"] {
        ${sizeStyles.sm.item}
      }

      [data-scope="radio-group"][data-part="root"][data-size="md"] [data-scope="radio-group"][data-part="item"] {
        ${sizeStyles.md.item}
      }

      [data-scope="radio-group"][data-part="root"][data-size="lg"] [data-scope="radio-group"][data-part="item"] {
        ${sizeStyles.lg.item}
      }

      /* Radio Group Item Control */
      [data-scope="radio-group"][data-part="item-control"] {
        ${controlBaseStyles}
        width: ${sizeStyles.md.control.match(/\d+px/)?.[0] || "20px"};
        height: ${sizeStyles.md.control.match(/\d+px/)?.[0] || "20px"};
      }

      [data-scope="radio-group"][data-part="item-control"]:focus-visible {
        ${controlFocusStyles}
      }

      [data-scope="radio-group"][data-part="item-control"]::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        width: 60%;
        height: 60%;
        border-radius: 50%;
        background-color: ${color.white || "#ffffff"};
        transform-origin: center;
        transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }

      [data-scope="radio-group"][data-part="item-control"][data-size="sm"] {
        ${sizeStyles.sm.control}
      }

      [data-scope="radio-group"][data-part="item-control"][data-size="md"] {
        ${sizeStyles.md.control}
      }

      [data-scope="radio-group"][data-part="item-control"][data-size="lg"] {
        ${sizeStyles.lg.control}
      }

      [data-scope="radio-group"][data-part="root"][data-size="sm"] [data-scope="radio-group"][data-part="item-control"] {
        ${sizeStyles.sm.control}
      }

      [data-scope="radio-group"][data-part="root"][data-size="md"] [data-scope="radio-group"][data-part="item-control"] {
        ${sizeStyles.md.control}
      }

      [data-scope="radio-group"][data-part="root"][data-size="lg"] [data-scope="radio-group"][data-part="item-control"] {
        ${sizeStyles.lg.control}
      }

      [data-scope="radio-group"][data-part="item-control"]:not([data-disabled]):not([data-state="checked"]):hover {
        ${controlHoverStyles}
      }

      [data-scope="radio-group"][data-part="item-control"][data-state="checked"] {
        ${controlCheckedStyles}
      }

      [data-scope="radio-group"][data-part="item-control"][data-state="checked"]:hover {
        background-color: ${color.brand?.secondary || color.brand?.primary || "#0056cc"};
        border-color: ${color.brand?.secondary || color.brand?.primary || "#0056cc"};
      }

      [data-scope="radio-group"][data-part="item-control"][data-state="checked"]::after {
        transform: translate(-50%, -50%) scale(1);
      }

      [data-scope="radio-group"][data-part="item-control"][data-disabled] {
        ${controlDisabledStyles}
      }

      /* Radio Group Indicator */
      [data-scope="radio-group"][data-part="indicator"] {
        ${indicatorStyles}
      }

      [data-scope="radio-group"][data-part="indicator"][data-state="checked"] {
        ${indicatorCheckedStyles}
      }

      /* Radio Group Item Text */
      [data-scope="radio-group"][data-part="item-text"] {
        ${textBaseStyles}
      }

      [data-scope="radio-group"][data-part="root"][data-size="sm"] [data-scope="radio-group"][data-part="item-text"] {
        ${sizeStyles.sm.text}
      }

      [data-scope="radio-group"][data-part="root"][data-size="md"] [data-scope="radio-group"][data-part="item-text"] {
        ${sizeStyles.md.text}
      }

      [data-scope="radio-group"][data-part="root"][data-size="lg"] [data-scope="radio-group"][data-part="item-text"] {
        ${sizeStyles.lg.text}
      }

      [data-scope="radio-group"][data-part="item-text"][data-disabled] {
        ${textDisabledStyles}
      }

      /* Radio Group Hidden Input */
      [data-scope="radio-group"][data-part="item-hidden-input"] {
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

    mountPrimitiveStyles(`radio-group-${theme.mode}`, css);
  }
);

registerPrimitive(radioGroupPrimitive);

export { radioGroupPrimitive };
