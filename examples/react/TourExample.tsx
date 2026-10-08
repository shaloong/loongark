import React, { useState, useEffect } from "react";
import { createTourFocusDemo } from "../shared/tourFocusDemo";
import * as L from "@loongark/react";
export function TourExample() {
  const [focus] = useState(createTourFocusDemo);
  useEffect(() => () => focus.dispose(), [focus]);
  const tour = L.useTour({
    onStatusChange: focus.onStatusChange,
    steps: [
      {
        id: "welcome",
        type: "dialog",
        title: "欢迎",
        description: "使用键盘或关闭按钮结束引导。",
      },
    ],
  });
  return (
    <>
      <L.LoongArkButton
        onClick={(event) => focus.start(event, () => tour.start())}
      >
        开始引导
      </L.LoongArkButton>
      <L.LoongArkTour.Root tour={tour}>
        <L.LoongArkPortal>
          <L.LoongArkTour.Backdrop />
          <L.LoongArkTour.Positioner>
            <L.LoongArkTour.Content>
              <L.LoongArkTour.Title />
              <L.LoongArkTour.Description />
              <L.LoongArkTour.CloseTrigger aria-label="关闭">
                关闭
              </L.LoongArkTour.CloseTrigger>
            </L.LoongArkTour.Content>
          </L.LoongArkTour.Positioner>
        </L.LoongArkPortal>
      </L.LoongArkTour.Root>
    </>
  );
}
