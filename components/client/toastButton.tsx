"use client";

import { forwardRef } from "react";

import { toast } from "sonner";

import { Button, ButtonProps } from "@/ui/button";

interface ToastButtonProps extends Omit<ButtonProps, "onClick"> {
  message: string;
}
const ToastButton = forwardRef<HTMLButtonElement, ToastButtonProps>(
  ({ message, children, ...props }, ref) => {
    return (
      <Button onClick={() => toast(message)} ref={ref} {...props}>
        {children}
      </Button>
    );
  }
);

ToastButton.displayName = "ToastButton";

export default ToastButton;
