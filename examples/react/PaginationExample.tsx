import React, { useState } from "react";
import {
  LoongArkPaginationRoot,
  LoongArkPaginationList,
  LoongArkPaginationItem,
  LoongArkPaginationPrevTrigger,
  LoongArkPaginationNextTrigger,
} from "@loongark/react";
import type {
  PaginationOrientation,
  PaginationSize,
} from "@loongark/primitives";

export interface PaginationExampleProps {
  size?: PaginationSize;
  orientation?: PaginationOrientation;
}

export const PaginationExample: React.FC<PaginationExampleProps> = ({
  size = "md",
  orientation = "horizontal",
}) => {
  const [page, setPage] = useState(1);
  const totalPages = 6;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <LoongArkPaginationRoot size={size} orientation={orientation}>
      <LoongArkPaginationPrevTrigger
        disabled={page === 1}
        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
      >
        Prev
      </LoongArkPaginationPrevTrigger>
      <LoongArkPaginationList>
        {pages.map((value) => (
          <LoongArkPaginationItem
            key={value}
            aria-current={page === value ? "page" : undefined}
            data-selected={page === value ? "true" : undefined}
            onClick={() => setPage(value)}
          >
            {value}
          </LoongArkPaginationItem>
        ))}
      </LoongArkPaginationList>
      <LoongArkPaginationNextTrigger
        disabled={page === totalPages}
        onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
      >
        Next
      </LoongArkPaginationNextTrigger>
    </LoongArkPaginationRoot>
  );
};
