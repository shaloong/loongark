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
export const Basic: StoryObj = {
  parameters: {
    docs: {
      description: {
        story:
          "支持中文组合输入、受控拒绝回退、只读即时阻断与卸载清理。Tab 缩进，Escape 后 Tab 离开编辑器；控制面板可切换受控和拒绝更新。",
      },
    },
  },
  render: () => <CodeEditorExample />,
};
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
