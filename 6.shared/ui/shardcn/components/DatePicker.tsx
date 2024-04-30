"use client";

import { useState } from "react";

import { CalendarIcon } from "lucide-react";

import dayjs from "@/6.shared/lib/dayjs";
import { cn } from "@/6.shared/lib/tailwindMerge";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";



interface Props {
  onChange?: (day?: Date) => void;
  placeholder?: string;
}

function DatePicker({ onChange, placeholder = "Pick a Date" }: Props) {
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
          {date ? dayjs(date).format("YYYY-MM-DD") : <span>{placeholder}</span>}
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
