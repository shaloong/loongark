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

export const RatingGroupExample: Component<RatingGroupExampleProps> = (props) => {
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
          <LoongArkRatingGroupItem value={item}>
            {item <= value() ? "*" : "-"}
          </LoongArkRatingGroupItem>
        ))}
      </LoongArkRatingGroupControl>
      <LoongArkRatingGroupHiddenInput />
    </LoongArkRatingGroupRoot>
  );
};
