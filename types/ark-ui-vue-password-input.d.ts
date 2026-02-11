declare module "@ark-ui/vue/password-input" {
  import type { DefineComponent } from "vue";

  export const PasswordInputRoot: DefineComponent<any>;
  export const PasswordInputLabel: DefineComponent<any>;
  export const PasswordInputControl: DefineComponent<any>;
  export const PasswordInputInput: DefineComponent<any>;
  export const PasswordInputIndicator: DefineComponent<any>;
  export const PasswordInputVisibilityTrigger: DefineComponent<any>;
  export const PasswordInput: {
    Root: typeof PasswordInputRoot;
    Label: typeof PasswordInputLabel;
    Control: typeof PasswordInputControl;
    Input: typeof PasswordInputInput;
    Indicator: typeof PasswordInputIndicator;
    VisibilityTrigger: typeof PasswordInputVisibilityTrigger;
  };
}
