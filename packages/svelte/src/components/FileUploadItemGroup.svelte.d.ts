import { SvelteComponent, type ComponentProps } from "svelte";
import { FileUpload } from "@ark-ui/svelte/file-upload";

export default class LoongArkFileUploadItemGroup extends SvelteComponent<
  Omit<ComponentProps<typeof FileUpload.ItemGroup>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
