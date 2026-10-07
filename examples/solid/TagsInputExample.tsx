/** @jsxImportSource solid-js */
import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "@loongark/solid";

import type { Component } from "solid-js";
import { createSignal } from "solid-js";
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
} from "@loongark/solid";
import type { TagsInputSize, TagsInputState } from "@loongark/primitives";

export interface TagsInputExampleProps {
  size?: TagsInputSize;
  state?: TagsInputState;
  disabled?: boolean;
  readOnly?: boolean;
}

export const TagsInputExample: Component<TagsInputExampleProps> = (props) => {
  const size = () => props.size ?? "md";
  const state = () => props.state ?? "default";
  const disabled = () => props.disabled ?? false;
  const readOnly = () => props.readOnly ?? false;
  const [value, setValue] = createSignal(["React", "Vue", "Solid"]);

  return (
    <LoongArkTagsInputRoot
      name="frameworks"
      size={size()}
      state={state()}
      disabled={disabled()}
      readOnly={readOnly()}
      value={value()}
      onValueChange={(details: { value: string[] }) => setValue(details.value)}
    >
      <LoongArkTagsInputLabel>Frameworks</LoongArkTagsInputLabel>
      <LoongArkTagsInputControl
        size={size()}
        state={state()}
        disabled={disabled()}
      >
        {value().map((tag, index) => (
          <LoongArkTagsInputItem value={tag} index={index}>
            <LoongArkTagsInputItemPreview>
              <LoongArkTagsInputItemText>{tag}</LoongArkTagsInputItemText>
              <LoongArkTagsInputItemDeleteTrigger>
                <LoongArkIcon icon={controlIcons.close} size="sm" />
              </LoongArkTagsInputItemDeleteTrigger>
            </LoongArkTagsInputItemPreview>
          </LoongArkTagsInputItem>
        ))}
        <LoongArkTagsInputInput
          size={size()}
          state={state()}
          disabled={disabled()}
          readOnly={readOnly()}
          placeholder="Add tag"
        />
        <LoongArkTagsInputClearTrigger>Clear</LoongArkTagsInputClearTrigger>
      </LoongArkTagsInputControl>
      <LoongArkTagsInputHiddenInput />
    </LoongArkTagsInputRoot>
  );
};
