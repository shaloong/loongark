<script lang="ts">
  import {
    LoongArkTagsInputRoot,
    LoongArkTagsInputLabel,
    LoongArkTagsInputControl,
    LoongArkTagsInputItem,
    LoongArkTagsInputItemPreview,
    LoongArkTagsInputItemText,
    LoongArkTagsInputItemDeleteTrigger,
    LoongArkIcon,
    LoongArkTagsInputInput,
    LoongArkTagsInputHiddenInput,
  } from "@loongark/svelte";
  import { controlIcons } from "@loongark/kit";
  let tags = $state(["React", "Vue"]);
</script>

<LoongArkTagsInputRoot
  name="frameworks"
  value={tags}
  onValueChange={(details: { value: string[] }) => (tags = details.value)}
>
  <LoongArkTagsInputLabel>框架</LoongArkTagsInputLabel>
  <LoongArkTagsInputControl>
    {#each tags as tag, index}<LoongArkTagsInputItem value={tag} {index}>
        <LoongArkTagsInputItemPreview>
          <LoongArkTagsInputItemText>
            {tag}
          </LoongArkTagsInputItemText>
          <LoongArkTagsInputItemDeleteTrigger aria-label={"移除 " + tag}>
            <LoongArkIcon icon={controlIcons.close} size="sm" />
          </LoongArkTagsInputItemDeleteTrigger>
        </LoongArkTagsInputItemPreview>
      </LoongArkTagsInputItem>{/each}
    <LoongArkTagsInputInput placeholder="输入后按 Enter" />
  </LoongArkTagsInputControl>
  <LoongArkTagsInputHiddenInput />
</LoongArkTagsInputRoot>
