import { SvelteComponent, type ComponentProps } from "svelte";
import { FileUpload } from "@ark-ui/svelte/file-upload";

export default class LoongArkFileUploadItemSizeText extends SvelteComponent<
  Omit<ComponentProps<typeof FileUpload.ItemSizeText>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
