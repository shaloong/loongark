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
export const RatingGroupExample = RatingGroupDemo;
export type RatingGroupExampleProps = Parameters<typeof RatingGroupDemo>[0];
