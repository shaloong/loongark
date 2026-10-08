// This file has been automatically migrated to valid ESM format by Storybook.
import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(fileURLToPath(import.meta.url));
// 开发预览和静态构建都使用当前真实源码生成参考资料，失败时停止构建。
execFileSync(process.execPath, [resolve(__dirname, "../scripts/generate-reference.mjs")], { cwd: resolve(__dirname, ".."), stdio: "inherit" });

const workspaceAlias: Record<string, string> = {
  "@loongark/tokens": resolve(__dirname, "../packages/tokens/src"),
  "@loongark/theme": resolve(__dirname, "../packages/theme/src"),
  "@loongark/primitives": resolve(__dirname, "../packages/primitives/src"),
  "@loongark/kit": resolve(__dirname, "../packages/kit/src"),
  "@loongark/react": resolve(__dirname, "../packages/react/src"),
  "@loongark/vue": resolve(__dirname, "../packages/vue/src"),
  "@loongark/svelte": resolve(__dirname, "../packages/svelte/src"),
  "@loongark/solid": resolve(__dirname, "../packages/solid/src"),
  "@examples": resolve(__dirname, "../examples"),
};

const config: StorybookConfig = {
  staticDirs: ["./public", { from: "../.artifacts/storybook-reference", to: "/reference" }],
  stories: ["../stories/**/*.stories.@(ts|tsx)", "../stories/**/*.mdx"],
  addons: [getAbsolutePath("@storybook/addon-docs")],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  core: {
    disableTelemetry: true,
  },

  async viteFinal(config) {
    // Pages 项目站点位于 /loongark/；相对资源路径也支持本地根路径预览。
    config.base = "./";
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      ...workspaceAlias,
    };
    config.resolve.extensions = [".ts", ".tsx", ".js", ".jsx", ".json"];
    return config;
  },
};

export default config;

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
