import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
function OverlayDemo({ kind }: { kind: "sheet" | "drawer" }) {
  const C = kind === "sheet" ? L.LoongArkSheet : L.LoongArkDrawer;
  return (
    <C.Root>
      <C.Trigger>Open {kind}</C.Trigger>
      <C.Portal>
        <C.Overlay />
        <C.Positioner>
          <C.Content>
            <C.Title>Edit profile</C.Title>
            <C.Description>Update your profile settings.</C.Description>
            <L.LoongArkInputRoot>
              <L.LoongArkInputLabel>Name</L.LoongArkInputLabel>
              <L.LoongArkInputControl />
            </L.LoongArkInputRoot>
            <C.Action>Save changes</C.Action>
          </C.Content>
        </C.Positioner>
      </C.Portal>
    </C.Root>
  );
}
const meta = {
  title: "Components/Sheet",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <OverlayDemo kind="sheet" />
    </div>
  ),
};
