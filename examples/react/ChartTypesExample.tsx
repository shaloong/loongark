import React, { useState } from "react";
import {
  LoongArkChart,
  LoongArkButton,
  LoongArkTypography,
} from "@loongark/react";
import { createChartTypesDemo, chartTypeModes } from "../shared/chartTypesDemo";
export const ChartTypesExample = () => {
  const [, redraw] = useState(0);
  const [demo] = useState(() =>
    createChartTypesDemo(() => redraw((v) => v + 1)),
  );
  const state = () => demo.state;
  const options = () => demo.options;
  return (
    <div
      dir={state().rtl ? "rtl" : "ltr"}
      style={{
        maxWidth: "900px",
        display: "grid",
        gap: "var(--lk-space-component-md)",
      }}
    >
      <LoongArkTypography as="h2">Explore chart types</LoongArkTypography>
      <LoongArkTypography variant="muted">
        Compare distributions, stacks and continuous axes. Missing values remain
        gaps.
      </LoongArkTypography>
      <label style={{ display: "grid", gap: "var(--lk-space-component-xs)" }}>
        Chart type
        <select
          value={state().mode}
          onChange={(e) => demo.choose(e.currentTarget.value)}
          style={{
            font: "inherit",
            height: "var(--lk-control-height-md)",
            background: "var(--lk-color-semantic-background)",
            color: "var(--lk-color-semantic-foreground)",
            border:
              "var(--lk-control-borderwidth) solid var(--lk-color-semantic-border)",
            borderRadius: "var(--lk-radius-md)",
          }}
        >
          {chartTypeModes.map((item) => (
            <option value={item.value}>{item.label}</option>
          ))}
        </select>
      </label>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--lk-space-component-sm)",
        }}
      >
        <LoongArkButton
          type="button"
          variant="outline"
          onClick={demo.toggleReject}
        >
          {state().reject ? "Accept slice changes" : "Reject slice changes"}
        </LoongArkButton>
        <LoongArkButton
          type="button"
          variant="outline"
          onClick={demo.toggleControlled}
        >
          {state().controlled
            ? "Use uncontrolled slices"
            : "Use controlled slices"}
        </LoongArkButton>
        <LoongArkButton
          type="button"
          variant="outline"
          onClick={demo.toggleDisabled}
        >
          {state().disabled ? "Enable chart" : "Disable chart"}
        </LoongArkButton>
        <LoongArkButton
          type="button"
          variant="outline"
          onClick={demo.toggleEmpty}
        >
          {state().empty ? "Restore data" : "Clear data"}
        </LoongArkButton>
        <LoongArkButton
          type="button"
          variant="outline"
          onClick={demo.toggleDirection}
        >
          {state().rtl ? "Use LTR" : "Use RTL"}
        </LoongArkButton>
        <LoongArkButton
          type="button"
          variant="outline"
          onClick={demo.toggleShown}
        >
          {state().shown ? "Hide chart" : "Show chart"}
        </LoongArkButton>
      </div>
      {state().shown && <LoongArkChart {...options()} />}
      <output>{state().status}</output>
    </div>
  );
};
