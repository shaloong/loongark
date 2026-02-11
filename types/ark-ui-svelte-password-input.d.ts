declare module "@ark-ui/svelte/password-input" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface PasswordInputRootProps {
    value?: string;
    defaultValue?: string;
    visible?: boolean;
    defaultVisible?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;
    name?: string;
    form?: string;
    id?: string;
    ids?: any;
    onVisibilityChange?: (details: { visible: boolean }) => void;
    asChild?: boolean;
  }

  export interface PasswordInputLabelProps {
    asChild?: boolean;
  }

  export interface PasswordInputControlProps {
    asChild?: boolean;
  }

  export interface PasswordInputInputProps {
    asChild?: boolean;
  }

  export interface PasswordInputIndicatorProps {
    asChild?: boolean;
  }

  export interface PasswordInputVisibilityTriggerProps {
    asChild?: boolean;
  }

  export const PasswordInput: {
    Root: SvelteComponent<PasswordInputRootProps>;
    Label: SvelteComponent<PasswordInputLabelProps>;
    Control: SvelteComponent<PasswordInputControlProps>;
    Input: SvelteComponent<PasswordInputInputProps>;
    Indicator: SvelteComponent<PasswordInputIndicatorProps>;
    VisibilityTrigger: SvelteComponent<PasswordInputVisibilityTriggerProps>;
  };
}
