"use client";

import { useState } from "react";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { cn } from "@/util/tailwind";

interface Props {
  className?: string;
  initValue?: number;
  stepSize?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

function NumberStepper({
  className,
  onChange,
  min = -Infinity,
  max = Infinity,
  initValue = 0,
  stepSize = 1,
}: Props) {
  const [value, setValue] = useState<number>(initValue);
  const [inputValue, setInputValue] = useState<string>(initValue.toString());

  function changeStepperValue(newValue: number) {
    const result = Math.min(max, Math.max(newValue, min));
    onChange && onChange(result);
    setInputValue(result.toString());
    setValue(result);
  }

  return (
    <div className={cn(className, "flex space-x-2 items-stretch")}>
      <Button
        className="h-full"
        type="button"
        onClick={() => changeStepperValue(value + -1 * stepSize)}>
        <Minus size="16" />
      </Button>
      <Input
        className="text-center h-full"
        value={inputValue}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        onBlur={(e) => {
          const result = parseInt(e.currentTarget.value);
          if (isNaN(result)) {
            return changeStepperValue(value);
          }
          changeStepperValue(result);
        }}
      />
      <Button
        className="h-full"
        type="button"
        onClick={() => changeStepperValue(value + stepSize)}>
        <Plus size="16" />
      </Button>
    </div>
  );
}

NumberStepper.displayName = "NumberStepper";

export default NumberStepper;
