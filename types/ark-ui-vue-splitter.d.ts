declare module "@ark-ui/vue/splitter" {
  type VueComponent<P = any> = (props: P & { children?: any }) => any;

  export interface SplitterRootProps {}
  export interface SplitterPanelProps {}
  export interface SplitterResizeTriggerProps {}
  export interface SplitterResizeTriggerIndicatorProps {}

  export const Splitter: {
    Root: VueComponent<SplitterRootProps>;
    Panel: VueComponent<SplitterPanelProps>;
    ResizeTrigger: VueComponent<SplitterResizeTriggerProps>;
    ResizeTriggerIndicator: VueComponent<SplitterResizeTriggerIndicatorProps>;
  };
}
