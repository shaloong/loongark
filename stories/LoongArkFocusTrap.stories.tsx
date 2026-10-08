import { withArkExamplePage } from "./arkStory";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/FocusTrap",
  tags: ["autodocs"],
  decorators: [withArkExamplePage],
} satisfies Meta;
export default meta;
function Demo() {
  const [active, setActive] = useState(false);
  return (
    <L.LoongArkStack gap="md">
      <L.LoongArkButton type="button" onClick={() => setActive(true)}>
        Start focus task
      </L.LoongArkButton>
      {active && (
        <L.LoongArkFocusTrap
          initialFocus="#isolated-task"
          returnFocusOnDeactivate
        >
          <L.LoongArkStack gap="sm">
            <label htmlFor="isolated-task">Task name</label>
            <L.LoongArkInputInput id="isolated-task" />
            <L.LoongArkButton type="button" onClick={() => setActive(false)}>
              Finish focus task
            </L.LoongArkButton>
          </L.LoongArkStack>
        </L.LoongArkFocusTrap>
      )}
    </L.LoongArkStack>
  );
}
export const Basic: StoryObj = { render: () => <Demo /> };
