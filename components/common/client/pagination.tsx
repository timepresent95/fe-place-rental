import { ComponentProps } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
  PaginationContent,
  PaginationClient as PaginationContainer,
  PaginationItem,
  PaginationButton,
} from "@/ui/pagination";

interface PaginationItemsProps {
  startIndex: number;
  endIndex: number;
  currentIndex: number;
  onClick: (index: number) => void;
}

function PaginationItems({
  startIndex,
  endIndex,
  currentIndex,
  onClick,
}: PaginationItemsProps) {
  const itemCount = endIndex - startIndex + 1;
  return Array.from({ length: itemCount }).map((_, index) => {
    const buttonIndex = index + startIndex;

    return (
      <PaginationItem key={index}>
        <PaginationButton
          isActive={index + startIndex === currentIndex}
          onClick={() => onClick(buttonIndex)}>
          {buttonIndex + 1}
        </PaginationButton>
      </PaginationItem>
    );
  });
}

interface PaginationProps extends Omit<ComponentProps<"div">, "onClick"> {
  pageSize: number;
  currentIndex: number;
  total: number;
  buttonCount?: number;
  onClick: (index: number) => void;
}

function getRevealButtonIndex(
  currentIndex: number,
  buttonCount: number,
  finalIndex: number
) {
  const start = Math.max(currentIndex - buttonCount / 2, 0);
  const end = Math.min(finalIndex, start + buttonCount - 1);

  return [start, end];
}

function Pagination({
  pageSize,
  total,
  currentIndex,
  buttonCount = 6,
  onClick,
  ...props
}: PaginationProps) {
  if (total === 0) {
    return null;
  }

  const finalIndex = Math.ceil(total / pageSize) - 1;
  const [startIndex, endIndex] = getRevealButtonIndex(
    currentIndex,
    buttonCount,
    finalIndex
  );

  return (
    <PaginationContainer {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationButton
            onClick={() => onClick(Math.max(startIndex - 1, 0))}
            disabled={currentIndex === 0}
            aria-label="Go to previous page"
            size="default"
            className="gap-1 pr-2.5">
            <ChevronLeftIcon className="h-4 w-4" />
            <span>이전</span>
          </PaginationButton>
        </PaginationItem>
        <PaginationItems
          startIndex={startIndex}
          endIndex={endIndex}
          currentIndex={currentIndex}
          onClick={onClick}
        />
        <PaginationItem>
          <PaginationButton
            onClick={() => onClick(Math.min(endIndex + 1, finalIndex))}
            disabled={currentIndex === finalIndex}
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
