import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "@loongark/react";
import * as L from "@loongark/react";
export default { title: "Components/FloatingActionButton" };
export const Basic = {
  render: () => (
    <L.LoongArkStack orientation="horizontal" gap="sm">
      <L.LoongArkFloatingActionButton aria-label="Add">
        <span aria-hidden="true">
          <LoongArkIcon icon={controlIcons.plus} size="sm" />
        </span>
      </L.LoongArkFloatingActionButton>
      <L.LoongArkFloatingActionButton extended variant="secondary">
        Import files
      </L.LoongArkFloatingActionButton>
      <L.LoongArkFloatingActionButton disabled aria-label="Disabled">
        <span aria-hidden="true">
          <LoongArkIcon icon={controlIcons.minus} size="sm" />
        </span>
      </L.LoongArkFloatingActionButton>
    </L.LoongArkStack>
  ),
};
export const Sizes = {
  render: () => (
    <L.LoongArkStack orientation="horizontal">
      {(["sm", "md", "lg"] as const).map((size) => (
        <L.LoongArkFloatingActionButton
          key={size}
          size={size}
          aria-label={size}
        >
          <span aria-hidden="true">
            <LoongArkIcon icon={controlIcons.plus} size="sm" />
          </span>
        </L.LoongArkFloatingActionButton>
      ))}
    </L.LoongArkStack>
  ),
};
