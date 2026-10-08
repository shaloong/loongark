import type { DateInputHiddenInputProps } from "@ark-ui/vue/date-input";
import {
  defineComponent,
  h,
  createVNode,
  resolveDynamicComponent,
  ref,
} from "vue";
import * as L from "@loongark/vue";
import type { DateInputDateValue, DateInputSegmentProps } from "@loongark/vue";
import { createDateTimeDemo } from "../shared/dateTimeDemo";
export const DateTimeExample = defineComponent({
  setup() {
    const revision = ref(0);
    let count = 0;
    const demo = createDateTimeDemo(() => (revision.value = ++count));
    const button = (label: string, action: () => void) =>
      h(
        L.LoongArkButton,
        { type: "button", variant: "outline", onClick: action },
        () => label,
      );
    return () => {
      revision.value;
      const state = demo.state;
      return h(
        L.LoongArkStack,
        { gap: "lg", style: { width: "100%", maxWidth: "640px" } },
        () => [
          h(L.LoongArkTypography, { as: "h2" }, () => "Date and time"),
          h(
            L.LoongArkTypography,
            { variant: "muted" },
            () =>
              "Parse a date in your locale, then edit the date and time together. An explicit time zone is optional.",
          ),
          h(
            L.LoongArkStack,
            {
              orientation: "horizontal",
              gap: "sm",
              style: { flexWrap: "wrap" },
            },
            () =>
              ["en-US", "en-GB", "zh-CN", "ar-EG"].map((locale) =>
                h(
                  L.LoongArkButton,
                  {
                    key: locale,
                    type: "button",
                    variant: state.locale === locale ? "secondary" : "outline",
                    "aria-pressed": state.locale === locale,
                    onClick: () => demo.setLocale(locale),
                  },
                  () => locale,
                ),
              ),
          ),
          h(
            "form",
            {
              onSubmit: (event: Event) => {
                event.preventDefault();
                demo.apply();
              },
            },
            [
              h(L.LoongArkStack, { gap: "sm" }, () => [
                h(
                  L.LoongArkInputRoot,
                  {
                    state: state.error ? "invalid" : "default",
                    disabled: state.disabled,
                    readOnly: state.readOnly,
                  },
                  () => [
                    h(L.LoongArkInputLabel, {}, () => "Localized date"),
                    h(L.LoongArkInputInput, {
                      value: state.text,
                      onInput: (event: Event) =>
                        demo.setText(
                          (event.currentTarget as HTMLInputElement).value,
                        ),
                    }),
                    h(
                      L.LoongArkInputHelperText,
                      {},
                      () =>
                        "Use a four digit year; day and month follow the selected locale.",
                    ),
                    state.error
                      ? h(L.LoongArkInputErrorText, {}, () => state.error)
                      : null,
                  ],
                ),
                h(
                  L.LoongArkButton,
                  {
                    type: "submit",
                    disabled: state.disabled || state.readOnly,
                  },
                  () => "Apply parsed date",
                ),
              ]),
            ],
          ),
          h(
            "form",
            {
              onSubmit: (event: Event) => {
                event.preventDefault();
                demo.submit(event.currentTarget as HTMLFormElement);
              },
            },
            [
              h(L.LoongArkStack, { gap: "md" }, () => [
                h(L.LoongArkLocaleProvider, { locale: state.locale }, () =>
                  h(
                    L.LoongArkDateInputRoot,
                    {
                      name: "appointment",
                      dir: state.locale === "ar-EG" ? "rtl" : "ltr",
                      locale: state.locale,
                      modelValue: state.value,
                      "onUpdate:modelValue": (next: DateInputDateValue[]) =>
                        demo.setValue(next),
                      granularity: "second",
                      hourCycle: 24,
                      format: demo.format,
                      timeZone: state.zoned ? "Asia/Shanghai" : undefined,
                      disabled: state.disabled,
                      readOnly: state.readOnly,
                    },
                    () => [
                      h(
                        L.LoongArkDateInputLabel,
                        {},
                        () => "Appointment date and time",
                      ),
                      h(L.LoongArkDateInputControl, {}, () =>
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
                      ),
                      createVNode(
                        resolveDynamicComponent(L.LoongArkDateInputHiddenInput),
                      ),
                    ],
                  ),
                ),
                h(
                  L.LoongArkStack,
                  {
                    orientation: "horizontal",
                    gap: "sm",
                    style: { flexWrap: "wrap" },
                  },
                  () => [
                    h(
                      L.LoongArkButton,
                      { type: "submit", disabled: state.disabled },
                      () => "Submit appointment",
                    ),
                    button("Reset appointment", demo.reset),
                    button(
                      state.zoned ? "Use local date time" : "Use Shanghai time",
                      demo.toggleZone,
                    ),
                    button(
                      state.disabled
                        ? "Enable appointment"
                        : "Disable appointment",
                      demo.toggleDisabled,
                    ),
                    button(
                      state.readOnly ? "Make editable" : "Make read only",
                      demo.toggleReadOnly,
                    ),
                  ],
                ),
                h(
                  "output",
                  {
                    "aria-label": "Current appointment",
                    style: { overflowWrap: "anywhere" },
                  },
                  state.value[0]?.toString() ?? "No date",
                ),
                h(
                  "output",
                  {
                    "aria-label": "Submitted appointment",
                    style: { overflowWrap: "anywhere" },
                  },
                  state.submitted,
                ),
              ]),
            ],
          ),
        ],
      );
    };
  },
});
