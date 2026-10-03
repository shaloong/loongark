import { SvelteComponent, type ComponentProps } from "svelte";
import { FileUpload } from "@ark-ui/svelte/file-upload";

export default class LoongArkFileUploadItemDeleteTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof FileUpload.ItemDeleteTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
