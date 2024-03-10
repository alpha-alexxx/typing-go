import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { NAV_ITEMS } from "./data";

import useScrollPosition from "@/hooks/use-scroll-position";
import { cn } from "@/lib/utils";

const DesktopBar = ({ scrollPosition }: { scrollPosition: string }) => {
  return (
    <div className="hidden w-4/5 flex-row items-center justify-evenly lg:flex">
      <nav className=" h-full w-3/4">
        <ul className="flex items-center justify-center gap-2">
          {NAV_ITEMS.map((item, index) => (
            <Button
              key={item.name}
              asChild
              variant={"link"}
              className={cn(
                "text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary",
                {
                  "text-primary underline dark:text-primary":
                    `#${scrollPosition}` === item.href,
                },
              )}
            >
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DesktopBar;
