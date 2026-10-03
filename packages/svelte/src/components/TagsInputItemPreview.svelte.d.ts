import { SvelteComponent, type ComponentProps } from "svelte";
import { TagsInput } from "@ark-ui/svelte/tags-input";

export default class LoongArkTagsInputItemPreview extends SvelteComponent<
  Omit<ComponentProps<typeof TagsInput.ItemPreview>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
