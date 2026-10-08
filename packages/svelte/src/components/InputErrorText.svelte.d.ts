import { SvelteComponent, type ComponentProps } from "svelte";
import { Field } from "@ark-ui/svelte/field";

export default class LoongArkInputErrorText extends SvelteComponent<
  Omit<ComponentProps<typeof Field.ErrorText>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
