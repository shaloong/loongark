import { SvelteComponent, type ComponentProps } from "svelte";
import { TagsInput } from "@ark-ui/svelte/tags-input";
import type { TagsInputSize, TagsInputState } from "@loongark/primitives";

export default class LoongArkTagsInputControl extends SvelteComponent<
  Omit<
    ComponentProps<typeof TagsInput.Control>,
    "children" | "size" | "state" | "disabled"
  > & { size?: TagsInputSize; state?: TagsInputState; disabled?: boolean },
  Record<string, never>,
  { default: Record<string, never> }
> {}
