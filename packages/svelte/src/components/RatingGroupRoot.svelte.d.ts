import type { Component } from "svelte";
import type { RatingGroupRootProps } from "@ark-ui/svelte/rating-group";
import type { RatingGroupSize } from "@loongark/primitives";
declare const RatingGroupRoot: Component<RatingGroupRootProps & {size?:RatingGroupSize}, {}, "ref" | "value">;
export default RatingGroupRoot;
