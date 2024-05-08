import { ComponentProps } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
  PaginationContent,
  PaginationClient as PaginationContainer,
  PaginationItem,
  PaginationButton,
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
  const itemCount = Math.min(endIndex - startIndex + 1, buttonCount);
  return startIndex > endIndex
    ? null
    : Array.from({ length: itemCount }).map((_, index) => (
        <PaginationItem key={index}>
          <PaginationButton isActive={index === currentIndex}>
            {index + startIndex + 1}
          </PaginationButton>
        </PaginationItem>
      ));
}

interface PaginationProps extends ComponentProps<"div"> {
  pageSize: number;
  currentIndex: number;
  total: number;
  buttonCount?: number;
}

function Pagination({
  pageSize,
  total,
  currentIndex,
  buttonCount = 6,
  ...props
}: PaginationProps) {
  const endIndex = Math.ceil(total / pageSize) - 1;
  return (
    <PaginationContainer {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationButton
            aria-label="Go to previous page"
            size="default"
            className="gap-1 pr-2.5">
            <ChevronLeftIcon className="h-4 w-4" />
            <span>이전</span>
          </PaginationButton>
        </PaginationItem>
        <PaginationItems
          currentIndex={currentIndex}
          buttonCount={buttonCount}
          endIndex={endIndex}
        />
        <PaginationItem>
          <PaginationButton
            aria-label="Go to next page"
            size="default"
            className="gap-1 pr-2.5">
            <span>다음</span>
            <ChevronRightIcon className="h-4 w-4" />
          </PaginationButton>
        </PaginationItem>
      </PaginationContent>
    </PaginationContainer>
  );
}

Pagination.displayName = "Pagination Client";

export default Pagination;
