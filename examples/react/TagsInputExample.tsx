import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "@loongark/react";
import React from "react";
import {
  LoongArkTagsInputRoot,
  LoongArkTagsInputLabel,
  LoongArkTagsInputControl,
  LoongArkTagsInputInput,
  LoongArkTagsInputItem,
  LoongArkTagsInputItemPreview,
  LoongArkTagsInputItemText,
  LoongArkTagsInputItemDeleteTrigger,
  LoongArkTagsInputClearTrigger,
  LoongArkTagsInputHiddenInput,
} from "@loongark/react";
import type { TagsInputSize, TagsInputState } from "@loongark/primitives";

interface TagsInputExampleProps {
  size?: TagsInputSize;
  state?: TagsInputState;
  disabled?: boolean;
  readOnly?: boolean;
}

export const TagsInputExample: React.FC<TagsInputExampleProps> = ({
  size = "md",
  state = "default",
  disabled = false,
  readOnly = false,
}) => {
  const [value, setValue] = React.useState(["React", "Vue", "Solid"]);

  return (
    <LoongArkTagsInputRoot
      name="frameworks"
      size={size}
      state={state}
      disabled={disabled}
      readOnly={readOnly}
      value={value}
      onValueChange={(details: { value: string[] }) => setValue(details.value)}
    >
      <LoongArkTagsInputLabel>Frameworks</LoongArkTagsInputLabel>
      <LoongArkTagsInputControl size={size} state={state} disabled={disabled}>
        {value.map((tag, index) => (
          <LoongArkTagsInputItem key={tag} value={tag} index={index}>
            <LoongArkTagsInputItemPreview>
              <LoongArkTagsInputItemText>{tag}</LoongArkTagsInputItemText>
              <LoongArkTagsInputItemDeleteTrigger>
                <LoongArkIcon icon={controlIcons.close} size="sm" />
              </LoongArkTagsInputItemDeleteTrigger>
            </LoongArkTagsInputItemPreview>
          </LoongArkTagsInputItem>
        ))}
        <LoongArkTagsInputInput
          size={size}
          state={state}
          disabled={disabled}
          readOnly={readOnly}
          placeholder="Add tag"
        />
        <LoongArkTagsInputClearTrigger>Clear</LoongArkTagsInputClearTrigger>
      </LoongArkTagsInputControl>
      <LoongArkTagsInputHiddenInput />
    </LoongArkTagsInputRoot>
  );
};
