import { renderPart } from "../render-part";
/**
 * Avatar component - Vue wrapper.
 * Based on Ark UI Avatar.
 */
import { defineComponent, h, type PropType } from "vue";
import { Avatar as ArkAvatar } from "@ark-ui/vue/avatar";
import type { AvatarSize } from "@loongark/primitives";

export const LoongArkAvatarRoot = defineComponent({
  name: "LoongArkAvatarRoot",
  props: {
    size: {
      type: String as PropType<AvatarSize>,
      default: "md",
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkAvatar.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "avatar",
          "data-part": "root",
          "data-size": props.size,
        },
        slots,
      );
  },
});

export const LoongArkAvatarImage = defineComponent({
  name: "LoongArkAvatarImage",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkAvatar.Image,
        {
          ...attrs,
          "data-scope": "avatar",
          "data-part": "image",
        },
        slots,
      );
  },
});

export const LoongArkAvatarFallback = defineComponent({
  name: "LoongArkAvatarFallback",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkAvatar.Fallback,
        {
          ...attrs,
          "data-scope": "avatar",
          "data-part": "fallback",
        },
        slots,
      );
  },
});
