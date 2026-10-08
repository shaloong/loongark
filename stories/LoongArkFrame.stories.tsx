import { withArkExamplePage } from "./arkStory";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Frame",
  tags: ["autodocs"],
  decorators: [withArkExamplePage],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <L.LoongArkFrame
      title="Isolated dark preview"
      style={{
        width: "100%",
        height: 120,
        border:
          "var(--lk-control-borderwidth) solid var(--lk-color-semantic-border)",
        borderRadius: "var(--lk-radius-md)",
      }}
    >
      <L.LoongArkProvider mode="dark">
        <main
          aria-label="Isolated preview content"
          style={{
            padding: "var(--lk-space-component-md)",
            minHeight: 120,
            background: "var(--lk-color-semantic-background)",
            color: "var(--lk-color-semantic-foreground)",
          }}
        >
          <L.LoongArkTypography as="h1">Frame content</L.LoongArkTypography>
          <L.LoongArkButton type="button">Inside frame</L.LoongArkButton>
        </main>
      </L.LoongArkProvider>
    </L.LoongArkFrame>
  ),
};
