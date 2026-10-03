import { SvelteComponent, type ComponentProps } from "svelte";
import { TagsInput } from "@ark-ui/svelte/tags-input";

export default class LoongArkTagsInputClearTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof TagsInput.ClearTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
