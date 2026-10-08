import { SvelteComponent, type ComponentProps } from "svelte";
import { FileUpload } from "@ark-ui/svelte/file-upload";

export default class LoongArkFileUploadClearTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof FileUpload.ClearTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
