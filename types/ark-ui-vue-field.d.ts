import type { Component } from "vue";

declare module "@ark-ui/vue/field" {
  export const Field: {
    Root: Component;
    Label: Component;
    Input: Component;
    HelperText: Component;
    ErrorText: Component;
    Textarea: Component;
  };
}
