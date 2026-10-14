<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticTagsInputStyles } from "@shaloong/loongark-primitives/automatic-styles/tags-input";
  registerAutomaticStyles(lkAutomaticTagsInputStyles);

  import { onMount } from "svelte";
  import { mountNativeSelection } from "@shaloong/loongark-kit";
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
