import { SvelteComponent, type ComponentProps } from "svelte";
import { FileUpload } from "@ark-ui/svelte/file-upload";
import type { FileUploadItemProps } from "@ark-ui/svelte/file-upload";

export default class LoongArkFileUploadItem extends SvelteComponent<
  Omit<ComponentProps<typeof FileUpload.Item>, "children" | "file"> & {
    file: FileUploadItemProps["file"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
