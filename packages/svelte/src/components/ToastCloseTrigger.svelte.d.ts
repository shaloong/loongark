import { SvelteComponent, type ComponentProps } from "svelte";
import { Toast } from "@ark-ui/svelte/toast";

export default class LoongArkToastCloseTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Toast.CloseTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
