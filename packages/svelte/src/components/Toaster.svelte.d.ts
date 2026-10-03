import { SvelteComponent, type ComponentProps } from "svelte";
import type { ToasterProps } from "@ark-ui/svelte/toast";
import { Toaster } from "@ark-ui/svelte/toast";

export default class LoongArkToaster extends SvelteComponent<
  Omit<ComponentProps<typeof Toaster>, "children" | "toaster" | "children"> & {
    toaster: ToasterProps["toaster"];
    children: ToasterProps["children"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
