<script lang="ts">
  import * as L from "@loongark/svelte";
  import type { DateInputDateValue } from "@loongark/svelte";
  let value = $state<DateInputDateValue[]>([L.parseDate("2026-10-03")]),
    disabled = $state(false),
    submitted = $state("Not submitted");
</script>

<L.LoongArkStack gap="lg" style="width:100%;max-width:640px">
  <L.LoongArkTypography as="h2">A date in segments</L.LoongArkTypography
  ><L.LoongArkTypography variant="muted"
    >Edit each date part with the arrow keys. Dates stay within October 2026.</L.LoongArkTypography
  >
  <form
    onsubmit={(event) => {
      event.preventDefault();
      submitted = String(
        new FormData(event.currentTarget).get("appointment") ?? "No date",
      );
    }}
  >
    <L.LoongArkStack gap="md">
      <L.LoongArkDateInputRoot
        name="appointment"
        locale="en-US"
        bind:value
        min={L.parseDate("2026-10-01")}
        max={L.parseDate("2026-10-31")}
        {disabled}
      >
        <L.LoongArkDateInputLabel>Appointment date</L.LoongArkDateInputLabel
        ><L.LoongArkDateInputControl
          ><L.LoongArkDateInputSegmentGroup
            ><L.LoongArkDateInputSegmentContext
              >{#snippet render(segment)}<L.LoongArkDateInputSegment {segment}
                  >{segment.text}</L.LoongArkDateInputSegment
                >{/snippet}</L.LoongArkDateInputSegmentContext
            ></L.LoongArkDateInputSegmentGroup
          ></L.LoongArkDateInputControl
        ><L.LoongArkDateInputHiddenInput />
      </L.LoongArkDateInputRoot><L.LoongArkStack
        orientation="horizontal"
        gap="sm"
        ><L.LoongArkButton type="submit" {disabled}
          >Submit date</L.LoongArkButton
        ><L.LoongArkButton
          type="button"
          variant="outline"
          onclick={() => (value = [L.parseDate("2026-10-03")])}
          >Reset date</L.LoongArkButton
        ><L.LoongArkButton
          type="button"
          variant="outline"
          onclick={() => (disabled = !disabled)}
          >{disabled ? "Enable date" : "Disable date"}</L.LoongArkButton
        ></L.LoongArkStack
      ><output aria-label="Submitted date">{submitted}</output>
    </L.LoongArkStack>
  </form>
  <L.LoongArkDateInputRoot
    selectionMode="range"
    name="trip"
    locale="en-US"
    defaultValue={[L.parseDate("2026-10-03"), L.parseDate("2026-10-07")]}
    ><L.LoongArkDateInputLabel>Travel dates</L.LoongArkDateInputLabel
    ><L.LoongArkDateInputControl
      >{#each [0, 1] as index}<L.LoongArkDateInputSegmentGroup
          {index}
          aria-label={index ? "End date" : "Start date"}
          ><L.LoongArkDateInputSegmentContext
            >{#snippet render(segment)}<L.LoongArkDateInputSegment {segment}
                >{segment.text}</L.LoongArkDateInputSegment
              >{/snippet}</L.LoongArkDateInputSegmentContext
          ></L.LoongArkDateInputSegmentGroup
        >{/each}</L.LoongArkDateInputControl
    ><L.LoongArkDateInputHiddenInput index={0} /><L.LoongArkDateInputHiddenInput
      index={1}
    /></L.LoongArkDateInputRoot
  >
</L.LoongArkStack>
