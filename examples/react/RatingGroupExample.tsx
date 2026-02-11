import React from "react";
import {
  LoongArkRatingGroupRoot,
  LoongArkRatingGroupLabel,
  LoongArkRatingGroupControl,
  LoongArkRatingGroupItem,
  LoongArkRatingGroupHiddenInput,
} from "@loongark/react";
import type { RatingGroupSize } from "@loongark/primitives";

interface RatingGroupExampleProps {
  size?: RatingGroupSize;
  disabled?: boolean;
}

export const RatingGroupExample: React.FC<RatingGroupExampleProps> = ({
  size = "md",
  disabled = false,
}) => {
  const [value, setValue] = React.useState(3);

  return (
    <LoongArkRatingGroupRoot
      size={size}
      disabled={disabled}
      value={value}
      onValueChange={(details: { value: number }) => setValue(details.value)}
    >
      <LoongArkRatingGroupLabel>Rating</LoongArkRatingGroupLabel>
      <LoongArkRatingGroupControl>
        {[1, 2, 3, 4, 5].map((item) => (
          <LoongArkRatingGroupItem key={item} value={item}>
            {item <= value ? "*" : "-"}
          </LoongArkRatingGroupItem>
        ))}
      </LoongArkRatingGroupControl>
      <LoongArkRatingGroupHiddenInput />
    </LoongArkRatingGroupRoot>
  );
};
