
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticFloatingActionButtonStyles } from "@loongark/primitives/automatic-styles/floating-action-button";
import { styles as lkAutomaticImageListStyles } from "@loongark/primitives/automatic-styles/image-list";
import { styles as lkAutomaticMasonryStyles } from "@loongark/primitives/automatic-styles/masonry";
import { styles as lkAutomaticSpeedDialStyles } from "@loongark/primitives/automatic-styles/speed-dial";
import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
import {
  defineComponent,
  h,
  ref,
  onMounted,
  onBeforeUnmount,
  useId,
  type PropType,
} from "vue";
import {
  mediaParts,
  mediaAttributes,
  mediaStyles,
  fabAttributes,
  mountSpeedDial,
  speedDialActions,
  type MediaPart,
  type MediaLayoutOptions,
  type FloatingActionButtonOptions,
  type SpeedDialOptions,
} from "@loongark/kit";
const make = (part: MediaPart) =>
  defineComponent({
    name: "LoongArk" + part,
    inheritAttrs: false,
    props: {
      columns: Number,
      gap: String as PropType<MediaLayoutOptions["gap"]>,
      columnSpan: Number,
      rowSpan: Number,
      rowHeight: Number,
      responsive: { type: Boolean, default: true },
    },
    setup(props, { attrs, slots }) {
      return () =>
        h(
          mediaParts[part][0],
          {
            ...mediaAttributes(part, props),
            ...attrs,
            style: [mediaStyles(props), attrs.style],
          },
          slots.default?.(),
        );
    },
  });
export const LoongArkImageList = /*#__PURE__*/ withAutomaticStyles(make("ImageList"), lkAutomaticImageListStyles);
export const LoongArkImageListItem = /*#__PURE__*/ withAutomaticStyles(make("ImageListItem"), lkAutomaticImageListStyles);
export const LoongArkImageListCaption = /*#__PURE__*/ withAutomaticStyles(make("ImageListCaption"), lkAutomaticImageListStyles);
export const LoongArkMasonry = /*#__PURE__*/ withAutomaticStyles(make("Masonry"), lkAutomaticMasonryStyles);
export const LoongArkMasonryItem = /*#__PURE__*/ withAutomaticStyles(make("MasonryItem"), lkAutomaticMasonryStyles);
export const LoongArkFloatingActionButton = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkFloatingActionButton",
  inheritAttrs: false,
  props: {
    size: String as PropType<FloatingActionButtonOptions["size"]>,
    variant: String as PropType<FloatingActionButtonOptions["variant"]>,
    extended: Boolean,
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        "button",
        { ...fabAttributes(props), type: "button", ...attrs },
        slots.default?.(),
      );
  },
}), lkAutomaticFloatingActionButtonStyles);
export const LoongArkSpeedDial = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkSpeedDial",
  inheritAttrs: false,
  props: {
    label: { type: String, required: true },
    actions: {
      type: Array as PropType<SpeedDialOptions["actions"]>,
      required: true,
    },
    direction: {
      type: String as PropType<SpeedDialOptions["direction"]>,
      default: "up",
    },
    disabled: Boolean,
    open: { type: Boolean, default: undefined },
    defaultOpen: Boolean,
    onOpenChange: Function as PropType<SpeedDialOptions["onOpenChange"]>,
    onSelect: Function as PropType<SpeedDialOptions["onSelect"]>,
  },
  emits: ["update:open"],
  setup(props, { attrs, emit }) {
    const uid = useId(),
      root = ref<HTMLDivElement>(),
      internal = ref(props.defaultOpen);
    let release: (() => void) | undefined;
    const available = () => speedDialActions(props.actions),
      opened = () =>
        !props.disabled &&
        available().length > 0 &&
        (props.open ?? internal.value);
    const change = (next: boolean) => {
      if (next && (props.disabled || !available().length)) return;
      if (next === opened()) return;
      if (props.open === undefined) internal.value = next;
      props.onOpenChange?.({ open: next });
      emit("update:open", next);
    };
    onMounted(() => {
      if (root.value) release = mountSpeedDial(root.value, change);
    });
    onBeforeUnmount(() => release?.());
    const select = (value: string) => {
      if (props.disabled) return;
      props.onSelect?.({ value });
      change(false);
      root.value
        ?.querySelector<HTMLButtonElement>("[data-part=trigger]")
        ?.focus();
    };
    const part = (name: string) => ({
      "data-scope": "speed-dial",
      "data-part": name,
    });
    return () =>
      h(
        "div",
        {
          ...part("root"),
          "data-state": opened() ? "open" : "closed",
          "data-direction": props.direction,
          ...attrs,
          ref: root,
        },
        [
          h(
            "button",
            {
              ...fabAttributes(),
              ...part("trigger"),
              type: "button",
              "aria-label": props.label,
              "aria-haspopup": "menu",
              "aria-expanded": opened(),
              "aria-controls": uid,
              disabled: props.disabled || !available().length,
              onClick: () => change(!opened()),
            },
            h("span", { ...part("icon"), "aria-hidden": "true" }, [
              h(LoongArkIcon, { icon: controlIcons.plus, size: "lg" }),
            ]),
          ),
          h(
            "ul",
            {
              ...part("actions"),
              id: uid,
              role: "menu",
              "aria-label": props.label,
              "aria-orientation":
                props.direction === "left" || props.direction === "right"
                  ? "horizontal"
                  : "vertical",
              hidden: !opened(),
            },
            props.actions.map((a) =>
              h(
                "li",
                { key: a.value, role: "none" },
                h(
                  "button",
                  {
                    ...part("action"),
                    role: "menuitem",
                    type: "button",
                    tabindex: -1,
                    disabled: props.disabled || a.disabled,
                    onClick: () => select(a.value),
                  },
                  [
                    h(
                      "span",
                      { "aria-hidden": "true" },
                      typeof a.icon === "string"
                        ? a.icon
                        : [
                            h(LoongArkIcon, {
                              icon: a.icon ?? controlIcons.circle,
                            }),
                          ],
                    ),
                    a.label,
                  ],
                ),
              ),
            ),
          ),
        ],
      );
  },
}), lkAutomaticSpeedDialStyles);
