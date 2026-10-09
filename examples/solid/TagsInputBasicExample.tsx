/** @jsxImportSource solid-js */
import { createSignal, createMemo } from "solid-js";
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
} from "@loongark/solid";
import { controlIcons } from "@loongark/kit";
export function TagsInputBasicExample() {
  const [tags, setTags] = createSignal(["React", "Vue"]);
  return (
    <LoongArkTagsInputRoot
      name="frameworks"
      value={tags()}
      onValueChange={(details: { value: string[] }) => setTags(details.value)}
    >
      <LoongArkTagsInputLabel>框架</LoongArkTagsInputLabel>
      <LoongArkTagsInputControl>
        {tags().map((tag, index) => (
          <LoongArkTagsInputItem value={tag} index={index}>
            <LoongArkTagsInputItemPreview>
              <LoongArkTagsInputItemText>{tag}</LoongArkTagsInputItemText>
              <LoongArkTagsInputItemDeleteTrigger aria-label={"移除 " + tag}>
                <LoongArkIcon icon={controlIcons.close} size="sm" />
              </LoongArkTagsInputItemDeleteTrigger>
            </LoongArkTagsInputItemPreview>
          </LoongArkTagsInputItem>
        ))}
        <LoongArkTagsInputInput placeholder="输入后按 Enter" />
      </LoongArkTagsInputControl>
      <LoongArkTagsInputHiddenInput />
    </LoongArkTagsInputRoot>
  );
}
