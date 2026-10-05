import React, { useEffect, useState } from "react";
import {
  LoongArkChart,
  LoongArkButton,
  LoongArkTypography,
} from "@loongark/react";
import { createChartInteractionDemo } from "../shared/chartInteractionDemo";
export const ChartInteractionExample = () => {
  const [, redraw] = useState(0),
    [demo] = useState(() =>
      createChartInteractionDemo(() => redraw((value) => value + 1)),
    );
  useEffect(() => () => demo.dispose(), [demo]);
  const state = demo.state;
  const button = (label: string, action: () => void) => (
    <LoongArkButton type="button" variant="outline" onClick={action}>
      {label}
    </LoongArkButton>
  );
  return (
    <div
      style={{
        maxWidth: "900px",
        display: "grid",
        gap: "var(--lk-space-component-md)",
      }}
    >
      <LoongArkTypography as="h2">Explore changing data</LoongArkTypography>
      <LoongArkTypography variant="muted">
        Zoom or adjust the category window. Inspect values with a pointer or the
        category selector.
      </LoongArkTypography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--lk-space-component-sm)",
        }}
      >
        {button("Append point", demo.append)}
        {button(
          state.controlled ? "Use uncontrolled range" : "Use controlled range",
          demo.toggleControlled,
        )}
        {button("Trim data", demo.trim)}
        {button(
          state.data.length ? "Clear data" : "Restore data",
          demo.toggleData,
        )}
        {button(
          state.reject ? "Accept range changes" : "Reject range changes",
          demo.toggleReject,
        )}
        {button(
          state.disabled ? "Enable chart" : "Disable chart",
          demo.toggleDisabled,
        )}
        {button(
          state.type === "line" ? "Use bars" : "Use lines",
          demo.toggleType,
        )}
        {button(state.shown ? "Hide chart" : "Show chart", demo.toggleShown)}
        {button(
          state.streaming ? "Stop live updates" : "Start live updates",
          demo.toggleStream,
        )}
      </div>
      {state.shown && (
        <LoongArkChart
          data={state.data}
          series={demo.series}
          labelKey="label"
          title="Changing samples"
          type={state.type}
          zoomable
          tooltip
          interactive
          showDataTable
          range={state.controlled ? state.range : undefined}
          onRangeChange={demo.onRangeChange}
          disabled={state.disabled}
        />
      )}
      <output>{state.status}</output>
      <output>{state.data.length} samples</output>
    </div>
  );
};
