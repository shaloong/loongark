import type { Component } from "vue";

declare module "@ark-ui/vue" {
  export const ark: Record<string, Component>;
  export function createListCollection<T = any>(options: { items: T[] }): any;
}
