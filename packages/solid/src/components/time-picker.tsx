import {
  createSignal,
  createUniqueId,
  splitProps,
  For,
  type JSX,
} from "solid-js";
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
export type LoongArkTimePickerProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  "onChange"
> &
  TimePickerOptions;
export function LoongArkTimePicker(props: LoongArkTimePickerProps) {
  const [local, attrs] = splitProps(props, [
    "value",
    "defaultValue",
    "name",
    "id",
    "disabled",
    "readOnly",
    "required",
    "min",
    "max",
    "minuteStep",
    "locale",
    "hourCycle",
    "label",
    "hourLabel",
    "minuteLabel",
    "triggerLabel",
    "doneLabel",
    "invalidLabel",
    "onValueChange",
  ]);
  const uid = createUniqueId(),
    inputId = () => local.id ?? uid,
    [internal, setInternal] = createSignal(local.defaultValue ?? ""),
    [open, setOpen] = createSignal(false);
  let hours!: HTMLSelectElement;
  const current = () => local.value ?? internal(),
    view = () => timePickerView(current(), local),
    invalid = () => !validTime(current(), local) && !!current(),
    locale = () => local.locale ?? "en-US",
    cycle = () => local.hourCycle ?? "h23",
    triggerLabel = () => local.triggerLabel ?? "Choose time";
  const change = (next: string) => {
    if (local.disabled || local.readOnly) return;
    if (local.value === undefined) setInternal(next);
    local.onValueChange?.({ value: next, valid: validTime(next, local) });
  };
  return (
    <div {...part("root")} {...attrs}>
      <label {...part("label")} for={inputId()}>
        {local.label ?? "Time"}
      </label>
      <LoongArkPopoverRoot
        open={local.disabled || local.readOnly ? false : open()}
        onOpenChange={(details) => setOpen(details.open)}
        initialFocusEl={() => hours}
        lazyMount
        unmountOnExit
      >
        <div {...part("control")}>
          <input
            {...part("input")}
            id={inputId()}
            type="time"
            name={local.name}
            value={parseTime(current())?.value ?? ""}
            disabled={local.disabled}
            readOnly={local.readOnly}
            required={local.required}
            min={local.min}
            max={local.max}
            step={timeStep(local.minuteStep) * 60}
            aria-invalid={invalid() ? "true" : undefined}
            aria-describedby={inputId() + "-hint"}
            onInput={(e) => change(e.currentTarget.value)}
          />
          <LoongArkPopoverTrigger
            type="button"
            disabled={local.disabled || local.readOnly || view().empty}
            aria-label={triggerLabel()}
          >
            <span aria-hidden="true">◷</span>
          </LoongArkPopoverTrigger>
        </div>
        <LoongArkPortal>
          <LoongArkPopoverPositioner>
            <LoongArkPopoverContent>
              <div {...part("panel")}>
                <LoongArkPopoverTitle>{triggerLabel()}</LoongArkPopoverTitle>
                <div {...part("segments")}>
                  <label {...part("segment")}>
                    {local.hourLabel ?? "Hours"}
                    <select
                      ref={hours}
                      value={view().hour}
                      onChange={(e) =>
                        change(
                          chooseTimeHour(
                            current(),
                            Number(e.currentTarget.value),
                            local,
                          ),
                        )
                      }
                    >
                      <For each={view().hours}>
                        {(hour) => (
                          <option value={hour.value} disabled={hour.disabled}>
                            {formatTime(
                              timeValue(hour.value, 0),
                              locale(),
                              cycle(),
                              true,
                            )}
                          </option>
                        )}
                      </For>
                    </select>
                  </label>
                  <label {...part("segment")}>
                    {local.minuteLabel ?? "Minutes"}
                    <select
                      value={view().minute}
                      onChange={(e) =>
                        change(
                          timeValue(view().hour, Number(e.currentTarget.value)),
                        )
                      }
                    >
                      <For each={view().minutes}>
                        {(minute) => (
                          <option
                            value={minute}
                            disabled={
                              !validTime(timeValue(view().hour, minute), local)
                            }
                          >
                            {String(minute).padStart(2, "0")}
                          </option>
                        )}
                      </For>
                    </select>
                  </label>
                </div>
                <LoongArkPopoverCloseTrigger
                  type="button"
                  aria-label={local.doneLabel ?? "Done"}
                >
                  {local.doneLabel ?? "Done"}
                </LoongArkPopoverCloseTrigger>
              </div>
            </LoongArkPopoverContent>
          </LoongArkPopoverPositioner>
        </LoongArkPortal>
      </LoongArkPopoverRoot>
      <div
        id={inputId() + "-hint"}
        {...part(invalid() ? "error" : "preview")}
        role={invalid() ? "alert" : undefined}
      >
        {invalid()
          ? (local.invalidLabel ??
            "Enter a time within the allowed range and step.")
          : formatTime(current(), locale(), cycle()) || "—"}
      </div>
    </div>
  );
}
