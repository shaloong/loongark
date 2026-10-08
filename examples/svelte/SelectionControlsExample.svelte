<script lang="ts">
  import {
    groupsDisclosureCSS,
    groupsDisclosureIcon,
  } from "../shared/questionnaireGroupsDemo";
  import type { Snippet } from "svelte";
  let { field = false }: { field?: boolean } = $props();
  import { controlIcons } from "@loongark/kit";
  import * as L from "@loongark/svelte";
  import {
    createSelectionControlsDemo,
    selectionOptions,
    selectionLabel,
    selectionControlLabels,
    selectionFieldControls,
    selectionFieldText,
    selectionOwnFlags,
    selectionOwnRadioFlags,
    type SelectionFieldKind,
  } from "../shared/selectionControlsDemo";
  let revision = $state(0);
  const demo = createSelectionControlsDemo(() => revision++);
  const s = $derived.by(() => {
    revision;
    return demo.snapshot;
  });
  const ownFlags = $derived(selectionOwnFlags(s, field));
</script>

{#snippet wrapField(kind: SelectionFieldKind, children: Snippet)}
  {#if field && kind === "radio-group"}
    <L.LoongArkFieldsetRoot
      disabled={s.disabled}
      invalid={s.fieldInvalid}
      data-testid="field-radio-group"
    >
      <L.LoongArkFieldsetLegend>Display density</L.LoongArkFieldsetLegend>
      <div style="display:grid;gap:var(--lk-space-component-xs)">
        {@render children()}
        <L.LoongArkFieldsetHelperText
          >{selectionFieldText[kind].hint}</L.LoongArkFieldsetHelperText
        >
        <L.LoongArkFieldsetErrorText
          >{selectionFieldText[kind].error}</L.LoongArkFieldsetErrorText
        >
      </div>
    </L.LoongArkFieldsetRoot>
  {:else if field}<L.LoongArkFieldRoot
      disabled={s.disabled}
      readOnly={s.readOnly}
      required={s.fieldRequired}
      invalid={s.fieldInvalid}
      data-testid={`field-${kind}`}
      style="display:grid;gap:var(--lk-space-component-xs)"
    >
      {@render children()}<L.LoongArkFieldHelperText
        >{selectionFieldText[kind].hint}</L.LoongArkFieldHelperText
      ><L.LoongArkFieldErrorText
        >{selectionFieldText[kind].error}</L.LoongArkFieldErrorText
      >
    </L.LoongArkFieldRoot>{:else}{@render children()}{/if}
{/snippet}
<L.LoongArkStack gap="md" style="width:100%;max-width:640px">
  <svelte:element this={"style"}>{groupsDisclosureCSS}</svelte:element>
  <L.LoongArkTypography as="h2"
    >{field
      ? "Field preferences"
      : "Selection preferences"}</L.LoongArkTypography
  >
  <L.LoongArkTypography variant="muted"
    >Keyboard focus follows the visible control. Preferences retain native form
    values.</L.LoongArkTypography
  >
  <details data-groups-demo-controls open={field || undefined}>
    <summary
      ><L.LoongArkIcon icon={groupsDisclosureIcon} size="sm" />More controls</summary
    ><L.LoongArkStack orientation="horizontal" gap="sm" style="flex-wrap:wrap">
      {#each ["sm", "md", "lg"] as const as size}<L.LoongArkButton
          variant="outline"
          on:click={() => demo.setSize(size)}>Size {size}</L.LoongArkButton
        >{/each}
      {#each ["horizontal", "rtl", "longLabels", "disabled", "readOnly", "reject"] as const as key}<L.LoongArkButton
          variant="outline"
          aria-pressed={s[key]}
          on:click={() => demo.toggle(key)}
          >{selectionControlLabels[key]}</L.LoongArkButton
        >{/each}
      {#if field}{#each Object.keys(selectionFieldControls) as Array<keyof typeof selectionFieldControls> as key}<L.LoongArkButton
            variant="outline"
            aria-pressed={s[key]}
            on:click={() => demo.toggle(key)}
            >{selectionFieldControls[key]}</L.LoongArkButton
          >{/each}{/if}
    </L.LoongArkStack>
  </details>
  <L.LoongArkLocaleProvider locale={s.rtl ? "ar-EG" : "en-US"}>
    <form
      aria-label={field ? "Field preferences" : "Selection preferences"}
      onsubmit={(event) => {
        event.preventDefault();
        demo.submit(event.currentTarget);
      }}
      dir={s.rtl ? "rtl" : "ltr"}
      style="display:grid;gap:var(--lk-space-component-md)"
    >
      {#snippet checkbox()}
        <L.LoongArkCheckboxRoot
          size={s.size}
          checked={s.checked}
          onCheckedChange={(d) => demo.check(d.checked)}
          name="agreement"
          {...ownFlags}
        >
          <L.LoongArkCheckboxControl
            ><L.LoongArkCheckboxIndicator /></L.LoongArkCheckboxControl
          ><L.LoongArkCheckboxLabel
            >{selectionLabel(
              "Accept updates",
              s.longLabels,
            )}</L.LoongArkCheckboxLabel
          ><L.LoongArkCheckboxHiddenInput />
        </L.LoongArkCheckboxRoot>
      {/snippet}
      {@render wrapField("checkbox", checkbox)}
      {#snippet switchControl()}
        <L.LoongArkSwitch.Root
          size={s.size}
          checked={s.notifications}
          onCheckedChange={(d) => demo.switch(d.checked)}
          name="notifications"
          {...ownFlags}
        >
          <L.LoongArkSwitch.Control size={s.size}
            ><L.LoongArkSwitch.Thumb size={s.size} /></L.LoongArkSwitch.Control
          ><L.LoongArkSwitch.Label
            >{selectionLabel(
              "Notifications",
              s.longLabels,
            )}</L.LoongArkSwitch.Label
          ><L.LoongArkSwitch.HiddenInput />
        </L.LoongArkSwitch.Root>
      {/snippet}
      {@render wrapField("switch", switchControl)}
      {#snippet radios()}
        <L.LoongArkRadioGroupRoot
          size={s.size}
          orientation={s.horizontal ? "horizontal" : "vertical"}
          defaultValue={field ? "compact" : undefined}
          value={s.density}
          onValueChange={(d) => demo.select(d.value)}
          name="density"
          {...selectionOwnRadioFlags(s, field)}
        >
          {#if !field}<L.LoongArkRadioGroupLabel
              >Display density</L.LoongArkRadioGroupLabel
            >{/if}
          {#each selectionOptions as value}<L.LoongArkRadioGroupItem {value}
              ><L.LoongArkRadioGroupItemControl /><L.LoongArkRadioGroupItemText
                >{selectionLabel(
                  value,
                  s.longLabels,
                )}</L.LoongArkRadioGroupItemText
              ><L.LoongArkRadioGroupItemHiddenInput /></L.LoongArkRadioGroupItem
            >{/each}
        </L.LoongArkRadioGroupRoot>
      {/snippet}
      {@render wrapField("radio-group", radios)}

      {#snippet tags()}
        <L.LoongArkTagsInputRoot
          name="frameworks"
          defaultValue={field ? ["React", "Vue", "Solid"] : undefined}
          value={s.tags}
          {...ownFlags}
          onValueChange={(d) => demo.tags(d.value)}
        >
          <L.LoongArkTagsInputLabel>Frameworks</L.LoongArkTagsInputLabel
          ><L.LoongArkTagsInputControl>
            {#each s.tags as tag, index (tag)}<L.LoongArkTagsInputItem
                value={tag}
                {index}
                ><L.LoongArkTagsInputItemPreview
                  ><L.LoongArkTagsInputItemText
                    >{tag}</L.LoongArkTagsInputItemText
                  ><L.LoongArkTagsInputItemDeleteTrigger
                    ><L.LoongArkIcon
                      icon={controlIcons.close}
                      size="sm"
                    /></L.LoongArkTagsInputItemDeleteTrigger
                  ></L.LoongArkTagsInputItemPreview
                ></L.LoongArkTagsInputItem
              >{/each}
            <L.LoongArkTagsInputInput
              placeholder="Add framework"
            /><L.LoongArkTagsInputClearTrigger
              >Clear frameworks</L.LoongArkTagsInputClearTrigger
            >
          </L.LoongArkTagsInputControl><L.LoongArkTagsInputHiddenInput />
        </L.LoongArkTagsInputRoot>
      {/snippet}
      {@render wrapField("tags-input", tags)}
      {#if field}<L.LoongArkStack orientation="horizontal" gap="sm"
          ><L.LoongArkButton type="submit">Submit preferences</L.LoongArkButton
          ><L.LoongArkButton type="reset" variant="outline"
            >Reset preferences</L.LoongArkButton
          ></L.LoongArkStack
        >{/if}
    </form>
  </L.LoongArkLocaleProvider>
  {#if field}<output
      aria-label="Submitted preferences"
      style="overflow-wrap:anywhere">{JSON.stringify(s.submitted)}</output
    >{/if}
</L.LoongArkStack>
