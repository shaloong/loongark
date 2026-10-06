import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
import { CodeEditorExample } from "../examples/react/CodeEditorExample";
import { initialCode, initialRich } from "../examples/shared/editorDemo";
import { withArkExamplePage } from "./arkStory";
const meta = {
  title: "Components/CodeEditor",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", heading: "Code editor", pageWidth: 760 },
  decorators: [withArkExamplePage],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = { render: () => <CodeEditorExample /> };
export const ReadOnly: StoryObj = {
  render: () => (
    <L.LoongArkCodeEditor
      defaultValue={initialCode}
      language="typescript"
      readOnly
      label="Read-only source"
      description="Select and copy content without changing the document."
    />
  ),
};
