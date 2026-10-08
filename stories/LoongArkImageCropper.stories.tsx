import { withArkExamplePage } from "./arkStory";
import type { Meta, StoryObj } from "@storybook/react";
import { ImageCropperExample } from "../examples/react/ImageCropperExample";
const meta = {
  title: "Components/ImageCropper",
  tags: ["autodocs"],
  decorators: [withArkExamplePage],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = { render: () => <ImageCropperExample /> };
