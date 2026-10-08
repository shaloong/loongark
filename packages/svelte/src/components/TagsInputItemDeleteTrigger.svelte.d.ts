import { SvelteComponent, type ComponentProps } from "svelte";
import { TagsInput } from "@ark-ui/svelte/tags-input";

export default class LoongArkTagsInputItemDeleteTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof TagsInput.ItemDeleteTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
