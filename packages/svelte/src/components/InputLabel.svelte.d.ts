import { SvelteComponent, type ComponentProps } from "svelte";
import { Field } from "@ark-ui/svelte/field";

export default class LoongArkInputLabel extends SvelteComponent<
  Omit<ComponentProps<typeof Field.Label>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
