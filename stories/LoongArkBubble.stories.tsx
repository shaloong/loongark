import * as L from "@loongark/react";
export default { title: "Components/Bubble" };
export const Basic = {
  render: () => (
    <L.LoongArkBubble>Let’s review the details together.</L.LoongArkBubble>
  ),
};
export const Outgoing = {
  render: () => (
    <L.LoongArkBubble side="outgoing">
      The revised design is ready for review.
    </L.LoongArkBubble>
  ),
};
export const LongText = {
  render: () => (
    <L.LoongArkBubble>
      {"Long messages retain a comfortable line height and wrap on small screens. ".repeat(
        8,
      ) +
        "https://example.com/" +
        "long-path".repeat(30)}
    </L.LoongArkBubble>
  ),
};
