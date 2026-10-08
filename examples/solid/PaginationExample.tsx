/** @jsxImportSource solid-js */
import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import {
  LoongArkPaginationRoot,
  LoongArkPaginationList,
  LoongArkPaginationItem,
  LoongArkPaginationPrevTrigger,
  LoongArkPaginationNextTrigger,
} from "@loongark/solid";
import type {
  PaginationOrientation,
  PaginationSize,
} from "@loongark/primitives";

export interface PaginationExampleProps {
  size?: PaginationSize;
  orientation?: PaginationOrientation;
}

export const PaginationExample: Component<PaginationExampleProps> = (props) => {
  const size = () => props.size ?? "md";
  const orientation = () => props.orientation ?? "horizontal";
  const [page, setPage] = createSignal(1);
  const totalPages = 6;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <LoongArkPaginationRoot
      size={size()}
      orientation={orientation()}
      page={page()}
      count={totalPages * 10}
      pageSize={10}
      onPageChange={(details) => setPage(details.page)}
    >
      <LoongArkPaginationPrevTrigger
        disabled={page() === 1}
        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
      >
        Prev
      </LoongArkPaginationPrevTrigger>
      <LoongArkPaginationList>
        {pages.map((value) => (
          <LoongArkPaginationItem
            type="page"
            value={value}
            aria-current={page() === value ? "page" : undefined}
            data-selected={page() === value ? "true" : undefined}
            onClick={() => setPage(value)}
          >
            {value}
          </LoongArkPaginationItem>
        ))}
      </LoongArkPaginationList>
      <LoongArkPaginationNextTrigger
        disabled={page() === totalPages}
        onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
      >
        Next
      </LoongArkPaginationNextTrigger>
    </LoongArkPaginationRoot>
  );
};
