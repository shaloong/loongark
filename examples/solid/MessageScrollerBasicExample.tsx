/** @jsxImportSource solid-js */

import {
  LoongArkMessageScroller,
  LoongArkMessage,
  LoongArkBubble,
} from "@loongark/solid";
export function MessageScrollerBasicExample() {
  return (
    <LoongArkMessageScroller label="聊天记录" jumpLabel="跳到最新消息">
      <LoongArkMessage author="小林">
        <LoongArkBubble>第一条消息。</LoongArkBubble>
      </LoongArkMessage>
      <LoongArkMessage author="你" side="outgoing">
        <LoongArkBubble side="outgoing">收到。</LoongArkBubble>
      </LoongArkMessage>
    </LoongArkMessageScroller>
  );
}
