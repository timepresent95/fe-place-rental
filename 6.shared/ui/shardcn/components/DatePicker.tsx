"use client";

import { cn } from "@/6.shared/lib/tailwindMerge";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import dayjs from "@/6.shared/lib/dayjs";
import { Calendar } from "../ui/calendar";

interface Props {
  onChange?: (day?: Date) => void;
}

function DatePicker({ onChange }: Props) {
  const [date, setDate] = useState<Date | undefined>(undefined);

  function changeDate(day: Date | undefined) {
    onChange && onChange(day);
    setDate(day);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "min-w-[280px] w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? dayjs(date).format("YYYY-MM-DD") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={changeDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

DatePicker.displayName = "DatePicker";

export default DatePicker;
