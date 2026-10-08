import type { Meta, StoryObj } from "@storybook/react";
import { CoreComponentsExample } from "../examples/react/CoreComponentsExample";
const meta = {
  title: "Compositions/Core components",
  component: CoreComponentsExample,
  parameters: {
    docs: {
      description: {
        component:
          "常用基础部件的真实组合；四端完整源码统一出现在各组件 Docs 的代码页签中。",
      },
    },
  },
} satisfies Meta<typeof CoreComponentsExample>;
export default meta;
export const Basic: StoryObj<typeof meta> = {};
