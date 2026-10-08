import { SvelteComponent, type ComponentProps } from "svelte";
import { TagsInput } from "@ark-ui/svelte/tags-input";
import type { TagsInputRootProps } from "@ark-ui/svelte/tags-input";
import type { TagsInputSize, TagsInputState } from "@loongark/primitives";

export default class LoongArkTagsInputRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof TagsInput.Root>,
    | "children"
    | "size"
    | "state"
    | "value"
    | "defaultValue"
    | "inputValue"
    | "defaultInputValue"
    | "disabled"
    | "readOnly"
    | "required"
    | "invalid"
    | "name"
    | "form"
    | "id"
    | "ids"
    | "onValueChange"
    | "onInputValueChange"
    | "onValueInvalid"
  > & {
    size?: TagsInputSize;
    state?: TagsInputState;
    value?: TagsInputRootProps["value"];
    defaultValue?: TagsInputRootProps["defaultValue"];
    inputValue?: TagsInputRootProps["inputValue"];
    defaultInputValue?: TagsInputRootProps["defaultInputValue"];
    disabled?: TagsInputRootProps["disabled"];
    readOnly?: TagsInputRootProps["readOnly"];
    required?: TagsInputRootProps["required"];
    invalid?: TagsInputRootProps["invalid"];
    name?: TagsInputRootProps["name"];
    form?: TagsInputRootProps["form"];
    id?: TagsInputRootProps["id"];
    ids?: TagsInputRootProps["ids"];
    onValueChange?: TagsInputRootProps["onValueChange"];
    onInputValueChange?: TagsInputRootProps["onInputValueChange"];
    onValueInvalid?: TagsInputRootProps["onValueInvalid"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
