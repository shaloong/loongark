<script lang="ts">
  import { nativeSelectionProps } from "@loongark/kit";
  import { PasswordInput } from "@ark-ui/svelte/password-input";
  import type { PasswordInputRootProps } from "@ark-ui/svelte/password-input";
  import type {
    PasswordInputSize,
    PasswordInputState,
  } from "@loongark/primitives";

  export let size: PasswordInputSize = "md";
  export let state: PasswordInputState = "default";
  export let visible: PasswordInputRootProps["visible"] = undefined;
  export let defaultVisible: PasswordInputRootProps["defaultVisible"] =
    undefined;
  export let disabled: PasswordInputRootProps["disabled"] = undefined;
  export let readOnly: PasswordInputRootProps["readOnly"] = undefined;
  export let required: PasswordInputRootProps["required"] = undefined;
  export let invalid: PasswordInputRootProps["invalid"] = undefined;
  export let name: PasswordInputRootProps["name"] = undefined;
  export let id: PasswordInputRootProps["id"] = undefined;
  export let ids: PasswordInputRootProps["ids"] = undefined;
  export let onVisibilityChange: PasswordInputRootProps["onVisibilityChange"] =
    undefined;
</script>

<PasswordInput.Root
  {visible}
  {defaultVisible}
  {...nativeSelectionProps({ disabled })}
  {...nativeSelectionProps({ readOnly })}
  {required}
  {invalid}
  {name}
  {id}
  {ids}
  {onVisibilityChange}
  data-scope="password-input"
  data-part="root"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  {...nativeSelectionProps({
    "data-disabled": disabled === undefined ? undefined : String(disabled),
  })}
  {...nativeSelectionProps({
    "data-readonly": readOnly === undefined ? undefined : String(readOnly),
  })}
  {...$$restProps}
>
  <slot />
</PasswordInput.Root>
