/** @jsxImportSource solid-js */
import { controlIcons } from "@shaloong/loongark-kit";
import { LoongArkIcon } from "@shaloong/loongark-solid";

import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import {
  LoongArkRatingGroupRoot,
  LoongArkRatingGroupLabel,
  LoongArkRatingGroupControl,
  LoongArkRatingGroupItem,
  LoongArkRatingGroupHiddenInput,
} from "@shaloong/loongark-solid";
import type { RatingGroupSize } from "@shaloong/loongark-primitives";

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
            <LoongArkIcon icon={controlIcons.star} size="lg" />
          </LoongArkRatingGroupItem>
        ))}
      </LoongArkRatingGroupControl>
      <LoongArkRatingGroupHiddenInput />
    </LoongArkRatingGroupRoot>
  );
};
