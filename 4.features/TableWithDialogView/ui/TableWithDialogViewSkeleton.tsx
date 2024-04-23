import { Skeleton } from "@/6.shared/ui/shardcn/ui/skeleton";

function TableWithDialogViewSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[25rem] w-full rounded-xl" />
      <Skeleton className="h-[2.5rem] w-full" />
    </div>
  );
}

TableWithDialogViewSkeleton.displayName = "TableWithDialogViewSkeleton";

export default TableWithDialogViewSkeleton;
