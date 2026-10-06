import { defineComponent, h, type PropType } from "vue";
import * as L from "@loongark/vue";
import {
  drawerDirections,
  drawerDirectionsCSS,
  drawerSnapPoints,
  type DrawerDirection,
  type DrawerTextDirection,
} from "../shared/drawerDirectionsDemo";
const DirectionPanel = defineComponent({
  props: {
    direction: { type: String as PropType<DrawerDirection>, required: true },
    dir: { type: String as PropType<DrawerTextDirection>, required: true },
  },
  setup(props) {
    const points = drawerSnapPoints(props.direction);
    const drawer = L.useDrawer({
      swipeDirection: props.direction,
      snapPoints: points,
      defaultSnapPoint: points[1],
    });
    return () =>
      h(L.LoongArkDrawerRootProvider, { value: drawer.value }, () => [
        h(
          L.LoongArkDrawerTrigger,
          {},
          () => `Open ${props.direction} ${props.dir}`,
        ),
        h(L.LoongArkDrawerPortal, {}, () => [
          h(L.LoongArkDrawerOverlay),
          h(L.LoongArkDrawerPositioner, {}, () =>
            h(
              L.LoongArkDrawerContent,
              {
                "data-drawer-example": "",
                style: {
                  width: ["start", "end"].includes(props.direction)
                    ? "320px"
                    : undefined,
                  height: ["up", "down"].includes(props.direction)
                    ? "480px"
                    : undefined,
                },
              },
              () => [
                h(
                  L.LoongArkDrawerGrabber,
                  { role: "group", "aria-label": "Drag drawer" },
                  () => h(L.LoongArkDrawerGrabberIndicator),
                ),
                h("div", { "data-drawer-viewport": "" }, [
                  h(
                    L.LoongArkDrawerTitle,
                    {},
                    () => `${props.direction} ${props.dir} drawer`,
                  ),
                  h(
                    L.LoongArkDrawerDescription,
                    {},
                    () =>
                      "Drag the handle toward the edge to close, or between two snap points. Escape returns to the opening button.",
                  ),
                  h(L.LoongArkInputRoot, {}, () => [
                    h(L.LoongArkInputLabel, {}, () => "Project name"),
                    h(L.LoongArkInputControl, { placeholder: "Workspace" }),
                  ]),
                  h(
                    L.LoongArkButton,
                    {
                      variant: "outline",
                      onClick: () =>
                        drawer.value.setSnapPoint(
                          drawer.value.snapPoint === points[1]
                            ? points[0]
                            : points[1],
                        ),
                    },
                    () => "Toggle snap point",
                  ),
                  h(
                    "output",
                    { "aria-label": "Drawer snap point" },
                    String(drawer.value.snapPoint),
                  ),
                  h(L.LoongArkDrawerCancel, {}, () => "Close drawer"),
                ]),
              ],
            ),
          ),
        ]),
      ]);
  },
});
export const DrawerDirectionsExample = defineComponent({
  setup() {
    return () =>
      h(
        L.LoongArkStack,
        { gap: "lg", style: { width: "100%", maxWidth: "640px" } },
        () => [
          h("style", drawerDirectionsCSS),
          h(
            L.LoongArkTypography,
            { as: "h2" },
            () => "Drawers from every edge",
          ),
          h(
            L.LoongArkTypography,
            { variant: "muted" },
            () =>
              "Logical start and end mirror in right-to-left layouts. Native drag, snap points and keyboard focus share one contract.",
          ),
          ...(["ltr", "rtl"] as const).map((dir) =>
            h(
              L.LoongArkLocaleProvider,
              { locale: dir === "rtl" ? "ar-EG" : "en-US" },
              () =>
                h(
                  "section",
                  { dir, "aria-label": dir.toUpperCase() },
                  h(L.LoongArkStack, { gap: "md" }, () => [
                    h(L.LoongArkTypography, { as: "h3" }, () =>
                      dir.toUpperCase(),
                    ),
                    h(L.LoongArkDrawerStack, {}, () =>
                      h(
                        "div",
                        {
                          style: {
                            display: "flex",
                            gap: "var(--lk-space-component-sm)",
                            flexWrap: "wrap",
                          },
                        },
                        drawerDirections.map((direction) =>
                          h(DirectionPanel, { direction, dir, key: direction }),
                        ),
                      ),
                    ),
                  ]),
                ),
            ),
          ),
        ],
      );
  },
});
