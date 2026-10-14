import type { Component, Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { AttachmentOptions } from "@shaloong/loongark-kit";
declare const component: Component<
  AttachmentOptions & HTMLAttributes<HTMLDivElement> & { children?: Snippet }
>;
export default component;
