import { PropsWithChildren } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";

interface Props extends PropsWithChildren {
  message: string;
}

function TooltipWrapper({ message, children }: Props) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent collisionPadding={12} sideOffset={8}>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

TooltipWrapper.displayName = "TooltipWrapper";

export default TooltipWrapper;
