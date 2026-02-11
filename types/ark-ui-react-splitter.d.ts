declare module "@ark-ui/react/splitter" {
  import React, { type ReactNode } from "react";

  type BaseProps = React.HTMLAttributes<HTMLElement> & {
    children?: ReactNode;
    asChild?: boolean;
  };

  export interface SplitterRootProps extends BaseProps {}
  export interface SplitterPanelProps extends BaseProps {}
  export interface SplitterResizeTriggerProps extends BaseProps {}
  export interface SplitterResizeTriggerIndicatorProps extends BaseProps {}

  export namespace Splitter {
    export const Root: React.FC<SplitterRootProps>;
    export const Panel: React.FC<SplitterPanelProps>;
    export const ResizeTrigger: React.FC<SplitterResizeTriggerProps>;
    export const ResizeTriggerIndicator: React.FC<SplitterResizeTriggerIndicatorProps>;
  }
}
