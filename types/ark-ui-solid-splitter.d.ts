declare module "@ark-ui/solid/splitter" {
  import type { Component, JSX } from "solid-js";

  type BaseProps = {
    children?: JSX.Element;
    asChild?: boolean;
    [key: string]: any;
  };

  export interface SplitterRootProps extends BaseProps {}
  export interface SplitterPanelProps extends BaseProps {}
  export interface SplitterResizeTriggerProps extends BaseProps {}
  export interface SplitterResizeTriggerIndicatorProps extends BaseProps {}

  export namespace Splitter {
    export const Root: Component<SplitterRootProps>;
    export const Panel: Component<SplitterPanelProps>;
    export const ResizeTrigger: Component<SplitterResizeTriggerProps>;
    export const ResizeTriggerIndicator: Component<SplitterResizeTriggerIndicatorProps>;
  }
}
