import {
  parseLocalizedDate,
  parseDateTime,
  parseZonedDateTime,
} from "@loongark/kit";
export type DemoDateValue =
  | NonNullable<ReturnType<typeof parseLocalizedDate>>
  | ReturnType<typeof parseDateTime>
  | ReturnType<typeof parseZonedDateTime>;
export function createDateTimeDemo(changed: () => void) {
  let locale = "en-US",
    text = "October 6, 2026",
    error = "",
    disabled = false,
    readOnly = false,
    zoned = false;
  let value: DemoDateValue[] = [parseDateTime("2026-10-06T14:35:20")],
    submitted = "Not submitted";
  const notify = () => changed();
  return {
    get state() {
      return {
        locale,
        text,
        error,
        disabled,
        readOnly,
        zoned,
        value,
        submitted,
      };
    },
    format: (date: DemoDateValue) => date.toString(),
    setText(next: string) {
      text = next;
      error = "";
      notify();
    },
    setLocale(next: string) {
      locale = next;
      error = "";
      notify();
    },
    setValue(next: DemoDateValue[]) {
      value = next;
      notify();
    },
    apply() {
      if (disabled || readOnly) return;
      const date = parseLocalizedDate(text, { locale });
      if (!date) {
        error = "Enter a complete date using the selected locale.";
        notify();
        return;
      }
      const current = value[0];
      if (current && "hour" in current)
        value = [
          current.set({ year: date.year, month: date.month, day: date.day }),
        ];
      else value = [parseDateTime(date.toString() + "T14:35:20")];
      error = "";
      notify();
    },
    toggleZone() {
      const current = value[0];
      const wall =
        current && "hour" in current
          ? current
              .toString()
              .split("[")[0]
              .replace(/(?:Z|[+-]\d{2}:\d{2})$/, "")
          : "2026-10-06T14:35:20";
      zoned = !zoned;
      value = [
        zoned
          ? parseZonedDateTime(wall + "[Asia/Shanghai]")
          : parseDateTime(wall),
      ];
      notify();
    },
    toggleDisabled() {
      disabled = !disabled;
      notify();
    },
    toggleReadOnly() {
      readOnly = !readOnly;
      notify();
    },
    reset() {
      value = [
        zoned
          ? parseZonedDateTime("2026-10-06T14:35:20[Asia/Shanghai]")
          : parseDateTime("2026-10-06T14:35:20"),
      ];
      error = "";
      notify();
    },
    submit(form: HTMLFormElement) {
      submitted = String(new FormData(form).get("appointment") ?? "No date");
      notify();
    },
  };
}
