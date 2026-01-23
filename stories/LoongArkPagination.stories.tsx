import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LoongArkPaginationRoot,
  LoongArkPaginationList,
  LoongArkPaginationItem,
  LoongArkPaginationPrevTrigger,
  LoongArkPaginationNextTrigger,
  LoongArkPaginationEllipsis,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/Pagination",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkPagination provides a token-driven pagination surface with size/orientation variants.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface PaginationDemoProps {
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
}

const PaginationDemo = ({ size = "md", orientation = "horizontal" }: PaginationDemoProps) => {
  const [page, setPage] = React.useState(1);
  const totalPages = 5;
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

export const Basic: Story = {
  render: () => <PaginationDemo />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <PaginationDemo size="sm" />
      <PaginationDemo size="md" />
      <PaginationDemo size="lg" />
    </div>
  ),
};

export const WithEllipsis: Story = {
  render: () => (
    <LoongArkPaginationRoot>
      <LoongArkPaginationPrevTrigger disabled>Prev</LoongArkPaginationPrevTrigger>
      <LoongArkPaginationList>
        <LoongArkPaginationItem aria-current="page" data-selected="true">
          1
        </LoongArkPaginationItem>
        <LoongArkPaginationItem>2</LoongArkPaginationItem>
        <LoongArkPaginationItem>3</LoongArkPaginationItem>
        <LoongArkPaginationEllipsis>...</LoongArkPaginationEllipsis>
        <LoongArkPaginationItem>10</LoongArkPaginationItem>
      </LoongArkPaginationList>
      <LoongArkPaginationNextTrigger>Next</LoongArkPaginationNextTrigger>
    </LoongArkPaginationRoot>
  ),
};

export const Vertical: Story = {
  render: () => <PaginationDemo orientation="vertical" />,
};
