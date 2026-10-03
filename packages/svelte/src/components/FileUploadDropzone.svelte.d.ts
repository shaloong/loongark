import { SvelteComponent, type ComponentProps } from "svelte";
import { FileUpload } from "@ark-ui/svelte/file-upload";

export default class LoongArkFileUploadDropzone extends SvelteComponent<
  Omit<ComponentProps<typeof FileUpload.Dropzone>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
