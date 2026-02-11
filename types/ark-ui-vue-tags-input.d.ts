declare module "@ark-ui/vue/tags-input" {
  import type { DefineComponent } from "vue";

  export const TagsInputRoot: DefineComponent<any>;
  export const TagsInputLabel: DefineComponent<any>;
  export const TagsInputControl: DefineComponent<any>;
  export const TagsInputInput: DefineComponent<any>;
  export const TagsInputItem: DefineComponent<any>;
  export const TagsInputItemPreview: DefineComponent<any>;
  export const TagsInputItemText: DefineComponent<any>;
  export const TagsInputItemInput: DefineComponent<any>;
  export const TagsInputItemDeleteTrigger: DefineComponent<any>;
  export const TagsInputClearTrigger: DefineComponent<any>;
  export const TagsInputHiddenInput: DefineComponent<any>;
  export const TagsInput: {
    Root: typeof TagsInputRoot;
    Label: typeof TagsInputLabel;
    Control: typeof TagsInputControl;
    Input: typeof TagsInputInput;
    Item: typeof TagsInputItem;
    ItemPreview: typeof TagsInputItemPreview;
    ItemText: typeof TagsInputItemText;
    ItemInput: typeof TagsInputItemInput;
    ItemDeleteTrigger: typeof TagsInputItemDeleteTrigger;
    ClearTrigger: typeof TagsInputClearTrigger;
    HiddenInput: typeof TagsInputHiddenInput;
  };
}
