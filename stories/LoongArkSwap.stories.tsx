import type { Meta, StoryObj } from "@storybook/react";
import { SwapExample } from "../examples/react/SwapExample";
import { withArkExamplePage } from "./arkStory";
const meta = {
  title: "Components/Swap",
  tags: ["autodocs"],
  decorators: [withArkExamplePage],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = { render: () => <SwapExample /> };
