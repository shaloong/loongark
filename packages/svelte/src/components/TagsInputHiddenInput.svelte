<script lang="ts">
  import { onMount } from "svelte";
  import { mountNativeSelection } from "@loongark/kit";
  import { useTagsInputContext } from "@ark-ui/svelte/tags-input";
  export let ref: HTMLInputElement | null = null;
  const api = useTagsInputContext();
  onMount(() =>
    ref
      ? mountNativeSelection(ref, () => ({
          formValue: api().valueAsString,
        }))
      : undefined,
  );
  import { TagsInput } from "@ark-ui/svelte/tags-input";
</script>

<TagsInput.HiddenInput
  bind:ref
  data-scope="tags-input"
  data-part="hidden-input"
  {...$$restProps}
/>
