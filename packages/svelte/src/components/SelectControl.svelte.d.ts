import { SvelteComponent, type ComponentProps } from "svelte";
import { Select } from "@ark-ui/svelte/select";

export default class LoongArkSelectControl extends SvelteComponent<
  Omit<ComponentProps<typeof Select.Control>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
