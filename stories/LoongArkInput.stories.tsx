import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  LoongArkInputRoot,
  LoongArkInputControl,
  LoongArkInputLabel,
  LoongArkInputHelperText,
  LoongArkInputGroup,
  LoongArkInputPrefix,
  LoongArkInputSuffix,
} from "@loongark/react";

const meta = {
  title: "Components/Input",
  component: LoongArkInputRoot,
  parameters: {
    layout: "fullscreen",
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
    inputType: {
      control: { type: "inline-radio" },
      options: ["text", "password", "email", "number", "search", "tel", "url"],
      description: "输入框类型",
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
    inputType: "text",
  },
} satisfies Meta<
  React.ComponentProps<typeof LoongArkInputRoot> & { inputType?: string }
>;

export default meta;
type Story = StoryObj<
  React.ComponentProps<typeof LoongArkInputRoot> & { inputType?: string }
>;

const inputContainerStyle: React.CSSProperties = { width: "min(100%, 360px)" };
const inputStackStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "min(100%, 360px)",
};

// 交互式演示
export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    const isFloating = args.variant === "floating";
    const inputType = args.inputType ?? "text";
    return (
      <div style={inputContainerStyle}>
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
            type={inputType}
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

// 基础输入框（控制项生效）
export const Basic: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div style={inputContainerStyle}>
        <LoongArkInputRoot
          size={args.size}
          state={args.state}
          disabled={args.disabled}
          readOnly={args.readOnly}
          variant={args.variant}
        >
          <LoongArkInputLabel>用户名</LoongArkInputLabel>
          <LoongArkInputControl
            size={args.size}
            state={args.state}
            disabled={args.disabled}
            readOnly={args.readOnly}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={args.variant === "floating" ? "" : "请输入用户名"}
          />
        </LoongArkInputRoot>
      </div>
    );
  },
};

// 带 Prefix 的输入框
export const WithPrefix: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div style={inputContainerStyle}>
        <LoongArkInputRoot
          size={args.size}
          state={args.state}
          disabled={args.disabled}
          readOnly={args.readOnly}
          variant={args.variant}
        >
          <LoongArkInputLabel>搜索</LoongArkInputLabel>
          <LoongArkInputGroup>
            <LoongArkInputPrefix>🔍</LoongArkInputPrefix>
            <LoongArkInputControl
              size={args.size}
              state={args.state}
              disabled={args.disabled}
              readOnly={args.readOnly}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={args.variant === "floating" ? "" : "搜索内容"}
            />
          </LoongArkInputGroup>
        </LoongArkInputRoot>
      </div>
    );
  },
};

// 带 Suffix 的输入框
export const WithSuffix: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div style={inputContainerStyle}>
        <LoongArkInputRoot
          size={args.size}
          state={args.state}
          disabled={args.disabled}
          readOnly={args.readOnly}
          variant={args.variant}
        >
          <LoongArkInputLabel>邮箱</LoongArkInputLabel>
          <LoongArkInputGroup>
            <LoongArkInputControl
              size={args.size}
              state={args.state}
              disabled={args.disabled}
              readOnly={args.readOnly}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={args.variant === "floating" ? "" : "your@email.com"}
            />
            {value && (
              <LoongArkInputSuffix
                aria-label="清空输入"
                action="clear"
                onClick={() => setValue("")}
              >
                ✕
              </LoongArkInputSuffix>
            )}
          </LoongArkInputGroup>
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
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div style={inputContainerStyle}>
        <LoongArkInputRoot
          size={args.size}
          state={args.state}
          disabled={args.disabled}
          readOnly={args.readOnly}
          variant={args.variant}
        >
          <LoongArkInputLabel>金额</LoongArkInputLabel>
          <LoongArkInputGroup>
            <LoongArkInputPrefix>￥</LoongArkInputPrefix>
            <LoongArkInputControl
              size={args.size}
              state={args.state}
              disabled={args.disabled}
              readOnly={args.readOnly}
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={args.variant === "floating" ? "" : "0.00"}
            />
            <LoongArkInputSuffix>CNY</LoongArkInputSuffix>
          </LoongArkInputGroup>
        </LoongArkInputRoot>
      </div>
    );
  },
};

