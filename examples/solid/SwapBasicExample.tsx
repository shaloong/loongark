/** @jsxImportSource solid-js */
import { createSignal, createMemo } from "solid-js";
import {
  LoongArkButton,
  LoongArkSwapRoot,
  LoongArkSwapIndicator,
} from "@loongark/solid";
export function SwapBasicExample() {
  const [expanded, setExpanded] = createSignal(false);
  return (
    <LoongArkButton
      aria-expanded={expanded()}
      onClick={() => setExpanded(!expanded())}
    >
      <LoongArkSwapRoot swap={expanded()}>
        <LoongArkSwapIndicator type="off">展开</LoongArkSwapIndicator>
        <LoongArkSwapIndicator type="on">收起</LoongArkSwapIndicator>
      </LoongArkSwapRoot>
    </LoongArkButton>
  );
}
