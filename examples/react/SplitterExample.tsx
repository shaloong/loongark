import React from "react";

import {
  LoongArkSplitterRoot,
  LoongArkSplitterPanel,
  LoongArkSplitterResizeTrigger,
  LoongArkSplitterResizeTriggerIndicator,
} from "@loongark/react";

interface SplitterDemoProps {
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
  locked?: boolean;
}

const SplitterDemo = ({
  size = "md",
  orientation = "horizontal",
  locked = false,
}: SplitterDemoProps) => {
  const height = orientation === "vertical" ? 240 : 160;

  return (
    <LoongArkSplitterRoot
      panels={[
        { id: "notes", minSize: 20 },
        { id: "preview", minSize: 20 },
      ]}
      defaultSize={[50, 50]}
      size={size}
      orientation={orientation}
      style={{ height }}
    >
      <LoongArkSplitterPanel id="notes">
        <div style={{ padding: 12 }}>Notes</div>
      </LoongArkSplitterPanel>
      <LoongArkSplitterResizeTrigger id="notes:preview" disabled={locked}>
        <LoongArkSplitterResizeTriggerIndicator />
      </LoongArkSplitterResizeTrigger>
      <LoongArkSplitterPanel id="preview">
        <div style={{ padding: 12 }}>Preview</div>
      </LoongArkSplitterPanel>
    </LoongArkSplitterRoot>
  );
};
export const SplitterExample = SplitterDemo;
export type SplitterExampleProps = Parameters<typeof SplitterDemo>[0];
