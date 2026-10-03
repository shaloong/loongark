import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoongArkButton, LoongArkDialog } from "@loongark/react";

type DialogStoryProps = {
  size: "sm" | "md" | "lg";
  placement: "center" | "top";
  motion: "scale" | "slide";
  overlayBlur?: boolean;
};

const {
  Root,
  Trigger,
  Positioner,
  Overlay,
  Content,
  Title,
  Description,
  Footer,
  CloseTrigger,
} = LoongArkDialog;

const DialogPlayground = ({
  size,
  placement,
  motion,
  overlayBlur,
}: DialogStoryProps) => {
  return (
    <Root>
      <Trigger asChild>
        <LoongArkButton>打开弹窗</LoongArkButton>
      </Trigger>
      <Overlay blur={overlayBlur} />
      <Positioner>
        <Content
          size={size}
          placement={placement}
          motion={motion}
          overlayBlur={overlayBlur}
        >
          <CloseTrigger aria-label="关闭" />
          <Title>邀请成员</Title>
          <Description>
            将会向成员邮箱发送邀请，确认后可在工作区设置中修改权限。
          </Description>
          <Footer>
            <CloseTrigger asChild>
              <LoongArkButton variant="ghost">取消</LoongArkButton>
            </CloseTrigger>
            <LoongArkButton>发送邀请</LoongArkButton>
          </Footer>
        </Content>
      </Positioner>
    </Root>
  );
};

const meta: Meta<DialogStoryProps> = {
  title: "Components/Dialog",
  component: DialogPlayground,
  args: {
    size: "md",
    placement: "center",
    motion: "scale",
    overlayBlur: true,
  },
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "inline-radio" },
    },
    placement: {
      options: ["center", "top"],
      control: { type: "inline-radio" },
    },
    motion: {
      options: ["scale", "slide"],
      control: { type: "inline-radio" },
    },
  },
};

export default meta;

type Story = StoryObj<DialogStoryProps>;

export const Playground: Story = {
  render: (args) => <DialogPlayground {...args} />,
};
