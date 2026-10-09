/** @jsxImportSource solid-js */

import {
  LoongArkImageList,
  LoongArkImageListItem,
  LoongArkImageListCaption,
} from "@loongark/solid";
export function ImageListBasicExample() {
  return (
    <LoongArkImageList columns={2}>
      <LoongArkImageListItem>
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='100'%3E%3Crect width='160' height='100' fill='%23F2F2F2'/%3E%3C/svg%3E"
          alt="灰色示例图"
        />
        <LoongArkImageListCaption>图片说明</LoongArkImageListCaption>
      </LoongArkImageListItem>
    </LoongArkImageList>
  );
}
