/** @jsxImportSource solid-js */
import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import {
  LoongArkRatingGroupRoot,
  LoongArkRatingGroupLabel,
  LoongArkRatingGroupControl,
  LoongArkRatingGroupItem,
  LoongArkRatingGroupHiddenInput,
} from "@loongark/solid";
import type { RatingGroupSize } from "@loongark/primitives";

interface RatingGroupExampleProps {
  size?: RatingGroupSize;
  disabled?: boolean;
}

export const RatingGroupExample: Component<RatingGroupExampleProps> = (
  props,
) => {
  const size = () => props.size ?? "md";
  const disabled = () => props.disabled ?? false;
  const [value, setValue] = createSignal(3);

  return (
    <LoongArkRatingGroupRoot
      size={size()}
      disabled={disabled()}
      value={value()}
      onValueChange={(details: { value: number }) => setValue(details.value)}
    >
      <LoongArkRatingGroupLabel>Rating</LoongArkRatingGroupLabel>
      <LoongArkRatingGroupControl>
        {[1, 2, 3, 4, 5].map((item) => (
          <LoongArkRatingGroupItem index={item}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m12 3 2.8 5.7 6.3.9-4.5 4.4 1.1 6.3-5.7-3-5.7 3 1.1-6.3-4.5-4.4 6.3-.9Z" />
            </svg>
          </LoongArkRatingGroupItem>
        ))}
      </LoongArkRatingGroupControl>
      <LoongArkRatingGroupHiddenInput />
    </LoongArkRatingGroupRoot>
  );
};
