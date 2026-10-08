<script lang="ts">
  import * as L from "@loongark/svelte";
  import { controlIcons } from "@loongark/kit";
  import {
    createInputAdornmentDemo,
    adornmentControls,
    adornmentSizes,
    adornmentLabel,
    adornmentCSS,
  } from "../shared/inputAdornmentDemo";
  let revision = $state(0);
  const demo = createInputAdornmentDemo(() => revision++);
  const s = $derived.by(() => {
    revision;
    return demo.snapshot;
  });
</script>

<section data-input-adornments dir={s.rtl ? "rtl" : "ltr"}>
  <svelte:element this={"style"}>{adornmentCSS}</svelte:element>
  <div data-demo-controls>
    {#each adornmentControls as [key, label]}<L.LoongArkButton
        size="sm"
        variant="outline"
        aria-pressed={s[key]}
        onclick={() => demo.toggle(key)}>{label}</L.LoongArkButton
      >{/each}
  </div>
  <div data-demo-fields>
    {#each adornmentSizes as size}<L.LoongArkInputRoot
        {size}
        disabled={s.disabled}
        readOnly={s.readOnly}
        state={s.invalid ? "invalid" : "default"}
      >
        <L.LoongArkInputLabel
          >{adornmentLabel(size, s.long)}</L.LoongArkInputLabel
        >
        <L.LoongArkInputGroup>
          <L.LoongArkInputPrefix
            ><L.LoongArkIcon
              icon={controlIcons.search}
              size="sm"
            /></L.LoongArkInputPrefix
          >
          <L.LoongArkInputControl
            name={`search-${size}`}
            value={s.values[size]}
            oninput={(event) => demo.update(size, event.currentTarget.value)}
          />
          <L.LoongArkInputSuffix
            action={s.inspect ? "button" : "clear"}
            disabled={s.override ? false : undefined}
            aria-label={`${s.inspect ? "View" : "Clear"} search ${size}`}
            onclick={() => demo.activate(size)}
            >{#if s.inspect}View{:else}<L.LoongArkIcon
                icon={controlIcons.close}
                size="sm"
              />{/if}</L.LoongArkInputSuffix
          >
        </L.LoongArkInputGroup>
        <L.LoongArkInputHelperText
          >Search by project name.</L.LoongArkInputHelperText
        >
        <L.LoongArkInputErrorText
          >Review the search term.</L.LoongArkInputErrorText
        >
      </L.LoongArkInputRoot>{/each}
  </div>
  <output aria-label="Viewed search value">{s.inspected}</output>
</section>
