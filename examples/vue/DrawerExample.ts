import { defineComponent, h } from "vue";
import * as L from "@loongark/vue";
const DrawerPanel = defineComponent({
  setup() {
    const drawer = L.useDrawer({
      snapPoints: ["220px", "440px"],
      defaultSnapPoint: "220px",
    });
    const nested = () =>
      h(L.LoongArkDrawerRoot, {}, () => [
        h(L.LoongArkDrawerTrigger, {}, () => "Open nested drawer"),
        h(L.LoongArkDrawerPortal, {}, () => [
          h(L.LoongArkDrawerOverlay),
          h(L.LoongArkDrawerPositioner, {}, () =>
            h(L.LoongArkDrawerContent, {}, () => [
              h(L.LoongArkDrawerGrabber, {}, () =>
                h(L.LoongArkDrawerGrabberIndicator),
              ),
              h(L.LoongArkDrawerTitle, {}, () => "Nested confirmation"),
              h(
                L.LoongArkDrawerDescription,
                {},
                () => "Closing this drawer returns to project details.",
              ),
              h(L.LoongArkDrawerAction, {}, () => "Confirm nested"),
            ]),
          ),
        ]),
      ]);
    return () =>
      h(
        L.LoongArkStack,
        { gap: "lg", style: { width: "100%", maxWidth: "640px" } },
        () => [
          h(L.LoongArkTypography, { as: "h2" }, () => "An interactive drawer"),
          h(
            L.LoongArkTypography,
            { variant: "muted" },
            () =>
              "Drag the handle between two snap points, or down to dismiss. Escape restores focus to the trigger.",
          ),
          h(L.LoongArkDrawerRootProvider, { value: drawer.value }, () => [
            h(L.LoongArkDrawerTrigger, {}, () => "Open details drawer"),
            h(L.LoongArkDrawerPortal, {}, () => [
              h(L.LoongArkDrawerOverlay),
              h(L.LoongArkDrawerPositioner, {}, () =>
                h(
                  L.LoongArkDrawerContent,
                  { style: { height: "440px" } },
                  () => [
                    h(
                      L.LoongArkDrawerGrabber,
                      { role: "group", "aria-label": "Drag drawer" },
                      () => h(L.LoongArkDrawerGrabberIndicator),
                    ),
                    h(L.LoongArkDrawerTitle, {}, () => "Project details"),
                    h(
                      L.LoongArkDrawerDescription,
                      {},
                      () => "Drag, resize and inspect a nested dialog.",
                    ),
                    h(
                      L.LoongArkButton,
                      {
                        variant: "outline",
                        onClick: () =>
                          drawer.value.setSnapPoint(
                            drawer.value.snapPoint === "440px"
                              ? "220px"
                              : "440px",
                          ),
                      },
                      () =>
                        drawer.value.snapPoint === "440px"
                          ? "Compact drawer"
                          : "Expand drawer",
                    ),
                    h(
                      "output",
                      { "aria-label": "Drawer snap point" },
                      String(drawer.value.snapPoint),
                    ),
                    nested(),
                    h(L.LoongArkDrawerCancel, {}, () => "Close details"),
                  ],
                ),
              ),
            ]),
          ]),
          ,
        ],
      );
  },
});

export const DrawerExample = defineComponent({
  setup() {
    return () => h(L.LoongArkDrawerStack, {}, () => h(DrawerPanel));
  },
});
