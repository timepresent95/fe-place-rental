import { Skeleton } from "@/ui/skeleton";

function TableViewSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[25rem] w-full rounded-xl" />
      <Skeleton className="h-[2.5rem] w-full" />
    </div>
  );
}

TableViewSkeleton.displayName = "TableViewSkeleton";

export default TableViewSkeleton;
