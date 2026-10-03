import { SvelteComponent, type ComponentProps } from "svelte";
import { Listbox } from "@ark-ui/svelte/listbox";

export default class LoongArkListboxItem extends SvelteComponent<
  Omit<ComponentProps<typeof Listbox.Item>, "children" | "item"> & {
    item: object;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
