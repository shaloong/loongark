import { SvelteComponent, type ComponentProps } from "svelte";
import { TagsInput } from "@ark-ui/svelte/tags-input";

export default class LoongArkTagsInputLabel extends SvelteComponent<
  Omit<ComponentProps<typeof TagsInput.Label>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
