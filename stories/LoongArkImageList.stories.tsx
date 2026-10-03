import * as L from "@loongark/react";
import { mediaDemoItems } from "../examples/shared/mediaDemo";
export default { title: "Components/ImageList" };
export const Basic = {
  render: () => (
    <L.LoongArkImageList columns={3} gap="sm" aria-label="ImageList collection">
      {mediaDemoItems.map((item, i) => (
        <L.LoongArkImageListItem
          columnSpan={i === 0 ? 2 : 1}
          rowSpan={i === 0 ? 2 : 1}
          key={item.label}
        >
          <img
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
          />
          <L.LoongArkImageListCaption>{item.label}</L.LoongArkImageListCaption>
        </L.LoongArkImageListItem>
      ))}
    </L.LoongArkImageList>
  ),
};
export const Empty = {
  render: () => <L.LoongArkImageList aria-label="Empty ImageList collection" />,
};
