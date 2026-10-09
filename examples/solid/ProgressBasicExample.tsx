/** @jsxImportSource solid-js */

import {
  LoongArkProgressRoot,
  LoongArkProgressLabel,
  LoongArkProgressTrack,
  LoongArkProgressRange,
  LoongArkProgressValueText,
} from "@loongark/solid";
export function ProgressBasicExample() {
  return (
    <LoongArkProgressRoot value={60}>
      <LoongArkProgressLabel>上传进度</LoongArkProgressLabel>
      <LoongArkProgressTrack>
        <LoongArkProgressRange />
      </LoongArkProgressTrack>
      <LoongArkProgressValueText />
    </LoongArkProgressRoot>
  );
}
