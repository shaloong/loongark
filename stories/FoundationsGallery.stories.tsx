import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationsExample } from "../examples/react/FoundationsExample";
export default {
  title: "Examples/Foundations",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export const Overview: StoryObj = { render: () => <FoundationsExample /> };
