import type { Decorator } from "@storybook/react";
import { LoongArkTypography } from "@loongark/react";
/** 独立预览是完整页面，提供标题和主内容地标；组件本身不强加页面结构。 */
export const withArkExamplePage: Decorator = (Story, context) => (
  <main style={{ width: "100%", maxWidth: 640 }}>
    <LoongArkTypography
      as="h1"
      style={{ marginBottom: "var(--lk-space-component-lg)" }}
    >
      {context.title.split("/").pop()}
    </LoongArkTypography>
    <Story />
  </main>
);
