/** @jsxImportSource solid-js */
import * as L from "@loongark/solid";
export function DateInputBasicExample() {
  return (
    <L.LoongArkDateInputRoot
      name="appointment"
      locale="zh-CN"
      defaultValue={[L.parseDate("2026-10-09")]}
    >
      <L.LoongArkDateInputLabel>预约日期</L.LoongArkDateInputLabel>
      <L.LoongArkDateInputControl>
        <L.LoongArkDateInputSegmentGroup>
          <L.LoongArkDateInputSegmentContext>
            {(segment) => (
              <L.LoongArkDateInputSegment segment={segment}>
                {segment.text}
              </L.LoongArkDateInputSegment>
            )}
          </L.LoongArkDateInputSegmentContext>
        </L.LoongArkDateInputSegmentGroup>
      </L.LoongArkDateInputControl>
      <L.LoongArkDateInputHiddenInput />
    </L.LoongArkDateInputRoot>
  );
}
