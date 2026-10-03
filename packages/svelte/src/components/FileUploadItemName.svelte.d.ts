import { SvelteComponent, type ComponentProps } from "svelte";
import { FileUpload } from "@ark-ui/svelte/file-upload";

export default class LoongArkFileUploadItemName extends SvelteComponent<
  Omit<ComponentProps<typeof FileUpload.ItemName>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
