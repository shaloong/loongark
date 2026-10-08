import { SvelteComponent, type ComponentProps } from "svelte";
import { FileUpload } from "@ark-ui/svelte/file-upload";

export default class LoongArkFileUploadLabel extends SvelteComponent<
  Omit<ComponentProps<typeof FileUpload.Label>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
