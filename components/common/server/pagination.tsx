import { ComponentProps } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
  PaginationContent,
  PaginationServer as PaginationContainer,
  PaginationItem,
  PaginationLink,
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
          <PaginationLink
            href="#"
            aria-label="Go to previous page"
            size="default"
            className="gap-1 pr-2.5">
            <ChevronLeftIcon className="h-4 w-4" />
            <span>이전</span>
          </PaginationLink>
        </PaginationItem>
        <PaginationItems
          currentIndex={currentIndex}
          buttonCount={buttonCount}
          endIndex={endIndex}
        />
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="Go to previous page"
            size="default"
            className="gap-1 pr-2.5">
            <span>다음</span>
            <ChevronRightIcon className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </PaginationContainer>
  );
}

Pagination.displayName = "Pagination Server";

export default Pagination;
