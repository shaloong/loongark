declare module "@ark-ui/vue/toast" {
  import type { DefineComponent } from "vue";

  export const Toaster: DefineComponent<any>;
  export const createToaster: (props?: any) => any;

  export const Toast: {
    Root: DefineComponent<any>;
    Title: DefineComponent<any>;
    Description: DefineComponent<any>;
    ActionTrigger: DefineComponent<any>;
    CloseTrigger: DefineComponent<any>;
  };
}
