/** @jsxImportSource solid-js */
import type { Component } from "solid-js";
import { createSignal } from "solid-js";
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
} from "@loongark/solid";
import type { FileUploadSize } from "@loongark/primitives";

export interface FileUploadExampleProps {
  size?: FileUploadSize;
  disabled?: boolean;
}

export const FileUploadExample: Component<FileUploadExampleProps> = (props) => {
  const size = () => props.size ?? "md";
  const disabled = () => props.disabled ?? false;
  const [files, setFiles] = createSignal<File[]>([]);

  const handleFileChange = (details: any) => {
    setFiles(details?.acceptedFiles ?? []);
  };

  return (
    <LoongArkFileUploadRoot
      size={size()}
      disabled={disabled()}
      accept={{ "image/*": [] }}
      maxFiles={3}
      onFileChange={handleFileChange}
    >
      <LoongArkFileUploadLabel>Upload files</LoongArkFileUploadLabel>
      <LoongArkFileUploadDropzone>
        <p style={{ margin: 0 }}>Drag files here</p>
      </LoongArkFileUploadDropzone>
      <LoongArkFileUploadTrigger>Browse</LoongArkFileUploadTrigger>
      <LoongArkFileUploadHiddenInput />
      <LoongArkFileUploadItemGroup>
        {files().map((file) => (
          <LoongArkFileUploadItem file={file}>
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
      {files().length > 0 && (
        <LoongArkFileUploadClearTrigger>
          Clear all
        </LoongArkFileUploadClearTrigger>
      )}
    </LoongArkFileUploadRoot>
  );
};
