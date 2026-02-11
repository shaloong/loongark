import type { Component } from "solid-js";
import {
  LoongArkHoverCardRoot,
  LoongArkHoverCardTrigger,
  LoongArkHoverCardPositioner,
  LoongArkHoverCardContent,
  LoongArkHoverCardArrow,
  LoongArkHoverCardArrowTip,
} from "@loongark/solid";
import type { HoverCardSize } from "@loongark/primitives";

interface HoverCardExampleProps {
  size?: HoverCardSize;
}

export const HoverCardExample: Component<HoverCardExampleProps> = (props) => {
  const size = () => props.size ?? "md";

  return (
    <LoongArkHoverCardRoot size={size()} openDelay={200}>
      <LoongArkHoverCardTrigger>Hover details</LoongArkHoverCardTrigger>
      <LoongArkHoverCardPositioner>
        <LoongArkHoverCardContent>
          <div style={{ display: "grid", gap: "6px" }}>
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
