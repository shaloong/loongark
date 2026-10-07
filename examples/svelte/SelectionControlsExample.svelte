<script lang="ts">
  import {
    groupsDisclosureCSS,
    groupsDisclosureIcon,
  } from "../shared/questionnaireGroupsDemo";
  import { controlIcons } from "@loongark/kit";
  import * as L from "@loongark/svelte";
  import {
    createSelectionControlsDemo,
    selectionOptions,
    selectionLabel,
    selectionControlLabels,
  } from "../shared/selectionControlsDemo";
  let revision = $state(0);
  const demo = createSelectionControlsDemo(() => revision++);
  const s = $derived.by(() => {
    revision;
    return demo.snapshot;
  });
</script>

<L.LoongArkStack gap="md" style="width:100%;max-width:640px">
  <svelte:element this={"style"}>{groupsDisclosureCSS}</svelte:element>
  <L.LoongArkTypography as="h2">Selection preferences</L.LoongArkTypography>
  <L.LoongArkTypography variant="muted"
    >Keyboard focus follows the visible control. Preferences retain native form
    values.</L.LoongArkTypography
  >
  <details data-groups-demo-controls>
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
    </L.LoongArkStack>
  </details>
  <L.LoongArkLocaleProvider locale={s.rtl ? "ar-EG" : "en-US"}>
    <form
      aria-label="Selection preferences"
      dir={s.rtl ? "rtl" : "ltr"}
      style="display:grid;gap:var(--lk-space-component-md)"
    >
      <L.LoongArkCheckboxRoot
        size={s.size}
        checked={s.checked}
        onCheckedChange={(d) => demo.check(d.checked)}
        name="agreement"
        disabled={s.disabled}
        readOnly={s.readOnly}
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
      <L.LoongArkSwitch.Root
        size={s.size}
        checked={s.notifications}
        onCheckedChange={(d) => demo.switch(d.checked)}
        name="notifications"
        disabled={s.disabled}
        readOnly={s.readOnly}
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
      <L.LoongArkRadioGroupRoot
        size={s.size}
        orientation={s.horizontal ? "horizontal" : "vertical"}
        value={s.density}
        onValueChange={(d) => demo.select(d.value)}
        name="density"
        disabled={s.disabled}
        readOnly={s.readOnly}
      >
        <L.LoongArkRadioGroupLabel>Display density</L.LoongArkRadioGroupLabel>
        {#each selectionOptions as value}<L.LoongArkRadioGroupItem {value}
            ><L.LoongArkRadioGroupItemControl /><L.LoongArkRadioGroupItemText
              >{selectionLabel(
                value,
                s.longLabels,
              )}</L.LoongArkRadioGroupItemText
            ><L.LoongArkRadioGroupItemHiddenInput /></L.LoongArkRadioGroupItem
          >{/each}
      </L.LoongArkRadioGroupRoot>

      <L.LoongArkTagsInputRoot
        name="frameworks"
        value={s.tags}
        disabled={s.disabled}
        readOnly={s.readOnly}
        onValueChange={(d) => demo.tags(d.value)}
      >
        <L.LoongArkTagsInputLabel>Frameworks</L.LoongArkTagsInputLabel
        ><L.LoongArkTagsInputControl>
          {#each s.tags as tag, index (tag)}<L.LoongArkTagsInputItem
              value={tag}
              {index}
              ><L.LoongArkTagsInputItemPreview
                ><L.LoongArkTagsInputItemText>{tag}</L.LoongArkTagsInputItemText
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
    </form>
  </L.LoongArkLocaleProvider>
</L.LoongArkStack>
