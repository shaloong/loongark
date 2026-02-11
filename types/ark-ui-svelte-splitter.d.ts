declare module "@ark-ui/svelte/splitter" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface SplitterRootProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface SplitterPanelProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface SplitterResizeTriggerProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface SplitterResizeTriggerIndicatorProps {
    asChild?: boolean;
    [key: string]: any;
  }

  export const Splitter: {
    Root: SvelteComponent<SplitterRootProps>;
    Panel: SvelteComponent<SplitterPanelProps>;
    ResizeTrigger: SvelteComponent<SplitterResizeTriggerProps>;
    ResizeTriggerIndicator: SvelteComponent<SplitterResizeTriggerIndicatorProps>;
  };
}
