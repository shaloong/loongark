/** @jsxImportSource solid-js */

import {
  LoongArkList,
  LoongArkListItem,
  LoongArkListItemText,
} from "@loongark/solid";
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
