import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as L from "@loongark/react";
function Demo() {
  const [value, setValue] = React.useState("");
  return (
    <L.LoongArkStack gap="sm">
      <L.LoongArkLabel htmlFor="notes">备注</L.LoongArkLabel>
      <L.LoongArkTextarea
        id="notes"
        name="notes"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="输入项目备注…"
      />
      <span data-testid="textarea-count">{value.length} 个字符</span>
    </L.LoongArkStack>
  );
}
const meta = {
  title: "Components/Textarea",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%,720px)" }}>
      <Demo />
    </div>
  ),
};
export const States: StoryObj = {
  render: () => (
    <L.LoongArkStack style={{ width: "min(100%,560px)" }}>
      <L.LoongArkLabel htmlFor="readonly-notes">只读备注</L.LoongArkLabel>
      <L.LoongArkTextarea id="readonly-notes" readOnly value="项目已归档" />
      <L.LoongArkLabel htmlFor="disabled-notes">禁用备注</L.LoongArkLabel>
      <L.LoongArkTextarea
        id="disabled-notes"
        disabled
        placeholder="当前不可编辑"
      />
      <L.LoongArkLabel htmlFor="invalid-notes">必填备注</L.LoongArkLabel>
      <L.LoongArkTextarea
        id="invalid-notes"
        aria-invalid="true"
        aria-describedby="notes-error"
      />
      <span
        id="notes-error"
        style={{ color: "var(--lk-color-semantic-destructive)" }}
      >
        请输入备注
      </span>
    </L.LoongArkStack>
  ),
};

function AutoSizeDemo() {
  const [value, setValue] = React.useState("");
  return (
    <L.LoongArkStack style={{ width: "min(100%,560px)" }}>
      <L.LoongArkLabel htmlFor="auto-notes">自动高度备注</L.LoongArkLabel>
      <L.LoongArkTextarea
        id="auto-notes"
        autoSize
        minRows={2}
        maxRows={5}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="输入内容后自动伸缩，最多显示五行"
      />
      <L.LoongArkButton
        variant="outline"
        onClick={() =>
          setValue("第一行\n第二行\n第三行\n第四行\n第五行\n第六行")
        }
      >
        填入多行
      </L.LoongArkButton>
    </L.LoongArkStack>
  );
}
export const AutoSize: StoryObj = { render: () => <AutoSizeDemo /> };
