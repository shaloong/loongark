import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
import { RichTextEditorExample } from "../examples/react/RichTextEditorExample";
import { initialCode, initialRich } from "../examples/shared/editorDemo";
import { withArkExamplePage } from "./arkStory";
const meta = {
  title: "Components/RichTextEditor",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    heading: "Rich text editor",
    pageWidth: 760,
  },
  decorators: [withArkExamplePage],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = { render: () => <RichTextEditorExample /> };
export const ReadOnly: StoryObj = {
  render: () => (
    <L.LoongArkRichTextEditor
      defaultValue={initialRich}
      readOnly
      label="Read-only document"
      description="Select and copy content without changing the document."
    />
  ),
};
