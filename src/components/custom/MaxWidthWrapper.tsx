import { ReactNode } from "react";

import { cn } from "@/lib/utils";

const MaxWidthWrapper = ({
  className,
  bgColor,
  paddingTop,
  children,
}: {
  className?: string;
  bgColor?: string;
  paddingTop?: string;
  children: ReactNode;
}) => {
  return (
    <div className={cn(className, bgColor)}>
      <div
        className={cn(
          "mx-auto w-full max-w-screen-xl px-2.5 md:px-10",
          paddingTop,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default MaxWidthWrapper;
