/** @jsxImportSource solid-js */

import {
  LoongArkCarouselRoot,
  LoongArkCarouselItemGroup,
  LoongArkCarouselItem,
  LoongArkCarouselControl,
  LoongArkCarouselPrevTrigger,
  LoongArkCarouselNextTrigger,
} from "@loongark/solid";
export function CarouselBasicExample() {
  return (
    <LoongArkCarouselRoot slideCount={2}>
      <LoongArkCarouselItemGroup>
        <LoongArkCarouselItem index={0}>第一页</LoongArkCarouselItem>
        <LoongArkCarouselItem index={1}>第二页</LoongArkCarouselItem>
      </LoongArkCarouselItemGroup>
      <LoongArkCarouselControl>
        <LoongArkCarouselPrevTrigger>上一页</LoongArkCarouselPrevTrigger>
        <LoongArkCarouselNextTrigger>下一页</LoongArkCarouselNextTrigger>
      </LoongArkCarouselControl>
    </LoongArkCarouselRoot>
  );
}
