import React from "react";
import {
  LoongArkSplitterRoot,
  LoongArkSplitterPanel,
  LoongArkSplitterResizeTrigger,
  LoongArkSplitterResizeTriggerIndicator,
} from "@loongark/react";
export function SplitterBasicExample() {
  return (
    <LoongArkSplitterRoot
      panels={[
        { id: "left", minSize: 20 },
        { id: "right", minSize: 20 },
      ]}
      defaultSize={[50, 50]}
    >
      <LoongArkSplitterPanel id="left">内容</LoongArkSplitterPanel>
      <LoongArkSplitterResizeTrigger id="left:right">
        <LoongArkSplitterResizeTriggerIndicator />
      </LoongArkSplitterResizeTrigger>
      <LoongArkSplitterPanel id="right">预览</LoongArkSplitterPanel>
    </LoongArkSplitterRoot>
  );
}
