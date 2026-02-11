import React from "react";
import {
  LoongArkHoverCardRoot,
  LoongArkHoverCardTrigger,
  LoongArkHoverCardPositioner,
  LoongArkHoverCardContent,
  LoongArkHoverCardArrow,
  LoongArkHoverCardArrowTip,
} from "@loongark/react";
import type { HoverCardSize } from "@loongark/primitives";

interface HoverCardExampleProps {
  size?: HoverCardSize;
}

export const HoverCardExample: React.FC<HoverCardExampleProps> = ({
  size = "md",
}) => {
  return (
    <LoongArkHoverCardRoot size={size} openDelay={200}>
      <LoongArkHoverCardTrigger>Hover details</LoongArkHoverCardTrigger>
      <LoongArkHoverCardPositioner>
        <LoongArkHoverCardContent>
          <div style={{ display: "grid", gap: 6 }}>
            <strong>@loongark</strong>
            <span style={{ opacity: 0.7 }}>Design-ready UI primitives.</span>
          </div>
          <LoongArkHoverCardArrow>
            <LoongArkHoverCardArrowTip />
          </LoongArkHoverCardArrow>
        </LoongArkHoverCardContent>
      </LoongArkHoverCardPositioner>
    </LoongArkHoverCardRoot>
  );
};
