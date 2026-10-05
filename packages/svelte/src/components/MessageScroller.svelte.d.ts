import type { Component, Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type {
  MessageScrollerOptions,
  VirtualRenderDetails,
} from "@loongark/kit";
declare const component: Component<
  MessageScrollerOptions &
    HTMLAttributes<HTMLDivElement> & {
      children?: Snippet;
      item?: Snippet<[VirtualRenderDetails]>;
    }
>;
export default component;
