import React from "react";

// 轻量本地类型，避免依赖缺失
type StorybookDecorator = (Story: any, context: any) => React.ReactNode;
import { LoongArkProvider } from "@loongark/react";
import "./preview.css";

// Storybook Docs: Ark UI 会对元素 focus 赋值，部分运行时会把 focus 标为只读，这里用 getter/setter 兜底，允许赋值但默认回退原生 focus。
if (typeof HTMLElement !== "undefined") {
  try {
    const baseFocus = HTMLElement.prototype.focus;
    Object.defineProperty(HTMLElement.prototype, "focus", {
      configurable: true,
      get() {
        return (this as any).__lk_focus_override__ ?? baseFocus;
      },
      set(value) {
        (this as any).__lk_focus_override__ = value;
      },
    });
  } catch (err) {
    console.warn("[LoongArk] focus patch skipped", err);
  }
}

const preview: {
  parameters: Record<string, unknown>;
  globalTypes: Record<string, unknown>;
  decorators: StorybookDecorator[];
} = {
  globalTypes: {
    mode: {
      name: "模式",
      description: "LoongArk 主题模式",
      defaultValue: "light",
      toolbar: {
        icon: "contrast",
        items: [
          { value: "light", title: "浅色" },
          { value: "dark", title: "深色" },
          { value: "high-contrast", title: "高对比" },
        ],
        dynamicTitle: true,
      },
    },
    brand: {
      name: "品牌主色",
      description: "覆盖主题 brand.primary",
      defaultValue: "",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "", title: "默认" },
          { value: "#006EFF", title: "蓝" },
          { value: "#00B8D9", title: "青" },
          { value: "#F58220", title: "橙" },
          { value: "#7C3AED", title: "紫" },
        ],
        dynamicTitle: true,
      },
    },
    accent: {
      name: "强调色",
      description: "覆盖主题 brand.accent",
      defaultValue: "",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "", title: "默认" },
          { value: "#5AC8FA", title: "天蓝" },
          { value: "#22C55E", title: "绿色" },
          { value: "#FF5A8A", title: "玫红" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: "fullscreen",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const mode =
        (context.globals.mode as "light" | "dark" | "high-contrast") ?? "light";
      const brand = (context.globals.brand as string) || undefined;
      const accent = (context.globals.accent as string) || undefined;
      const semanticSurface =
        mode === "dark"
          ? "loongark-story-surface dark"
          : mode === "high-contrast"
          ? "loongark-story-surface high-contrast"
          : "loongark-story-surface light";
      return (
        <LoongArkProvider mode={mode} brand={brand} accent={accent}>
          <div className={semanticSurface}>
            <Story />
          </div>
        </LoongArkProvider>
      );
    },
  ],
};

export default preview;
