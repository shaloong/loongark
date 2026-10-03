import React from "react";

import {
  LoongArkPaginationRoot,
  LoongArkPaginationList,
  LoongArkPaginationItem,
  LoongArkPaginationPrevTrigger,
  LoongArkPaginationNextTrigger,
  LoongArkPaginationEllipsis,
} from "@loongark/react";

interface PaginationDemoProps {
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
}

const PaginationDemo = ({
  size = "md",
  orientation = "horizontal",
}: PaginationDemoProps) => {
  const [page, setPage] = React.useState(1);
  const totalPages = 5;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <LoongArkPaginationRoot
      size={size}
      orientation={orientation}
      page={page}
      count={totalPages * 10}
      pageSize={10}
      onPageChange={(details: { page: number }) => setPage(details.page)}
    >
      <LoongArkPaginationPrevTrigger
        disabled={page === 1}
        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
      >
        Prev
      </LoongArkPaginationPrevTrigger>
      <LoongArkPaginationList>
        {pages.map((value) => (
          <LoongArkPaginationItem
            type="page"
            value={value}
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
export const PaginationExample = PaginationDemo;
export type PaginationExampleProps = Parameters<typeof PaginationDemo>[0];
