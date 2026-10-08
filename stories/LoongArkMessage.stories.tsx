import { useState } from "react";
import * as L from "@loongark/react";
export default { title: "Components/Message" };
export const Basic = {
  render: () => (
    <L.LoongArkMessage
      author="Lin"
      dateTime="2026-10-03T09:30:00+08:00"
      timeLabel="09:30"
    >
      <L.LoongArkBubble>Can you review the attachment?</L.LoongArkBubble>
      <L.LoongArkAttachment
        name="Design review.pdf"
        size={2457600}
        href="data:text/plain,Review"
      />
    </L.LoongArkMessage>
  ),
};
export const Sending = {
  render: () => (
    <L.LoongArkMessage author="You" side="outgoing" status="sending">
      <L.LoongArkBubble side="outgoing">Here are my notes.</L.LoongArkBubble>
    </L.LoongArkMessage>
  ),
};
function Retry() {
  const [failed, setFailed] = useState(true);
  return (
    <L.LoongArkMessage
      author="You"
      side="outgoing"
      status={failed ? "error" : "sent"}
      onRetry={() => setFailed(false)}
    >
      <L.LoongArkBubble side="outgoing">Here are my notes.</L.LoongArkBubble>
    </L.LoongArkMessage>
  );
}
export const Error = { render: () => <Retry /> };
