<script lang="ts">
  import EditableExample from "./EditableExample.svelte";
  import { editableStates } from "../shared/editableStateDemo";
</script>

<section
  data-editable-states
  style="display:grid;gap:var(--lk-space-component-lg);width:min(100%,560px)"
>
  {#each editableStates as item}
    <div data-demo-state={item.disabled ? "disabled" : item.state}>
      <p style="margin:0 0 var(--lk-space-component-sm);font-weight:600">
        {item.label}
      </p>
      <EditableExample state={item.state} disabled={item.disabled} />
    </div>
  {/each}
</section>
