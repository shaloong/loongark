import type { Component } from "vue";

declare module "@ark-ui/vue/dialog" {
  export const Dialog: {
    Root: Component;
    Trigger: Component;
    Backdrop: Component;
    Positioner: Component;
    Content: Component;
    Title: Component;
    Description: Component;
    CloseTrigger: Component;
  };
}
