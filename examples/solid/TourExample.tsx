/** @jsxImportSource solid-js */
import { onCleanup } from "solid-js";
import { createTourFocusDemo } from "../shared/tourFocusDemo";
import * as L from "@loongark/solid";
export function TourExample() {
  const focus = createTourFocusDemo();
  onCleanup(focus.dispose);
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
        onClick={(event) => focus.start(event, () => tour().start())}
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
