import React from "react";
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
import type { FileUploadSize } from "@loongark/primitives";

interface FileUploadExampleProps {
  size?: FileUploadSize;
  disabled?: boolean;
}

export const FileUploadExample: React.FC<FileUploadExampleProps> = ({
  size = "md",
  disabled = false,
}) => {
  return (
    <LoongArkFileUploadRoot
      size={size}
      disabled={disabled}
      accept={{ "image/*": [] }}
      maxFiles={3}
    >
      <LoongArkFileUploadLabel>Upload files</LoongArkFileUploadLabel>
      <LoongArkFileUploadDropzone>
        <p style={{ margin: 0 }}>Drag files here</p>
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
