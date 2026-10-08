import { withArkExamplePage } from "./arkStory";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const meta = {
  title: "Components/Presence",
  tags: ["autodocs"],
  decorators: [withArkExamplePage],
} satisfies Meta;
export default meta;
function Demo() {
  const [present, setPresent] = useState(true);
  return (
    <L.LoongArkStack gap="md">
      <L.LoongArkButton
        type="button"
        variant="outline"
        onClick={() => setPresent(!present)}
      >
        Toggle details
      </L.LoongArkButton>
      <L.LoongArkPresence present={present} lazyMount unmountOnExit>
        <L.LoongArkPaper>
          <p>Optional details remain mounted through an exit animation.</p>
        </L.LoongArkPaper>
      </L.LoongArkPresence>
    </L.LoongArkStack>
  );
}
export const Basic: StoryObj = { render: () => <Demo /> };
