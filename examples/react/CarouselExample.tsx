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
} from "@loongark/react";
import type { CarouselSize } from "@loongark/primitives";

interface CarouselExampleProps {
  size?: CarouselSize;
}

const slides = [
  { title: "Aurora", description: "Soft gradients in motion." },
  { title: "Nebula", description: "Deep space color fields." },
  { title: "Orbit", description: "Precision alignment for teams." },
];

export const CarouselExample: React.FC<CarouselExampleProps> = ({
  size = "md",
}) => {
  return (
    <LoongArkCarouselRoot size={size} style={{ maxWidth: 420 }}>
      <LoongArkCarouselItemGroup>
        {slides.map((slide, index) => (
          <LoongArkCarouselItem key={slide.title} index={index}>
            <div style={{ display: "grid", gap: 4 }}>
              <strong>{slide.title}</strong>
              <span style={{ opacity: 0.7 }}>{slide.description}</span>
            </div>
          </LoongArkCarouselItem>
        ))}
      </LoongArkCarouselItemGroup>
      <LoongArkCarouselControl>
        <LoongArkCarouselPrevTrigger>Prev</LoongArkCarouselPrevTrigger>
        <LoongArkCarouselIndicatorGroup>
          {slides.map((_, index) => (
            <LoongArkCarouselIndicator key={index} index={index} />
          ))}
        </LoongArkCarouselIndicatorGroup>
        <LoongArkCarouselNextTrigger>Next</LoongArkCarouselNextTrigger>
      </LoongArkCarouselControl>
    </LoongArkCarouselRoot>
  );
};
