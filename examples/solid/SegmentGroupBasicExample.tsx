/** @jsxImportSource solid-js */

import {
  LoongArkSegmentGroupRoot,
  LoongArkSegmentGroupItem,
  LoongArkSegmentGroupItemHiddenInput,
  LoongArkSegmentGroupItemText,
} from "@loongark/solid";
export function SegmentGroupBasicExample() {
  return (
    <LoongArkSegmentGroupRoot
      aria-label="视图"
      name="view"
      defaultValue="overview"
    >
      <LoongArkSegmentGroupItem value="overview">
        <LoongArkSegmentGroupItemHiddenInput />
        <LoongArkSegmentGroupItemText>概览</LoongArkSegmentGroupItemText>
      </LoongArkSegmentGroupItem>
      <LoongArkSegmentGroupItem value="activity">
        <LoongArkSegmentGroupItemHiddenInput />
        <LoongArkSegmentGroupItemText>动态</LoongArkSegmentGroupItemText>
      </LoongArkSegmentGroupItem>
    </LoongArkSegmentGroupRoot>
  );
}
