import { SvelteComponent, type ComponentProps } from "svelte";
import { TagsInput } from "@ark-ui/svelte/tags-input";
import type { TagsInputItemProps } from "@ark-ui/svelte/tags-input";

export default class LoongArkTagsInputItem extends SvelteComponent<
  Omit<
    ComponentProps<typeof TagsInput.Item>,
    "children" | "value" | "index" | "disabled"
  > & {
    value: TagsInputItemProps["value"];
    index: TagsInputItemProps["index"];
    disabled?: TagsInputItemProps["disabled"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
