import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
export const SwapExample = defineComponent({
  setup() {
    const expanded = ref(false),
      mounted = ref(true);
    return () =>
      h(
        L.LoongArkStack,
        { gap: "lg", style: { width: "100%", maxWidth: "640px" } },
        () => [
          h(
            L.LoongArkTypography,
            { as: "h2" },
            () => "Change a control indicator",
          ),
          h(
            L.LoongArkTypography,
            { variant: "muted" },
            () =>
              "Two indicators share the same slot. Hidden content stays out of keyboard navigation.",
          ),
          h(
            L.LoongArkButton,
            {
              variant: "outline",
              onClick: () => (mounted.value = !mounted.value),
            },
            () => (mounted.value ? "Unmount control" : "Mount control"),
          ),
          mounted.value &&
            h(
              L.LoongArkButton,
              {
                "aria-expanded": expanded.value,
                "aria-controls": "swap-details",
                onClick: () => (expanded.value = !expanded.value),
              },
              () =>
                h(
                  L.LoongArkSwapRoot,
                  {
                    swap: expanded.value,
                    lazyMount: true,
                    unmountOnExit: true,
                  },
                  () => [
                    h(
                      L.LoongArkSwapIndicator,
                      { type: "off" },
                      () => "Show details",
                    ),
                    h(
                      L.LoongArkSwapIndicator,
                      { type: "on" },
                      () => "Hide details",
                    ),
                  ],
                ),
            ),
          mounted.value &&
            h(
              L.LoongArkPresence,
              { present: expanded.value, lazyMount: true, unmountOnExit: true },
              () =>
                h("section", { id: "swap-details", "aria-label": "Details" }, [
                  h(
                    "p",
                    "One control, one accessible name, and a consistent layout.",
                  ),
                  h(
                    L.LoongArkButton,
                    { variant: "outline" },
                    () => "Details action",
                  ),
                ]),
            ),
        ],
      );
  },
});
