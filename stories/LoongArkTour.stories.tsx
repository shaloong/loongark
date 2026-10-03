import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
function TourDemo() {
  const tour = L.useTour({
    steps: [
      {
        id: "welcome",
        type: "dialog",
        title: "Welcome",
        description: "Discover the workspace.",
      },
    ],
  });
  return (
    <>
      <L.LoongArkButton onClick={() => tour.start()}>
        Start tour
      </L.LoongArkButton>
      <L.LoongArkTour.Root tour={tour}>
        <L.LoongArkPortal>
          <L.LoongArkTour.Backdrop />
          <L.LoongArkTour.Positioner>
            <L.LoongArkTour.Content>
              <L.LoongArkTour.Title />
              <L.LoongArkTour.Description />
              <L.LoongArkTour.CloseTrigger>Close</L.LoongArkTour.CloseTrigger>
            </L.LoongArkTour.Content>
          </L.LoongArkTour.Positioner>
        </L.LoongArkPortal>
      </L.LoongArkTour.Root>
    </>
  );
}
const meta = {
  title: "Components/Tour",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <TourDemo />
    </div>
  ),
};
