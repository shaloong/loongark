declare module "@ark-ui/svelte/clipboard" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface ClipboardRootProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ClipboardLabelProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ClipboardControlProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ClipboardInputProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ClipboardTriggerProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ClipboardIndicatorProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface ClipboardValueTextProps {
    asChild?: boolean;
    [key: string]: any;
  }

  export const Clipboard: {
    Root: SvelteComponent<ClipboardRootProps>;
    Label: SvelteComponent<ClipboardLabelProps>;
    Control: SvelteComponent<ClipboardControlProps>;
    Input: SvelteComponent<ClipboardInputProps>;
    Trigger: SvelteComponent<ClipboardTriggerProps>;
    Indicator: SvelteComponent<ClipboardIndicatorProps>;
    ValueText: SvelteComponent<ClipboardValueTextProps>;
  };
}
