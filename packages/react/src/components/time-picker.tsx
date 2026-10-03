import { useState, useId, useRef, type HTMLAttributes } from "react";
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
const part = (name: string) => ({
  "data-scope": "time-picker",
  "data-part": name,
});
export type LoongArkTimePickerProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> &
  TimePickerOptions;
export function LoongArkTimePicker({
  value,
  defaultValue = "",
  name,
  id,
  disabled = false,
  readOnly = false,
  required = false,
  min,
  max,
  minuteStep = 1,
  locale = "en-US",
  hourCycle = "h23",
  label = "Time",
  hourLabel = "Hours",
  minuteLabel = "Minutes",
  triggerLabel = "Choose time",
  doneLabel = "Done",
  invalidLabel = "Enter a time within the allowed range and step.",
  onValueChange,
  ...attrs
}: LoongArkTimePickerProps) {
  const uid = useId(),
    inputId = id ?? uid,
    [internal, setInternal] = useState(defaultValue),
    [open, setOpen] = useState(false),
    hours = useRef<HTMLSelectElement>(null);
  const current = value ?? internal,
    options = { min, max, minuteStep, required },
    view = timePickerView(current, options),
    invalid = !validTime(current, options) && !!current;
  const change = (next: string) => {
    if (disabled || readOnly) return;
    if (value === undefined) setInternal(next);
    onValueChange?.({ value: next, valid: validTime(next, options) });
  };
  return (
    <div {...part("root")} {...attrs}>
      <label {...part("label")} htmlFor={inputId}>
        {label}
      </label>
      <LoongArkPopoverRoot
        open={disabled || readOnly ? false : open}
        onOpenChange={(details) => setOpen(details.open)}
        initialFocusEl={() => hours.current}
        lazyMount
        unmountOnExit
      >
        <div {...part("control")}>
          <input
            {...part("input")}
            id={inputId}
            type="time"
            name={name}
            value={parseTime(current)?.value ?? ""}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            min={min}
            max={max}
            step={timeStep(minuteStep) * 60}
            aria-invalid={invalid ? "true" : undefined}
            aria-describedby={inputId + "-hint"}
            onChange={(e) => change(e.currentTarget.value)}
          />
          <LoongArkPopoverTrigger
            asChild={false}
            type="button"
            disabled={disabled || readOnly || view.empty}
            aria-label={triggerLabel}
          >
            <span aria-hidden="true">◷</span>
          </LoongArkPopoverTrigger>
        </div>
        <LoongArkPopoverPositioner>
          <LoongArkPopoverContent>
            <div {...part("panel")}>
              <LoongArkPopoverTitle>{triggerLabel}</LoongArkPopoverTitle>
              <div {...part("segments")}>
                <label {...part("segment")}>
                  {hourLabel}
                  <select
                    ref={hours}
                    value={view.hour}
                    onChange={(e) =>
                      change(
                        chooseTimeHour(
                          current,
                          Number(e.currentTarget.value),
                          options,
                        ),
                      )
                    }
                  >
                    {view.hours.map((hour) => (
                      <option
                        key={hour.value}
                        value={hour.value}
                        disabled={hour.disabled}
                      >
                        {formatTime(
                          timeValue(hour.value, 0),
                          locale,
                          hourCycle,
                          true,
                        )}
                      </option>
                    ))}
                  </select>
                </label>
                <label {...part("segment")}>
                  {minuteLabel}
                  <select
                    value={view.minute}
                    onChange={(e) =>
                      change(
                        timeValue(view.hour, Number(e.currentTarget.value)),
                      )
                    }
                  >
                    {view.minutes.map((minute) => (
                      <option
                        key={minute}
                        value={minute}
                        disabled={
                          !validTime(timeValue(view.hour, minute), options)
                        }
                      >
                        {String(minute).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <LoongArkPopoverCloseTrigger type="button" aria-label={doneLabel}>
                {doneLabel}
              </LoongArkPopoverCloseTrigger>
            </div>
          </LoongArkPopoverContent>
        </LoongArkPopoverPositioner>
      </LoongArkPopoverRoot>
      <div
        id={inputId + "-hint"}
        {...part(invalid ? "error" : "preview")}
        role={invalid ? "alert" : undefined}
      >
        {invalid ? invalidLabel : formatTime(current, locale, hourCycle) || "—"}
      </div>
    </div>
  );
}
