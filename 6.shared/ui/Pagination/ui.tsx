"use client";

import clsx from "clsx";
import {
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/6.shared/lib/tailwindMerge";

type PaginationButton =
  | {
      type: "number";
      index: number;
    }
  | { type: "left" | "right" };

function createVisiblePageIndexes(
  currentIndex: number,
  endPageIndex: number,
  pagerCount: number
): PaginationButton[] {
  let ret: PaginationButton[] = [];
  let startIndex = currentIndex - Math.floor((pagerCount - 1) / 2);
  let endIndex = currentIndex + Math.ceil((pagerCount - 1) / 2);
  if (startIndex < 1) {
    endIndex += 1 - startIndex;
    startIndex = 1;
  }
  if (endIndex > endPageIndex) {
    startIndex -= endIndex - endPageIndex;
    endIndex = endPageIndex;
  }

  startIndex = Math.max(startIndex, 1);
  endIndex = Math.min(endIndex, endPageIndex);

  for (let i = startIndex; i <= endIndex; i++) {
    ret.push({ type: "number", index: i });
  }

  if (ret[0].type === "number" && ret[0].index !== 1) {
    ret.splice(0, 1, { type: "number", index: 1 }, { type: "left" });
  }

  const last = ret[ret.length - 1];
  if (last && last.type === "number" && last.index !== endPageIndex) {
    ret.splice(
      ret.length - 1,
      1,
      { type: "right" },
      { type: "number", index: endPageIndex }
    );
  }
  return ret;
}

export interface Props {
  total: number;
  pageSize: number;
  paginationQueryKey: string;
  pagerCount?: number;
  className?: string;
}

//NOTE: total은 0이 될 수 없음
function Pagination({
  total,
  pageSize,
  paginationQueryKey,
  pagerCount = 6,
  className = "",
}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const currentIndex = Number(searchParams.get(paginationQueryKey)) || 1;
  const endPageIndex = Math.ceil(total / pageSize);
  const visiblePageIndexes = createVisiblePageIndexes(
    currentIndex,
    endPageIndex,
    pagerCount
  );

  const replacePageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(paginationQueryKey, pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  function onClickSkipPrev() {
    if (visiblePageIndexes[2].type === "number") {
      const targetIndex =
        visiblePageIndexes[2].index - Math.ceil((pagerCount - 1) / 2);
      replacePageURL(Math.max(targetIndex, 1));
    }
  }
  function onClickSkipNext() {
    const prevNextEllipsis = visiblePageIndexes[visiblePageIndexes.length - 3];
    if (prevNextEllipsis.type === "number") {
      const targetIndex =
        prevNextEllipsis.index + Math.floor((pagerCount - 1) / 2);
      replacePageURL(Math.min(targetIndex, endPageIndex));
    }
  }

  return (
    <div className={cn("flex items-center", className)}>
      <button
        disabled={currentIndex === 1}
        onClick={() => replacePageURL(currentIndex - 1)}
        className={clsx({ "opacity-0 cursor-default": currentIndex === 1 })}>
        <ChevronLeft size={16} className="mx-auto" />
      </button>
      <div className="mx-auto">
        {visiblePageIndexes.map((pageIndex, i) =>
          pageIndex.type === "number" ? (
            <button
              key={i}
              onClick={() => replacePageURL(pageIndex.index)}
              className={clsx("w-6", {
                "text-blue-700 font-bold": pageIndex.index === currentIndex,
                "hover:text-blue-500": pageIndex.index !== currentIndex,
              })}>
              {pageIndex.index}
            </button>
          ) : (
            <button key={i} className="w-6 group">
              <Ellipsis size={16} className="group-hover:hidden" />
              {pageIndex.type === "left" ? (
                <ChevronsLeft
                  size={16}
                  onClick={onClickSkipPrev}
                  className="hidden group-hover:block group-hover:text-blue-500"
                />
              ) : (
                <ChevronsRight
                  size={16}
                  onClick={onClickSkipNext}
                  className="hidden group-hover:block group-hover:text-blue-500"
                />
              )}
            </button>
          )
        )}
      </div>
      <button
        disabled={currentIndex >= endPageIndex}
        onClick={() => replacePageURL(currentIndex + 1)}
        className={clsx({
          "opacity-0 cursor-default": currentIndex >= endPageIndex,
        })}>
        <ChevronRight size={16} className="mx-auto" />
      </button>
    </div>
  );
}

export default Pagination;
