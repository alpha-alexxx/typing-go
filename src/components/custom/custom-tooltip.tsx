import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CustomTooltipProps {
  label?: string | null;
  side?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}

const CustomTooltip = ({ label, side, children }: CustomTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger type="button">{children}</TooltipTrigger>
        <TooltipContent side={side}>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
