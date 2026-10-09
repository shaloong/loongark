import React, { useState } from "react";
import { LoongArkButton, LoongArkFocusTrap } from "@loongark/react";
export function FocusTrapBasicExample() {
  const [active, setActive] = useState(false);
  return (
    <div>
      <LoongArkButton onClick={() => setActive(true)}>开始编辑</LoongArkButton>
      {active && (
        <LoongArkFocusTrap returnFocusOnDeactivate>
          <div>
            <label htmlFor="task-name">任务名</label>
            <input id="task-name" />
            <LoongArkButton onClick={() => setActive(false)}>
              完成
            </LoongArkButton>
          </div>
        </LoongArkFocusTrap>
      )}
    </div>
  );
}
