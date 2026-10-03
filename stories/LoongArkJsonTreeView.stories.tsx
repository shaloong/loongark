import { withArkExamplePage } from "./arkStory";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
import { JsonTreeViewExample } from "../examples/react/JsonTreeViewExample";
const meta = {
  title: "Components/JsonTreeView",
  tags: ["autodocs"],
  decorators: [withArkExamplePage],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = { render: () => <JsonTreeViewExample /> };
export const Empty: StoryObj = {
  render: () => (
    <L.LoongArkJsonTreeViewRoot data={{}}>
      <L.LoongArkJsonTreeViewTree aria-label="Empty object" />
    </L.LoongArkJsonTreeViewRoot>
  ),
};
export const Scalar: StoryObj = {
  render: () => (
    <L.LoongArkJsonTreeViewRoot data={null}>
      <L.LoongArkJsonTreeViewTree aria-label="Null value" />
    </L.LoongArkJsonTreeViewRoot>
  ),
};
