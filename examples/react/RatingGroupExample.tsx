import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "@loongark/react";
import React from "react";

import {
  LoongArkRatingGroupRoot,
  LoongArkRatingGroupLabel,
  LoongArkRatingGroupControl,
  LoongArkRatingGroupItem,
  LoongArkRatingGroupHiddenInput,
} from "@loongark/react";

interface RatingGroupDemoProps {
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  max?: number;
}

const RatingGroupDemo = ({
  size = "md",
  disabled = false,
  max = 5,
}: RatingGroupDemoProps) => {
  const [value, setValue] = React.useState(3);
  const items = Array.from({ length: max }, (_, index) => index + 1);

  return (
    <LoongArkRatingGroupRoot
      count={max}
      size={size}
      disabled={disabled}
      value={value}
      onValueChange={(details: { value: number }) => setValue(details.value)}
    >
      <LoongArkRatingGroupLabel>Rating</LoongArkRatingGroupLabel>
      <LoongArkRatingGroupControl>
        {items.map((item) => (
          <LoongArkRatingGroupItem key={item} index={item}>
            <LoongArkIcon icon={controlIcons.star} size="lg" />
          </LoongArkRatingGroupItem>
        ))}
      </LoongArkRatingGroupControl>
      <LoongArkRatingGroupHiddenInput />
    </LoongArkRatingGroupRoot>
  );
};
export const RatingGroupExample = RatingGroupDemo;
export type RatingGroupExampleProps = Parameters<typeof RatingGroupDemo>[0];
