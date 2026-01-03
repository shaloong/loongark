<script lang="ts">
  import { CheckboxHiddenInput } from "@ark-ui/svelte/checkbox";
  import { getDataAttrs } from "./utils";

  $: dataAttrs = getDataAttrs("checkbox", "hidden-input");
</script>

<CheckboxHiddenInput {...dataAttrs} />
