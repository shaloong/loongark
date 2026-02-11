<script lang="ts">
  import { PasswordInput } from "@ark-ui/svelte/password-input";
  import type { PasswordInputRootProps } from "@ark-ui/svelte/password-input";
  import type { PasswordInputSize, PasswordInputState } from "@loongark/primitives";

  export let size: PasswordInputSize = "md";
  export let state: PasswordInputState = "default";
  export let value: PasswordInputRootProps["value"] = undefined;
  export let defaultValue: PasswordInputRootProps["defaultValue"] = undefined;
  export let visible: PasswordInputRootProps["visible"] = undefined;
  export let defaultVisible: PasswordInputRootProps["defaultVisible"] = undefined;
  export let disabled: PasswordInputRootProps["disabled"] = undefined;
  export let readOnly: PasswordInputRootProps["readOnly"] = undefined;
  export let required: PasswordInputRootProps["required"] = undefined;
  export let invalid: PasswordInputRootProps["invalid"] = undefined;
  export let name: PasswordInputRootProps["name"] = undefined;
  export let form: PasswordInputRootProps["form"] = undefined;
  export let id: PasswordInputRootProps["id"] = undefined;
  export let ids: PasswordInputRootProps["ids"] = undefined;
  export let onVisibilityChange: PasswordInputRootProps["onVisibilityChange"] =
    undefined;
</script>

<PasswordInput.Root
  {value}
  {defaultValue}
  {visible}
  {defaultVisible}
  {disabled}
  {readOnly}
  {required}
  {invalid}
  {name}
  {form}
  {id}
  {ids}
  {onVisibilityChange}
  data-scope="password-input"
  data-part="root"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  data-disabled={disabled ? "true" : undefined}
  data-readonly={readOnly ? "true" : undefined}
  {...$$restProps}
>
  <slot />
</PasswordInput.Root>
