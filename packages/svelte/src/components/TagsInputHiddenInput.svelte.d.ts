import { SvelteComponent, type ComponentProps } from "svelte";
import { TagsInput } from "@ark-ui/svelte/tags-input";

export default class LoongArkTagsInputHiddenInput extends SvelteComponent<
  Omit<ComponentProps<typeof TagsInput.HiddenInput>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
