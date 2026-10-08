import { withArkExamplePage } from "./arkStory";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Format",
  tags: ["autodocs"],
  decorators: [withArkExamplePage],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <L.LoongArkLocaleProvider locale="en-US">
      <dl>
        <dt>Size</dt>
        <dd>
          <L.LoongArkFormatByte value={2048} unitSystem="binary" />
        </dd>
        <dt>Budget</dt>
        <dd>
          <L.LoongArkFormatNumber
            value={1250.5}
            style="currency"
            currency="USD"
          />
        </dd>
        <dt>Count</dt>
        <dd>
          <L.LoongArkFormatNumber value={1200000} notation="compact" />
        </dd>
      </dl>
    </L.LoongArkLocaleProvider>
  ),
};
