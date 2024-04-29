"use client";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ApplicationState } from "@/5.entities/rental/model";
import { Button } from "@/6.shared/ui/shardcn/ui/button";
import { Checkbox } from "@/6.shared/ui/shardcn/ui/checkbox";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/6.shared/ui/shardcn/ui/menubar";

interface Props {
  filterQueryKey: string;
  paginationQueryKey: string;
}

function RentalFilters({ filterQueryKey, paginationQueryKey }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const applicationState = searchParams.getAll(
    filterQueryKey
  ) as ApplicationState[];

  const replacePageURL = (state: ApplicationState) => {
    const params = new URLSearchParams(searchParams);
    if (applicationState.includes(state)) {
      params.delete(filterQueryKey, state);
    } else {
      params.append(filterQueryKey, state);
    }
    params.set(paginationQueryKey, "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Menubar className="max-w-fit border-none shadow-none mb-4">
      <MenubarMenu>
        <MenubarTrigger asChild className="cursor-pointer">
          <Button variant="outline" className="flex items-center">
            신청 현황
            <ChevronDown size={16} className="ml-2" />
          </Button>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="approved"
                checked={applicationState.includes("approved")}
                onClick={() => replacePageURL("approved")}
              />
              <label
                htmlFor="approved"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                승인
              </label>
            </div>
          </MenubarItem>
          <MenubarItem>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rejected"
                checked={applicationState.includes("rejected")}
                onClick={() => replacePageURL("rejected")}
              />
              <label
                htmlFor="rejected"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                거절
              </label>
            </div>
          </MenubarItem>
          <MenubarItem>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pending"
                checked={applicationState.includes("pending")}
                onClick={() => replacePageURL("pending")}
              />
              <label
                htmlFor="pending"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                심사중
              </label>
            </div>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

RentalFilters.displayName = "RentalFilters";

export default RentalFilters;
