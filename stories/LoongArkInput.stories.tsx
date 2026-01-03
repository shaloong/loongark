import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LoongArkInputRoot,
  LoongArkInputControl,
  LoongArkInputLabel,
  LoongArkInputHelperText,
  LoongArkInputPrefix,
  LoongArkInputSuffix,
} from "@loongark/react";

const meta = {
  title: "Components/Input",
  component: LoongArkInputRoot,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "inline-radio" },
      options: ["sm", "md", "lg"],
    },
    state: {
      control: { type: "inline-radio" },
      options: ["default", "invalid", "success"],
    },
    disabled: {
      control: "boolean",
    },
    readOnly: {
      control: "boolean",
    },
    variant: {
      control: { type: "inline-radio" },
      options: ["default", "floating"],
    },
    hasValue: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
  },
  args: {
    size: "md",
    state: "default",
    disabled: false,
    readOnly: false,
    variant: "default",
  },
} satisfies Meta<typeof LoongArkInputRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

// 交互式演示
export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    const isFloating = args.variant === "floating";
    return (
      <div style={{ width: "320px" }}>
        <LoongArkInputRoot
          size={args.size}
          state={args.state}
          disabled={args.disabled}
          readOnly={args.readOnly}
          variant={args.variant}
          hasValue={isFloating && !!value}
        >
          <LoongArkInputLabel>用户名</LoongArkInputLabel>
          <LoongArkInputControl
            size={args.size}
            state={args.state}
            disabled={args.disabled}
            readOnly={args.readOnly}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={isFloating ? "" : "请输入用户名"}
          />
          {args.state === "invalid" && (
            <LoongArkInputHelperText variant="error">
              用户名格式不正确
            </LoongArkInputHelperText>
          )}
          {args.state === "success" && (
            <LoongArkInputHelperText variant="success">
              用户名可用
            </LoongArkInputHelperText>
          )}
        </LoongArkInputRoot>
      </div>
    );
  },
};

// 基础输入框
export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: "320px" }}>
        <LoongArkInputRoot>
          <LoongArkInputLabel>用户名</LoongArkInputLabel>
          <LoongArkInputControl
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="请输入用户名"
          />
        </LoongArkInputRoot>
      </div>
    );
  },
};

// 带 Prefix 的输入框
export const WithPrefix: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: "320px" }}>
        <LoongArkInputRoot>
          <LoongArkInputLabel>搜索</LoongArkInputLabel>
          <LoongArkInputPrefix>🔍</LoongArkInputPrefix>
          <LoongArkInputControl
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="搜索内容"
          />
        </LoongArkInputRoot>
      </div>
    );
  },
};

// 带 Suffix 的输入框
export const WithSuffix: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: "320px" }}>
        <LoongArkInputRoot>
          <LoongArkInputLabel>邮箱</LoongArkInputLabel>
          <LoongArkInputControl
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="your@email.com"
          />
          {value && (
            <LoongArkInputSuffix action="clear" onClick={() => setValue("")}>
              ✕
            </LoongArkInputSuffix>
          )}
          <LoongArkInputHelperText>
            请输入有效的邮箱地址
          </LoongArkInputHelperText>
        </LoongArkInputRoot>
      </div>
    );
  },
};

// 带 Prefix 和 Suffix
export const WithPrefixAndSuffix: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: "320px" }}>
        <LoongArkInputRoot>
          <LoongArkInputLabel>金额</LoongArkInputLabel>
          <LoongArkInputPrefix>￥</LoongArkInputPrefix>
          <LoongArkInputControl
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0.00"
          />
          <LoongArkInputSuffix>CNY</LoongArkInputSuffix>
        </LoongArkInputRoot>
      </div>
    );
  },
};

// Floating Label
export const FloatingLabel: Story = {
  args: {
    size: "md",
    state: "default",
    disabled: false,
    readOnly: false,
    variant: "floating",
  },
  render: (args) => {
    const [value, setValue] = useState("");
    const hasValue = !!value;
    const placeholder = args.variant === "floating" ? "" : "请输入";
    return (
      <div style={{ width: "320px" }}>
        <LoongArkInputRoot
          size={args.size}
          state={args.state}
          disabled={args.disabled}
          readOnly={args.readOnly}
          variant={args.variant}
          hasValue={hasValue}
        >
          <LoongArkInputLabel>邮箱地址</LoongArkInputLabel>
          <LoongArkInputControl
            size={args.size}
            state={args.state}
            disabled={args.disabled}
            readOnly={args.readOnly}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
          />
        </LoongArkInputRoot>
      </div>
    );
  },
};

// 验证状态
export const Invalid: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: "320px" }}>
        <LoongArkInputRoot state="invalid">
          <LoongArkInputLabel>密码</LoongArkInputLabel>
          <LoongArkInputControl
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <LoongArkInputHelperText variant="error">
            密码至少需要 8 个字符
          </LoongArkInputHelperText>
        </LoongArkInputRoot>
      </div>
    );
  },
};

// 成功状态
export const Success: Story = {
  render: () => {
    return (
      <div style={{ width: "320px" }}>
        <LoongArkInputRoot state="success">
          <LoongArkInputLabel>用户名</LoongArkInputLabel>
          <LoongArkInputControl value="loongark" readOnly />
          <LoongArkInputHelperText variant="success">
            用户名可用
          </LoongArkInputHelperText>
        </LoongArkInputRoot>
      </div>
    );
  },
};

// 禁用状态
export const Disabled: Story = {
  render: () => {
    return (
      <div style={{ width: "320px" }}>
        <LoongArkInputRoot disabled>
          <LoongArkInputLabel>用户名</LoongArkInputLabel>
          <LoongArkInputControl disabled placeholder="禁用状态" />
        </LoongArkInputRoot>
      </div>
    );
  },
};

// 只读状态
export const ReadOnly: Story = {
  render: () => {
    return (
      <div style={{ width: "320px" }}>
        <LoongArkInputRoot readOnly>
          <LoongArkInputLabel>ID</LoongArkInputLabel>
          <LoongArkInputControl readOnly value="lk-2024-001" />
        </LoongArkInputRoot>
      </div>
    );
  },
};

// 尺寸对比
export const Sizes: Story = {
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "320px",
        }}
      >
        <LoongArkInputRoot size="sm">
          <LoongArkInputLabel>小尺寸 (sm)</LoongArkInputLabel>
          <LoongArkInputControl placeholder="Small input" />
        </LoongArkInputRoot>

        <LoongArkInputRoot size="md">
          <LoongArkInputLabel>中尺寸 (md)</LoongArkInputLabel>
          <LoongArkInputControl placeholder="Medium input" />
        </LoongArkInputRoot>

        <LoongArkInputRoot size="lg">
          <LoongArkInputLabel>大尺寸 (lg)</LoongArkInputLabel>
          <LoongArkInputControl placeholder="Large input" />
        </LoongArkInputRoot>
      </div>
    );
  },
};
