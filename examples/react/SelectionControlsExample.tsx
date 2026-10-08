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
  selectionFieldControls,
  selectionFieldText,
  selectionOwnFlags,
  selectionOwnRadioFlags,
  type SelectionFieldKind,
} from "../shared/selectionControlsDemo";
export function SelectionControlsExample({
  field = false,
}: { field?: boolean } = {}) {
  const [, redraw] = React.useReducer((v: number) => v + 1, 0);
  const [demo] = React.useState(() => createSelectionControlsDemo(redraw));
  const s = demo.snapshot;
  const ownFlags = selectionOwnFlags(s, field);
  const wrapField = (kind: SelectionFieldKind, child: React.ReactNode) =>
    field && kind === "radio-group" ? (
      <L.LoongArkFieldsetRoot
        disabled={s.disabled}
        invalid={s.fieldInvalid}
        data-testid="field-radio-group"
      >
        <L.LoongArkFieldsetLegend>Display density</L.LoongArkFieldsetLegend>
        <div style={{ display: "grid", gap: "var(--lk-space-component-xs)" }}>
          {child}
          <L.LoongArkFieldsetHelperText>
            {selectionFieldText[kind].hint}
          </L.LoongArkFieldsetHelperText>
          <L.LoongArkFieldsetErrorText>
            {selectionFieldText[kind].error}
          </L.LoongArkFieldsetErrorText>
        </div>
      </L.LoongArkFieldsetRoot>
    ) : field ? (
      <L.LoongArkFieldRoot
        disabled={s.disabled}
        readOnly={s.readOnly}
        required={s.fieldRequired}
        invalid={s.fieldInvalid}
        data-testid={`field-${kind}`}
        style={{ display: "grid", gap: "var(--lk-space-component-xs)" }}
      >
        {child}
        <L.LoongArkFieldHelperText>
          {selectionFieldText[kind].hint}
        </L.LoongArkFieldHelperText>
        <L.LoongArkFieldErrorText>
          {selectionFieldText[kind].error}
        </L.LoongArkFieldErrorText>
      </L.LoongArkFieldRoot>
    ) : (
      child
    );
  return (
    <L.LoongArkStack gap="md" style={{ width: "100%", maxWidth: "640px" }}>
      <style>{groupsDisclosureCSS}</style>
      <L.LoongArkTypography as="h2">
        {field ? "Field preferences" : "Selection preferences"}
      </L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        Keyboard focus follows the visible control. Preferences retain native
        form values.
      </L.LoongArkTypography>
      <details data-groups-demo-controls open={field || undefined}>
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
          {field &&
            (
              Object.keys(selectionFieldControls) as Array<
                keyof typeof selectionFieldControls
              >
            ).map((key) => (
              <L.LoongArkButton
                key={key}
                variant="outline"
                aria-pressed={s[key]}
                onClick={() => demo.toggle(key)}
              >
                {selectionFieldControls[key]}
              </L.LoongArkButton>
            ))}
        </L.LoongArkStack>
      </details>
      <L.LoongArkLocaleProvider locale={s.rtl ? "ar-EG" : "en-US"}>
        <form
          aria-label={field ? "Field preferences" : "Selection preferences"}
          onSubmit={(event) => {
            event.preventDefault();
            demo.submit(event.currentTarget);
          }}
          dir={s.rtl ? "rtl" : "ltr"}
          style={{ display: "grid", gap: "var(--lk-space-component-md)" }}
        >
          {wrapField(
            "checkbox",
            <L.LoongArkCheckboxRoot
              size={s.size}
              checked={s.checked}
              onCheckedChange={(d) => demo.check(d.checked)}
              name="agreement"
              {...ownFlags}
            >
              <L.LoongArkCheckboxControl>
                <L.LoongArkCheckboxIndicator />
              </L.LoongArkCheckboxControl>
              <L.LoongArkCheckboxLabel>
                {selectionLabel("Accept updates", s.longLabels)}
              </L.LoongArkCheckboxLabel>
              <L.LoongArkCheckboxHiddenInput />
            </L.LoongArkCheckboxRoot>,
          )}
          {wrapField(
            "switch",
            <L.LoongArkSwitchRoot
              size={s.size}
              checked={s.notifications}
              onCheckedChange={(d) => demo.switch(d.checked)}
              name="notifications"
              {...ownFlags}
            >
              <L.LoongArkSwitchControl size={s.size}>
                <L.LoongArkSwitchThumb size={s.size} />
              </L.LoongArkSwitchControl>
              <L.LoongArkSwitchLabel>
                {selectionLabel("Notifications", s.longLabels)}
              </L.LoongArkSwitchLabel>
              <L.LoongArkSwitchHiddenInput />
            </L.LoongArkSwitchRoot>,
          )}
          {wrapField(
            "radio-group",
            <L.LoongArkRadioGroupRoot
              size={s.size}
              orientation={s.horizontal ? "horizontal" : "vertical"}
              defaultValue={field ? "compact" : undefined}
              value={s.density}
              onValueChange={(d) => demo.select(d.value)}
              name="density"
              {...selectionOwnRadioFlags(s, field)}
            >
              {!field && (
                <L.LoongArkRadioGroupLabel>
                  Display density
                </L.LoongArkRadioGroupLabel>
              )}
              {selectionOptions.map((value) => (
                <L.LoongArkRadioGroupItem key={value} value={value}>
                  <L.LoongArkRadioGroupItemControl />
                  <L.LoongArkRadioGroupItemText>
                    {selectionLabel(value, s.longLabels)}
                  </L.LoongArkRadioGroupItemText>
                  <L.LoongArkRadioGroupItemHiddenInput />
                </L.LoongArkRadioGroupItem>
              ))}
            </L.LoongArkRadioGroupRoot>,
          )}

          {wrapField(
            "tags-input",
            <L.LoongArkTagsInputRoot
              name="frameworks"
              defaultValue={field ? ["React", "Vue", "Solid"] : undefined}
              value={s.tags}
              {...ownFlags}
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
            </L.LoongArkTagsInputRoot>,
          )}
          {field && (
            <L.LoongArkStack orientation="horizontal" gap="sm">
              <L.LoongArkButton type="submit">
                Submit preferences
              </L.LoongArkButton>
              <L.LoongArkButton variant="outline" type="reset">
                Reset preferences
              </L.LoongArkButton>
            </L.LoongArkStack>
          )}
        </form>
      </L.LoongArkLocaleProvider>
      {field && (
        <output
          aria-label="Submitted preferences"
          style={{ overflowWrap: "anywhere" }}
        >
          {JSON.stringify(s.submitted)}
        </output>
      )}
    </L.LoongArkStack>
  );
}
