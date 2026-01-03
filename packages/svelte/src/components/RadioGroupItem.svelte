<script lang="ts">
  import { RadioGroup } from "@ark-ui/svelte/radio-group";

  export let value: string;
  export let disabled: boolean = false;
  export let invalid: boolean = false;
</script>

<RadioGroup.Item {value} {disabled} {invalid}>
  <slot />
</RadioGroup.Item>
