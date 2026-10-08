import { SvelteComponent, type ComponentProps } from "svelte";
import { TagsInput } from "@ark-ui/svelte/tags-input";

export default class LoongArkTagsInputItemText extends SvelteComponent<
  Omit<ComponentProps<typeof TagsInput.ItemText>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
