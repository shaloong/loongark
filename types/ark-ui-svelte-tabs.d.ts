declare module "@ark-ui/svelte/tabs" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface TabsRootProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (details: { value: string }) => void;
    onFocusChange?: (details: { value: string }) => void;
    activationMode?: "automatic" | "manual";
    orientation?: "horizontal" | "vertical";
    loopFocus?: boolean;
    composite?: boolean;
    id?: string;
    lazyMount?: boolean;
    unmountOnExit?: boolean;
    present?: boolean;
    skipAnimationOnMount?: boolean;
    asChild?: boolean;
  }

  export interface TabsListProps {
    id?: string;
    asChild?: boolean;
  }

  export interface TabsTriggerProps {
    value: string;
    disabled?: boolean;
    id?: string;
    asChild?: boolean;
  }

  export interface TabsContentProps {
    value: string;
    id?: string;
    asChild?: boolean;
  }

  export interface TabsIndicatorProps {
    id?: string;
    asChild?: boolean;
  }

  export const Tabs: {
    Root: SvelteComponent<TabsRootProps>;
    List: SvelteComponent<TabsListProps>;
    Trigger: SvelteComponent<TabsTriggerProps>;
    Content: SvelteComponent<TabsContentProps>;
    Indicator: SvelteComponent<TabsIndicatorProps>;
  };
}
