/** @jsxImportSource solid-js */
import type { Component } from "solid-js";
import {
  LoongArkScrollAreaRoot,
  LoongArkScrollAreaViewport,
  LoongArkScrollAreaContent,
  LoongArkScrollAreaScrollbar,
  LoongArkScrollAreaThumb,
  LoongArkScrollAreaCorner,
} from "@loongark/solid";
import type { ScrollAreaSize } from "@loongark/primitives";

interface ScrollAreaExampleProps {
  size?: ScrollAreaSize;
}

const items = Array.from(
  { length: 12 },
  (_, index) => `Release note ${index + 1}`,
);

export const ScrollAreaExample: Component<ScrollAreaExampleProps> = (props) => {
  const size = () => props.size ?? "md";

  return (
    <LoongArkScrollAreaRoot
      size={size()}
      style={{ width: "320px", height: "200px" }}
    >
      <LoongArkScrollAreaViewport>
        <LoongArkScrollAreaContent>
          <div style={{ display: "grid", gap: "8px", padding: "12px" }}>
            {items.map((item) => (
              <div>{item}</div>
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
