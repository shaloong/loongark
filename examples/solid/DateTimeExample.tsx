/** @jsxImportSource solid-js */
import { createSignal, createMemo, For, Show } from "solid-js";
import * as L from "@loongark/solid";
import { createDateTimeDemo } from "../shared/dateTimeDemo";
export function DateTimeExample() {
  const [revision, redraw] = createSignal(0);
  const demo = createDateTimeDemo(() => redraw((value) => value + 1));
  const state = createMemo(() => {
    revision();
    return demo.state;
  });
  const button = (label: string | (() => string), action: () => void) => (
    <L.LoongArkButton type="button" variant="outline" onClick={action}>
      {typeof label === "function" ? label() : label}
    </L.LoongArkButton>
  );
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", "max-width": "640px" }}>
      <L.LoongArkTypography as="h2">Date and time</L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        Parse a date in your locale, then edit the date and time together. An
        explicit time zone is optional.
      </L.LoongArkTypography>
      <L.LoongArkStack
        orientation="horizontal"
        gap="sm"
        style={{ "flex-wrap": "wrap" }}
      >
        <For each={["en-US", "en-GB", "zh-CN", "ar-EG"]}>
          {(locale) => (
            <L.LoongArkButton
              type="button"
              variant={state().locale === locale ? "secondary" : "outline"}
              aria-pressed={state().locale === locale}
              onClick={() => demo.setLocale(locale)}
            >
              {locale}
            </L.LoongArkButton>
          )}
        </For>
      </L.LoongArkStack>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          demo.apply();
        }}
      >
        <L.LoongArkStack gap="sm">
          <L.LoongArkInputRoot
            state={state().error ? "invalid" : "default"}
            disabled={state().disabled}
            readOnly={state().readOnly}
          >
            <L.LoongArkInputLabel>Localized date</L.LoongArkInputLabel>
            <L.LoongArkInputInput
              value={state().text}
              onInput={(event) => demo.setText(event.currentTarget.value)}
            />
            <L.LoongArkInputHelperText>
              Use a four digit year; day and month follow the selected locale.
            </L.LoongArkInputHelperText>
            <Show when={state().error}>
              <L.LoongArkInputErrorText>
                {state().error}
              </L.LoongArkInputErrorText>
            </Show>
          </L.LoongArkInputRoot>
          <L.LoongArkButton
            type="submit"
            disabled={state().disabled || state().readOnly}
          >
            Apply parsed date
          </L.LoongArkButton>
        </L.LoongArkStack>
      </form>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          demo.submit(event.currentTarget);
        }}
      >
        <L.LoongArkStack gap="md">
          <L.LoongArkLocaleProvider locale={state().locale}>
            <L.LoongArkDateInputRoot
              name="appointment"
              dir={state().locale === "ar-EG" ? "rtl" : "ltr"}
              locale={state().locale}
              value={state().value}
              onValueChange={(details) => demo.setValue(details.value)}
              granularity="second"
              hourCycle={24}
              format={demo.format}
              timeZone={state().zoned ? "Asia/Shanghai" : undefined}
              disabled={state().disabled}
              readOnly={state().readOnly}
            >
              <L.LoongArkDateInputLabel>
                Appointment date and time
              </L.LoongArkDateInputLabel>
              <L.LoongArkDateInputControl>
                <L.LoongArkDateInputSegmentGroup>
                  <L.LoongArkDateInputSegmentContext>
                    {(segment) => (
                      <L.LoongArkDateInputSegment segment={segment}>
                        {segment.text}
                      </L.LoongArkDateInputSegment>
                    )}
                  </L.LoongArkDateInputSegmentContext>
                </L.LoongArkDateInputSegmentGroup>
              </L.LoongArkDateInputControl>
              <L.LoongArkDateInputHiddenInput />
            </L.LoongArkDateInputRoot>
          </L.LoongArkLocaleProvider>
          <L.LoongArkStack
            orientation="horizontal"
            gap="sm"
            style={{ "flex-wrap": "wrap" }}
          >
            <L.LoongArkButton type="submit" disabled={state().disabled}>
              Submit appointment
            </L.LoongArkButton>
            {button("Reset appointment", demo.reset)}
            {button(
              () =>
                state().zoned ? "Use local date time" : "Use Shanghai time",
              demo.toggleZone,
            )}
            {button(
              () =>
                state().disabled ? "Enable appointment" : "Disable appointment",
              demo.toggleDisabled,
            )}
            {button(
              () => (state().readOnly ? "Make editable" : "Make read only"),
              demo.toggleReadOnly,
            )}
          </L.LoongArkStack>
          <output
            aria-label="Current appointment"
            style={{ "overflow-wrap": "anywhere" }}
          >
            {state().value[0]?.toString() ?? "No date"}
          </output>
          <output
            aria-label="Submitted appointment"
            style={{ "overflow-wrap": "anywhere" }}
          >
            {state().submitted}
          </output>
        </L.LoongArkStack>
      </form>
    </L.LoongArkStack>
  );
}
