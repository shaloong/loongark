import React, { useState } from "react";
import {
  LoongArkButton,
  LoongArkSwapRoot,
  LoongArkSwapIndicator,
} from "@loongark/react";
export function SwapBasicExample() {
  const [expanded, setExpanded] = useState(false);
  return (
    <LoongArkButton
      aria-expanded={expanded}
      onClick={() => setExpanded(!expanded)}
    >
      <LoongArkSwapRoot swap={expanded}>
        <LoongArkSwapIndicator type="off">展开</LoongArkSwapIndicator>
        <LoongArkSwapIndicator type="on">收起</LoongArkSwapIndicator>
      </LoongArkSwapRoot>
    </LoongArkButton>
  );
}
