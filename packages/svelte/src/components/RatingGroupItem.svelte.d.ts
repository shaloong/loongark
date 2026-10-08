import { SvelteComponent, type ComponentProps } from "svelte";
import { RatingGroup } from "@ark-ui/svelte/rating-group";
import type { RatingGroupItemProps } from "@ark-ui/svelte/rating-group";

export default class LoongArkRatingGroupItem extends SvelteComponent<
  Omit<ComponentProps<typeof RatingGroup.Item>, "children" | "index"> & {
    index: RatingGroupItemProps["index"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
