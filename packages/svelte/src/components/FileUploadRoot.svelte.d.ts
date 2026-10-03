import { SvelteComponent, type ComponentProps } from "svelte";
import { FileUpload } from "@ark-ui/svelte/file-upload";
import type { FileUploadRootProps } from "@ark-ui/svelte/file-upload";
import type { FileUploadSize } from "@loongark/primitives";

export default class LoongArkFileUploadRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof FileUpload.Root>,
    | "children"
    | "size"
    | "accept"
    | "acceptedFiles"
    | "defaultAcceptedFiles"
    | "allowDrop"
    | "directory"
    | "disabled"
    | "maxFiles"
    | "maxFileSize"
    | "minFileSize"
    | "name"
    | "id"
    | "ids"
    | "required"
    | "onFileAccept"
    | "onFileChange"
    | "onFileReject"
  > & {
    size?: FileUploadSize;
    accept?: FileUploadRootProps["accept"];
    acceptedFiles?: FileUploadRootProps["acceptedFiles"];
    defaultAcceptedFiles?: FileUploadRootProps["defaultAcceptedFiles"];
    allowDrop?: FileUploadRootProps["allowDrop"];
    directory?: FileUploadRootProps["directory"];
    disabled?: FileUploadRootProps["disabled"];
    maxFiles?: FileUploadRootProps["maxFiles"];
    maxFileSize?: FileUploadRootProps["maxFileSize"];
    minFileSize?: FileUploadRootProps["minFileSize"];
    name?: FileUploadRootProps["name"];
    id?: FileUploadRootProps["id"];
    ids?: FileUploadRootProps["ids"];
    required?: FileUploadRootProps["required"];
    onFileAccept?: FileUploadRootProps["onFileAccept"];
    onFileChange?: FileUploadRootProps["onFileChange"];
    onFileReject?: FileUploadRootProps["onFileReject"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
