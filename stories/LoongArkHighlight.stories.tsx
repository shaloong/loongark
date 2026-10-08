import { withArkExamplePage } from "./arkStory";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Highlight",
  tags: ["autodocs"],
  decorators: [withArkExamplePage],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <p>
      <L.LoongArkHighlight
        text="Find LoongArk components in your workspace."
        query="LoongArk"
      />
    </p>
  ),
};
