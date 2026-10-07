import * as L from "../../packages/vue/dist/index.js";

// 原生部件不能因行为包装而丢失 asChild、表单、输入事件及 HTML 属性类型。
declare const accepts: <T>(props: T) => void;
const nativeProps = {
  asChild: true,
  name: "preference",
  form: "preferences",
  value: "on",
  disabled: false,
  required: true,
  readonly: true,
  tabindex: 0,
  onInput: (event: Event) => {
    void event.target;
  },
};
accepts<InstanceType<typeof L.LoongArkCheckboxHiddenInput>["$props"]>(
  nativeProps,
);
accepts<InstanceType<typeof L.LoongArkSwitchHiddenInput>["$props"]>(
  nativeProps,
);
accepts<InstanceType<typeof L.LoongArkRadioGroupItemHiddenInput>["$props"]>(
  nativeProps,
);
accepts<InstanceType<typeof L.LoongArkTagsInputHiddenInput>["$props"]>(
  nativeProps,
);
