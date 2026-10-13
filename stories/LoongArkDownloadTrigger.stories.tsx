import { withArkExamplePage } from "./arkStory";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/DownloadTrigger",
  tags: ["autodocs"],
  decorators: [withArkExamplePage],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <L.LoongArkDownloadTrigger
      fileName="component-notes.txt"
      mimeType="text/plain"
      data="LoongArk component notes"
      asChild
    >
      <L.LoongArkButton variant="outline">Download notes</L.LoongArkButton>
    </L.LoongArkDownloadTrigger>
  ),
};
