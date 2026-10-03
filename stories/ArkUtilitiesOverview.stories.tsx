import { withArkExamplePage } from "./arkStory";
import type { Meta, StoryObj } from "@storybook/react";
import { ArkUtilitiesExample } from "../examples/react/ArkUtilitiesExample";
const meta = {
  title: "Compositions/Ark Utilities",
  tags: ["autodocs"],
  decorators: [withArkExamplePage],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = { render: () => <ArkUtilitiesExample /> };
