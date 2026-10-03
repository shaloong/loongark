import { SvelteComponent, type ComponentProps } from "svelte";
import { Avatar } from "@ark-ui/svelte/avatar";

export default class LoongArkAvatarFallback extends SvelteComponent<
  Omit<ComponentProps<typeof Avatar.Fallback>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
