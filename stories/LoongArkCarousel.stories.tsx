import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
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

const meta: Meta = {
  title: "Components/Carousel",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkCarousel composes Ark UI carousel parts with size styling.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

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

export const Basic: Story = {
  render: () => <CarouselDemo />,
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <CarouselDemo showIndicators />
      <CarouselDemo showIndicators={false} />
      <CarouselDemo showAutoplay />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <CarouselDemo dragDisabled={false} />
      <CarouselDemo dragDisabled />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <CarouselDemo size="sm" />
      <CarouselDemo size="md" />
      <CarouselDemo size="lg" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => <CarouselDemo />,
};
