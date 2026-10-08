<script lang="ts">
  import { untrack } from "svelte";
  import * as L from "@loongark/svelte";
  import { createDateTimeDemo } from "../shared/dateTimeDemo";
  let revision = $state(0);
  const demo = createDateTimeDemo(() => untrack(() => revision++));
  const snapshot = $derived.by(() => {
    revision;
    return demo.state;
  });
</script>

<L.LoongArkStack gap="lg" style="width:100%;max-width:640px">
  <L.LoongArkTypography as="h2">Date and time</L.LoongArkTypography>
  <L.LoongArkTypography variant="muted"
    >Parse a date in your locale, then edit the date and time together. An
    explicit time zone is optional.</L.LoongArkTypography
  >
  <L.LoongArkStack orientation="horizontal" gap="sm" style="flex-wrap:wrap">
    {#each ["en-US", "en-GB", "zh-CN", "ar-EG"] as locale}<L.LoongArkButton
        type="button"
        variant={snapshot.locale === locale ? "secondary" : "outline"}
        aria-pressed={snapshot.locale === locale}
        onclick={() => demo.setLocale(locale)}>{locale}</L.LoongArkButton
      >{/each}
  </L.LoongArkStack>
  <form
    onsubmit={(event) => {
      event.preventDefault();
      demo.apply();
    }}
  >
    <L.LoongArkStack gap="sm">
      <L.LoongArkInputRoot
        state={snapshot.error ? "invalid" : "default"}
        disabled={snapshot.disabled}
        readOnly={snapshot.readOnly}
      >
        <L.LoongArkInputLabel>Localized date</L.LoongArkInputLabel>
        <L.LoongArkInputInput
          value={snapshot.text}
          oninput={(event) => demo.setText(event.currentTarget.value)}
        />
        <L.LoongArkInputHelperText
          >Use a four digit year; day and month follow the selected locale.</L.LoongArkInputHelperText
        >
        {#if snapshot.error}<L.LoongArkInputErrorText
            >{snapshot.error}</L.LoongArkInputErrorText
          >{/if}
      </L.LoongArkInputRoot>
      <L.LoongArkButton
        type="submit"
        disabled={snapshot.disabled || snapshot.readOnly}
        >Apply parsed date</L.LoongArkButton
      >
    </L.LoongArkStack>
  </form>
  <form
    onsubmit={(event) => {
      event.preventDefault();
      demo.submit(event.currentTarget);
    }}
  >
    <L.LoongArkStack gap="md">
      <L.LoongArkLocaleProvider locale={snapshot.locale}>
        <L.LoongArkDateInputRoot
          name="appointment"
          dir={snapshot.locale === "ar-EG" ? "rtl" : "ltr"}
          locale={snapshot.locale}
          bind:value={() => snapshot.value, (next) => demo.setValue(next ?? [])}
          granularity="second"
          hourCycle={24}
          format={demo.format}
          timeZone={snapshot.zoned ? "Asia/Shanghai" : undefined}
          disabled={snapshot.disabled}
          readOnly={snapshot.readOnly}
        >
          <L.LoongArkDateInputLabel
            >Appointment date and time</L.LoongArkDateInputLabel
          >
          <L.LoongArkDateInputControl
            ><L.LoongArkDateInputSegmentGroup
              ><L.LoongArkDateInputSegmentContext
                >{#snippet render(segment)}<L.LoongArkDateInputSegment {segment}
                    >{segment.text}</L.LoongArkDateInputSegment
                  >{/snippet}</L.LoongArkDateInputSegmentContext
              ></L.LoongArkDateInputSegmentGroup
            ></L.LoongArkDateInputControl
          >
          <L.LoongArkDateInputHiddenInput />
        </L.LoongArkDateInputRoot>
      </L.LoongArkLocaleProvider>
      <L.LoongArkStack orientation="horizontal" gap="sm" style="flex-wrap:wrap">
        <L.LoongArkButton type="submit" disabled={snapshot.disabled}
          >Submit appointment</L.LoongArkButton
        >
        <L.LoongArkButton type="button" variant="outline" onclick={demo.reset}
          >Reset appointment</L.LoongArkButton
        >
        <L.LoongArkButton
          type="button"
          variant="outline"
          onclick={demo.toggleZone}
          >{snapshot.zoned
            ? "Use local date time"
            : "Use Shanghai time"}</L.LoongArkButton
        >
        <L.LoongArkButton
          type="button"
          variant="outline"
          onclick={demo.toggleDisabled}
          >{snapshot.disabled
            ? "Enable appointment"
            : "Disable appointment"}</L.LoongArkButton
        >
        <L.LoongArkButton
          type="button"
          variant="outline"
          onclick={demo.toggleReadOnly}
          >{snapshot.readOnly
            ? "Make editable"
            : "Make read only"}</L.LoongArkButton
        >
      </L.LoongArkStack>
      <output aria-label="Current appointment" style="overflow-wrap:anywhere"
        >{snapshot.value[0]?.toString() ?? "No date"}</output
      >
      <output aria-label="Submitted appointment" style="overflow-wrap:anywhere"
        >{snapshot.submitted}</output
      >
    </L.LoongArkStack>
  </form>
</L.LoongArkStack>
