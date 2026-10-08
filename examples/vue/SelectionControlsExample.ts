import {
  groupsDisclosureCSS,
  groupsDisclosureIcon,
} from "../shared/questionnaireGroupsDemo";
import { controlIcons } from "@loongark/kit";
import { defineComponent, h, ref, type VNode } from "vue";
import * as L from "@loongark/vue";
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
export const SelectionControlsExample = defineComponent({
  name: "SelectionControlsExample",
  props: { field: { type: Boolean, default: false } },
  setup(props) {
    const revision = ref(0);
    const demo = createSelectionControlsDemo(() => revision.value++);
    return () => {
      revision.value;
      const s = demo.snapshot;
      const ownFlags = selectionOwnFlags(s, props.field);
      const wrapField = (kind: SelectionFieldKind, child: VNode) =>
        props.field && kind === "radio-group"
          ? h(
              L.LoongArkFieldsetRoot,
              {
                disabled: s.disabled,
                invalid: s.fieldInvalid,
                "data-testid": "field-radio-group",
              },
              () => [
                h(L.LoongArkFieldsetLegend, () => "Display density"),
                h(
                  "div",
                  {
                    style: {
                      display: "grid",
                      gap: "var(--lk-space-component-xs)",
                    },
                  },
                  [
                    child,
                    h(
                      L.LoongArkFieldsetHelperText,
                      () => selectionFieldText[kind].hint,
                    ),
                    h(
                      L.LoongArkFieldsetErrorText,
                      () => selectionFieldText[kind].error,
                    ),
                  ],
                ),
              ],
            )
          : props.field
            ? h(
                L.LoongArkFieldRoot,
                {
                  disabled: s.disabled,
                  readOnly: s.readOnly,
                  required: s.fieldRequired,
                  invalid: s.fieldInvalid,
                  "data-testid": `field-${kind}`,
                  style: {
                    display: "grid",
                    gap: "var(--lk-space-component-xs)",
                  },
                },
                () => [
                  child,
                  h(
                    L.LoongArkFieldHelperText,
                    () => selectionFieldText[kind].hint,
                  ),
                  h(
                    L.LoongArkFieldErrorText,
                    () => selectionFieldText[kind].error,
                  ),
                ],
              )
            : child;
      return h(
        L.LoongArkStack,
        { gap: "md", style: { width: "100%", maxWidth: "640px" } },
        {
          default: () => [
            h("style", groupsDisclosureCSS),
            h(L.LoongArkTypography, { as: "h2" }, () =>
              props.field ? "Field preferences" : "Selection preferences",
            ),
            h(
              L.LoongArkTypography,
              { variant: "muted" },
              () =>
                "Keyboard focus follows the visible control. Preferences retain native form values.",
            ),
            h(
              "details",
              {
                "data-groups-demo-controls": "",
                open: props.field || undefined,
              },
              [
                h("summary", [
                  h(L.LoongArkIcon, { icon: groupsDisclosureIcon, size: "sm" }),
                  "More controls",
                ]),
                h(
                  L.LoongArkStack,
                  {
                    orientation: "horizontal",
                    gap: "sm",
                    style: { flexWrap: "wrap" },
                  },
                  () => [
                    ...(["sm", "md", "lg"] as const).map((size) =>
                      h(
                        L.LoongArkButton,
                        {
                          variant: "outline",
                          onClick: () => demo.setSize(size),
                        },
                        () => `Size ${size}`,
                      ),
                    ),
                    ...(
                      [
                        "horizontal",
                        "rtl",
                        "longLabels",
                        "disabled",
                        "readOnly",
                        "reject",
                      ] as const
                    ).map((key) =>
                      h(
                        L.LoongArkButton,
                        {
                          variant: "outline",
                          "aria-pressed": s[key],
                          onClick: () => demo.toggle(key),
                        },
                        () => selectionControlLabels[key],
                      ),
                    ),
                    ...(props.field
                      ? (
                          Object.keys(selectionFieldControls) as Array<
                            keyof typeof selectionFieldControls
                          >
                        ).map((key) =>
                          h(
                            L.LoongArkButton,
                            {
                              variant: "outline",
                              "aria-pressed": s[key],
                              onClick: () => demo.toggle(key),
                            },
                            () => selectionFieldControls[key],
                          ),
                        )
                      : []),
                  ],
                ),
              ],
            ),
            h(
              L.LoongArkLocaleProvider,
              { locale: s.rtl ? "ar-EG" : "en-US" },
              () =>
                h(
                  "form",
                  {
                    "aria-label": props.field
                      ? "Field preferences"
                      : "Selection preferences",
                    onSubmit: (event: Event) => {
                      event.preventDefault();
                      demo.submit(event.currentTarget as HTMLFormElement);
                    },
                    dir: s.rtl ? "rtl" : "ltr",
                    style: {
                      display: "grid",
                      gap: "var(--lk-space-component-md)",
                    },
                  },
                  [
                    wrapField(
                      "checkbox",
                      h(
                        L.LoongArkCheckboxRoot,
                        {
                          size: s.size,
                          checked: s.checked,
                          onCheckedChange: (d) => demo.check(d.checked),
                          name: "agreement",
                          ...ownFlags,
                        },
                        () => [
                          h(L.LoongArkCheckboxControl, () =>
                            h(L.LoongArkCheckboxIndicator),
                          ),
                          h(L.LoongArkCheckboxLabel, () =>
                            selectionLabel("Accept updates", s.longLabels),
                          ),
                          h(L.LoongArkCheckboxHiddenInput),
                        ],
                      ),
                    ),
                    wrapField(
                      "switch",
                      h(
                        L.LoongArkSwitchRoot,
                        {
                          size: s.size,
                          checked: s.notifications,
                          onCheckedChange: (d) => demo.switch(d.checked),
                          name: "notifications",
                          ...ownFlags,
                        },
                        () => [
                          h(L.LoongArkSwitchControl, { size: s.size }, () =>
                            h(L.LoongArkSwitchThumb, { size: s.size }),
                          ),
                          h(L.LoongArkSwitchLabel, () =>
                            selectionLabel("Notifications", s.longLabels),
                          ),
                          h(L.LoongArkSwitchHiddenInput),
                        ],
                      ),
                    ),
                    wrapField(
                      "radio-group",
                      h(
                        L.LoongArkRadioGroupRoot,
                        {
                          size: s.size,
                          orientation: s.horizontal ? "horizontal" : "vertical",
                          defaultValue: props.field ? "compact" : undefined,
                          value: s.density,
                          onValueChange: (d) => demo.select(d.value),
                          name: "density",
                          ...selectionOwnRadioFlags(s, props.field),
                        },
                        () => [
                          ...(props.field
                            ? []
                            : [
                                h(
                                  L.LoongArkRadioGroupLabel,
                                  () => "Display density",
                                ),
                              ]),
                          ...selectionOptions.map((value) =>
                            h(L.LoongArkRadioGroupItem, { value }, () => [
                              h(L.LoongArkRadioGroupItemControl),
                              h(L.LoongArkRadioGroupItemText, () =>
                                selectionLabel(value, s.longLabels),
                              ),
                              h(L.LoongArkRadioGroupItemHiddenInput),
                            ]),
                          ),
                        ],
                      ),
                    ),
                    wrapField(
                      "tags-input",
                      h(
                        L.LoongArkTagsInputRoot,
                        {
                          name: "frameworks",
                          defaultValue: props.field
                            ? ["React", "Vue", "Solid"]
                            : undefined,
                          modelValue: s.tags,
                          ...ownFlags,
                          onValueChange: (d) => demo.tags(d.value),
                        },
                        () => [
                          h(L.LoongArkTagsInputLabel, () => "Frameworks"),
                          h(L.LoongArkTagsInputControl, () => [
                            ...s.tags.map((tag, index) =>
                              h(
                                L.LoongArkTagsInputItem,
                                { value: tag, index },
                                () =>
                                  h(L.LoongArkTagsInputItemPreview, () => [
                                    h(L.LoongArkTagsInputItemText, () => tag),
                                    h(
                                      L.LoongArkTagsInputItemDeleteTrigger,
                                      () =>
                                        h(L.LoongArkIcon, {
                                          icon: controlIcons.close,
                                          size: "sm",
                                        }),
                                    ),
                                  ]),
                              ),
                            ),
                            h(L.LoongArkTagsInputInput, {
                              placeholder: "Add framework",
                            }),
                            h(
                              L.LoongArkTagsInputClearTrigger,
                              () => "Clear frameworks",
                            ),
                          ]),
                          h(L.LoongArkTagsInputHiddenInput),
                        ],
                      ),
                    ),
                    ...(props.field
                      ? [
                          h(
                            L.LoongArkStack,
                            { orientation: "horizontal", gap: "sm" },
                            () => [
                              h(
                                L.LoongArkButton,
                                { type: "submit" },
                                () => "Submit preferences",
                              ),
                              h(
                                L.LoongArkButton,
                                { type: "reset", variant: "outline" },
                                () => "Reset preferences",
                              ),
                            ],
                          ),
                        ]
                      : []),
                  ],
                ),
            ),
            ...(props.field
              ? [
                  h(
                    "output",
                    {
                      "aria-label": "Submitted preferences",
                      style: { overflowWrap: "anywhere" },
                    },
                    JSON.stringify(s.submitted),
                  ),
                ]
              : []),
          ],
        },
      );
    };
  },
});
