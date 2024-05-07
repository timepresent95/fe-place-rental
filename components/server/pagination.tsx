import { ComponentProps } from "react";

import {
  PaginationContent,
  Pagination as PaginationContainer,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/ui/pagination";

interface PaginationItemsProps {
  currentIndex: number;
  buttonCount: number;
  endIndex: number;
}

function PaginationItems({
  currentIndex,
  buttonCount,
  endIndex,
}: PaginationItemsProps) {
  const startIndex = Math.max(currentIndex - buttonCount / 2, 0);
  const itemCount = endIndex - startIndex + 1;
  return startIndex > endIndex
    ? null
    : Array.from({ length: itemCount }).map((_, index) => (
        <PaginationItem key={index}>
          <PaginationLink href="#" isActive={index === currentIndex}>
            {index + startIndex + 1}
          </PaginationLink>
        </PaginationItem>
      ));
}

interface PaginationProps extends ComponentProps<"div"> {
  pageSize: number;
  paginationKey: string;
  total: number;
  buttonCount?: number;
}

function Pagination({
  pageSize,
  paginationKey,
  total,
  buttonCount = 6,
  ...props
}: PaginationProps) {
  const currentIndex = 0;
  const endIndex = Math.ceil(total / pageSize) - 1;
  return (
    <PaginationContainer {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItems
          currentIndex={currentIndex}
          buttonCount={buttonCount}
          endIndex={endIndex}
        />
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </PaginationContainer>
  );
}

Pagination.displayName = "Pagination Server";

export default Pagination;
