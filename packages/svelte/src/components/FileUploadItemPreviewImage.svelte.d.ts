import { SvelteComponent, type ComponentProps } from "svelte";
import { FileUpload } from "@ark-ui/svelte/file-upload";

export default class LoongArkFileUploadItemPreviewImage extends SvelteComponent<
  Omit<ComponentProps<typeof FileUpload.ItemPreviewImage>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
