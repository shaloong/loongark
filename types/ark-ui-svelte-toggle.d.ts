declare module "@ark-ui/svelte/toggle" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface ToggleRootProps {
    pressed?: boolean;
    defaultPressed?: boolean;
    disabled?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    asChild?: boolean;
  }

  export interface ToggleIndicatorProps {
    fallback?: unknown;
    asChild?: boolean;
  }

  export const Toggle: {
    Root: SvelteComponent<ToggleRootProps>;
    Indicator: SvelteComponent<ToggleIndicatorProps>;
  };
}
