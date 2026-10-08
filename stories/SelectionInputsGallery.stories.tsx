import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectionInputsExample } from "../examples/react/SelectionInputsExample";
const meta = {
  title: "Examples/Selection Inputs",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
export const Overview: StoryObj = { render: () => <SelectionInputsExample /> };
