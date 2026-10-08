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
export const Basic: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          "中文组合输入不提前触发链接面板确认或取消；受控拒绝恢复已接受文档。链接确认完成后恢复编辑区焦点，卸载释放插件与监听。",
      },
    },
  },
  render: () => <RichTextEditorExample />,
};
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
