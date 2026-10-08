import * as L from "@loongark/react";
import { mediaDemoItems } from "../examples/shared/mediaDemo";
export default { title: "Components/Masonry" };
export const Basic = {
  render: () => (
    <L.LoongArkMasonry columns={3} gap="sm" aria-label="Masonry collection">
      {mediaDemoItems.map((item, i) => (
        <L.LoongArkMasonryItem key={item.label}>
          <img
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
          />
        </L.LoongArkMasonryItem>
      ))}
    </L.LoongArkMasonry>
  ),
};
export const Empty = {
  render: () => <L.LoongArkMasonry aria-label="Empty Masonry collection" />,
};
