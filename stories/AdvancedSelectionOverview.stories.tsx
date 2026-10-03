import { withArkExamplePage } from "./arkStory";
import type { Meta, StoryObj } from "@storybook/react";
import { AdvancedSelectionExample } from "../examples/react/AdvancedSelectionExample";
const meta = {
  title: "Compositions/Advanced Selection",
  tags: ["autodocs"],
  decorators: [withArkExamplePage],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = { render: () => <AdvancedSelectionExample /> };
