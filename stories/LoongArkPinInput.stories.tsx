import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LoongArkPinInput } from "@loongark/react";

const meta = {
  title: "Components/PinInput",
  component: LoongArkPinInput.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoongArkPinInput.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const pinContainerStyle = { width: "360px" };
const pinStackStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  width: "360px",
};

// 基础 6 位验证码
export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div style={pinContainerStyle}>
        <LoongArkPinInput.Root
          value={value}
          onValueChange={(details) => setValue(details.value)}
          onValueComplete={(details) =>
            alert(`验证码：${details.valueAsString}`)
          }
          selectOnFocus={false}
        >
          <LoongArkPinInput.Label>6 位验证码</LoongArkPinInput.Label>
          <LoongArkPinInput.Control>
            {[0, 1, 2, 3, 4, 5].map((id) => (
              <LoongArkPinInput.Input key={id} index={id} />
            ))}
          </LoongArkPinInput.Control>
          <LoongArkPinInput.HiddenInput />
        </LoongArkPinInput.Root>
      </div>
    );
  },
};

// 4 位数字密码
export const Numeric: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div style={pinContainerStyle}>
        <LoongArkPinInput.Root
          value={value}
          onValueChange={(details) => setValue(details.value)}
          type="numeric"
          selectOnFocus={false}
        >
          <LoongArkPinInput.Label>4 位数字密码</LoongArkPinInput.Label>
          <LoongArkPinInput.Control>
            {[0, 1, 2, 3].map((id) => (
              <LoongArkPinInput.Input key={id} index={id} />
            ))}
          </LoongArkPinInput.Control>
          <LoongArkPinInput.HiddenInput />
        </LoongArkPinInput.Root>
      </div>
    );
  },
};

// 隐藏输入（密钥）
export const Masked: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div style={pinContainerStyle}>
        <LoongArkPinInput.Root
          value={value}
          onValueChange={(details) => setValue(details.value)}
          mask
          selectOnFocus={false}
        >
          <LoongArkPinInput.Label>8 位密钥（隐藏）</LoongArkPinInput.Label>
          <LoongArkPinInput.Control>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((id) => (
              <LoongArkPinInput.Input key={id} index={id} />
            ))}
          </LoongArkPinInput.Control>
          <LoongArkPinInput.HiddenInput />
        </LoongArkPinInput.Root>
      </div>
    );
  },
};

// 字母验证码（自动大写）
export const Alphabetic: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div style={pinContainerStyle}>
        <LoongArkPinInput.Root
          value={value}
          onValueChange={(details) => setValue(details.value)}
          type="alphabetic"
          autoCapitalize
          selectOnFocus={false}
        >
          <LoongArkPinInput.Label>
            4 位字母验证码（自动大写）
          </LoongArkPinInput.Label>
          <LoongArkPinInput.Control>
            {[0, 1, 2, 3].map((id) => (
              <LoongArkPinInput.Input key={id} index={id} autoCapitalize />
            ))}
          </LoongArkPinInput.Control>
          <LoongArkPinInput.HiddenInput />
        </LoongArkPinInput.Root>
      </div>
    );
  },
};

// 尺寸对比
export const Sizes: Story = {
  render: () => {
    const [valueSm, setValueSm] = useState<string[]>([]);
    const [valueMd, setValueMd] = useState<string[]>([]);
    const [valueLg, setValueLg] = useState<string[]>([]);

    return (
      <div style={pinStackStyle}>
        <LoongArkPinInput.Root
          value={valueSm}
          onValueChange={(details) => setValueSm(details.value)}
          selectOnFocus={false}
        >
          <LoongArkPinInput.Label>小尺寸 (sm)</LoongArkPinInput.Label>
          <LoongArkPinInput.Control size="sm">
            {[0, 1, 2, 3].map((id) => (
              <LoongArkPinInput.Input key={id} index={id} size="sm" />
            ))}
          </LoongArkPinInput.Control>
          <LoongArkPinInput.HiddenInput />
        </LoongArkPinInput.Root>

        <LoongArkPinInput.Root
          value={valueMd}
          onValueChange={(details) => setValueMd(details.value)}
          selectOnFocus={false}
        >
          <LoongArkPinInput.Label>中尺寸 (md)</LoongArkPinInput.Label>
          <LoongArkPinInput.Control size="md">
            {[0, 1, 2, 3].map((id) => (
              <LoongArkPinInput.Input key={id} index={id} size="md" />
            ))}
          </LoongArkPinInput.Control>
          <LoongArkPinInput.HiddenInput />
        </LoongArkPinInput.Root>

        <LoongArkPinInput.Root
          value={valueLg}
          onValueChange={(details) => setValueLg(details.value)}
          selectOnFocus={false}
        >
          <LoongArkPinInput.Label>大尺寸 (lg)</LoongArkPinInput.Label>
          <LoongArkPinInput.Control size="lg">
            {[0, 1, 2, 3].map((id) => (
              <LoongArkPinInput.Input key={id} index={id} size="lg" />
            ))}
          </LoongArkPinInput.Control>
          <LoongArkPinInput.HiddenInput />
        </LoongArkPinInput.Root>
      </div>
    );
  },
};
