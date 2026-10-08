import { defineComponent, h, onBeforeUnmount } from "vue";
import { createTourFocusDemo } from "../shared/tourFocusDemo";
import * as L from "@loongark/vue";
export const TourExample = defineComponent({
  setup() {
    const focus = createTourFocusDemo();
    onBeforeUnmount(focus.dispose);
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
    return () =>
      h("div", {}, [
        h(
          L.LoongArkButton,
          {
            onClick: (event: MouseEvent) =>
              focus.start(event, () => tour.value.start()),
          },
          () => "开始引导",
        ),
        h(L.LoongArkTour.Root, { tour: tour.value }, () =>
          h(L.LoongArkPortal, {}, () => [
            h(L.LoongArkTour.Backdrop),
            h(L.LoongArkTour.Positioner, {}, () =>
              h(L.LoongArkTour.Content, {}, () => [
                h(L.LoongArkTour.Title),
                h(L.LoongArkTour.Description),
                h(
                  L.LoongArkTour.CloseTrigger,
                  { "aria-label": "关闭" },
                  () => "关闭",
                ),
              ]),
            ),
          ]),
        ),
      ]);
  },
});
