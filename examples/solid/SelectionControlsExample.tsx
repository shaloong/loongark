/** @jsxImportSource solid-js */
import {
  groupsDisclosureCSS,
  groupsDisclosureIcon,
} from "../shared/questionnaireGroupsDemo";
import { createSignal, For, type JSX } from "solid-js";
import { controlIcons } from "@loongark/kit";
import * as L from "@loongark/solid";
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
export function SelectionControlsExample(props: { field?: boolean } = {}) {
  const field = !!props.field;
  const [revision, redraw] = createSignal(0);
  const demo = createSelectionControlsDemo(() => redraw((v) => v + 1));
  const s = () => {
    revision();
    return demo.snapshot;
  };
  const ownFlags = () => selectionOwnFlags(s(), field);
  const WrapField = (props: {
    kind: SelectionFieldKind;
    children?: JSX.Element;
  }) =>
    field && props.kind === "radio-group" ? (
      <L.LoongArkFieldsetRoot
        disabled={s().disabled}
        invalid={s().fieldInvalid}
        data-testid="field-radio-group"
      >
        <L.LoongArkFieldsetLegend>Display density</L.LoongArkFieldsetLegend>
        <div style={{ display: "grid", gap: "var(--lk-space-component-xs)" }}>
          {props.children}
          <L.LoongArkFieldsetHelperText>
            {selectionFieldText[props.kind].hint}
          </L.LoongArkFieldsetHelperText>
          <L.LoongArkFieldsetErrorText>
            {selectionFieldText[props.kind].error}
          </L.LoongArkFieldsetErrorText>
        </div>
      </L.LoongArkFieldsetRoot>
    ) : field ? (
      <L.LoongArkFieldRoot
        disabled={s().disabled}
        readOnly={s().readOnly}
        required={s().fieldRequired}
        invalid={s().fieldInvalid}
        data-testid={`field-${props.kind}`}
        style={{ display: "grid", gap: "var(--lk-space-component-xs)" }}
      >
        {props.children}
        <L.LoongArkFieldHelperText>
          {selectionFieldText[props.kind].hint}
        </L.LoongArkFieldHelperText>
        <L.LoongArkFieldErrorText>
          {selectionFieldText[props.kind].error}
        </L.LoongArkFieldErrorText>
      </L.LoongArkFieldRoot>
    ) : (
      props.children
    );
  return (
    <L.LoongArkStack gap="md" style={{ width: "100%", "max-width": "640px" }}>
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
          style={{ "flex-wrap": "wrap" }}
        >
          <For each={["sm", "md", "lg"] as const}>
            {(size) => (
              <L.LoongArkButton
                variant="outline"
                onClick={() => demo.setSize(size)}
              >
                Size {size}
              </L.LoongArkButton>
            )}
          </For>
          <For
            each={
              [
                "horizontal",
                "rtl",
                "longLabels",
                "disabled",
                "readOnly",
                "reject",
              ] as const
            }
          >
            {(key) => (
              <L.LoongArkButton
                variant="outline"
                aria-pressed={s()[key]}
                onClick={() => demo.toggle(key)}
              >
                {selectionControlLabels[key]}
              </L.LoongArkButton>
            )}
          </For>
          {field && (
            <For
              each={
                Object.keys(selectionFieldControls) as Array<
                  keyof typeof selectionFieldControls
                >
              }
            >
              {(key) => (
                <L.LoongArkButton
                  variant="outline"
                  aria-pressed={s()[key]}
                  onClick={() => demo.toggle(key)}
                >
                  {selectionFieldControls[key]}
                </L.LoongArkButton>
              )}
            </For>
          )}
        </L.LoongArkStack>
      </details>
      <L.LoongArkLocaleProvider locale={s().rtl ? "ar-EG" : "en-US"}>
        <form
          aria-label={field ? "Field preferences" : "Selection preferences"}
          onSubmit={(event) => {
            event.preventDefault();
            demo.submit(event.currentTarget);
          }}
          dir={s().rtl ? "rtl" : "ltr"}
          style={{ display: "grid", gap: "var(--lk-space-component-md)" }}
        >
          <WrapField kind="checkbox">
            <L.LoongArkCheckboxRoot
              size={s().size}
              checked={s().checked}
              onCheckedChange={(d) => demo.check(d.checked)}
              name="agreement"
              {...ownFlags()}
            >
              <L.LoongArkCheckboxControl>
                <L.LoongArkCheckboxIndicator />
              </L.LoongArkCheckboxControl>
              <L.LoongArkCheckboxLabel>
                {selectionLabel("Accept updates", s().longLabels)}
              </L.LoongArkCheckboxLabel>
              <L.LoongArkCheckboxHiddenInput />
            </L.LoongArkCheckboxRoot>
          </WrapField>
          <WrapField kind="switch">
            <L.LoongArkSwitchRoot
              size={s().size}
              checked={s().notifications}
              onCheckedChange={(d) => demo.switch(d.checked)}
              name="notifications"
              {...ownFlags()}
            >
              <L.LoongArkSwitchControl size={s().size}>
                <L.LoongArkSwitchThumb size={s().size} />
              </L.LoongArkSwitchControl>
              <L.LoongArkSwitchLabel>
                {selectionLabel("Notifications", s().longLabels)}
              </L.LoongArkSwitchLabel>
              <L.LoongArkSwitchHiddenInput />
            </L.LoongArkSwitchRoot>
          </WrapField>
          <WrapField kind="radio-group">
            <L.LoongArkRadioGroupRoot
              size={s().size}
              orientation={s().horizontal ? "horizontal" : "vertical"}
              defaultValue={field ? "compact" : undefined}
              value={s().density}
              onValueChange={(d) => demo.select(d.value)}
              name="density"
              {...selectionOwnRadioFlags(s(), field)}
            >
              {!field && (
                <L.LoongArkRadioGroupLabel>
                  Display density
                </L.LoongArkRadioGroupLabel>
              )}
              <For each={selectionOptions}>
                {(value) => (
                  <L.LoongArkRadioGroupItem value={value}>
                    <L.LoongArkRadioGroupItemControl />
                    <L.LoongArkRadioGroupItemText>
                      {selectionLabel(value, s().longLabels)}
                    </L.LoongArkRadioGroupItemText>
                    <L.LoongArkRadioGroupItemHiddenInput />
                  </L.LoongArkRadioGroupItem>
                )}
              </For>
            </L.LoongArkRadioGroupRoot>
          </WrapField>

          <WrapField kind="tags-input">
            <L.LoongArkTagsInputRoot
              name="frameworks"
              defaultValue={field ? ["React", "Vue", "Solid"] : undefined}
              value={s().tags}
              {...ownFlags()}
              onValueChange={(d) => demo.tags(d.value)}
            >
              <L.LoongArkTagsInputLabel>Frameworks</L.LoongArkTagsInputLabel>
              <L.LoongArkTagsInputControl>
                <For each={s().tags}>
                  {(tag, index) => (
                    <L.LoongArkTagsInputItem value={tag} index={index()}>
                      <L.LoongArkTagsInputItemPreview>
                        <L.LoongArkTagsInputItemText>
                          {tag}
                        </L.LoongArkTagsInputItemText>
                        <L.LoongArkTagsInputItemDeleteTrigger>
                          <L.LoongArkIcon icon={controlIcons.close} size="sm" />
                        </L.LoongArkTagsInputItemDeleteTrigger>
                      </L.LoongArkTagsInputItemPreview>
                    </L.LoongArkTagsInputItem>
                  )}
                </For>
                <L.LoongArkTagsInputInput placeholder="Add framework" />
                <L.LoongArkTagsInputClearTrigger>
                  Clear frameworks
                </L.LoongArkTagsInputClearTrigger>
              </L.LoongArkTagsInputControl>
              <L.LoongArkTagsInputHiddenInput />
            </L.LoongArkTagsInputRoot>
          </WrapField>
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
          style={{ "overflow-wrap": "anywhere" }}
        >
          {JSON.stringify(s().submitted)}
        </output>
      )}
    </L.LoongArkStack>
  );
}
