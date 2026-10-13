import React from "react";

import type { Preview } from "@storybook/react";
import { LoongArkProvider } from "@loongark/react";
import "./preview.css";
import { ReferenceDocs, ReferenceDocsContainer } from "./reference";

const preview: Preview = {
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
          { value: "#0A3565", title: "深蓝" },
          { value: "#F58220", title: "橙" },
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
          { value: "#767680", title: "铅灰" },
          { value: "#F58220", title: "珊瑚橙" },
        ],
        dynamicTitle: true,
      },
    },
    motion: {
      name: "动效",
      description: "自动尊重系统减少动态效果设置，或强制展示动效",
      defaultValue: "auto",
      toolbar: {
        icon: "play",
        items: [
          { value: "auto", title: "跟随系统" },
          { value: "force", title: "展示动效" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    options: { storySort: { order: ["Guides", "Components", "*"] } },
    docs: { page: ReferenceDocs, container: ReferenceDocsContainer },
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
      const motionPreference =
        context.globals.motion === "force" ? "force" : "auto";
      const semanticSurface =
        mode === "dark"
          ? "loongark-story-surface dark"
          : mode === "high-contrast"
            ? "loongark-story-surface high-contrast"
            : "loongark-story-surface light";
      return (
        <LoongArkProvider
          mode={mode}
          brand={brand}
          accent={accent}
          motionPreference={motionPreference}
        >
          <div className={semanticSurface}>
            <Story />
          </div>
        </LoongArkProvider>
      );
    },
  ],

  tags: ["autodocs"],
};

export default preview;
