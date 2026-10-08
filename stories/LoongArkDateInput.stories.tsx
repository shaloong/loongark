import { DateTimeExample } from "../examples/react/DateTimeExample";
import type { Meta, StoryObj } from "@storybook/react";
import { DateInputExample } from "../examples/react/DateInputExample";
import { withArkExamplePage } from "./arkStory";
const meta = {
  title: "Components/DateInput",
  tags: ["autodocs"],
  decorators: [withArkExamplePage],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = { render: () => <DateInputExample /> };

export const DateTime: StoryObj = { render: () => <DateTimeExample /> };
