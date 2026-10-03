import React from "react";
import { ConversationActionsExample } from "../examples/react/ConversationActionsExample";
import { withArkExamplePage } from "./arkStory";
export default {
  title: "Examples/ConversationActions",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};
export const Overview = {
  decorators: [withArkExamplePage],
  render: () => <ConversationActionsExample />,
};
