import React from "react";
import {
  LoongArkScrollAreaRoot,
  LoongArkScrollAreaViewport,
  LoongArkScrollAreaContent,
  LoongArkScrollAreaScrollbar,
  LoongArkScrollAreaThumb,
  LoongArkScrollAreaCorner,
} from "@loongark/react";
import type { ScrollAreaSize } from "@loongark/primitives";

interface ScrollAreaExampleProps {
  size?: ScrollAreaSize;
}

const items = Array.from(
  { length: 12 },
  (_, index) => `Release note ${index + 1}`,
);

export const ScrollAreaExample: React.FC<ScrollAreaExampleProps> = ({
  size = "md",
}) => {
  return (
    <LoongArkScrollAreaRoot size={size} style={{ width: 320, height: 200 }}>
      <LoongArkScrollAreaViewport>
        <LoongArkScrollAreaContent>
          <div style={{ display: "grid", gap: 8, padding: 12 }}>
            {items.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </LoongArkScrollAreaContent>
      </LoongArkScrollAreaViewport>
      <LoongArkScrollAreaScrollbar orientation="vertical">
        <LoongArkScrollAreaThumb />
      </LoongArkScrollAreaScrollbar>
      <LoongArkScrollAreaScrollbar orientation="horizontal">
        <LoongArkScrollAreaThumb />
      </LoongArkScrollAreaScrollbar>
      <LoongArkScrollAreaCorner />
    </LoongArkScrollAreaRoot>
  );
};
