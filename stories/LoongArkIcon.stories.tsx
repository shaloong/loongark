import * as L from "@loongark/react";
import { controlIcons } from "@loongark/kit";
import { IconExample } from "../examples/react/IconExample";
export default {
  title: "Components/Icon",
  component: L.LoongArkIcon,
  argTypes: {
    icon: { control: false },
    size: { control: "select", options: ["sm", "md", "lg", 32] },
    strokeWidth: { control: { type: "range", min: 1, max: 3, step: 0.5 } },
    mirrorInRtl: { control: "boolean" },
    absoluteStrokeWidth: { control: "boolean" },
    label: { control: "text" },
  },
  args: { icon: controlIcons.search, size: "md", label: "Search" },
};
export const Basic = { render: () => <IconExample /> };
export const Controls = {};
