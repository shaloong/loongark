import { SvelteComponent, type ComponentProps } from "svelte";
import { RatingGroup } from "@ark-ui/svelte/rating-group";
import type { RatingGroupRootProps } from "@ark-ui/svelte/rating-group";
import type { RatingGroupSize } from "@loongark/primitives";

export default class LoongArkRatingGroupRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof RatingGroup.Root>,
    "children" | "size" | "disabled"
  > & { size?: RatingGroupSize; disabled?: RatingGroupRootProps["disabled"] },
  Record<string, never>,
  { default: Record<string, never> }
> {}
