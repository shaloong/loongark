<script lang="ts">
  import * as L from "@loongark/svelte";
  import { contextMenuDemoCSS } from "../shared/contextMenuDemo";
  let selection = "No action selected";
</script>

<section
  data-context-demo
  style="display:grid;gap:var(--lk-space-component-md)"
>
  <svelte:element this={"style"}>{contextMenuDemoCSS}</svelte:element>
  <h2>Context actions</h2>
  <p>
    Right-click or press and hold the target. The actions button also supports
    keyboard navigation.
  </p>
  <L.LoongArkMenuRoot
    onSelect={(details) => {
      selection = details.value;
    }}
  >
    <L.LoongArkContextMenu.Trigger
      tabindex={0}
      style="padding:var(--lk-space-component-lg);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-lg)"
      >Context target</L.LoongArkContextMenu.Trigger
    >
    <L.LoongArkMenuTrigger data-context-actions
      >Open actions</L.LoongArkMenuTrigger
    >
    <L.LoongArkPortal
      ><L.LoongArkMenuPositioner
        ><L.LoongArkMenuContent
          ><L.LoongArkMenuItem value="refresh">Refresh</L.LoongArkMenuItem
          ><L.LoongArkMenuItem value="archive">Archive</L.LoongArkMenuItem
          ></L.LoongArkMenuContent
        ></L.LoongArkMenuPositioner
      ></L.LoongArkPortal
    >
  </L.LoongArkMenuRoot><output aria-label="Selected action">{selection}</output>
</section>
