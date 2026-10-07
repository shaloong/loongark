import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "@loongark/react";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LoongArkTagsInputRoot,
  LoongArkTagsInputLabel,
  LoongArkTagsInputControl,
  LoongArkTagsInputInput,
  LoongArkTagsInputItem,
  LoongArkTagsInputItemPreview,
  LoongArkTagsInputItemText,
  LoongArkTagsInputItemDeleteTrigger,
  LoongArkTagsInputClearTrigger,
  LoongArkTagsInputHiddenInput,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/TagsInput",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkTagsInput composes Ark UI tags input with consistent styling.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface TagsInputDemoProps {
  size?: "sm" | "md" | "lg";
  state?: "default" | "invalid" | "success";
  disabled?: boolean;
  readOnly?: boolean;
  initialValue?: string[];
  showClear?: boolean;
}

const TagsInputDemo = ({
  size = "md",
  state = "default",
  disabled = false,
  readOnly = false,
  initialValue = ["React", "Vue", "Solid"],
  showClear = true,
}: TagsInputDemoProps) => {
  const [value, setValue] = React.useState(initialValue);

  return (
    <LoongArkTagsInputRoot
      name="frameworks"
      size={size}
      state={state}
      disabled={disabled}
      readOnly={readOnly}
      value={value}
      onValueChange={(details: { value: string[] }) => setValue(details.value)}
    >
      <LoongArkTagsInputLabel>Frameworks</LoongArkTagsInputLabel>
      <LoongArkTagsInputControl size={size} state={state} disabled={disabled}>
        {value.map((tag, index) => (
          <LoongArkTagsInputItem key={tag} value={tag} index={index}>
            <LoongArkTagsInputItemPreview>
              <LoongArkTagsInputItemText>{tag}</LoongArkTagsInputItemText>
              <LoongArkTagsInputItemDeleteTrigger>
                <LoongArkIcon icon={controlIcons.close} size="sm" />
              </LoongArkTagsInputItemDeleteTrigger>
            </LoongArkTagsInputItemPreview>
          </LoongArkTagsInputItem>
        ))}
        <LoongArkTagsInputInput
          size={size}
          state={state}
          disabled={disabled}
          readOnly={readOnly}
          placeholder="Add tag"
        />
        {showClear && (
          <LoongArkTagsInputClearTrigger>Clear</LoongArkTagsInputClearTrigger>
        )}
      </LoongArkTagsInputControl>
      <LoongArkTagsInputHiddenInput />
    </LoongArkTagsInputRoot>
  );
};

export const Basic: Story = {
  render: () => <TagsInputDemo />,
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <TagsInputDemo initialValue={["React", "Vue"]} showClear />
      <TagsInputDemo initialValue={[]} showClear={false} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <TagsInputDemo state="default" />
      <TagsInputDemo state="invalid" />
      <TagsInputDemo state="success" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <TagsInputDemo size="sm" />
      <TagsInputDemo size="md" />
      <TagsInputDemo size="lg" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => <TagsInputDemo disabled />,
};

export const Interactive: Story = {
  render: () => <TagsInputDemo />,
};
