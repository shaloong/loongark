import { SvelteComponent, type ComponentProps } from "svelte";
import { Toast } from "@ark-ui/svelte/toast";

export default class LoongArkToastActionTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Toast.ActionTrigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
