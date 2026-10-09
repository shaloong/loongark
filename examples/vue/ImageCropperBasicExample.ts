import { defineComponent, h } from "vue";
import {
  LoongArkImageCropperRoot,
  LoongArkImageCropperViewport,
  LoongArkImageCropperImage,
  LoongArkImageCropperSelection,
  LoongArkImageCropperHandle,
  LoongArkImageCropperGrid,
} from "@loongark/vue";
export const ImageCropperBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkImageCropperRoot,
        { aspectRatio: 1 },
        {
          default: () => [
            h(
              LoongArkImageCropperViewport,
              {},
              {
                default: () => [
                  h(LoongArkImageCropperImage, {
                    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200'%3E%3Crect width='320' height='200' fill='%235AC8FA'/%3E%3Ccircle cx='220' cy='70' r='30' fill='%23F58220'/%3E%3C/svg%3E",
                    alt: "蓝色背景与橙色圆形",
                  }),
                  h(
                    LoongArkImageCropperSelection,
                    {},
                    {
                      default: () => [
                        h(LoongArkImageCropperHandle, { position: "se" }),
                        h(LoongArkImageCropperGrid, { axis: "horizontal" }),
                        h(LoongArkImageCropperGrid, { axis: "vertical" }),
                      ],
                    },
                  ),
                ],
              },
            ),
          ],
        },
      );
    };
  },
});
