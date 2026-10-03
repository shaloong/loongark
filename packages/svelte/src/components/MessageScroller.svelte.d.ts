import type { Component, Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { MessageScrollerOptions } from "@loongark/kit";
declare const component: Component<
  MessageScrollerOptions &
    HTMLAttributes<HTMLDivElement> & { children?: Snippet }
>;
export default component;
