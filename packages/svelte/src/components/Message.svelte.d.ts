import type { Component, Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { MessageOptions } from "@loongark/kit";
declare const component: Component<
  MessageOptions & HTMLAttributes<HTMLDivElement> & { children?: Snippet }
>;
export default component;
