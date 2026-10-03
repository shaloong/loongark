import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const rows = [
  { id: "a", name: "Alpha", amount: 20 },
  { id: "b", name: "Beta", amount: 10 },
  { id: "c", name: "Gamma", amount: 35 },
];
const columns = [
  { key: "name", label: "Name" },
  { key: "amount", label: "Revenue" },
];
const meta = {
  title: "Examples/Neutral gallery",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
const Gallery = () => (
  <main
    style={{
      width: "100%",
      boxSizing: "border-box",
      maxWidth: 1100,
      margin: "auto",
      padding: 32,
      display: "grid",
      gap: 24,
    }}
  >
    <header>
      <L.LoongArkTypography as="h1">Workspace</L.LoongArkTypography>
      <p style={{ color: "var(--lk-color-semantic-mutedforeground)" }}>
        A quiet foundation for focused work.
      </p>
      <L.LoongArkBadge variant="outline">LoongArk</L.LoongArkBadge>
    </header>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
        gap: 24,
      }}
    >
      <L.LoongArkCard>
        <L.LoongArkCardHeader>
          <L.LoongArkCardTitle>Create project</L.LoongArkCardTitle>
          <L.LoongArkCardDescription>
            Deploy a new project in one click.
          </L.LoongArkCardDescription>
        </L.LoongArkCardHeader>
        <L.LoongArkCardContent>
          <L.LoongArkInputRoot>
            <L.LoongArkInputLabel>Name</L.LoongArkInputLabel>
            <L.LoongArkInputControl placeholder="Project name" />
          </L.LoongArkInputRoot>
        </L.LoongArkCardContent>
        <L.LoongArkCardFooter>
          <L.LoongArkButton variant="outline">Cancel</L.LoongArkButton>
          <L.LoongArkButton>Create project</L.LoongArkButton>
        </L.LoongArkCardFooter>
      </L.LoongArkCard>
      <L.LoongArkCard>
        <L.LoongArkCardHeader>
          <L.LoongArkCardTitle>Revenue</L.LoongArkCardTitle>
          <L.LoongArkCardDescription>
            Recent project performance
          </L.LoongArkCardDescription>
        </L.LoongArkCardHeader>
        <L.LoongArkCardContent>
          <L.LoongArkChart
            data={rows}
            series={[{ key: "amount", label: "Revenue" }]}
            labelKey="name"
            title="Revenue by project"
            type="bar"
          />
        </L.LoongArkCardContent>
      </L.LoongArkCard>
    </div>
    <L.LoongArkCard>
      <L.LoongArkCardHeader>
        <L.LoongArkCardTitle>Projects</L.LoongArkCardTitle>
      </L.LoongArkCardHeader>
      <L.LoongArkCardContent>
        <L.LoongArkDataTable data={rows} columns={columns} pageSize={2} />
      </L.LoongArkCardContent>
    </L.LoongArkCard>
    <L.LoongArkAlert>
      <L.LoongArkAlertTitle>Changes saved</L.LoongArkAlertTitle>
      <L.LoongArkAlertDescription>
        Your workspace settings are up to date.
      </L.LoongArkAlertDescription>
    </L.LoongArkAlert>
  </main>
);
export const Overview: StoryObj = { render: () => <Gallery /> };
