export interface ParsedTime {
  hour: number;
  minute: number;
  total: number;
  value: string;
}
export interface TimeChangeDetails {
  value: string;
  valid: boolean;
}
export interface TimePickerOptions {
  value?: string;
  defaultValue?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  min?: string;
  max?: string;
  minuteStep?: number;
  locale?: string;
  hourCycle?: "h12" | "h23";
  label?: string;
  hourLabel?: string;
  minuteLabel?: string;
  triggerLabel?: string;
  doneLabel?: string;
  invalidLabel?: string;
  onValueChange?: (details: TimeChangeDetails) => void;
}
export function parseTime(value: string): ParsedTime | undefined {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value);
  if (!match) return;
  const hour = Number(match[1]),
    minute = Number(match[2]);
  if (hour > 23 || minute > 59) return;
  return {
    hour,
    minute,
    total: hour * 60 + minute,
    value:
      String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0"),
  };
}
export function timeValue(hour: number, minute: number) {
  return String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0");
}
export function timeStep(step = 1) {
  if (!Number.isInteger(step) || step < 1 || step > 60 || 60 % step)
    throw new Error("minuteStep must be a positive divisor of 60");
  return step;
}
export function validTime(
  value: string,
  options: Pick<
    TimePickerOptions,
    "min" | "max" | "minuteStep" | "required"
  > = {},
) {
  const step = timeStep(options.minuteStep);
  if (!value) return !options.required;
  const time = parseTime(value);
  if (!time) return false;
  const min = options.min ? parseTime(options.min) : undefined,
    max = options.max ? parseTime(options.max) : undefined;
  if ((options.min && !min) || (options.max && !max))
    throw new Error("TimePicker min/max must be valid HH:mm times");
  const inRange =
    min && max && min.total > max.total
      ? time.total >= min.total || time.total <= max.total
      : (!min || time.total >= min.total) && (!max || time.total <= max.total);
  const base = min?.total ?? 0;
  return inRange && ((time.total - base + 1440) % 1440) % step === 0;
}
export function timePickerView(value: string, options: TimePickerOptions = {}) {
  const step = timeStep(options.minuteStep),
    base = parseTime(options.min ?? "")?.minute ?? 0;
  const minutes = Array.from({ length: 60 }, (_, i) => i).filter(
    (i) => (i - base + 60) % step === 0,
  );
  const available = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    minutes: minutes.filter((minute) =>
      validTime(timeValue(hour, minute), options),
    ),
  }));
  const parsed = parseTime(value),
    preferred = parsed?.hour ?? 9;
  const hour = available[preferred]?.minutes.length
    ? preferred
    : (available.find((x) => x.minutes.length)?.hour ?? 0);
  const choices = available[hour].minutes,
    minute = choices.includes(parsed?.minute ?? 0)
      ? (parsed?.minute ?? 0)
      : (choices[0] ?? 0);
  return {
    hour,
    minute,
    minutes,
    hours: available.map((x) => ({
      value: x.hour,
      disabled: !x.minutes.length,
    })),
    empty: !available.some((x) => x.minutes.length),
  };
}
export function chooseTimeHour(
  value: string,
  hour: number,
  options: TimePickerOptions = {},
) {
  const view = timePickerView(value, options),
    minutes = view.minutes.filter((minute) =>
      validTime(timeValue(hour, minute), options),
    );
  const preferred = parseTime(value)?.minute ?? view.minute;
  return minutes.length
    ? timeValue(hour, minutes.includes(preferred) ? preferred : minutes[0])
    : value;
}
export function formatTime(
  value: string,
  locale = "en-US",
  hourCycle: "h12" | "h23" = "h23",
  hourOnly = false,
) {
  const parsed = parseTime(value);
  if (!parsed) return "";
  return new Intl.DateTimeFormat(locale, {
    hour: hourCycle === "h12" ? "numeric" : "2-digit",
    ...(hourOnly ? {} : { minute: "2-digit" }),
    hourCycle,
    timeZone: "UTC",
  }).format(new Date(Date.UTC(2000, 0, 1, parsed.hour, parsed.minute)));
}
