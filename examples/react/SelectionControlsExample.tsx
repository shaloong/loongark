import {
  groupsDisclosureCSS,
  groupsDisclosureIcon,
} from "../shared/questionnaireGroupsDemo";
import { controlIcons } from "@loongark/kit";
import React from "react";
import * as L from "@loongark/react";
import {
  createSelectionControlsDemo,
  selectionOptions,
  selectionLabel,
  selectionControlLabels,
} from "../shared/selectionControlsDemo";
export function SelectionControlsExample() {
  const [, redraw] = React.useReducer((v: number) => v + 1, 0);
  const [demo] = React.useState(() => createSelectionControlsDemo(redraw));
  const s = demo.snapshot;
  return (
    <L.LoongArkStack gap="md" style={{ width: "100%", maxWidth: "640px" }}>
      <style>{groupsDisclosureCSS}</style>
      <L.LoongArkTypography as="h2">Selection preferences</L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        Keyboard focus follows the visible control. Preferences retain native
        form values.
      </L.LoongArkTypography>
      <details data-groups-demo-controls>
        <summary>
          <L.LoongArkIcon icon={groupsDisclosureIcon} size="sm" />
          More controls
        </summary>
        <L.LoongArkStack
          orientation="horizontal"
          gap="sm"
          style={{ flexWrap: "wrap" }}
        >
          {(["sm", "md", "lg"] as const).map((size) => (
            <L.LoongArkButton
              key={size}
              variant="outline"
              onClick={() => demo.setSize(size)}
            >
              Size {size}
            </L.LoongArkButton>
          ))}
          {(
            [
              "horizontal",
              "rtl",
              "longLabels",
              "disabled",
              "readOnly",
              "reject",
            ] as const
          ).map((key) => (
            <L.LoongArkButton
              key={selectionControlLabels[key]}
              variant="outline"
              aria-pressed={s[key]}
              onClick={() => demo.toggle(key)}
            >
              {selectionControlLabels[key]}
            </L.LoongArkButton>
          ))}
        </L.LoongArkStack>
      </details>
      <L.LoongArkLocaleProvider locale={s.rtl ? "ar-EG" : "en-US"}>
        <form
          aria-label="Selection preferences"
          dir={s.rtl ? "rtl" : "ltr"}
          style={{ display: "grid", gap: "var(--lk-space-component-md)" }}
        >
          <L.LoongArkCheckboxRoot
            size={s.size}
            checked={s.checked}
            onCheckedChange={(d) => demo.check(d.checked)}
            name="agreement"
            disabled={s.disabled}
            readOnly={s.readOnly}
          >
            <L.LoongArkCheckboxControl>
              <L.LoongArkCheckboxIndicator />
            </L.LoongArkCheckboxControl>
            <L.LoongArkCheckboxLabel>
              {selectionLabel("Accept updates", s.longLabels)}
            </L.LoongArkCheckboxLabel>
            <L.LoongArkCheckboxHiddenInput />
          </L.LoongArkCheckboxRoot>
          <L.LoongArkSwitchRoot
            size={s.size}
            checked={s.notifications}
            onCheckedChange={(d) => demo.switch(d.checked)}
            name="notifications"
            disabled={s.disabled}
            readOnly={s.readOnly}
          >
            <L.LoongArkSwitchControl size={s.size}>
              <L.LoongArkSwitchThumb size={s.size} />
            </L.LoongArkSwitchControl>
            <L.LoongArkSwitchLabel>
              {selectionLabel("Notifications", s.longLabels)}
            </L.LoongArkSwitchLabel>
            <L.LoongArkSwitchHiddenInput />
          </L.LoongArkSwitchRoot>
          <L.LoongArkRadioGroupRoot
            size={s.size}
            orientation={s.horizontal ? "horizontal" : "vertical"}
            value={s.density}
            onValueChange={(d) => demo.select(d.value)}
            name="density"
            disabled={s.disabled}
            readOnly={s.readOnly}
          >
            <L.LoongArkRadioGroupLabel>
              Display density
            </L.LoongArkRadioGroupLabel>
            {selectionOptions.map((value) => (
              <L.LoongArkRadioGroupItem key={value} value={value}>
                <L.LoongArkRadioGroupItemControl />
                <L.LoongArkRadioGroupItemText>
                  {selectionLabel(value, s.longLabels)}
                </L.LoongArkRadioGroupItemText>
                <L.LoongArkRadioGroupItemHiddenInput />
              </L.LoongArkRadioGroupItem>
            ))}
          </L.LoongArkRadioGroupRoot>

          <L.LoongArkTagsInputRoot
            name="frameworks"
            value={s.tags}
            disabled={s.disabled}
            readOnly={s.readOnly}
            onValueChange={(d) => demo.tags(d.value)}
          >
            <L.LoongArkTagsInputLabel>Frameworks</L.LoongArkTagsInputLabel>
            <L.LoongArkTagsInputControl>
              {s.tags.map((tag, index) => (
                <L.LoongArkTagsInputItem key={tag} value={tag} index={index}>
                  <L.LoongArkTagsInputItemPreview>
                    <L.LoongArkTagsInputItemText>
                      {tag}
                    </L.LoongArkTagsInputItemText>
                    <L.LoongArkTagsInputItemDeleteTrigger>
                      <L.LoongArkIcon icon={controlIcons.close} size="sm" />
                    </L.LoongArkTagsInputItemDeleteTrigger>
                  </L.LoongArkTagsInputItemPreview>
                </L.LoongArkTagsInputItem>
              ))}
              <L.LoongArkTagsInputInput placeholder="Add framework" />
              <L.LoongArkTagsInputClearTrigger>
                Clear frameworks
              </L.LoongArkTagsInputClearTrigger>
            </L.LoongArkTagsInputControl>
            <L.LoongArkTagsInputHiddenInput />
          </L.LoongArkTagsInputRoot>
        </form>
      </L.LoongArkLocaleProvider>
    </L.LoongArkStack>
  );
}
