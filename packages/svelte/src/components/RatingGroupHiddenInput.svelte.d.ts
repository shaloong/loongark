import { SvelteComponent, type ComponentProps } from "svelte";
import { RatingGroup } from "@ark-ui/svelte/rating-group";
import type { RatingGroupHiddenInputProps } from "@ark-ui/svelte/rating-group";

export default class LoongArkRatingGroupHiddenInput extends SvelteComponent<
  Omit<ComponentProps<typeof RatingGroup.HiddenInput>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
