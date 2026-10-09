/** @jsxImportSource solid-js */
import { createSignal, createMemo } from "solid-js";
import { LoongArkButton, LoongArkFocusTrap } from "@loongark/solid";
export function FocusTrapBasicExample() {
  const [active, setActive] = createSignal(false);
  return (
    <div>
      <LoongArkButton onClick={() => setActive(true)}>开始编辑</LoongArkButton>
      {active() && (
        <LoongArkFocusTrap returnFocusOnDeactivate>
          <div>
            <label for="task-name">任务名</label>
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
