import { SvelteComponent, type ComponentProps } from "svelte";
import { FileUpload } from "@ark-ui/svelte/file-upload";

export default class LoongArkFileUploadHiddenInput extends SvelteComponent<
  Omit<ComponentProps<typeof FileUpload.HiddenInput>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
