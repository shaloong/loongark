import type { DateInputHiddenInputProps } from "@ark-ui/vue/date-input";
import {
  defineComponent,
  h,
  createVNode,
  resolveDynamicComponent,
  ref,
  shallowRef,
} from "vue";
import * as L from "@loongark/vue";
import type { DateInputDateValue, DateInputSegmentProps } from "@loongark/vue";
export const DateInputExample = defineComponent({
  setup() {
    const value = shallowRef<DateInputDateValue[]>([L.parseDate("2026-10-03")]),
      disabled = ref(false),
      submitted = ref("Not submitted");
    return () =>
      h(
        L.LoongArkStack,
        { gap: "lg", style: { width: "100%", maxWidth: "640px" } },
        () => [
          h(L.LoongArkTypography, { as: "h2" }, () => "A date in segments"),
          h(
            L.LoongArkTypography,
            { variant: "muted" },
            () =>
              "Edit each date part with the arrow keys. Dates stay within October 2026.",
          ),
          h(
            "form",
            {
              onSubmit: (event: Event) => {
                event.preventDefault();
                if (event.currentTarget instanceof HTMLFormElement)
                  submitted.value = String(
                    new FormData(event.currentTarget).get("appointment") ??
                      "No date",
                  );
              },
            },
            [
              h(L.LoongArkStack, { gap: "md" }, () => [
                h(
                  L.LoongArkDateInputRoot,
                  {
                    name: "appointment",
                    locale: "en-US",
                    modelValue: value.value,
                    "onUpdate:modelValue": (next: DateInputDateValue[]) =>
                      (value.value = next),
                    min: L.parseDate("2026-10-01"),
                    max: L.parseDate("2026-10-31"),
                    disabled: disabled.value,
                  },
                  () => [
                    h(L.LoongArkDateInputLabel, {}, () => "Appointment date"),
                    h(L.LoongArkDateInputControl, {}, () => [
                      h(L.LoongArkDateInputSegmentGroup, {}, () =>
                        h(
                          L.LoongArkDateInputSegmentContext,
                          {},
                          {
                            default: (
                              segment: DateInputSegmentProps["segment"],
                            ) =>
                              h(
                                L.LoongArkDateInputSegment,
                                { segment },
                                () => segment.text,
                              ),
                          },
                        ),
                      ),
                    ]),
                    createVNode(
                      resolveDynamicComponent(L.LoongArkDateInputHiddenInput),
                    ),
                  ],
                ),
                h(
                  L.LoongArkStack,
                  { orientation: "horizontal", gap: "sm" },
                  () => [
                    h(
                      L.LoongArkButton,
                      { type: "submit", disabled: disabled.value },
                      () => "Submit date",
                    ),
                    h(
                      L.LoongArkButton,
                      {
                        type: "button",
                        variant: "outline",
                        onClick: () =>
                          (value.value = [L.parseDate("2026-10-03")]),
                      },
                      () => "Reset date",
                    ),
                    h(
                      L.LoongArkButton,
                      {
                        type: "button",
                        variant: "outline",
                        onClick: () => (disabled.value = !disabled.value),
                      },
                      () => (disabled.value ? "Enable date" : "Disable date"),
                    ),
                  ],
                ),
                h(
                  "output",
                  { "aria-label": "Submitted date" },
                  submitted.value,
                ),
              ]),
            ],
          ),
          h(
            L.LoongArkDateInputRoot,
            {
              selectionMode: "range",
              name: "trip",
              locale: "en-US",
              defaultValue: [
                L.parseDate("2026-10-03"),
                L.parseDate("2026-10-07"),
              ],
            },
            () => [
              h(L.LoongArkDateInputLabel, {}, () => "Travel dates"),
              h(L.LoongArkDateInputControl, {}, () =>
                [0, 1].map((index) =>
                  h(
                    L.LoongArkDateInputSegmentGroup,
                    { index, "aria-label": index ? "End date" : "Start date" },
                    () =>
                      h(
                        L.LoongArkDateInputSegmentContext,
                        {},
                        {
                          default: (
                            segment: DateInputSegmentProps["segment"],
                          ) =>
                            h(
                              L.LoongArkDateInputSegment,
                              { segment },
                              () => segment.text,
                            ),
                        },
                      ),
                  ),
                ),
              ),
              createVNode(
                resolveDynamicComponent(L.LoongArkDateInputHiddenInput),
                { index: 0 } satisfies DateInputHiddenInputProps,
              ),
              createVNode(
                resolveDynamicComponent(L.LoongArkDateInputHiddenInput),
                { index: 1 } satisfies DateInputHiddenInputProps,
              ),
            ],
          ),
        ],
      );
  },
});
