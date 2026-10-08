import { SvelteComponent, type ComponentProps } from "svelte";
import { FileUpload } from "@ark-ui/svelte/file-upload";

export default class LoongArkFileUploadTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof FileUpload.Trigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
