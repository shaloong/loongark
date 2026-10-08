import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "@ark-ui/react/file-upload";
import {
  LoongArkFileUploadRoot,
  LoongArkFileUploadLabel,
  LoongArkFileUploadDropzone,
  LoongArkFileUploadTrigger,
  LoongArkFileUploadHiddenInput,
  LoongArkFileUploadItemGroup,
  LoongArkFileUploadItem,
  LoongArkFileUploadItemPreview,
  LoongArkFileUploadItemPreviewImage,
  LoongArkFileUploadItemName,
  LoongArkFileUploadItemSizeText,
  LoongArkFileUploadItemDeleteTrigger,
  LoongArkFileUploadClearTrigger,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/FileUpload",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkFileUpload provides a styled Ark UI file upload workflow.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface FileUploadDemoProps {
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  maxFiles?: number;
  helperText?: string;
}

const FileUploadDemo = ({
  size = "md",
  disabled = false,
  maxFiles = 3,
  helperText = "Drag files here",
}: FileUploadDemoProps) => {
  return (
    <LoongArkFileUploadRoot
      size={size}
      disabled={disabled}
      accept={{ "image/*": [] }}
      maxFiles={maxFiles}
    >
      <LoongArkFileUploadLabel>Upload files</LoongArkFileUploadLabel>
      <LoongArkFileUploadDropzone>
        <p style={{ margin: 0 }}>{helperText}</p>
      </LoongArkFileUploadDropzone>
      <LoongArkFileUploadTrigger>Browse</LoongArkFileUploadTrigger>
      <LoongArkFileUploadHiddenInput />
      <FileUpload.Context>
        {(context) => {
          const files = context.acceptedFiles ?? [];
          return (
            <>
              <LoongArkFileUploadItemGroup>
                {files.map((file: File) => (
                  <LoongArkFileUploadItem key={file.name} file={file}>
                    <LoongArkFileUploadItemPreview>
                      <LoongArkFileUploadItemPreviewImage />
                    </LoongArkFileUploadItemPreview>
                    <div>
                      <LoongArkFileUploadItemName />
                      <LoongArkFileUploadItemSizeText />
                    </div>
                    <LoongArkFileUploadItemDeleteTrigger>
                      Remove
                    </LoongArkFileUploadItemDeleteTrigger>
                  </LoongArkFileUploadItem>
                ))}
              </LoongArkFileUploadItemGroup>
              {files.length > 0 && (
                <LoongArkFileUploadClearTrigger>
                  Clear all
                </LoongArkFileUploadClearTrigger>
              )}
            </>
          );
        }}
      </FileUpload.Context>
    </LoongArkFileUploadRoot>
  );
};

export const Basic: Story = {
  render: () => <FileUploadDemo />,
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <FileUploadDemo maxFiles={1} helperText="Upload a single file" />
      <FileUploadDemo maxFiles={5} helperText="Upload up to five files" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <FileUploadDemo size="sm" />
      <FileUploadDemo size="md" />
      <FileUploadDemo size="lg" />
    </div>
  ),
};

export const States: Story = {
  render: () => <FileUploadDemo disabled />,
};

export const Interactive: Story = {
  render: () => <FileUploadDemo />,
};
