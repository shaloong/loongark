import { SvelteComponent, type ComponentProps } from "svelte";
import { RatingGroup } from "@ark-ui/svelte/rating-group";
import type { RatingGroupLabelProps } from "@ark-ui/svelte/rating-group";

export default class LoongArkRatingGroupLabel extends SvelteComponent<
  Omit<ComponentProps<typeof RatingGroup.Label>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
