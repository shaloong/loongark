import { SvelteComponent, type ComponentProps } from "svelte";
import { FileUpload } from "@ark-ui/svelte/file-upload";

export default class LoongArkFileUploadItemPreview extends SvelteComponent<
  Omit<ComponentProps<typeof FileUpload.ItemPreview>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
