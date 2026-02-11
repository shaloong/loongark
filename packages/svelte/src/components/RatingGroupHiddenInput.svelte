<script lang="ts">
  import { RatingGroup } from "@ark-ui/svelte/rating-group";
  import type { RatingGroupHiddenInputProps } from "@ark-ui/svelte/rating-group";
</script>

<RatingGroup.HiddenInput
  data-scope="rating-group"
  data-part="hidden-input"
  {...$$restProps}
/>
