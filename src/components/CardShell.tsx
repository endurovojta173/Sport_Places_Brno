//SSR wrapper for cards
import React from "react";

import { cn } from "@/lib/utils";

type CardShellProps = React.ComponentProps<"div">;

export default function CardShell({ className, ...props }: CardShellProps) {
  return (
    <div
      className={cn(
        "border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between",
        className
      )}
      {...props}
    />
  );
}
