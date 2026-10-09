import React from "react";
import {
  LoongArkImageCropperRoot,
  LoongArkImageCropperViewport,
  LoongArkImageCropperImage,
  LoongArkImageCropperSelection,
  LoongArkImageCropperHandle,
  LoongArkImageCropperGrid,
} from "@loongark/react";
export function ImageCropperBasicExample() {
  return (
    <LoongArkImageCropperRoot aspectRatio={1}>
      <LoongArkImageCropperViewport>
        <LoongArkImageCropperImage
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200'%3E%3Crect width='320' height='200' fill='%235AC8FA'/%3E%3Ccircle cx='220' cy='70' r='30' fill='%23F58220'/%3E%3C/svg%3E"
          alt="蓝色背景与橙色圆形"
        />
        <LoongArkImageCropperSelection>
          <LoongArkImageCropperHandle position="se" />
          <LoongArkImageCropperGrid axis="horizontal" />
          <LoongArkImageCropperGrid axis="vertical" />
        </LoongArkImageCropperSelection>
      </LoongArkImageCropperViewport>
    </LoongArkImageCropperRoot>
  );
}
