import React, { useState } from "react";
import { LoongArkButton, LoongArkPresence } from "@loongark/react";
export function PresenceBasicExample() {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <LoongArkButton
        aria-expanded={visible}
        onClick={() => setVisible(!visible)}
      >
        显示 / 隐藏
      </LoongArkButton>
      <LoongArkPresence present={visible} lazyMount unmountOnExit>
        <p>按需挂载的内容。</p>
      </LoongArkPresence>
    </div>
  );
}
