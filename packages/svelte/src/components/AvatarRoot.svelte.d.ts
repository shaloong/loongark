import { SvelteComponent, type ComponentProps } from "svelte";
import { Avatar } from "@ark-ui/svelte/avatar";
import type { AvatarSize } from "@loongark/primitives";

export default class LoongArkAvatarRoot extends SvelteComponent<
  Omit<ComponentProps<typeof Avatar.Root>, "children" | "size"> & {
    size?: AvatarSize;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
