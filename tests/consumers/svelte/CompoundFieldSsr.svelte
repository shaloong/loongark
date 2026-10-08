<script lang="ts">
  import * as L from "@loongark/svelte";
  const fail = () => {
    throw new Error("SSR must not emit changes");
  };
</script>

{#each [false, true] as own}
  <L.LoongArkFieldRoot disabled required invalid readOnly>
    <L.LoongArkNumberInputRoot
      name={(own ? "own-" : "inherited-") + "NumberInput"}
      defaultValue="3"
      onValueChange={fail}
      {...own
        ? { disabled: false, required: false, invalid: false, readOnly: false }
        : {}}
    >
      <L.LoongArkNumberInputLabel>Quantity</L.LoongArkNumberInputLabel>
      <L.LoongArkNumberInputControl
        ><L.LoongArkNumberInputInput /></L.LoongArkNumberInputControl
      >
    </L.LoongArkNumberInputRoot>
  </L.LoongArkFieldRoot>
  <L.LoongArkFieldRoot disabled required invalid readOnly>
    <L.LoongArkPasswordInputRoot
      name={(own ? "own-" : "inherited-") + "PasswordInput"}
      onVisibilityChange={fail}
      {...own
        ? { disabled: false, required: false, invalid: false, readOnly: false }
        : {}}
    >
      <L.LoongArkPasswordInputLabel>Password</L.LoongArkPasswordInputLabel>
      <L.LoongArkPasswordInputControl
        ><L.LoongArkPasswordInputInput /></L.LoongArkPasswordInputControl
      >
    </L.LoongArkPasswordInputRoot>
  </L.LoongArkFieldRoot>
{/each}
