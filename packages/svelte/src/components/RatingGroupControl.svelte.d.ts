import { SvelteComponent, type ComponentProps } from "svelte";
import { RatingGroup } from "@ark-ui/svelte/rating-group";
import type { RatingGroupControlProps } from "@ark-ui/svelte/rating-group";

export default class LoongArkRatingGroupControl extends SvelteComponent<
  Omit<ComponentProps<typeof RatingGroup.Control>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
