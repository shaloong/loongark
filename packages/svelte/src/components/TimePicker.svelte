<script lang="ts">
  import { untrack } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
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
  import Root from "./PopoverRoot.svelte";
  import Trigger from "./PopoverTrigger.svelte";
  import Positioner from "./PopoverPositioner.svelte";
  import Content from "./PopoverContent.svelte";
  import Title from "./PopoverTitle.svelte";
  import Close from "./PopoverCloseTrigger.svelte";
  import Portal from "./Portal.svelte";
  let {
    value = $bindable<string | undefined>(undefined),
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
  }: TimePickerOptions & HTMLAttributes<HTMLDivElement> = $props();
  const uid = $props.id();
  let internal = $state(untrack(() => defaultValue)),
    open = $state(false),
    hours = $state<HTMLSelectElement | null>(null);
  const current = $derived(value ?? internal),
    inputId = $derived(id ?? uid),
    options = $derived({ min, max, minuteStep, required }),
    view = $derived(timePickerView(current, options)),
    invalid = $derived(!validTime(current, options) && !!current);
  function change(next: string) {
    if (disabled || readOnly) return;
    if (value === undefined) internal = next;
    else value = next;
    onValueChange?.({ value: next, valid: validTime(next, options) });
  }
</script>

<div data-scope="time-picker" data-part="root" {...attrs}>
  <label data-scope="time-picker" data-part="label" for={inputId}>{label}</label
  >
  <Root
    open={disabled || readOnly ? false : open}
    onOpenChange={(details) => (open = details.open)}
    initialFocusEl={() => hours}
    lazyMount
    unmountOnExit
  >
    <div data-scope="time-picker" data-part="control">
      <input
        data-scope="time-picker"
        data-part="input"
        id={inputId}
        type="time"
        {name}
        value={parseTime(current)?.value ?? ""}
        {disabled}
        readonly={readOnly}
        {required}
        {min}
        {max}
        step={timeStep(minuteStep) * 60}
        aria-invalid={invalid ? "true" : undefined}
        aria-describedby={inputId + "-hint"}
        oninput={(e) => change(e.currentTarget.value)}
      /><Trigger
        type="button"
        disabled={disabled || readOnly || view.empty}
        aria-label={triggerLabel}><span aria-hidden="true">◷</span></Trigger
      >
    </div>
    <Portal
      ><Positioner
        ><Content
          ><div data-scope="time-picker" data-part="panel">
            <Title>{triggerLabel}</Title>
            <div data-scope="time-picker" data-part="segments">
              <label data-scope="time-picker" data-part="segment"
                >{hourLabel}<select
                  bind:this={hours}
                  value={view.hour}
                  onchange={(e) =>
                    change(
                      chooseTimeHour(
                        current,
                        Number(e.currentTarget.value),
                        options,
                      ),
                    )}
                  >{#each view.hours as hour}<option
                      value={hour.value}
                      disabled={hour.disabled}
                      >{formatTime(
                        timeValue(hour.value, 0),
                        locale,
                        hourCycle,
                        true,
                      )}</option
                    >{/each}</select
                ></label
              ><label data-scope="time-picker" data-part="segment"
                >{minuteLabel}<select
                  value={view.minute}
                  onchange={(e) =>
                    change(timeValue(view.hour, Number(e.currentTarget.value)))}
                  >{#each view.minutes as minute}<option
                      value={minute}
                      disabled={!validTime(
                        timeValue(view.hour, minute),
                        options,
                      )}>{String(minute).padStart(2, "0")}</option
                    >{/each}</select
                ></label
              >
            </div>
            <Close type="button" aria-label={doneLabel}>{doneLabel}</Close>
          </div></Content
        ></Positioner
      ></Portal
    >
  </Root>
  <div
    id={inputId + "-hint"}
    data-scope="time-picker"
    data-part={invalid ? "error" : "preview"}
    role={invalid ? "alert" : undefined}
  >
    {invalid ? invalidLabel : formatTime(current, locale, hourCycle) || "—"}
  </div>
</div>
