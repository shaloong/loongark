import * as L from "@loongark/react";
import { quickActions } from "../examples/shared/mediaDemo";
export default { title: "Components/SpeedDial" };
export const Basic = {
  render: () => (
    <div
      style={{
        height: 260,
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <L.LoongArkSpeedDial
        label="Quick actions"
        actions={quickActions}
        defaultOpen
      />
    </div>
  ),
};
export const Disabled = {
  render: () => (
    <L.LoongArkSpeedDial
      label="Unavailable actions"
      actions={quickActions}
      disabled
    />
  ),
};
export const Directions = {
  render: () => (
    <L.LoongArkStack>
      {(["up", "down", "left", "right"] as const).map((direction) => (
        <div
          key={direction}
          style={{
            height: 230,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <L.LoongArkSpeedDial
            label={direction + " actions"}
            direction={direction}
            defaultOpen
            actions={[
              { value: "one", label: "1" },
              { value: "two", label: "2" },
              { value: "three", label: "3" },
            ]}
          />
        </div>
      ))}
    </L.LoongArkStack>
  ),
};
