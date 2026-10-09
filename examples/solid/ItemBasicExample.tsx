/** @jsxImportSource solid-js */

import {
  LoongArkItem,
  LoongArkItemContent,
  LoongArkItemTitle,
  LoongArkItemDescription,
  LoongArkItemActions,
  LoongArkButton,
} from "@loongark/solid";
export function ItemBasicExample() {
  return (
    <LoongArkItem>
      <LoongArkItemContent>
        <LoongArkItemTitle>组件说明</LoongArkItemTitle>
        <LoongArkItemDescription>
          用于列表中的标题、描述和操作组合。
        </LoongArkItemDescription>
      </LoongArkItemContent>
      <LoongArkItemActions>
        <LoongArkButton variant="outline">查看</LoongArkButton>
      </LoongArkItemActions>
    </LoongArkItem>
  );
}
