import React from "react";
import {
  LoongArkPaginationRoot,
  LoongArkPaginationPrevTrigger,
  LoongArkPaginationItem,
  LoongArkPaginationNextTrigger,
} from "@loongark/react";
export function PaginationBasicExample() {
  return (
    <LoongArkPaginationRoot count={50} pageSize={10}>
      <LoongArkPaginationPrevTrigger>上一页</LoongArkPaginationPrevTrigger>
      <LoongArkPaginationItem type="page" value={1}>
        1
      </LoongArkPaginationItem>
      <LoongArkPaginationItem type="page" value={2}>
        2
      </LoongArkPaginationItem>
      <LoongArkPaginationNextTrigger>下一页</LoongArkPaginationNextTrigger>
    </LoongArkPaginationRoot>
  );
}
