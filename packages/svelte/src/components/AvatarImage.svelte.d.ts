import { SvelteComponent, type ComponentProps } from "svelte";
import { Avatar } from "@ark-ui/svelte/avatar";

export default class LoongArkAvatarImage extends SvelteComponent<
  Omit<ComponentProps<typeof Avatar.Image>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
