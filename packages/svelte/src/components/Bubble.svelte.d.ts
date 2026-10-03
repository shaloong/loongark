import type { Component, Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { BubbleOptions } from "@loongark/kit";
declare const component: Component<
  BubbleOptions & HTMLAttributes<HTMLDivElement> & { children?: Snippet }
>;
export default component;
