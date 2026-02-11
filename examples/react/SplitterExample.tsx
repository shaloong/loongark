import React from "react";
import {
  LoongArkSplitterRoot,
  LoongArkSplitterPanel,
  LoongArkSplitterResizeTrigger,
  LoongArkSplitterResizeTriggerIndicator,
} from "@loongark/react";
import type { SplitterSize } from "@loongark/primitives";

interface SplitterExampleProps {
  size?: SplitterSize;
  orientation?: "horizontal" | "vertical";
}

export const SplitterExample: React.FC<SplitterExampleProps> = ({
  size = "md",
  orientation = "horizontal",
}) => {
  const height = orientation === "vertical" ? 240 : 160;

  return (
    <LoongArkSplitterRoot
      size={size}
      orientation={orientation}
      style={{ height }}
    >
      <LoongArkSplitterPanel minSize={20}>
        <div style={{ padding: 12 }}>Notes</div>
      </LoongArkSplitterPanel>
      <LoongArkSplitterResizeTrigger>
        <LoongArkSplitterResizeTriggerIndicator />
      </LoongArkSplitterResizeTrigger>
      <LoongArkSplitterPanel minSize={20}>
        <div style={{ padding: 12 }}>Preview</div>
      </LoongArkSplitterPanel>
    </LoongArkSplitterRoot>
  );
};
