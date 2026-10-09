<script lang="ts">
  import {
    LoongArkScrollAreaRoot,
    LoongArkScrollAreaViewport,
    LoongArkScrollAreaContent,
    LoongArkScrollAreaScrollbar,
    LoongArkScrollAreaThumb,
  } from "@loongark/svelte";
</script>

<LoongArkScrollAreaRoot>
  <LoongArkScrollAreaViewport>
    <LoongArkScrollAreaContent>
      <p>第一段内容</p>
      <p>第二段内容</p>
      <p>第三段内容</p>
    </LoongArkScrollAreaContent>
  </LoongArkScrollAreaViewport>
  <LoongArkScrollAreaScrollbar>
    <LoongArkScrollAreaThumb />
  </LoongArkScrollAreaScrollbar>
</LoongArkScrollAreaRoot>
