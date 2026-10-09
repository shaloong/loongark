/** @jsxImportSource solid-js */
import { createSignal, createMemo } from "solid-js";
import { LoongArkButton, LoongArkPresence } from "@loongark/solid";
export function PresenceBasicExample() {
  const [visible, setVisible] = createSignal(false);
  return (
    <div>
      <LoongArkButton
        aria-expanded={visible()}
        onClick={() => setVisible(!visible())}
      >
        显示 / 隐藏
      </LoongArkButton>
      <LoongArkPresence present={visible()} lazyMount unmountOnExit>
        <p>按需挂载的内容。</p>
      </LoongArkPresence>
    </div>
  );
}
