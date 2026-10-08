import React from "react";

import {
  LoongArkCarouselRoot,
  LoongArkCarouselItemGroup,
  LoongArkCarouselItem,
  LoongArkCarouselControl,
  LoongArkCarouselPrevTrigger,
  LoongArkCarouselNextTrigger,
  LoongArkCarouselIndicatorGroup,
  LoongArkCarouselIndicator,
  LoongArkCarouselAutoplayTrigger,
  LoongArkCarouselAutoplayIndicator,
} from "@loongark/react";

const slides = ["Aurora", "Nebula", "Orbit"];

interface CarouselDemoProps {
  size?: "sm" | "md" | "lg";
  showAutoplay?: boolean;
  showIndicators?: boolean;
  dragDisabled?: boolean;
}

const CarouselDemo = ({
  size = "md",
  showAutoplay = false,
  showIndicators = true,
  dragDisabled = false,
}: CarouselDemoProps) => {
  return (
    <LoongArkCarouselRoot
      slideCount={slides.length}
      size={size}
      allowMouseDrag={!dragDisabled}
      style={{ maxWidth: 420 }}
    >
      <LoongArkCarouselItemGroup>
        {slides.map((slide, index) => (
          <LoongArkCarouselItem key={slide} index={index}>
            <div style={{ display: "grid", gap: 4 }}>
              <strong>{slide}</strong>
              <span style={{ opacity: 0.7 }}>Slide {index + 1}</span>
            </div>
          </LoongArkCarouselItem>
        ))}
      </LoongArkCarouselItemGroup>
      <LoongArkCarouselControl>
        <LoongArkCarouselPrevTrigger>Prev</LoongArkCarouselPrevTrigger>
        {showIndicators && (
          <LoongArkCarouselIndicatorGroup>
            {slides.map((_, index) => (
              <LoongArkCarouselIndicator key={index} index={index} />
            ))}
          </LoongArkCarouselIndicatorGroup>
        )}
        <LoongArkCarouselNextTrigger>Next</LoongArkCarouselNextTrigger>
        {showAutoplay && (
          <>
            <LoongArkCarouselAutoplayTrigger>
              Auto
            </LoongArkCarouselAutoplayTrigger>
            <LoongArkCarouselAutoplayIndicator />
          </>
        )}
      </LoongArkCarouselControl>
    </LoongArkCarouselRoot>
  );
};
export const CarouselExample = CarouselDemo;
export type CarouselExampleProps = Parameters<typeof CarouselDemo>[0];
