import { SvelteComponent, type ComponentProps } from "svelte";
import { TagsInput } from "@ark-ui/svelte/tags-input";
import type { TagsInputSize, TagsInputState } from "@loongark/primitives";

export default class LoongArkTagsInputInput extends SvelteComponent<
  Omit<
    ComponentProps<typeof TagsInput.Input>,
    "children" | "size" | "state" | "disabled" | "readOnly"
  > & {
    size?: TagsInputSize;
    state?: TagsInputState;
    disabled?: boolean;
    readOnly?: boolean;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
