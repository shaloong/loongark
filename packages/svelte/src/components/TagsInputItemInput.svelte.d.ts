import { SvelteComponent, type ComponentProps } from "svelte";
import { TagsInput } from "@ark-ui/svelte/tags-input";

export default class LoongArkTagsInputItemInput extends SvelteComponent<
  Omit<ComponentProps<typeof TagsInput.ItemInput>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
