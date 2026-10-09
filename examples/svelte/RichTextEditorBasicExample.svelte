<script lang="ts">
  import { LoongArkRichTextEditor } from "@loongark/svelte";
</script>

<LoongArkRichTextEditor
  label="项目备注"
  defaultValue={{
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text: "开始记录项目想法。" }],
      },
    ],
  }}
/>
