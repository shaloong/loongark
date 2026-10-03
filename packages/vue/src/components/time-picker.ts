import { defineComponent, h, ref, useId, type PropType } from "vue";
import {
  parseTime,
  timePickerView,
  chooseTimeHour,
  timeValue,
  timeStep,
  validTime,
  formatTime,
  type TimePickerOptions,
} from "@loongark/kit";
import {
  LoongArkPopoverRoot,
  LoongArkPopoverTrigger,
  LoongArkPopoverPositioner,
  LoongArkPopoverContent,
  LoongArkPopoverTitle,
  LoongArkPopoverCloseTrigger,
} from "./popover";
import { LoongArkPortal } from "./portal";
const part = (name: string) => ({
  "data-scope": "time-picker",
  "data-part": name,
});
export const LoongArkTimePicker = defineComponent({
  name: "LoongArkTimePicker",
  inheritAttrs: false,
  props: {
    value: { type: String, default: undefined },
    modelValue: { type: String, default: undefined },
    defaultValue: { type: String, default: "" },
    name: String,
    id: String,
    disabled: Boolean,
    readOnly: Boolean,
    required: Boolean,
    min: String,
    max: String,
    minuteStep: { type: Number, default: 1 },
    locale: { type: String, default: "en-US" },
    hourCycle: { type: String as PropType<"h12" | "h23">, default: "h23" },
    label: { type: String, default: "Time" },
    hourLabel: { type: String, default: "Hours" },
    minuteLabel: { type: String, default: "Minutes" },
    doneLabel: { type: String, default: "Done" },
    triggerLabel: { type: String, default: "Choose time" },
    invalidLabel: {
      type: String,
      default: "Enter a time within the allowed range and step.",
    },
    onValueChange: Function as PropType<TimePickerOptions["onValueChange"]>,
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    const uid = useId(),
      internal = ref(props.defaultValue),
      open = ref(false),
      hours = ref<HTMLSelectElement>();
    const inputId = () => props.id ?? uid,
      current = () => props.value ?? props.modelValue ?? internal.value;
    const change = (next: string) => {
      if (props.disabled || props.readOnly) return;
      if (props.value === undefined && props.modelValue === undefined)
        internal.value = next;
      props.onValueChange?.({ value: next, valid: validTime(next, props) });
      emit("update:modelValue", next);
    };
    const el = (
      component: any,
      attributes: Record<string, unknown>,
      ...children: any[]
    ) => h(component, attributes, () => children);
    return () => {
      const state = timePickerView(current(), props),
        invalid = !validTime(current(), props) && !!current();
      const hourSelect = h(
        "select",
        {
          ref: hours,
          value: state.hour,
          onChange: (event: Event) =>
            change(
              chooseTimeHour(
                current(),
                Number((event.target as HTMLSelectElement).value),
                props,
              ),
            ),
        },
        state.hours.map((hour) =>
          h(
            "option",
            { value: hour.value, disabled: hour.disabled },
            formatTime(
              timeValue(hour.value, 0),
              props.locale,
              props.hourCycle,
              true,
            ),
          ),
        ),
      );
      const minuteSelect = h(
        "select",
        {
          value: state.minute,
          onChange: (event: Event) =>
            change(
              timeValue(
                state.hour,
                Number((event.target as HTMLSelectElement).value),
              ),
            ),
        },
        state.minutes.map((minute) =>
          h(
            "option",
            {
              value: minute,
              disabled: !validTime(timeValue(state.hour, minute), props),
            },
            String(minute).padStart(2, "0"),
          ),
        ),
      );
      const panel = h("div", part("panel"), [
        el(LoongArkPopoverTitle, {}, props.triggerLabel),
        h("div", part("segments"), [
          h("label", part("segment"), [props.hourLabel, hourSelect]),
          h("label", part("segment"), [props.minuteLabel, minuteSelect]),
        ]),
        el(
          LoongArkPopoverCloseTrigger,
          { type: "button", "aria-label": props.doneLabel },
          props.doneLabel,
        ),
      ]);
      const portal = el(
        LoongArkPortal,
        {},
        el(
          LoongArkPopoverPositioner,
          {},
          el(LoongArkPopoverContent, {}, panel),
        ),
      );
      const control = h("div", part("control"), [
        h("input", {
          ...part("input"),
          id: inputId(),
          type: "time",
          name: props.name,
          value: parseTime(current())?.value ?? "",
          disabled: props.disabled,
          readonly: props.readOnly,
          required: props.required,
          min: props.min,
          max: props.max,
          step: timeStep(props.minuteStep) * 60,
          "aria-invalid": invalid ? "true" : undefined,
          "aria-describedby": inputId() + "-hint",
          onInput: (event: Event) =>
            change((event.target as HTMLInputElement).value),
        }),
        el(
          LoongArkPopoverTrigger,
          {},
          h(
            "button",
            {
              type: "button",
              disabled: props.disabled || props.readOnly || state.empty,
              "aria-label": props.triggerLabel,
            },
            h("span", { "aria-hidden": "true" }, "◷"),
          ),
        ),
      ]);
      return h("div", { ...part("root"), ...attrs }, [
        h("label", { ...part("label"), for: inputId() }, props.label),
        el(
          LoongArkPopoverRoot,
          {
            open: props.disabled || props.readOnly ? false : open.value,
            onOpenChange: (details: { open: boolean }) =>
              (open.value = details.open),
            initialFocusEl: () => hours.value,
            lazyMount: true,
            unmountOnExit: true,
          },
          control,
          portal,
        ),
        h(
          "div",
          {
            id: inputId() + "-hint",
            ...part(invalid ? "error" : "preview"),
            role: invalid ? "alert" : undefined,
          },
          invalid
            ? props.invalidLabel
            : formatTime(current(), props.locale, props.hourCycle) || "—",
        ),
      ]);
    };
  },
});
