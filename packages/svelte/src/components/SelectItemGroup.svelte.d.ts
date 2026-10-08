import { SvelteComponent, type ComponentProps } from "svelte";
import { Select } from "@ark-ui/svelte/select";

export default class LoongArkSelectItemGroup extends SvelteComponent<
  Omit<ComponentProps<typeof Select.ItemGroup>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
