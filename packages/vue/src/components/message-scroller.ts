import {
  defineComponent,
  h,
  Fragment,
  ref,
  computed,
  watchEffect,
  onMounted,
  onBeforeUnmount,
  type PropType,
} from "vue";
import {
  mountMessageScroller,
  mountVirtualMessageScroller,
  createVirtualWindow,
  messageVirtualOptions,
  virtualViewportHeight,
  type MessageScrollerOptions,
} from "@loongark/kit";
export const LoongArkMessageScroller = defineComponent({
  name: "LoongArkMessageScroller",
  inheritAttrs: false,
  props: {
    label: { type: String, default: "Messages" },
    jumpLabel: { type: String, default: "Jump to latest" },
    onAtBottomChange: Function as PropType<
      MessageScrollerOptions["onAtBottomChange"]
    >,
    virtualization: Object as PropType<
      MessageScrollerOptions["virtualization"]
    >,
  },
  setup(props, { attrs, slots }) {
    const root = ref<HTMLDivElement>(),
      mounted = ref(false);
    const model = createVirtualWindow(messageVirtualOptions(props), (value) => {
      window.value = value;
    });
    const window = ref(model.state);
    watchEffect(() => model.setOptions(messageVirtualOptions(props)));
    const virtualEnabled = computed(() => !!props.virtualization);
    let release: (() => void) | undefined;
    onMounted(() => {
      mounted.value = true;
    });
    watchEffect((onCleanup) => {
      if (!mounted.value || !root.value) return;
      release = virtualEnabled.value
        ? mountVirtualMessageScroller(root.value, model, (details) =>
            props.onAtBottomChange?.(details),
          )
        : mountMessageScroller(root.value, (details) =>
            props.onAtBottomChange?.(details),
          );
      onCleanup(() => {
        release?.();
        release = undefined;
      });
    });
    onBeforeUnmount(() => release?.());
    const spacer = (size: number) =>
      h("div", {
        "data-part": "virtual-spacer",
        "aria-hidden": "true",
        style: { height: `${size}px` },
      });
    return () =>
      h(
        "div",
        {
          ...attrs,
          ref: root,
          "data-scope": "message-scroller",
          "data-part": "root",
        },
        [
          h(
            "div",
            {
              "data-scope": "message-scroller",
              "data-part": "viewport",
              role: "region",
              "aria-label": props.label,
              tabindex: 0,
              style: props.virtualization
                ? { height: `${virtualViewportHeight(props.virtualization)}px` }
                : undefined,
            },
            [
              h(
                "div",
                {
                  "data-scope": "message-scroller",
                  "data-part": "content",
                  "data-virtualized": props.virtualization ? "true" : undefined,
                  role: props.virtualization ? "list" : undefined,
                },
                props.virtualization
                  ? [
                      ...window.value.entries
                        .filter((entry) =>
                          props.virtualization?.keys.includes(entry.key),
                        )
                        .map((entry) =>
                          h(Fragment, { key: entry.key }, [
                            entry.gap > 0 ? spacer(entry.gap) : null,
                            h(
                              "div",
                              {
                                "data-part": "virtual-item",
                                "data-virtual-key": entry.key,
                                role: "listitem",
                                "aria-posinset": entry.index + 1,
                                "aria-setsize": window.value.count,
                              },
                              slots.item?.({
                                key: entry.key,
                                index: entry.index,
                              }) ?? entry.key,
                            ),
                          ]),
                        ),
                      window.value.after > 0
                        ? spacer(window.value.after)
                        : null,
                    ]
                  : slots.default?.(),
              ),
            ],
          ),
          h(
            "button",
            {
              "data-scope": "message-scroller",
              "data-part": "jump",
              type: "button",
              hidden: true,
            },
            props.jumpLabel,
          ),
        ],
      );
  },
});
