import { Skeleton } from "@/ui/skeleton";

function TableSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[25rem] w-full rounded-xl" />
      <Skeleton className="h-[2.5rem] w-full" />
    </div>
  );
}

TableSkeleton.displayName = "TableSkeleton";

export default TableSkeleton;
