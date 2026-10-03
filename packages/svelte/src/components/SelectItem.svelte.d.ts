import { SvelteComponent, type ComponentProps } from "svelte";
import { Select } from "@ark-ui/svelte/select";

export default class LoongArkSelectItem extends SvelteComponent<
  Omit<ComponentProps<typeof Select.Item>, "children" | "item"> & {
    item: object;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
