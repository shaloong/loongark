import React from "react";
import {
  LoongArkRatingGroupRoot,
  LoongArkRatingGroupLabel,
  LoongArkRatingGroupControl,
  LoongArkRatingGroupItem,
  LoongArkRatingGroupHiddenInput,
} from "@loongark/react";
export function RatingGroupBasicExample() {
  return (
    <LoongArkRatingGroupRoot count={5} defaultValue={3}>
      <LoongArkRatingGroupLabel>评分</LoongArkRatingGroupLabel>
      <LoongArkRatingGroupControl>
        <LoongArkRatingGroupItem index={1} />
        <LoongArkRatingGroupItem index={2} />
        <LoongArkRatingGroupItem index={3} />
        <LoongArkRatingGroupItem index={4} />
        <LoongArkRatingGroupItem index={5} />
      </LoongArkRatingGroupControl>
      <LoongArkRatingGroupHiddenInput name="rating" />
    </LoongArkRatingGroupRoot>
  );
}
