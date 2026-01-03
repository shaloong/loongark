import type { Component } from "vue";

declare module "@ark-ui/vue" {
  export const ark: Record<string, Component>;
}
