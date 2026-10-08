/** @jsxImportSource solid-js */
import { createSignal } from "solid-js";
import * as L from "@loongark/solid";
export function DateInputExample() {
  const [value, setValue] = createSignal([L.parseDate("2026-10-03")]);
  const [disabled, setDisabled] = createSignal(false),
    [submitted, setSubmitted] = createSignal("Not submitted");
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", "max-width": "640px" }}>
      <L.LoongArkTypography as="h2">A date in segments</L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        Edit each date part with the arrow keys. Dates stay within October 2026.
      </L.LoongArkTypography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(
            String(
              new FormData(event.currentTarget).get("appointment") ?? "No date",
            ),
          );
        }}
      >
        <L.LoongArkStack gap="md">
          <L.LoongArkDateInputRoot
            name="appointment"
            locale="en-US"
            value={value()}
            onValueChange={(details) => setValue(details.value)}
            min={L.parseDate("2026-10-01")}
            max={L.parseDate("2026-10-31")}
            disabled={disabled()}
          >
            <L.LoongArkDateInputLabel>
              Appointment date
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
          <L.LoongArkStack orientation="horizontal" gap="sm">
            <L.LoongArkButton type="submit" disabled={disabled()}>
              Submit date
            </L.LoongArkButton>
            <L.LoongArkButton
              type="button"
              variant="outline"
              onClick={() => setValue([L.parseDate("2026-10-03")])}
            >
              Reset date
            </L.LoongArkButton>
            <L.LoongArkButton
              type="button"
              variant="outline"
              onClick={() => setDisabled(!disabled())}
            >
              {disabled() ? "Enable date" : "Disable date"}
            </L.LoongArkButton>
          </L.LoongArkStack>
          <output aria-label="Submitted date">{submitted()}</output>
        </L.LoongArkStack>
      </form>
      <L.LoongArkDateInputRoot
        selectionMode="range"
        name="trip"
        locale="en-US"
        defaultValue={[L.parseDate("2026-10-03"), L.parseDate("2026-10-07")]}
      >
        <L.LoongArkDateInputLabel>Travel dates</L.LoongArkDateInputLabel>
        <L.LoongArkDateInputControl>
          {[0, 1].map((index) => (
            <L.LoongArkDateInputSegmentGroup
              index={index}
              aria-label={index ? "End date" : "Start date"}
            >
              <L.LoongArkDateInputSegmentContext>
                {(segment) => (
                  <L.LoongArkDateInputSegment segment={segment}>
                    {segment.text}
                  </L.LoongArkDateInputSegment>
                )}
              </L.LoongArkDateInputSegmentContext>
            </L.LoongArkDateInputSegmentGroup>
          ))}
        </L.LoongArkDateInputControl>
        <L.LoongArkDateInputHiddenInput index={0} />
        <L.LoongArkDateInputHiddenInput index={1} />
      </L.LoongArkDateInputRoot>
    </L.LoongArkStack>
  );
}
