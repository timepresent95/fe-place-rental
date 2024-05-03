"use client";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ApplicationState } from "@/5.entities/Rental/model";
import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/ui/menubar";

interface Props {
  filterQueryKey: string;
  paginationQueryKey: string;
}

type FilterValue = "true" | "false";
function GatheringFilters({ filterQueryKey, paginationQueryKey }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const availableFilter = searchParams.get(filterQueryKey) as FilterValue;

  const replacePageURL = () => {
    const params = new URLSearchParams(searchParams);
    if (availableFilter === "true") {
      params.set(filterQueryKey, "false");
    } else {
      params.set(filterQueryKey, "true");
    }
    params.set(paginationQueryKey, "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Menubar className="max-w-fit border-none shadow-none mb-4">
      <MenubarMenu>
        <MenubarTrigger asChild className="cursor-pointer">
          <Button variant="outline" className="flex items-center">
            필터
            <ChevronDown size={16} className="ml-2" />
          </Button>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="available"
                checked={availableFilter === "true"}
                onClick={() => replacePageURL()}
              />
              <label
                htmlFor="available"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                승인
              </label>
            </div>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

GatheringFilters.displayName = "GatheringFilters";

export default GatheringFilters;
