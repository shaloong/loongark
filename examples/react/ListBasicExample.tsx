import React from "react";
import {
  LoongArkList,
  LoongArkListItem,
  LoongArkListItemText,
} from "@loongark/react";
export function ListBasicExample() {
  return (
    <LoongArkList>
      <LoongArkListItem>
        <LoongArkListItemText>项目一</LoongArkListItemText>
      </LoongArkListItem>
      <LoongArkListItem>
        <LoongArkListItemText>项目二</LoongArkListItemText>
      </LoongArkListItem>
    </LoongArkList>
  );
}