// Floating Label
export const FloatingLabel: Story = {
  args: {
    variant: "floating",
  },
  render: (args) => {
    const [value, setValue] = useState("");
    const hasValue = !!value;
    const placeholder = args.variant === "floating" ? "" : "请输入";
    return (
      <div style={inputContainerStyle}>
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
  args: {
    state: "invalid",
    inputType: "text",
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div style={inputContainerStyle}>
        <LoongArkInputRoot
          size={args.size}
          state={args.state}
          disabled={args.disabled}
          readOnly={args.readOnly}
          variant={args.variant}
        >
          <LoongArkInputLabel>用户名</LoongArkInputLabel>
          <LoongArkInputControl
            size={args.size}
            state={args.state}
            disabled={args.disabled}
            readOnly={args.readOnly}
            type={args.inputType ?? "text"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <LoongArkInputHelperText variant="error">
            用户名格式不正确
          </LoongArkInputHelperText>
        </LoongArkInputRoot>
      </div>
    );
  },
};

// 成功状态
export const Success: Story = {
  args: {
    state: "success",
    readOnly: true,
  },
  render: (args) => {
    return (
      <div style={inputContainerStyle}>
        <LoongArkInputRoot
          size={args.size}
          state={args.state}
          disabled={args.disabled}
          readOnly={args.readOnly}
          variant={args.variant}
        >
          <LoongArkInputLabel>用户名</LoongArkInputLabel>
          <LoongArkInputControl
            size={args.size}
            state={args.state}
            readOnly
            value="loongark"
          />
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
  args: {
    disabled: true,
  },
  render: (args) => {
    return (
      <div style={inputContainerStyle}>
        <LoongArkInputRoot
          size={args.size}
          state={args.state}
          disabled={args.disabled}
          readOnly={args.readOnly}
          variant={args.variant}
        >
          <LoongArkInputLabel>用户名</LoongArkInputLabel>
          <LoongArkInputControl
            size={args.size}
            state={args.state}
            disabled={args.disabled}
            readOnly={args.readOnly}
            placeholder="禁用状态"
          />
        </LoongArkInputRoot>
      </div>
    );
  },
};

// 只读状态
export const ReadOnly: Story = {
  args: {
    readOnly: true,
  },
  render: (args) => {
    return (
      <div style={inputContainerStyle}>
        <LoongArkInputRoot
          size={args.size}
          state={args.state}
          disabled={args.disabled}
          readOnly={args.readOnly}
          variant={args.variant}
        >
          <LoongArkInputLabel>ID</LoongArkInputLabel>
          <LoongArkInputControl
            size={args.size}
            state={args.state}
            disabled={args.disabled}
            readOnly={args.readOnly}
            value="lk-2024-001"
          />
        </LoongArkInputRoot>
      </div>
    );
  },
};

// 尺寸对比
export const Sizes: Story = {
  render: (args) => {
    return (
      <div style={inputStackStyle}>
        <LoongArkInputRoot
          size="sm"
          state={args.state}
          disabled={args.disabled}
          readOnly={args.readOnly}
          variant={args.variant}
        >
          <LoongArkInputLabel>小尺寸 (sm)</LoongArkInputLabel>
          <LoongArkInputControl
            size="sm"
            state={args.state}
            disabled={args.disabled}
            readOnly={args.readOnly}
            placeholder="Small input"
          />
        </LoongArkInputRoot>

        <LoongArkInputRoot
          size="md"
          state={args.state}
          disabled={args.disabled}
          readOnly={args.readOnly}
          variant={args.variant}
        >
          <LoongArkInputLabel>中尺寸 (md)</LoongArkInputLabel>
          <LoongArkInputControl
            size="md"
            state={args.state}
            disabled={args.disabled}
            readOnly={args.readOnly}
            placeholder="Medium input"
          />
        </LoongArkInputRoot>

        <LoongArkInputRoot
          size="lg"
          state={args.state}
          disabled={args.disabled}
          readOnly={args.readOnly}
          variant={args.variant}
        >
          <LoongArkInputLabel>大尺寸 (lg)</LoongArkInputLabel>
          <LoongArkInputControl
            size="lg"
            state={args.state}
            disabled={args.disabled}
            readOnly={args.readOnly}
            placeholder="Large input"
          />
        </LoongArkInputRoot>
      </div>
    );
  },
};
