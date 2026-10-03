import { useState } from "react";
import * as L from "@loongark/react";
export default { title: "Components/MessageScroller" };
function Conversation() {
  const [messages, setMessages] = useState(
    Array.from({ length: 10 }, (_, i) => i),
  );
  return (
    <L.LoongArkStack>
      <L.LoongArkMessageScroller label="Project messages">
        {messages.map((i) => (
          <L.LoongArkMessage
            key={i}
            author={i % 2 ? "You" : "Lin"}
            side={i % 2 ? "outgoing" : "incoming"}
          >
            <L.LoongArkBubble side={i % 2 ? "outgoing" : "incoming"}>
              {"Message " +
                i +
                " — Review spacing, keyboard focus and consistent states."}
            </L.LoongArkBubble>
          </L.LoongArkMessage>
        ))}
      </L.LoongArkMessageScroller>
      <L.LoongArkStack data-orientation="horizontal">
        <L.LoongArkButton
          onClick={() => setMessages((v) => [...v, v[v.length - 1] + 1])}
        >
          Add message
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="outline"
          onClick={() => setMessages((v) => [v[0] - 1, ...v])}
        >
          Load earlier
        </L.LoongArkButton>
      </L.LoongArkStack>
    </L.LoongArkStack>
  );
}
export const Basic = { render: () => <Conversation /> };
export const Empty = {
  render: () => (
    <L.LoongArkMessageScroller label="Messages">
      <L.LoongArkEmpty>
        <L.LoongArkEmptyTitle>No messages yet</L.LoongArkEmptyTitle>
        <L.LoongArkEmptyDescription>
          Start a conversation to see messages here.
        </L.LoongArkEmptyDescription>
      </L.LoongArkEmpty>
    </L.LoongArkMessageScroller>
  ),
};

import { MessageScrollerAdvancedExample } from "../examples/react/MessageScrollerAdvancedExample";
import { withArkExamplePage } from "./arkStory";
export const Advanced = {
  decorators: [withArkExamplePage],
  render: () => <MessageScrollerAdvancedExample />,
};
