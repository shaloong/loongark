import { withArkExamplePage } from "./arkStory";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/ClientOnly",
  tags: ["autodocs"],
  decorators: [withArkExamplePage],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <L.LoongArkClientOnly fallback={<p>Waiting for client…</p>}>
      <p>Client content is ready</p>
    </L.LoongArkClientOnly>
  ),
};
