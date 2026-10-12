
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticFileUploadStyles } from "@loongark/primitives/automatic-styles/file-upload";
import type { FileUploadRootProps as NativeFileUploadRootProps } from "@ark-ui/vue/file-upload";
import { renderPart } from "../render-part";
/**
 * File Upload component - Vue wrapper.
 * Uses Ark UI File Upload with data attributes for styling.
 */
import {
  resolveDynamicComponent,
  defineComponent,
  h,
  type PropType,
} from "vue";
import { FileUpload as ArkFileUpload } from "@ark-ui/vue/file-upload";
import type { FileUploadSize } from "@loongark/primitives";

export interface FileUploadChangeDetails {
  acceptedFiles: File[];
}

export const LoongArkFileUploadRoot = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkFileUploadRoot",
  props: {
    size: {
      type: String as PropType<FileUploadSize>,
      default: "md",
    },
    accept: {
      type: Object as PropType<Record<string, string[]>>,
    },
    acceptedFiles: {
      type: Array as PropType<File[]>,
    },
    defaultAcceptedFiles: {
      type: Array as PropType<File[]>,
    },
    maxFiles: {
      type: Number as PropType<number>,
    },
    maxFileSize: {
      type: Number as PropType<number>,
    },
    minFileSize: {
      type: Number as PropType<number>,
    },
    multiple: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    directory: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    required: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    name: {
      type: String as PropType<string>,
    },
    id: {
      type: String as PropType<string>,
    },
    ids: {
      type: Object as PropType<NativeFileUploadRootProps["ids"]>,
    },
    onFileChange: {
      type: Function as PropType<(details: FileUploadChangeDetails) => void>,
    },
    "onUpdate:acceptedFiles": {
      type: Function as PropType<(files: File[]) => void>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkFileUpload.Root,
        {
          ...attrs,
          ...props,
          "data-scope": "file-upload",
          "data-part": "root",
          "data-size": props.size,
          "data-disabled": props.disabled ? "true" : undefined,
        },
        slots,
      );
  },
}), lkAutomaticFileUploadStyles);

export const LoongArkFileUploadLabel = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkFileUploadLabel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkFileUpload.Label,
        {
          ...attrs,
          "data-scope": "file-upload",
          "data-part": "label",
        },
        slots,
      );
  },
}), lkAutomaticFileUploadStyles);

export const LoongArkFileUploadDropzone = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkFileUploadDropzone",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkFileUpload.Dropzone,
        {
          ...attrs,
          "data-scope": "file-upload",
          "data-part": "dropzone",
        },
        slots,
      );
  },
}), lkAutomaticFileUploadStyles);

export const LoongArkFileUploadTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkFileUploadTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkFileUpload.Trigger,
        {
          ...attrs,
          "data-scope": "file-upload",
          "data-part": "trigger",
        },
        slots,
      );
  },
}), lkAutomaticFileUploadStyles);

export const LoongArkFileUploadHiddenInput = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkFileUploadHiddenInput",
  setup(_, { attrs }) {
    return () =>
      renderPart(resolveDynamicComponent(ArkFileUpload.HiddenInput), {
        ...attrs,
        "data-scope": "file-upload",
        "data-part": "hidden-input",
      });
  },
}), lkAutomaticFileUploadStyles);

export const LoongArkFileUploadItemGroup = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkFileUploadItemGroup",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkFileUpload.ItemGroup,
        {
          ...attrs,
          "data-scope": "file-upload",
          "data-part": "item-group",
        },
        slots,
      );
  },
}), lkAutomaticFileUploadStyles);

export const LoongArkFileUploadItem = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkFileUploadItem",
  props: {
    file: {
      type: Object as PropType<File>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkFileUpload.Item,
        {
          ...attrs,
          ...props,
          "data-scope": "file-upload",
          "data-part": "item",
        },
        slots,
      );
  },
}), lkAutomaticFileUploadStyles);

export const LoongArkFileUploadItemPreview = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkFileUploadItemPreview",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkFileUpload.ItemPreview,
        {
          ...attrs,
          "data-scope": "file-upload",
          "data-part": "item-preview",
        },
        slots,
      );
  },
}), lkAutomaticFileUploadStyles);

export const LoongArkFileUploadItemPreviewImage = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkFileUploadItemPreviewImage",
  setup(_, { attrs }) {
    return () =>
      renderPart(ArkFileUpload.ItemPreviewImage, {
        ...attrs,
        "data-scope": "file-upload",
        "data-part": "item-preview-image",
      });
  },
}), lkAutomaticFileUploadStyles);

export const LoongArkFileUploadItemName = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkFileUploadItemName",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkFileUpload.ItemName,
        {
          ...attrs,
          "data-scope": "file-upload",
          "data-part": "item-name",
        },
        slots,
      );
  },
}), lkAutomaticFileUploadStyles);

export const LoongArkFileUploadItemSizeText = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkFileUploadItemSizeText",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkFileUpload.ItemSizeText,
        {
          ...attrs,
          "data-scope": "file-upload",
          "data-part": "item-size-text",
        },
        slots,
      );
  },
}), lkAutomaticFileUploadStyles);

export const LoongArkFileUploadItemDeleteTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkFileUploadItemDeleteTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkFileUpload.ItemDeleteTrigger,
        {
          ...attrs,
          "data-scope": "file-upload",
          "data-part": "item-delete-trigger",
        },
        slots,
      );
  },
}), lkAutomaticFileUploadStyles);

export const LoongArkFileUploadClearTrigger = /*#__PURE__*/ withAutomaticStyles(defineComponent({
  name: "LoongArkFileUploadClearTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkFileUpload.ClearTrigger,
        {
          ...attrs,
          "data-scope": "file-upload",
          "data-part": "clear-trigger",
        },
        slots,
      );
  },
}), lkAutomaticFileUploadStyles);
