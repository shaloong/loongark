import {
  groupsDisclosureCSS,
  groupsDisclosureIcon,
} from "../shared/questionnaireGroupsDemo";
import { controlIcons } from "@loongark/kit";
import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import {
  createSelectionControlsDemo,
  selectionOptions,
  selectionLabel,
  selectionControlLabels,
} from "../shared/selectionControlsDemo";
export const SelectionControlsExample = defineComponent({
  name: "SelectionControlsExample",
  setup() {
    const revision = ref(0);
    const demo = createSelectionControlsDemo(() => revision.value++);
    return () => {
      revision.value;
      const s = demo.snapshot;
      return h(
        L.LoongArkStack,
        { gap: "md", style: { width: "100%", maxWidth: "640px" } },
        {
          default: () => [
            h("style", groupsDisclosureCSS),
            h(
              L.LoongArkTypography,
              { as: "h2" },
              () => "Selection preferences",
            ),
            h(
              L.LoongArkTypography,
              { variant: "muted" },
              () =>
                "Keyboard focus follows the visible control. Preferences retain native form values.",
            ),
            h("details", { "data-groups-demo-controls": "" }, [
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
                      { variant: "outline", onClick: () => demo.setSize(size) },
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
                ],
              ),
            ]),
            h(
              L.LoongArkLocaleProvider,
              { locale: s.rtl ? "ar-EG" : "en-US" },
              () =>
                h(
                  "form",
                  {
                    "aria-label": "Selection preferences",
                    dir: s.rtl ? "rtl" : "ltr",
                    style: {
                      display: "grid",
                      gap: "var(--lk-space-component-md)",
                    },
                  },
                  [
                    h(
                      L.LoongArkCheckboxRoot,
                      {
                        size: s.size,
                        checked: s.checked,
                        onCheckedChange: (d) => demo.check(d.checked),
                        name: "agreement",
                        disabled: s.disabled,
                        readOnly: s.readOnly,
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
                    h(
                      L.LoongArkSwitchRoot,
                      {
                        size: s.size,
                        checked: s.notifications,
                        onCheckedChange: (d) => demo.switch(d.checked),
                        name: "notifications",
                        disabled: s.disabled,
                        readOnly: s.readOnly,
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
                    h(
                      L.LoongArkRadioGroupRoot,
                      {
                        size: s.size,
                        orientation: s.horizontal ? "horizontal" : "vertical",
                        value: s.density,
                        onValueChange: (d) => demo.select(d.value),
                        name: "density",
                        disabled: s.disabled,
                        readOnly: s.readOnly,
                      },
                      () => [
                        h(L.LoongArkRadioGroupLabel, () => "Display density"),
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
                    h(
                      L.LoongArkTagsInputRoot,
                      {
                        name: "frameworks",
                        modelValue: s.tags,
                        disabled: s.disabled,
                        readOnly: s.readOnly,
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
                                  h(L.LoongArkTagsInputItemDeleteTrigger, () =>
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
                  ],
                ),
            ),
          ],
        },
      );
    };
  },
});
