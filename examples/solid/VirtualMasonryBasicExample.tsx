/** @jsxImportSource solid-js */

import { LoongArkVirtualMasonry } from "@loongark/solid";
export function VirtualMasonryBasicExample() {
  return (
    <LoongArkVirtualMasonry
      label="虚拟瀑布流"
      keys={["a", "b", "c", "d"]}
      maxColumns={2}
      height={240}
      estimateSize={120}
      renderItem={({ key }) => key}
    />
  );
}
