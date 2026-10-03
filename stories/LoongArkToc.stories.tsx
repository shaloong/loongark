import type { Meta, StoryObj } from "@storybook/react";
import { TocExample } from "../examples/react/TocExample";
import { withArkExamplePage } from "./arkStory";
const meta = {
  title: "Components/Toc",
  tags: ["autodocs"],
  decorators: [withArkExamplePage],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = { render: () => <TocExample /> };
