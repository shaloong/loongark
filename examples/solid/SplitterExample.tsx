/** @jsxImportSource solid-js */
import type { Component } from "solid-js";
import {
  LoongArkSplitterRoot,
  LoongArkSplitterPanel,
  LoongArkSplitterResizeTrigger,
  LoongArkSplitterResizeTriggerIndicator,
} from "@loongark/solid";
import type { SplitterSize } from "@loongark/primitives";

interface SplitterExampleProps {
  size?: SplitterSize;
  orientation?: "horizontal" | "vertical";
}

export const SplitterExample: Component<SplitterExampleProps> = (props) => {
  const size = () => props.size ?? "md";
  const orientation = () => props.orientation ?? "horizontal";
  const height = () => (orientation() == "vertical" ? "240px" : "160px");

  return (
    <LoongArkSplitterRoot
      panels={[
        { id: "notes", minSize: 20 },
        { id: "preview", minSize: 20 },
      ]}
      defaultSize={[50, 50]}
      size={size()}
      orientation={orientation()}
      style={{ height: height() }}
    >
      <LoongArkSplitterPanel id="notes">
        <div style={{ padding: "12px" }}>Notes</div>
      </LoongArkSplitterPanel>
      <LoongArkSplitterResizeTrigger id="notes:preview">
        <LoongArkSplitterResizeTriggerIndicator />
      </LoongArkSplitterResizeTrigger>
      <LoongArkSplitterPanel id="preview">
        <div style={{ padding: "12px" }}>Preview</div>
      </LoongArkSplitterPanel>
    </LoongArkSplitterRoot>
  );
};
