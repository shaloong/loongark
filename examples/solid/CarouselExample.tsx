/** @jsxImportSource solid-js */
import type { Component } from "solid-js";
import {
  LoongArkCarouselRoot,
  LoongArkCarouselItemGroup,
  LoongArkCarouselItem,
  LoongArkCarouselControl,
  LoongArkCarouselPrevTrigger,
  LoongArkCarouselNextTrigger,
  LoongArkCarouselIndicatorGroup,
  LoongArkCarouselIndicator,
} from "@loongark/solid";
import type { CarouselSize } from "@loongark/primitives";

interface CarouselExampleProps {
  size?: CarouselSize;
}

const slides = [
  { title: "Aurora", description: "Soft gradients in motion." },
  { title: "Nebula", description: "Deep space color fields." },
  { title: "Orbit", description: "Precision alignment for teams." },
];

export const CarouselExample: Component<CarouselExampleProps> = (props) => {
  const size = () => props.size ?? "md";

  return (
    <LoongArkCarouselRoot
      slideCount={slides.length}
      size={size()}
      style={{ "max-width": "420px" }}
    >
      <LoongArkCarouselItemGroup>
        {slides.map((slide, index) => (
          <LoongArkCarouselItem index={index}>
            <div style={{ display: "grid", gap: "4px" }}>
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
            <LoongArkCarouselIndicator index={index} />
          ))}
        </LoongArkCarouselIndicatorGroup>
        <LoongArkCarouselNextTrigger>Next</LoongArkCarouselNextTrigger>
      </LoongArkCarouselControl>
    </LoongArkCarouselRoot>
  );
};
