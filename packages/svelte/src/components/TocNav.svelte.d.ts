import type { Component } from "svelte";
import type { TocNavProps, UseTocProps } from "@ark-ui/svelte/toc";
declare const TocNav: Component<
  Omit<TocNavProps, keyof UseTocProps> & { id?: string },
  {},
  "ref"
>;
export default TocNav;
