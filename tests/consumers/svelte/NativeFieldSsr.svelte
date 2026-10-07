<script lang="ts">
  import * as L from "@loongark/svelte";
  const fail = () => {
    throw new Error("SSR must not emit selection changes");
  };
</script>

{#each [false, true] as own}
  <L.LoongArkFieldRoot disabled required invalid readOnly>
    <L.LoongArkCheckboxRoot
      name={own ? "own-checkbox" : "inherited-checkbox"}
      {...own
        ? { disabled: false, required: false, invalid: false, readOnly: false }
        : {}}
      onCheckedChange={fail}
    >
      <L.LoongArkCheckboxLabel>Agreement</L.LoongArkCheckboxLabel
      ><L.LoongArkCheckboxControl /><L.LoongArkCheckboxHiddenInput />
    </L.LoongArkCheckboxRoot>
  </L.LoongArkFieldRoot>
  <L.LoongArkFieldRoot disabled required invalid readOnly>
    <L.LoongArkSwitchRoot
      name={own ? "own-switch" : "inherited-switch"}
      {...own
        ? { disabled: false, required: false, invalid: false, readOnly: false }
        : {}}
      onCheckedChange={fail}
    >
      <L.LoongArkSwitchLabel>Notifications</L.LoongArkSwitchLabel
      ><L.LoongArkSwitchControl
        ><L.LoongArkSwitchThumb /></L.LoongArkSwitchControl
      ><L.LoongArkSwitchHiddenInput />
    </L.LoongArkSwitchRoot>
  </L.LoongArkFieldRoot>
  <L.LoongArkFieldRoot disabled required invalid readOnly>
    <L.LoongArkTagsInputRoot
      name={own ? "own-tags" : "inherited-tags"}
      defaultValue={["Vue"]}
      {...own
        ? { disabled: false, required: false, invalid: false, readOnly: false }
        : {}}
      onValueChange={fail}
    >
      <L.LoongArkTagsInputLabel>Frameworks</L.LoongArkTagsInputLabel
      ><L.LoongArkTagsInputControl
        ><L.LoongArkTagsInputInput /></L.LoongArkTagsInputControl
      ><L.LoongArkTagsInputHiddenInput />
    </L.LoongArkTagsInputRoot>
  </L.LoongArkFieldRoot>
{/each}
