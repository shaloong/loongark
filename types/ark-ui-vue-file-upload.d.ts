declare module "@ark-ui/vue/file-upload" {
  import type { DefineComponent } from "vue";

  export const FileUploadRoot: DefineComponent<any>;
  export const FileUploadLabel: DefineComponent<any>;
  export const FileUploadDropzone: DefineComponent<any>;
  export const FileUploadTrigger: DefineComponent<any>;
  export const FileUploadHiddenInput: DefineComponent<any>;
  export const FileUploadItemGroup: DefineComponent<any>;
  export const FileUploadItem: DefineComponent<any>;
  export const FileUploadItemPreview: DefineComponent<any>;
  export const FileUploadItemPreviewImage: DefineComponent<any>;
  export const FileUploadItemName: DefineComponent<any>;
  export const FileUploadItemSizeText: DefineComponent<any>;
  export const FileUploadItemDeleteTrigger: DefineComponent<any>;
  export const FileUploadClearTrigger: DefineComponent<any>;
  export const FileUploadContext: DefineComponent<any>;
  export const FileUpload: {
    Root: typeof FileUploadRoot;
    Label: typeof FileUploadLabel;
    Dropzone: typeof FileUploadDropzone;
    Trigger: typeof FileUploadTrigger;
    HiddenInput: typeof FileUploadHiddenInput;
    ItemGroup: typeof FileUploadItemGroup;
    Item: typeof FileUploadItem;
    ItemPreview: typeof FileUploadItemPreview;
    ItemPreviewImage: typeof FileUploadItemPreviewImage;
    ItemName: typeof FileUploadItemName;
    ItemSizeText: typeof FileUploadItemSizeText;
    ItemDeleteTrigger: typeof FileUploadItemDeleteTrigger;
    ClearTrigger: typeof FileUploadClearTrigger;
    Context: typeof FileUploadContext;
  };
}
