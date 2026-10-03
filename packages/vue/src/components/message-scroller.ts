import {
  defineComponent,
  h,
  ref,
  onMounted,
  onBeforeUnmount,
  type PropType,
} from "vue";
import {
  mountMessageScroller,
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
  },
  setup(p, { attrs, slots }) {
    const root = ref<HTMLDivElement>();
    let release: (() => void) | undefined;
    onMounted(() => {
      if (root.value)
        release = mountMessageScroller(root.value, (d) =>
          p.onAtBottomChange?.(d),
        );
    });
    onBeforeUnmount(() => release?.());
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
              "aria-label": p.label,
              tabindex: 0,
            },
            [
              h(
                "div",
                { "data-scope": "message-scroller", "data-part": "content" },
                slots.default?.(),
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
            p.jumpLabel,
          ),
        ],
      );
  },
});
