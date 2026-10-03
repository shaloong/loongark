import { defineComponent, h, ref, type PropType } from "vue";
import {
  transferView,
  moveTransferItems,
  toggleTransferSelection,
  toggleTransferSide,
  focusTransferredItem,
  type TransferListOptions,
  type TransferItem,
  type TransferChangeDetails,
} from "@loongark/kit";
const part = (name: string) => ({
  "data-scope": "transfer-list",
  "data-part": name,
});
export const LoongArkTransferList = defineComponent({
  name: "LoongArkTransferList",
  inheritAttrs: false,
  props: {
    items: { type: Array as PropType<readonly TransferItem[]>, required: true },
    value: { type: Array as PropType<readonly string[]>, default: undefined },
    modelValue: {
      type: Array as PropType<readonly string[]>,
      default: undefined,
    },
    defaultValue: {
      type: Array as PropType<readonly string[]>,
      default: () => [],
    },
    disabled: Boolean,
    name: String,
    leftLabel: { type: String, default: "Available" },
    rightLabel: { type: String, default: "Selected" },
    emptyLabel: { type: String, default: "No items" },
    onValueChange: Function as PropType<TransferListOptions["onValueChange"]>,
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    const internal = ref<readonly string[]>(props.defaultValue),
      selection = ref<string[]>([]),
      status = ref(""),
      root = ref<HTMLDivElement>();
    const view = () =>
      transferView(
        props.items,
        props.value ?? props.modelValue ?? internal.value,
        selection.value,
      );
    const move = (direction: "right" | "left") => {
      const details = moveTransferItems(
        props.items,
        view().value,
        selection.value,
        direction,
      );
      if (!details.moved.length || props.disabled) return;
      if (props.value === undefined && props.modelValue === undefined)
        internal.value = details.value;
      selection.value = selection.value.filter(
        (key) => !details.moved.includes(key),
      );
      props.onValueChange?.(details);
      emit("update:modelValue", details.value);
      status.value =
        details.moved.length +
        " item(s) moved to " +
        (direction === "right" ? props.rightLabel : props.leftLabel);
      focusTransferredItem(root.value, details);
    };
    const panel = (
      side: "left" | "right",
      label: string,
      rows: readonly TransferItem[],
      selected: readonly string[],
    ) => {
      const enabled = rows.filter((item) => !item.disabled),
        all = enabled.length > 0 && selected.length === enabled.length;
      return h(
        "fieldset",
        { ...part("panel"), "data-side": side, disabled: props.disabled },
        [
          h("legend", part("legend"), label),
          h("div", part("toolbar"), [
            h("span", selected.length + " / " + enabled.length + " selected"),
            h(
              "button",
              {
                ...part("select-all"),
                type: "button",
                disabled: props.disabled || !enabled.length,
                "aria-label":
                  (all ? "Clear selection in " : "Select all in ") + label,
                onClick: () =>
                  (selection.value = toggleTransferSide(selection.value, rows)),
              },
              all ? "Clear" : "Select all",
            ),
          ]),
          h(
            "ul",
            part("list"),
            rows.length
              ? rows.map((item) =>
                  h(
                    "li",
                    { key: item.value },
                    h(
                      "label",
                      {
                        ...part("item"),
                        "data-selected": selection.value.includes(item.value)
                          ? "true"
                          : undefined,
                        "data-disabled":
                          props.disabled || item.disabled ? "true" : undefined,
                      },
                      [
                        h("input", {
                          type: "checkbox",
                          value: item.value,
                          checked: selection.value.includes(item.value),
                          disabled: props.disabled || item.disabled,
                          onChange: () =>
                            (selection.value = toggleTransferSelection(
                              selection.value,
                              item.value,
                            )),
                        }),
                        h("span", part("item-text"), [
                          h("span", item.label),
                          item.description &&
                            h("span", part("description"), item.description),
                        ]),
                      ],
                    ),
                  ),
                )
              : [h("li", part("empty"), props.emptyLabel)],
          ),
        ],
      );
    };
    return () =>
      h("div", { ...part("root"), ...attrs, ref: root }, [
        panel("left", props.leftLabel, view().left, view().leftSelected),
        h(
          "div",
          part("actions"),
          ["right", "left"].map((side) =>
            h(
              "button",
              {
                ...part("move"),
                type: "button",
                "aria-label":
                  "Move selected to " +
                  (side === "right" ? props.rightLabel : props.leftLabel),
                disabled:
                  props.disabled ||
                  !(
                    side === "right"
                      ? view().leftSelected
                      : view().rightSelected
                  ).length,
                onClick: () => move(side as "right" | "left"),
              },
              h(
                "span",
                { "aria-hidden": "true" },
                side === "right" ? "→" : "←",
              ),
            ),
          ),
        ),
        panel("right", props.rightLabel, view().right, view().rightSelected),
        ...(props.name
          ? view().value.map((key) =>
              h("input", {
                key,
                type: "hidden",
                name: props.name,
                value: key,
                disabled: props.disabled,
              }),
            )
          : []),
        h(
          "div",
          { ...part("status"), role: "status", "aria-live": "polite" },
          status.value,
        ),
      ]);
  },
});
